import { useState, useEffect, useCallback, useRef } from "react";
import { Plane, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import axios from "axios";
import hApi from "../HApi";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchWorldCities } from "@/lib/worldCities";

// Add the missing constants
const SAFETY_FEATURES = [
  "Terrain Awareness",
  "Traffic Collision Avoidance",
  "Emergency Floatation",
  "Night Vision Compatible",
  "Enhanced Vision System",
  "Autopilot",
  "Satellite Phone",
  "First Aid Kit",
  "Emergency Locator Transmitter",
];

const AMENITIES = [
  { id: "hasWifi", label: "WiFi" },
  { id: "hasRefreshments", label: "Refreshments" },
  { id: "hasEntertainmentSystem", label: "Entertainment System" },
  { id: "hasClimatControl", label: "Climate Control" },
];

interface FormData {
  model: string;
  year: string;
  capacity: string;
  range: string;
  pricePerHour: string;
  location: string;
  availableFrom: string;
  availableTo: string;
  description: string;
  registrationNumber: string;
  engineType: string;
  engineCount: string;
  maxSpeed: string;
  cruisingSpeed: string;
  fuelCapacity: string;
  maxAltitude: string;
  flightHours: string;
  lastOverhaul: string;
  airworthinessCertificate: string;
  lastMaintenanceDate: string;
  insuranceStatus: string;
  pilotQualifications: string;
  safetyFeatures: string[];
  hasWifi: boolean;
  hasRefreshments: boolean;
  hasEntertainmentSystem: boolean;
  hasClimatControl: boolean;
  depositAmount: string;
  minimumHours: string;
  cancellationPolicy: string;
  packageDeals: string;
  images: File[];
  imageUrls: string[];
}

interface FormErrors extends Partial<Record<keyof FormData, string>> {}

const steps = [
  { id: 1, name: "Basic Info" },
  { id: 2, name: "Technical Details" },
  { id: 3, name: "Safety & Cert" },
  { id: 4, name: "Pricing & Availability" },
  { id: 5, name: "Images" },
] as const;

