import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import axiosInstance from "@/lib/api";
import { useParams } from "react-router-dom";
import charterVendorApi from "./api";

interface Fee {
  name: string;
  price: string;
}

interface FormData {
  jetName: string;
  aircraftType: string;
  manufacturer: string;
  yearOfManufacture: string;
  registrationNumber: string;
  seatingCapacity: string;
  cabinConfiguration: string;
  maximumRange: string;
  cruisingSpeed: string;
  baggageCapacity: string;
  homeBase: string;
  availableRoutes: string;
  operatingDays: string;
  noticeRequired: string;
  pricePerHour: string;
  minimumFlightTime: string;
  tripOption: "round-trip" | "one-way" | "both";
  additionalFees: Fee[];
  discounts: string;
  cabinFeatures: string[];
  inFlightMeals: boolean;
  flightAttendant: boolean;
  petsAllowed: boolean;
  smokingAllowed: boolean;
  exteriorImages: string[] | null;
  interiorImages: string[] | null;
  videoLink: string;
  luxuryCarService: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const aircraftTypes = [
  "Light Jet",
  "Midsize Jet",
  "Heavy Jet",
  "Ultra-Long Range Jet",
  "Regional Jet",
  "Turboprop",
];

const cabinFeaturesOptions = [
  "WiFi",
  "Entertainment System",
  "Reclining Seats",
  "Flat Beds",
  "Standing Cabin",
  "Private Suite",
  "Shower",
  "Conference Table",
  "Galley Kitchen",
  "Lavatory",
  "Pet Friendly",
  "Smoking Allowed",
  "Crew Rest Area",
  "Baggage Compartment",
  "Mood Lighting",
];

interface Step {
  id: number;
  title: string;
}

const steps: Step[] = [
  { id: 1, title: "Jet Details" },
  { id: 2, title: "Performance & Capacity" },
  { id: 3, title: "Availability" },
  { id: 4, title: "Pricing" },
  { id: 5, title: "Amenities" },
  { id: 6, title: "Images & Media" },
  { id: 7, title: "Extra Services" },
  { id: 8, title: "Review" },
];

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  min?: string | number;
  max?: string | number;
  step?: string | number;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  required,
  disabled,
  min,
  max,
  step,
}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className={`mt-1 block w-full rounded-md border ${
        error ? "border-red-500" : "border-gray-300"
      } shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed`}
      placeholder={placeholder}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
      required={required}
      disabled={disabled}
      min={min}
      max={max}
      step={step}
    />
    {error && (
      <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
        {error}
      </p>
    )}
  </div>
);

