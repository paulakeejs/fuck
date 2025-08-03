import { useState, useEffect, useCallback, useRef } from "react";
import { Plane, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import hApi from "../HApi";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { fetchWorldCities } from "@/lib/worldCities";

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
  transactionSignature: string;
  transactionLink: string;
}

interface FormErrors extends Partial<Record<keyof FormData, string>> {
  payment?: string;
}

const steps = [
  { id: 1, name: "Basic Info" },
  { id: 2, name: "Technical Details" },
  { id: 3, name: "Safety & Cert" },
  { id: 4, name: "Pricing & Availability" },
  { id: 5, name: "Images & Payment" },
] as const;

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

export function HelicopterCharterListingForm() {
  const vendor = useSelector((state: any) => state.vendor.vendor);
  const formRef = useRef<HTMLFormElement>(null);

  const [currentStep, setCurrentStep] = useState(1);
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
    transactionSignature: "",
    transactionLink: "",
  });

  useEffect(() => {
    document.title = "List Helicopter for Charter | Luxvana International";
  }, []);

  useEffect(() => {
    fetchWorldCities().then(setCityOptions);
  }, []);

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
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentStep, formData]);

  const handlePrevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(currentStep)) {
      return;
    }

    if (!vendor?.id) {
      toast.error("Please log in to submit a listing");
      return;
    }

    try {
      // Parse numeric values and map fields to match backend expectations
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

      console.log("Submitting data:", submissionData);

      const response = await hApi.post(
        "/helicopters/charter/new",
        submissionData
      );

      if (response.data.success) {
        toast.success("Helicopter charter listing created successfully!");
        window.location.href = "/h-broker/charter/listings";
      } else {
        throw new Error(response.data.message || "Failed to create listing");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Error creating listing. Please try again."
      );
    }
  };

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
                  Passenger Capacity <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  min="1"
                  value={formData.capacity}
                  onChange={handleChange}
                  placeholder="Number of passengers"
                  required
                  className={errors.capacity ? "border-red-500" : ""}
                />
                {errors.capacity && (
                  <p className="text-sm text-red-600">{errors.capacity}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="range">
                  Range (nautical miles) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="range"
                  name="range"
                  type="number"
                  value={formData.range}
                  onChange={handleChange}
                  placeholder="Maximum range"
                  required
                  className={errors.range ? "border-red-500" : ""}
                />
                {errors.range && (
                  <p className="text-sm text-red-600">{errors.range}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="pricePerHour">
                  Price Per Hour (USD) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="pricePerHour"
                  name="pricePerHour"
                  type="number"
                  min="0"
                  value={formData.pricePerHour}
                  onChange={handleChange}
                  placeholder="e.g. 2500"
                  required
                  className={errors.pricePerHour ? "border-red-500" : ""}
                />
                {errors.pricePerHour && (
                  <p className="text-sm text-red-600">{errors.pricePerHour}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">
                  Base Location <span className="text-red-500">*</span>
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
                  {cityDropdownOpen && citySearch && (
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

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your helicopter and services"
                  rows={4}
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
                <Select
                  value={formData.engineType}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, engineType: value }))
                  }
                >
                  <SelectTrigger
                    className={errors.engineType ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select engine type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="turbine">Turbine</SelectItem>
                    <SelectItem value="piston">Piston</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
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
                  min="1"
                  max="4"
                  value={formData.engineCount}
                  onChange={handleChange}
                  placeholder="e.g. 1 or 2"
                  required
                  className={errors.engineCount ? "border-red-500" : ""}
                />
                {errors.engineCount && (
                  <p className="text-sm text-red-600">{errors.engineCount}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxSpeed">
                  Maximum Speed (knots) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="maxSpeed"
                  name="maxSpeed"
                  type="number"
                  min="0"
                  value={formData.maxSpeed}
                  onChange={handleChange}
                  placeholder="e.g. 150"
                  required
                  className={errors.maxSpeed ? "border-red-500" : ""}
                />
                {errors.maxSpeed && (
                  <p className="text-sm text-red-600">{errors.maxSpeed}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cruisingSpeed">
                  Cruising Speed (knots) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="cruisingSpeed"
                  name="cruisingSpeed"
                  type="number"
                  min="0"
                  value={formData.cruisingSpeed}
                  onChange={handleChange}
                  placeholder="e.g. 120"
                  required
                  className={errors.cruisingSpeed ? "border-red-500" : ""}
                />
                {errors.cruisingSpeed && (
                  <p className="text-sm text-red-600">{errors.cruisingSpeed}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuelCapacity">
                  Fuel Capacity (gallons){" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fuelCapacity"
                  name="fuelCapacity"
                  type="number"
                  min="0"
                  value={formData.fuelCapacity}
                  onChange={handleChange}
                  placeholder="Total fuel capacity"
                  required
                  className={errors.fuelCapacity ? "border-red-500" : ""}
                />
                {errors.fuelCapacity && (
                  <p className="text-sm text-red-600">{errors.fuelCapacity}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxAltitude">
                  Maximum Altitude (feet){" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="maxAltitude"
                  name="maxAltitude"
                  type="number"
                  min="0"
                  value={formData.maxAltitude}
                  onChange={handleChange}
                  placeholder="e.g. 15000"
                  required
                  className={errors.maxAltitude ? "border-red-500" : ""}
                />
                {errors.maxAltitude && (
                  <p className="text-sm text-red-600">{errors.maxAltitude}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="flightHours">Total Flight Hours</Label>
                <Input
                  id="flightHours"
                  name="flightHours"
                  type="number"
                  min="0"
                  value={formData.flightHours}
                  onChange={handleChange}
                  placeholder="Total hours flown"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastOverhaul">Last Major Overhaul</Label>
                <Input
                  id="lastOverhaul"
                  name="lastOverhaul"
                  type="date"
                  value={formData.lastOverhaul}
                  onChange={handleChange}
                />
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
                  Airworthiness Certificate Number{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="airworthinessCertificate"
                  name="airworthinessCertificate"
                  value={formData.airworthinessCertificate}
                  onChange={handleChange}
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
                <Select
                  value={formData.insuranceStatus}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, insuranceStatus: value }))
                  }
                >
                  <SelectTrigger
                    className={errors.insuranceStatus ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select insurance status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending Renewal</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="not_insured">Not Insured</SelectItem>
                  </SelectContent>
                </Select>
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
                <Select
                  value={formData.pilotQualifications}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      pilotQualifications: value,
                    }))
                  }
                >
                  <SelectTrigger
                    className={
                      errors.pilotQualifications ? "border-red-500" : ""
                    }
                  >
                    <SelectValue placeholder="Select qualifications" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="atp">Airline Transport Pilot</SelectItem>
                    <SelectItem value="cfi">
                      Certified Flight Instructor
                    </SelectItem>
                    <SelectItem value="military">Military Trained</SelectItem>
                  </SelectContent>
                </Select>
                {errors.pilotQualifications && (
                  <p className="text-sm text-red-600">
                    {errors.pilotQualifications}
                  </p>
                )}
              </div>

              <div className="col-span-2 space-y-2">
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
                  Required Deposit (%) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="depositAmount"
                  name="depositAmount"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.depositAmount}
                  onChange={handleChange}
                  placeholder="e.g. 25"
                  required
                  className={errors.depositAmount ? "border-red-500" : ""}
                />
                {errors.depositAmount && (
                  <p className="text-sm text-red-600">{errors.depositAmount}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="minimumHours">
                  Minimum Charter Hours <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="minimumHours"
                  name="minimumHours"
                  type="number"
                  min="1"
                  value={formData.minimumHours}
                  onChange={handleChange}
                  placeholder="e.g. 2"
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
                <Select
                  value={formData.cancellationPolicy}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      cancellationPolicy: value,
                    }))
                  }
                >
                  <SelectTrigger
                    className={
                      errors.cancellationPolicy ? "border-red-500" : ""
                    }
                  >
                    <SelectValue placeholder="Select policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flexible">
                      Flexible (24h notice)
                    </SelectItem>
                    <SelectItem value="moderate">
                      Moderate (72h notice)
                    </SelectItem>
                    <SelectItem value="strict">
                      Strict (7 days notice)
                    </SelectItem>
                    <SelectItem value="non_refundable">
                      Non-refundable
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.cancellationPolicy && (
                  <p className="text-sm text-red-600">
                    {errors.cancellationPolicy}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="packageDeals">Package Deals</Label>
                <Textarea
                  id="packageDeals"
                  name="packageDeals"
                  value={formData.packageDeals}
                  onChange={handleChange}
                  placeholder="Describe any package deals (e.g., 10 hours for price of 8)"
                  rows={4}
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Final Steps
            </h2>
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
                List Your Helicopter for Charter
              </p>
              <p className="text-gray-300 mt-1">
                Complete the form below to list your helicopter on our platform
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
                      {step.id < currentStep ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        step.id
                      )}
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
                  "Submit Listing"
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

export default HelicopterCharterListingForm;