// Add the FileUpload component
interface FileUploadProps {
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  images: string[];
  uploading: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  name,
  onChange,
  error,
  images,
  uploading,
}) => (
  <div className="space-y-2">
    <Label htmlFor={name}>
      {label} <span className="text-red-500">*</span>
    </Label>
    <div
      className={`flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    >
      <div className="space-y-1 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="flex text-sm text-gray-600">
          <label
            htmlFor={name}
            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
          >
            <span>{uploading ? "Uploading..." : "Upload files"}</span>
            <input
              id={name}
              name={name}
              type="file"
              className="sr-only"
              onChange={onChange}
              multiple
              accept="image/png,image/jpeg"
              disabled={uploading}
              aria-describedby={error ? `${name}-error` : undefined}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
            />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
      </div>
    </div>
    {error && (
      <p id={`${name}-error`} className="text-sm text-red-600">
        {error}
      </p>
    )}
    {images.length > 0 && (
      <div className="mt-4 grid grid-cols-3 gap-2">
        {images.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`${label} ${index + 1}`}
            className="h-24 w-full object-cover rounded-md"
          />
        ))}
      </div>
    )}
  </div>
);

function EditHCharterListing() {
  const vendor = useSelector((state: any) => state.vendor.vendor);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [uploading, setUploading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [citySearch, setCitySearch] = useState("");
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    model: "",
    year: "",
    capacity: "",
    range: "",
    pricePerHour: "",
    location: "",
    availableFrom: "",
    availableTo: "",
    description: "",
    registrationNumber: "",
    engineType: "",
    engineCount: "",
    maxSpeed: "",
    cruisingSpeed: "",
    fuelCapacity: "",
    maxAltitude: "",
    flightHours: "",
    lastOverhaul: "",
    airworthinessCertificate: "",
    lastMaintenanceDate: "",
    insuranceStatus: "",
    pilotQualifications: "",
    safetyFeatures: [],
    hasWifi: false,
    hasRefreshments: false,
    hasEntertainmentSystem: false,
    hasClimatControl: false,
    depositAmount: "",
    minimumHours: "",
    cancellationPolicy: "",
    packageDeals: "",
    images: [],
    imageUrls: [],
  });

  useEffect(() => {
    fetchWorldCities().then(setCityOptions);
  }, []);

  useEffect(() => {
    const fetchHelicopter = async () => {
      try {
        const response = await hApi.get(`/charter/edit/${id}`);
        if (response.data.success) {
          const helicopter = response.data.helicopter;

          // Format dates to YYYY-MM-DD
          const formatDate = (date: string) => {
            return new Date(date).toISOString().split("T")[0];
          };

          setFormData({
            model: helicopter.model,
            year: helicopter.year.toString(),
            capacity: helicopter.capacity.toString(),
            range: helicopter.range.toString(),
            pricePerHour: helicopter.pricePerHour.toString(),
            location: helicopter.location,
            availableFrom: formatDate(helicopter.availableFrom),
            availableTo: formatDate(helicopter.availableTo),
            description: helicopter.description,
            registrationNumber: helicopter.registrationNumber,
            engineType: helicopter.engineType,
            engineCount: helicopter.engineCount.toString(),
            maxSpeed: helicopter.maxSpeed.toString(),
            cruisingSpeed: helicopter.cruisingSpeed.toString(),
            fuelCapacity: helicopter.fuelCapacity.toString(),
            maxAltitude: helicopter.maxAltitude.toString(),
            flightHours: helicopter.flightHours?.toString() || "",
            lastOverhaul: helicopter.lastOverhaul
              ? formatDate(helicopter.lastOverhaul)
              : "",
            airworthinessCertificate: helicopter.airworthinessCertificate,
            lastMaintenanceDate: formatDate(helicopter.lastMaintenanceDate),
            insuranceStatus: helicopter.insuranceStatus,
            pilotQualifications: helicopter.pilotQualifications,
            safetyFeatures: helicopter.safetyFeatures,
            hasWifi: helicopter.hasWifi,
            hasRefreshments: helicopter.hasRefreshments,
            hasEntertainmentSystem: helicopter.hasEntertainmentSystem,
            hasClimatControl: helicopter.hasClimatControl,
            depositAmount: helicopter.depositAmount.toString(),
            minimumHours: helicopter.minimumHours.toString(),
            cancellationPolicy: helicopter.cancellationPolicy,
            packageDeals: helicopter.packageDeals || "",
            images: [],
            imageUrls: helicopter.imageUrls || [],
          });
          setImageUrls(helicopter.imageUrls || []);
        } else {
          setError(response.data.message);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHelicopter();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleCheckboxChange = (name: keyof FormData) => {
    setFormData((prev) => ({
      ...prev,
      [name]: !prev[name as keyof typeof prev],
    }));
  };

  const handleSafetyFeatureChange = (feature: string) => {
    setFormData((prev) => {
      const newFeatures = prev.safetyFeatures.includes(feature)
        ? prev.safetyFeatures.filter((f) => f !== feature)
        : [...prev.safetyFeatures, feature];
      return { ...prev, safetyFeatures: newFeatures };
    });
  };

  const uploadToCloudinary = useCallback(
    async (files: FileList): Promise<string[]> => {
      const uploadPreset = "images";
      const cloudName = "dnsgznjyo";
      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      const urls: string[] = [];
      setUploading(true);

      try {
        const uploadPromises = Array.from(files).map(async (file) => {
          if (file.size > 10 * 1024 * 1024) {
            throw new Error(`File ${file.name} exceeds 10MB`);
          }
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", uploadPreset);

          const response = await axios.post(uploadUrl, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          return response.data.secure_url;
        });

        urls.push(...(await Promise.all(uploadPromises)));
        return urls;
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to upload images"
        );
        throw error;
      } finally {
        setUploading(false);
      }
    },
    []
  );

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        try {
          const urls = await uploadToCloudinary(e.target.files);
          setImageUrls((prev) => [...prev, ...urls]);
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, ...Array.from(e.target.files as FileList)],
          }));
          setErrors((prev) => ({ ...prev, images: undefined }));
        } catch (error) {
          console.error("Image upload error:", error);
        }
      }
    },
    [uploadToCloudinary]
  );

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    switch (step) {
      case 1:
        if (!formData.model.trim()) newErrors.model = "Model is required";
        if (!formData.year.trim()) newErrors.year = "Year is required";
        if (!formData.capacity.trim())
          newErrors.capacity = "Capacity is required";
        if (!formData.range.trim()) newErrors.range = "Range is required";
        if (!formData.pricePerHour.trim())
          newErrors.pricePerHour = "Price per hour is required";
        if (!formData.location.trim())
          newErrors.location = "Location is required";
        if (!formData.availableFrom.trim())
          newErrors.availableFrom = "Available from date is required";
        if (!formData.availableTo.trim())
          newErrors.availableTo = "Available to date is required";
        if (!formData.description.trim())
          newErrors.description = "Description is required";
        break;

      case 2:
        if (!formData.registrationNumber.trim())
          newErrors.registrationNumber = "Registration number is required";
        if (!formData.engineType)
          newErrors.engineType = "Engine type is required";
        if (!formData.engineCount)
          newErrors.engineCount = "Number of engines is required";
        if (!formData.maxSpeed)
          newErrors.maxSpeed = "Maximum speed is required";
        if (!formData.cruisingSpeed)
          newErrors.cruisingSpeed = "Cruising speed is required";
        if (!formData.fuelCapacity)
          newErrors.fuelCapacity = "Fuel capacity is required";
        if (!formData.maxAltitude)
          newErrors.maxAltitude = "Maximum altitude is required";
        break;

      case 3:
        if (!formData.airworthinessCertificate)
          newErrors.airworthinessCertificate =
            "Airworthiness certificate is required";
        if (!formData.lastMaintenanceDate)
          newErrors.lastMaintenanceDate = "Last maintenance date is required";
        if (!formData.insuranceStatus)
          newErrors.insuranceStatus = "Insurance status is required";
        if (!formData.pilotQualifications)
          newErrors.pilotQualifications = "Pilot qualifications are required";
        if (formData.safetyFeatures.length === 0)
          newErrors.safetyFeatures = "At least one safety feature is required";
        break;

      case 4:
        if (!formData.depositAmount)
          newErrors.depositAmount = "Deposit amount is required";
        if (!formData.minimumHours)
          newErrors.minimumHours = "Minimum hours is required";
        if (!formData.cancellationPolicy)
          newErrors.cancellationPolicy = "Cancellation policy is required";
        break;

      case 5:
        if (imageUrls.length === 0)
          newErrors.images = "At least one image is required";
        break;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      isValid = false;
      toast.error("Please fill in all required fields");
    } else {
      setErrors({});
    }

    return isValid;
  };

  const handleNextStep = useCallback(() => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
      setCityDropdownOpen(false);
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentStep, formData]);

  const handlePrevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setCityDropdownOpen(false);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(currentStep)) {
      return;
    }

    if (!vendor?.id) {
      toast.error("Please log in to update your listing");
      return;
    }

    try {
      const submissionData = {
        model: formData.model,
        year: parseInt(formData.year),
        capacity: parseInt(formData.capacity),
        range: parseFloat(formData.range),
        pricePerHour: parseFloat(formData.pricePerHour),
        location: formData.location,
        availableFrom: new Date(formData.availableFrom),
        availableTo: new Date(formData.availableTo),
        description: formData.description,
        registrationNumber: formData.registrationNumber,
        engineType: formData.engineType,
        engineCount: parseInt(formData.engineCount),
        maxSpeed: parseFloat(formData.maxSpeed),
        cruisingSpeed: parseFloat(formData.cruisingSpeed),
        fuelCapacity: parseFloat(formData.fuelCapacity),
        maxAltitude: parseFloat(formData.maxAltitude),
        flightHours: formData.flightHours
          ? parseFloat(formData.flightHours)
          : null,
        lastOverhaul: formData.lastOverhaul
          ? new Date(formData.lastOverhaul)
          : null,
        airworthinessCertificate: formData.airworthinessCertificate,
        lastMaintenanceDate: new Date(formData.lastMaintenanceDate),
        insuranceStatus: formData.insuranceStatus,
        pilotQualifications: formData.pilotQualifications,
        safetyFeatures: formData.safetyFeatures,
        hasWifi: formData.hasWifi,
        hasRefreshments: formData.hasRefreshments,
        hasEntertainmentSystem: formData.hasEntertainmentSystem,
        hasClimatControl: formData.hasClimatControl,
        depositAmount: parseFloat(formData.depositAmount),
        minimumHours: parseFloat(formData.minimumHours),
        cancellationPolicy: formData.cancellationPolicy,
        packageDeals: formData.packageDeals,
        imageUrls: imageUrls,
        vendorId: vendor.id,
      };

      const response = await hApi.put(`/charter/edit/${id}`, submissionData);

      if (response.data.success) {
        toast.success("Helicopter charter listing updated successfully!");
        navigate("/h-broker/charter/listings");
      } else {
        throw new Error(response.data.message || "Failed to update listing");
      }
    } catch (error) {
      console.error("Error updating form:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Error updating listing. Please try again."
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading helicopter details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Error: {error}</p>
          <Button
            onClick={() => navigate("/h-broker/charter/listings")}
            className="mt-4"
          >
            Return to Listings
          </Button>
        </div>
      </div>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="model">
                  Model <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  placeholder="e.g. Bell 407, Airbus H125"
                  required
                  className={errors.model ? "border-red-500" : ""}
                />
                {errors.model && (
                  <p className="text-sm text-red-600">{errors.model}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">
                  Year <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="year"
                  name="year"
                  type="number"
                  min="1950"
                  max={new Date().getFullYear()}
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="Manufacture year"
                  required
                  className={errors.year ? "border-red-500" : ""}
                />
                {errors.year && (
                  <p className="text-sm text-red-600">{errors.year}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">
                  Capacity <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={handleChange}
                  placeholder="e.g. 4, 6, 8"
                  required
                  className={errors.capacity ? "border-red-500" : ""}
                />
                {errors.capacity && (
                  <p className="text-sm text-red-600">{errors.capacity}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="range">
                  Range <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="range"
                  name="range"
                  type="number"
                  value={formData.range}
                  onChange={handleChange}
                  placeholder="e.g. 200, 400, 600"
                  required
                  className={errors.range ? "border-red-500" : ""}
                />
                {errors.range && (
                  <p className="text-sm text-red-600">{errors.range}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="pricePerHour">
                  Price per Hour <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="pricePerHour"
                  name="pricePerHour"
                  type="number"
                  value={formData.pricePerHour}
                  onChange={handleChange}
                  placeholder="e.g. 1000, 1500, 2000"
                  required
                  className={errors.pricePerHour ? "border-red-500" : ""}
                />
                {errors.pricePerHour && (
                  <p className="text-sm text-red-600">{errors.pricePerHour}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">
                  Location <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }));
                      setCitySearch(e.target.value);
                      setCityDropdownOpen(true);
                    }}
                    onFocus={() => setCityDropdownOpen(true)}
                    autoComplete="off"
                    placeholder="City, Country"
                    required
                    className={errors.location ? "border-red-500" : ""}
                  />
                  {currentStep === 1 && cityDropdownOpen && citySearch && (
                    <ul className="absolute z-10 bg-white border rounded shadow max-h-60 overflow-y-auto w-full mt-1">
                      {cityOptions
                        .filter((opt) =>
                          opt.toLowerCase().includes(citySearch.toLowerCase())
                        )
                        .slice(0, 20)
                        .map((city, idx) => (
                          <li
                            key={city + idx}
                            className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                            onMouseDown={() => {
                              setFormData((prev) => ({
                                ...prev,
                                location: city,
                              }));
                              setCitySearch(city);
                              setCityDropdownOpen(false);
                            }}
                          >
                            {city}
                          </li>
                        ))}
                      {cityOptions.filter((opt) =>
                        opt.toLowerCase().includes(citySearch.toLowerCase())
                      ).length === 0 && (
                        <li className="px-4 py-2 text-gray-400">No results</li>
                      )}
                    </ul>
                  )}
                </div>
                {errors.location && (
                  <p className="text-sm text-red-600">{errors.location}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="availableFrom">
                  Available From <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="availableFrom"
                  name="availableFrom"
                  type="date"
                  value={formData.availableFrom}
                  onChange={handleChange}
                  required
                  className={errors.availableFrom ? "border-red-500" : ""}
                />
                {errors.availableFrom && (
                  <p className="text-sm text-red-600">{errors.availableFrom}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="availableTo">
                  Available To <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="availableTo"
                  name="availableTo"
                  type="date"
                  value={formData.availableTo}
                  onChange={handleChange}
                  required
                  className={errors.availableTo ? "border-red-500" : ""}
                />
                {errors.availableTo && (
                  <p className="text-sm text-red-600">{errors.availableTo}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter a description of the helicopter"
                  required
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && (
                  <p className="text-sm text-red-600">{errors.description}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Technical Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="registrationNumber">
                  Registration Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="registrationNumber"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  placeholder="e.g. N12345"
                  required
                  className={errors.registrationNumber ? "border-red-500" : ""}
                />
                {errors.registrationNumber && (
                  <p className="text-sm text-red-600">
                    {errors.registrationNumber}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="engineType">
                  Engine Type <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="engineType"
                  name="engineType"
                  value={formData.engineType}
                  onChange={handleChange}
                  placeholder="e.g. Turboprop, Helicopter"
                  required
                  className={errors.engineType ? "border-red-500" : ""}
                />
                {errors.engineType && (
                  <p className="text-sm text-red-600">{errors.engineType}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="engineCount">
                  Number of Engines <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="engineCount"
                  name="engineCount"
                  type="number"
                  value={formData.engineCount}
                  onChange={handleChange}
                  placeholder="e.g. 2, 3, 4"
                  required
                  className={errors.engineCount ? "border-red-500" : ""}
                />
                {errors.engineCount && (
                  <p className="text-sm text-red-600">{errors.engineCount}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxSpeed">
                  Maximum Speed <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="maxSpeed"
                  name="maxSpeed"
                  type="number"
                  value={formData.maxSpeed}
                  onChange={handleChange}
                  placeholder="e.g. 150, 200, 250"
                  required
                  className={errors.maxSpeed ? "border-red-500" : ""}
                />
                {errors.maxSpeed && (
                  <p className="text-sm text-red-600">{errors.maxSpeed}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cruisingSpeed">
                  Cruising Speed <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="cruisingSpeed"
                  name="cruisingSpeed"
                  type="number"
                  value={formData.cruisingSpeed}
                  onChange={handleChange}
                  placeholder="e.g. 120, 140, 160"
                  required
                  className={errors.cruisingSpeed ? "border-red-500" : ""}
                />
                {errors.cruisingSpeed && (
                  <p className="text-sm text-red-600">{errors.cruisingSpeed}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuelCapacity">
                  Fuel Capacity <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fuelCapacity"
                  name="fuelCapacity"
                  type="number"
                  value={formData.fuelCapacity}
                  onChange={handleChange}
                  placeholder="e.g. 1000, 1500, 2000"
                  required
                  className={errors.fuelCapacity ? "border-red-500" : ""}
                />
                {errors.fuelCapacity && (
                  <p className="text-sm text-red-600">{errors.fuelCapacity}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxAltitude">
                  Maximum Altitude <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="maxAltitude"
                  name="maxAltitude"
                  type="number"
                  value={formData.maxAltitude}
                  onChange={handleChange}
                  placeholder="e.g. 15000, 20000, 25000"
                  required
                  className={errors.maxAltitude ? "border-red-500" : ""}
                />
                {errors.maxAltitude && (
                  <p className="text-sm text-red-600">{errors.maxAltitude}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Safety & Certification
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="airworthinessCertificate">
                  Airworthiness Certificate{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="airworthinessCertificate"
                  name="airworthinessCertificate"
                  value={formData.airworthinessCertificate}
                  onChange={handleChange}
                  placeholder="Enter the airworthiness certificate"
                  required
                  className={
                    errors.airworthinessCertificate ? "border-red-500" : ""
                  }
                />
                {errors.airworthinessCertificate && (
                  <p className="text-sm text-red-600">
                    {errors.airworthinessCertificate}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastMaintenanceDate">
                  Last Maintenance Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastMaintenanceDate"
                  name="lastMaintenanceDate"
                  type="date"
                  value={formData.lastMaintenanceDate}
                  onChange={handleChange}
                  required
                  className={errors.lastMaintenanceDate ? "border-red-500" : ""}
                />
                {errors.lastMaintenanceDate && (
                  <p className="text-sm text-red-600">
                    {errors.lastMaintenanceDate}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="insuranceStatus">
                  Insurance Status <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="insuranceStatus"
                  name="insuranceStatus"
                  value={formData.insuranceStatus}
                  onChange={handleChange}
                  placeholder="Enter the insurance status"
                  required
                  className={errors.insuranceStatus ? "border-red-500" : ""}
                />
                {errors.insuranceStatus && (
                  <p className="text-sm text-red-600">
                    {errors.insuranceStatus}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="pilotQualifications">
                  Pilot Qualifications <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="pilotQualifications"
                  name="pilotQualifications"
                  value={formData.pilotQualifications}
                  onChange={handleChange}
                  placeholder="Enter the pilot qualifications"
                  required
                  className={errors.pilotQualifications ? "border-red-500" : ""}
                />
                {errors.pilotQualifications && (
                  <p className="text-sm text-red-600">
                    {errors.pilotQualifications}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>
                  Safety Features <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {SAFETY_FEATURES.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={`safety-${feature}`}
                        checked={formData.safetyFeatures.includes(feature)}
                        onCheckedChange={() =>
                          handleSafetyFeatureChange(feature)
                        }
                      />
                      <Label htmlFor={`safety-${feature}`}>{feature}</Label>
                    </div>
                  ))}
                </div>
                {errors.safetyFeatures && (
                  <p className="text-sm text-red-600">
                    {errors.safetyFeatures}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Pricing & Availability
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="depositAmount">
                  Deposit Amount <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="depositAmount"
                  name="depositAmount"
                  type="number"
                  value={formData.depositAmount}
                  onChange={handleChange}
                  placeholder="e.g. 10000, 15000, 20000"
                  required
                  className={errors.depositAmount ? "border-red-500" : ""}
                />
                {errors.depositAmount && (
                  <p className="text-sm text-red-600">{errors.depositAmount}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="minimumHours">
                  Minimum Hours <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="minimumHours"
                  name="minimumHours"
                  type="number"
                  value={formData.minimumHours}
                  onChange={handleChange}
                  placeholder="e.g. 100, 150, 200"
                  required
                  className={errors.minimumHours ? "border-red-500" : ""}
                />
                {errors.minimumHours && (
                  <p className="text-sm text-red-600">{errors.minimumHours}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cancellationPolicy">
                  Cancellation Policy <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="cancellationPolicy"
                  name="cancellationPolicy"
                  value={formData.cancellationPolicy}
                  onChange={handleChange}
                  placeholder="Enter the cancellation policy"
                  required
                  className={errors.cancellationPolicy ? "border-red-500" : ""}
                />
                {errors.cancellationPolicy && (
                  <p className="text-sm text-red-600">
                    {errors.cancellationPolicy}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="packageDeals">
                  Package Deals <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="packageDeals"
                  name="packageDeals"
                  value={formData.packageDeals}
                  onChange={handleChange}
                  placeholder="Enter the package deals"
                  required
                  className={errors.packageDeals ? "border-red-500" : ""}
                />
                {errors.packageDeals && (
                  <p className="text-sm text-red-600">{errors.packageDeals}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Images</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label>Amenities</Label>
                <div className="space-y-3">
                  {AMENITIES.map((amenity) => (
                    <div
                      key={amenity.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={amenity.id}
                        checked={
                          formData[amenity.id as keyof FormData] as boolean
                        }
                        onCheckedChange={() =>
                          handleCheckboxChange(amenity.id as keyof FormData)
                        }
                      />
                      <Label htmlFor={amenity.id}>{amenity.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <FileUpload
                  label="Images"
                  name="images"
                  onChange={handleImageUpload}
                  error={errors.images}
                  images={imageUrls}
                  uploading={uploading}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-[900px] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mx-auto bg-white shadow-lg">
        <CardHeader className="border-b bg-gray-900 text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <Plane className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-2xl font-bold text-white">
                Edit Helicopter Charter Listing
              </p>
              <p className="text-gray-300 mt-1">
                Update your helicopter listing information below
              </p>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`flex-1 relative ${
                    step.id !== steps.length &&
                    "after:content-[''] after:absolute after:top-1/2 after:w-full after:h-0.5 after:bg-gray-600"
                  }`}
                >
                  <div className="relative z-10 flex items-center justify-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                        step.id < currentStep
                          ? "bg-blue-600 border-blue-600 text-white"
                          : step.id === currentStep
                          ? "bg-blue-100 border-blue-600 text-blue-600"
                          : "bg-gray-700 border-gray-600 text-gray-400"
                      }`}
                    >
                      {step.id}
                    </div>
                    <span
                      className={`absolute mt-16 text-sm font-medium ${
                        step.id <= currentStep
                          ? "text-gray-300"
                          : "text-gray-500"
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardHeader>

        <form ref={formRef} onSubmit={handleSubmit} className="p-8">
          <div className="max-w-3xl mx-auto">
            {renderStepContent()}
            <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className="min-w-[120px]"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button
                type={currentStep === steps.length ? "submit" : "button"}
                onClick={
                  currentStep < steps.length ? handleNextStep : undefined
                }
                className="min-w-[120px] bg-blue-600 hover:bg-blue-700 text-white"
              >
                {currentStep === steps.length ? (
                  "Update Listing"
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default EditHCharterListing;