interface FileUploadProps {
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  images: string[] | null;
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
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} <span className="text-red-500">*</span>
    </label>
    <div
      className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
        error ? "border-red-500" : "border-gray-300"
      } border-dashed rounded-md`}
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
      <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
        {error}
      </p>
    )}
    {images && images.length > 0 && (
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

const EditCharterListing: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<FormData>({
    jetName: "",
    aircraftType: "",
    manufacturer: "",
    yearOfManufacture: "",
    registrationNumber: "",
    seatingCapacity: "",
    cabinConfiguration: "",
    maximumRange: "",
    cruisingSpeed: "",
    baggageCapacity: "",
    homeBase: "",
    availableRoutes: "",
    operatingDays: "",
    noticeRequired: "",
    pricePerHour: "",
    minimumFlightTime: "",
    tripOption: "round-trip",
    additionalFees: [],
    discounts: "",
    cabinFeatures: [],
    inFlightMeals: false,
    flightAttendant: false,
    petsAllowed: false,
    smokingAllowed: false,
    exteriorImages: null,
    interiorImages: null,
    videoLink: "",
    luxuryCarService: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);

  const getJetInfo = useCallback(async () => {
    if (!id) {
      toast.error("Invalid jet ID");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get(`/jets/charter/${id}`);
      if (response.data.success) {
        const data = response.data.data;
        setFormData({
          jetName: data.jetName || "",
          aircraftType: data.aircraftType || "",
          manufacturer: data.manufacturer || "",
          yearOfManufacture: data.yearOfManufacture || "",
          registrationNumber: data.registrationNumber || "",
          seatingCapacity: data.seatingCapacity || "",
          cabinConfiguration: data.cabinConfiguration || "",
          maximumRange: data.maximumRange || "",
          cruisingSpeed: data.cruisingSpeed || "",
          baggageCapacity: data.baggageCapacity || "",
          homeBase: data.homeBase || "",
          availableRoutes: data.availableRoutes || "",
          operatingDays: data.operatingDays || "",
          noticeRequired: data.noticeRequired || "",
          pricePerHour: data.pricePerHour || "",
          minimumFlightTime: data.minimumFlightTime || "",
          tripOption: data.tripOption
            ? (data.tripOption.toLowerCase().replace("_", "-") as
                | "round-trip"
                | "one-way"
                | "both")
            : "round-trip",
          additionalFees: data.additionalFees || [],
          discounts: data.discounts || "",
          cabinFeatures: data.cabinFeatures || [],
          inFlightMeals: data.inFlightMeals || false,
          flightAttendant: data.flightAttendant || false,
          petsAllowed: data.petsAllowed || false,
          smokingAllowed: data.smokingAllowed || false,
          exteriorImages: data.exteriorImages || null,
          interiorImages: data.interiorImages || null,
          videoLink: data.videoLink || "",
          luxuryCarService: data.luxuryCarService || false,
        });
      } else {
        throw new Error(response.data.message || "Failed to fetch jet details");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch jet details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    document.title = "Edit Jet Listing | Luxvana International";
    getJetInfo();
  }, [getJetInfo]);

  const validateStep = useCallback(
    (step: number): boolean => {
      const newErrors: FormErrors = {};
      switch (step) {
        case 1:
          if (!formData.jetName.trim())
            newErrors.jetName = "Jet name is required";
          if (!formData.aircraftType)
            newErrors.aircraftType = "Aircraft type is required";
          if (!formData.manufacturer.trim())
            newErrors.manufacturer = "Manufacturer is required";
          if (
            !formData.yearOfManufacture ||
            isNaN(Number(formData.yearOfManufacture)) ||
            Number(formData.yearOfManufacture) < 1900 ||
            Number(formData.yearOfManufacture) > new Date().getFullYear()
          ) {
            newErrors.yearOfManufacture =
              "Valid year (1900-current) is required";
          }
          if (!formData.registrationNumber.trim()) {
            newErrors.registrationNumber = "Registration number is required";
          }
          break;
        case 2:
          if (
            !formData.seatingCapacity ||
            isNaN(Number(formData.seatingCapacity)) ||
            Number(formData.seatingCapacity) < 1
          ) {
            newErrors.seatingCapacity =
              "Valid seating capacity (minimum 1) is required";
          }
          if (!formData.cabinConfiguration.trim()) {
            newErrors.cabinConfiguration = "Cabin configuration is required";
          }
          if (
            !formData.maximumRange ||
            isNaN(Number(formData.maximumRange)) ||
            Number(formData.maximumRange) < 0
          ) {
            newErrors.maximumRange =
              "Valid maximum range (non-negative) is required";
          }
          if (
            !formData.cruisingSpeed ||
            isNaN(Number(formData.cruisingSpeed)) ||
            Number(formData.cruisingSpeed) < 0
          ) {
            newErrors.cruisingSpeed =
              "Valid cruising speed (non-negative) is required";
          }
          if (!formData.baggageCapacity.trim()) {
            newErrors.baggageCapacity = "Baggage capacity is required";
          }
          break;
        case 3:
          if (!formData.homeBase.trim())
            newErrors.homeBase = "Home base is required";
          if (!formData.availableRoutes.trim())
            newErrors.availableRoutes = "Available routes are required";
          if (!formData.operatingDays.trim())
            newErrors.operatingDays = "Operating days are required";
          if (!formData.noticeRequired.trim())
            newErrors.noticeRequired = "Notice period is required";
          break;
        case 4:
          if (
            !formData.pricePerHour ||
            isNaN(Number(formData.pricePerHour)) ||
            Number(formData.pricePerHour) < 0
          ) {
            newErrors.pricePerHour =
              "Valid price per hour (non-negative) is required";
          }
          if (
            !formData.minimumFlightTime ||
            isNaN(Number(formData.minimumFlightTime)) ||
            Number(formData.minimumFlightTime) < 0
          ) {
            newErrors.minimumFlightTime =
              "Valid minimum flight time (non-negative) is required";
          }
          formData.additionalFees.forEach((fee, index) => {
            if (!fee.name.trim()) {
              newErrors[`additionalFees[${index}].name`] =
                "Fee name is required";
            }
            if (
              !fee.price ||
              isNaN(Number(fee.price)) ||
              Number(fee.price) < 0
            ) {
              newErrors[`additionalFees[${index}].price`] =
                "Valid fee price (non-negative) is required";
            }
          });
          break;
        case 6:
          if (
            !formData.exteriorImages ||
            formData.exteriorImages.length === 0
          ) {
            newErrors.exteriorImages =
              "At least one exterior image is required";
          }
          if (
            !formData.interiorImages ||
            formData.interiorImages.length === 0
          ) {
            newErrors.interiorImages =
              "At least one interior image is required";
          }
          if (
            formData.videoLink &&
            !/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(
              formData.videoLink
            )
          ) {
            newErrors.videoLink = "Valid YouTube URL is required";
          }
          break;
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [formData]
  );

  const uploadToCloudinary = useCallback(
    async (files: FileList): Promise<string[]> => {
      const uploadPreset =
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || "images";
      const cloudName =
        process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || "dnsgznjyo";
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

  const handleChange = useCallback(
    async (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
      index?: number
    ) => {
      console.log(index);
      const { name, value, type } = e.target;
      const checked = (e.target as HTMLInputElement).checked;
      const files = (e.target as HTMLInputElement).files;

      setFormData((prev) => {
        if (type === "checkbox" && name === "cabinFeatures") {
          return {
            ...prev,
            cabinFeatures: checked
              ? [...prev.cabinFeatures, value]
              : prev.cabinFeatures.filter((f) => f !== value),
          };
        } else if (type === "checkbox") {
          return { ...prev, [name]: checked };
        } else if (type === "file" && files) {
          uploadToCloudinary(files)
            .then((urls) => {
              setFormData((p) => ({ ...p, [name]: urls }));
              setErrors((p) => ({ ...p, [name]: "" }));
            })
            .catch(() => {});
          return prev;
        } else if (name.includes("additionalFees")) {
          const matches = name.match(/additionalFees\[(\d+)\]\.(.+)/);
          if (matches && matches.length >= 3) {
            const idx = parseInt(matches[1]);
            const field = matches[2];
            const updatedFees = [...prev.additionalFees];
            updatedFees[idx] = { ...updatedFees[idx], [field]: value };
            return { ...prev, additionalFees: updatedFees };
          }
        }
        return { ...prev, [name]: value };
      });

      setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    [uploadToCloudinary]
  );

  const addFee = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      additionalFees: [...prev.additionalFees, { name: "", price: "" }],
    }));
  }, []);

  const removeFee = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      additionalFees: prev.additionalFees.filter((_, i) => i !== index),
    }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      Object.keys(newErrors).forEach((key) => {
        if (key.startsWith(`additionalFees[${index}]`)) {
          delete newErrors[key];
        }
      });
      return newErrors;
    });
  }, []);

  const handleNextStep = useCallback(() => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentStep, validateStep]);

  const handlePrevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!id) {
        toast.error("Invalid jet ID");
        return;
      }
      if (validateStep(currentStep)) {
        if (currentStep === steps.length) {
          try {
            const payload = {
              ...formData,
              tripOption: formData.tripOption.toUpperCase().replace("-", "_"),
              exteriorImages: formData.exteriorImages || [],
              interiorImages: formData.interiorImages || [],
              additionalFees: formData.additionalFees || [],
              cabinFeatures: formData.cabinFeatures || [],
            };

            const response = await charterVendorApi.put(`/${id}`, payload);

            if (response.data.success) {
              toast.success("Jet listing updated successfully!");
              window.location.href = `/program/preview/${id}`;
            } else {
              throw new Error(
                response.data.message || "Failed to update jet listing"
              );
            }
          } catch (error) {
            toast.error(
              error instanceof Error
                ? error.message
                : "Failed to update jet listing. Please try again."
            );
          }
        } else {
          handleNextStep();
        }
      }
    },
    [currentStep, validateStep, handleNextStep, id]
  );

  const renderStepContent = useCallback(() => {
    if (loading) {
      return <div className="text-center text-gray-600">Loading...</div>;
    }
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              1. Jet Details
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Edit basic information about the aircraft.
            </p>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <InputField
                label="Jet Name / Model"
                name="jetName"
                value={formData.jetName}
                onChange={handleChange}
                error={errors.jetName}
                placeholder="Gulfstream G650"
                required
              />
              <div>
                <label
                  htmlFor="aircraftType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Aircraft Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="aircraftType"
                  name="aircraftType"
                  value={formData.aircraftType}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.aircraftType ? "border-red-500" : "border-gray-300"
                  } shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed`}
                  aria-invalid={!!errors.aircraftType}
                  aria-describedby={
                    errors.aircraftType ? "aircraftType-error" : undefined
                  }
                  required
                >
                  <option value="">Select type</option>
                  {aircraftTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.aircraftType && (
                  <p
                    id="aircraftType-error"
                    className="mt-1 text-sm text-red-600"
                  >
                    {errors.aircraftType}
                  </p>
                )}
              </div>
              <InputField
                label="Manufacturer"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
                error={errors.manufacturer}
                placeholder="Gulfstream, Bombardier, etc."
                required
              />
              <InputField
                label="Year of Manufacture"
                name="yearOfManufacture"
                type="number"
                value={formData.yearOfManufacture}
                onChange={handleChange}
                error={errors.yearOfManufacture}
                placeholder="2020"
                required
                min="1900"
                max={new Date().getFullYear()}
              />
              <div className="sm:col-span-2">
                <InputField
                  label="Registration Number"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  error={errors.registrationNumber}
                  placeholder="N12345"
                  required
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              2. Performance & Capacity
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Edit technical specifications and passenger capacity.
            </p>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <InputField
                label="Seating Capacity"
                name="seatingCapacity"
                type="number"
                value={formData.seatingCapacity}
                onChange={handleChange}
                error={errors.seatingCapacity}
                placeholder="8"
                required
                min="1"
              />
              <InputField
                label="Cabin Configuration"
                name="cabinConfiguration"
                value={formData.cabinConfiguration}
                onChange={handleChange}
                error={errors.cabinConfiguration}
                placeholder="Club + Divan, Beds available"
                required
              />
              <InputField
                label="Maximum Range (NM)"
                name="maximumRange"
                type="number"
                value={formData.maximumRange}
                onChange={handleChange}
                error={errors.maximumRange}
                placeholder="7500"
                required
                min="0"
              />
              <InputField
                label="Cruising Speed (knots)"
                name="cruisingSpeed"
                type="number"
                value={formData.cruisingSpeed}
                onChange={handleChange}
                error={errors.cruisingSpeed}
                placeholder="488"
                required
                min="0"
              />
              <div className="sm:col-span-2">
                <InputField
                  label="Baggage Capacity"
                  name="baggageCapacity"
                  value={formData.baggageCapacity}
                  onChange={handleChange}
                  error={errors.baggageCapacity}
                  placeholder="150 cubic feet"
                  required
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              3. Availability
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Edit when and where the jet is available for charter.
            </p>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <InputField
                label="Home Base / Origin Airport"
                name="homeBase"
                value={formData.homeBase}
                onChange={handleChange}
                error={errors.homeBase}
                placeholder="KJFK, Teterboro, etc."
                required
              />
              <InputField
                label="Available Routes / Regions"
                name="availableRoutes"
                value={formData.availableRoutes}
                onChange={handleChange}
                error={errors.availableRoutes}
                placeholder="North America, Europe, Transatlantic"
                required
              />
              <InputField
                label="Operating Days"
                name="operatingDays"
                value={formData.operatingDays}
                onChange={handleChange}
                error={errors.operatingDays}
                placeholder="Monday-Friday, Weekends"
                required
              />
              <InputField
                label="Notice Required Before Booking"
                name="noticeRequired"
                value={formData.noticeRequired}
                onChange={handleChange}
                error={errors.noticeRequired}
                placeholder="24 hours, 72 hours"
                required
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">4. Pricing</h2>
            <p className="mt-1 text-sm text-gray-500">
              Edit charter pricing information.
            </p>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="pricePerHour"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price per Hour (USD) <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="pricePerHour"
                    id="pricePerHour"
                    min="0"
                    step="100"
                    value={formData.pricePerHour}
                    onChange={handleChange}
                    className={`block w-full rounded-md border ${
                      errors.pricePerHour ? "border-red-500" : "border-gray-300"
                    } shadow-sm py-2 pl-7 pr-12 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed`}
                    placeholder="5000"
                    aria-invalid={!!errors.pricePerHour}
                    aria-describedby={
                      errors.pricePerHour ? "pricePerHour-error" : undefined
                    }
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">USD</span>
                  </div>
                </div>
                {errors.pricePerHour && (
                  <p
                    id="pricePerHour-error"
                    className="mt-1 text-sm text-red-600"
                  >
                    {errors.pricePerHour}
                  </p>
                )}
              </div>
              <InputField
                label="Minimum Flight Time (hours)"
                name="minimumFlightTime"
                type="number"
                value={formData.minimumFlightTime}
                onChange={handleChange}
                error={errors.minimumFlightTime}
                placeholder="2"
                required
                min="0"
                step="0.5"
              />
              <div>
                <label
                  htmlFor="tripOption"
                  className="block text-sm font-medium text-gray-700"
                >
                  Trip Option <span className="text-red-500">*</span>
                </label>
                <select
                  id="tripOption"
                  name="tripOption"
                  value={formData.tripOption}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="round-trip">Round-trip</option>
                  <option value="one-way">One-way</option>
                  <option value="both">Both options available</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <InputField
                  label="Discounts for Multi-Day Charters (optional)"
                  name="discounts"
                  value={formData.discounts}
                  onChange={handleChange}
                  placeholder="e.g., 10% off for 3+ days"
                />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              5. Amenities
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Edit onboard features and services.
            </p>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Cabin Features
                </label>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {cabinFeaturesOptions.map((feature) => (
                    <div key={feature} className="flex items-center">
                      <input
                        id={`feature-${feature}`}
                        name="cabinFeatures"
                        type="checkbox"
                        value={feature}
                        checked={formData.cabinFeatures.includes(feature)}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={uploading}
                      />
                      <label
                        htmlFor={`feature-${feature}`}
                        className="ml-2 block text-sm text-gray-700"
                      >
                        {feature}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {[
                {
                  name: "inFlightMeals",
                  label: "In-flight Meals / Catering Provided",
                },
                { name: "flightAttendant", label: "Flight Attendant Included" },
                { name: "petsAllowed", label: "Pets Allowed" },
                { name: "smokingAllowed", label: "Smoking Allowed" },
              ].map(({ name, label }) => (
                <div key={name}>
                  <label
                    htmlFor={name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {label}
                  </label>
                  <div className="mt-1">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name={name}
                        checked={formData[name as keyof FormData] as boolean}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={uploading}
                      />
                      <span className="ml-2 text-sm text-gray-700">Yes</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              6. Images & Media
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Edit visual assets to showcase your jet.
            </p>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <FileUpload
                label="Jet Exterior Images"
                name="exteriorImages"
                onChange={handleChange}
                error={errors.exteriorImages}
                images={formData.exteriorImages}
                uploading={uploading}
              />
              <FileUpload
                label="Jet Interior Images"
                name="interiorImages"
                onChange={handleChange}
                error={errors.interiorImages}
                images={formData.interiorImages}
                uploading={uploading}
              />
              <div className="sm:col-span-2">
                <InputField
                  label="Optional Video Tour (YouTube Link)"
                  name="videoLink"
                  type="url"
                  value={formData.videoLink}
                  onChange={handleChange}
                  error={errors.videoLink}
                  placeholder="https://www.youtube.com/watch?v=..."
                  disabled={uploading}
                />
              </div>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              7. Extra Services
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Edit additional luxury services.
            </p>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="luxuryCarService"
                  className="block text-sm font-medium text-gray-700"
                >
                  Luxury Car Pickup/Drop-off
                </label>
                <div className="mt-1">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="luxuryCarService"
                      checked={formData.luxuryCarService}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={uploading}
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Available (specify make/model in notes)
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      case 8:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">8. Review</h2>
            <p className="mt-1 text-sm text-gray-500">
              Review all details before updating.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Jet Details
                </h3>
                <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Jet Name
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.jetName || "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Aircraft Type
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.aircraftType || "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Manufacturer
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.manufacturer || "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Year of Manufacture
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.yearOfManufacture || "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Registration Number
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.registrationNumber || "Not provided"}
                    </dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Performance & Capacity
                </h3>
                <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Seating Capacity
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.seatingCapacity || "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Cabin Configuration
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.cabinConfiguration || "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Maximum Range
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.maximumRange || "Not provided"} NM
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Cruising Speed
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.cruisingSpeed || "Not provided"} knots
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Baggage Capacity
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.baggageCapacity || "Not provided"}
                    </dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Availability
                </h3>
                <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Home Base
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.homeBase || "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Available Routes
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.availableRoutes || "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Operating Days
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.operatingDays || "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Notice Required
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.noticeRequired || "Not provided"}
                    </dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Pricing</h3>
                <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Price per Hour
                    </dt>
                    <dd className="text-sm text-gray-900">
                      ${formData.pricePerHour || "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Minimum Flight Time
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.minimumFlightTime || "Not provided"} hours
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Trip Option
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.tripOption || "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Discounts
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.discounts || "None"}
                    </dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Amenities</h3>
                <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Cabin Features
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.cabinFeatures.length > 0
                        ? formData.cabinFeatures.join(", ")
                        : "None"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      In-flight Meals
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.inFlightMeals ? "Yes" : "No"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Flight Attendant
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.flightAttendant ? "Yes" : "No"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Pets Allowed
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.petsAllowed ? "Yes" : "No"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Smoking Allowed
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.smokingAllowed ? "Yes" : "No"}
                    </dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Images & Media
                </h3>
                <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Exterior Images
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.exteriorImages?.length || "None"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Interior Images
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.interiorImages?.length || "None"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Video Link
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.videoLink || "None"}
                    </dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Extra Services
                </h3>
                <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Luxury Car Service
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.luxuryCarService ? "Yes" : "No"}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  }, [
    currentStep,
    formData,
    errors,
    handleChange,
    uploading,
    addFee,
    removeFee,
    loading,
  ]);

  return (
    <div className="min-h-screen w-[900px] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Edit Charter Jet Listing
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Update your private jet listing for charter services
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex-1 text-center text-sm font-medium ${
                  step.id <= currentStep ? "text-gray-800" : "text-gray-400"
                }`}
              >
                {step.title}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-gray-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
          {renderStepContent()}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={handlePrevStep}
              disabled={currentStep === 1 || uploading || loading}
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              type={currentStep === steps.length ? "submit" : "button"}
              onClick={currentStep < steps.length ? handleNextStep : undefined}
              disabled={uploading || loading}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading || loading
                ? "Processing..."
                : currentStep === steps.length
                ? "Update Listing"
                : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCharterListing;
