import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import hApi from "./HApi";
import { useSelector } from "react-redux";

interface FormData {
  helicopterName: string;
  helicopterType: string;
  manufacturer: string;
  yearOfManufacture: string;
  registrationNumber: string;
  serialNumber: string;
  seatingCapacity: string;
  maximumRange: string;
  cruisingSpeed: string;
  baggageCapacity: string;
  condition: string;
  totalFlightHours: string;
  maintenanceHistory: string;
  lastInspection: string;
  salePrice: string;
  discounts: string;
  cabinFeatures: string[];
  avionics: string;
  emergencyEquipment: boolean;
  cargoHook: boolean;
  exteriorImages: string[] | null;
  interiorImages: string[] | null;
  videoLink: string;
  additionalEquipment: string;
  vendorId: string;
}

interface FormErrors {
  [key: string]: string;
}

const helicopterTypes = [
  "Light Single-Engine",
  "Light Twin-Engine",
  "Medium Twin-Engine",
  "Heavy Helicopter",
  "Turbine Helicopter",
  "Piston Helicopter",
];

const cabinFeaturesOptions = [
  "Air Conditioning",
  "Heated Seats",
  "Noise Reduction",
  "Leather Seats",
  "Sliding Doors",
  "Cargo Hook",
  "Skid Landing Gear",
  "Retractable Landing Gear",
  "Emergency Floats",
  "Night Vision Compatibility",
  "Autopilot",
  "Glass Cockpit",
  "VIP Configuration",
  "Medevac Capability",
  "Searchlight",
];

interface Step {
  id: number;
  title: string;
}

const steps: Step[] = [
  { id: 1, title: "Helicopter Details" },
  { id: 2, title: "Performance & Capacity" },
  { id: 3, title: "Condition & History" },
  { id: 4, title: "Pricing" },
  { id: 5, title: "Features" },
  { id: 6, title: "Images & Media" },
  { id: 7, title: "Extra Equipment" },
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

const HelicopterSaleForm: React.FC = () => {
  const vendor = useSelector((state: any) => state.vendor.vendor);
  const [formData, setFormData] = useState<FormData>({
    helicopterName: "",
    helicopterType: "",
    manufacturer: "",
    yearOfManufacture: "",
    registrationNumber: "",
    serialNumber: "",
    seatingCapacity: "",
    maximumRange: "",
    cruisingSpeed: "",
    baggageCapacity: "",
    condition: "",
    totalFlightHours: "",
    maintenanceHistory: "",
    lastInspection: "",
    salePrice: "",
    discounts: "",
    cabinFeatures: [],
    avionics: "",
    emergencyEquipment: false,
    cargoHook: false,
    exteriorImages: null,
    interiorImages: null,
    videoLink: "",
    additionalEquipment: "",
    vendorId: vendor.id,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [uploading, setUploading] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    document.title = "Add New Helicopter | Luxvana International";
  }, []);

  const validateStep = useCallback(
    (step: number): boolean => {
      const newErrors: FormErrors = {};
      switch (step) {
        case 1:
          if (!formData.helicopterName.trim())
            newErrors.helicopterName = "Helicopter name is required";
          if (!formData.helicopterType)
            newErrors.helicopterType = "Helicopter type is required";
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
          if (!formData.serialNumber.trim()) {
            newErrors.serialNumber = "Serial number is required";
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
          if (!formData.condition.trim())
            newErrors.condition = "Condition is required";
          if (
            !formData.totalFlightHours ||
            isNaN(Number(formData.totalFlightHours)) ||
            Number(formData.totalFlightHours) < 0
          ) {
            newErrors.totalFlightHours =
              "Valid total flight hours (non-negative) is required";
          }
          if (!formData.maintenanceHistory.trim())
            newErrors.maintenanceHistory = "Maintenance history is required";
          if (!formData.lastInspection.trim())
            newErrors.lastInspection = "Last inspection date is required";
          break;
        case 4:
          if (
            !formData.salePrice ||
            isNaN(Number(formData.salePrice)) ||
            Number(formData.salePrice) < 0
          ) {
            newErrors.salePrice = "Valid sale price (non-negative) is required";
          }
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
      const uploadPreset = "images"; // Replace with your Cloudinary upload preset
      const cloudName = "dnsgznjyo"; // Replace with your Cloudinary cloud name
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
      >
    ) => {
      const { name, value, type } = e.target;
      const checked = (e.target as HTMLInputElement).checked;
      const files = (e.target as HTMLInputElement).files;

      setFormData((prev) => {
        if (type === "checkbox" && name === "cabinFeatures") {
          const updatedFeatures = checked
            ? [...prev.cabinFeatures, value]
            : prev.cabinFeatures.filter((f) => f !== value);
          return { ...prev, cabinFeatures: updatedFeatures };
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
        }
        return { ...prev, [name]: value };
      });

      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors, uploadToCloudinary]
  );

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
      if (validateStep(currentStep)) {
        if (currentStep === steps.length) {
          try {
            const payload = {
              ...formData,
              exteriorImages: formData.exteriorImages || [],
              interiorImages: formData.interiorImages || [],
            };

            console.log("Sending payload:", payload);

            const response = await hApi.post("/helicopters/new", payload);

            if (response.data.success) {
              toast.success("Helicopter listing created successfully!");
              window.location.href =
                "/h-broker/preview/" + response.data.helicopter.id;
              setFormData({
                helicopterName: "",
                helicopterType: "",
                manufacturer: "",
                yearOfManufacture: "",
                registrationNumber: "",
                serialNumber: "",
                seatingCapacity: "",
                maximumRange: "",
                cruisingSpeed: "",
                baggageCapacity: "",
                condition: "",
                totalFlightHours: "",
                maintenanceHistory: "",
                lastInspection: "",
                salePrice: "",
                discounts: "",
                cabinFeatures: [],
                avionics: "",
                emergencyEquipment: false,
                cargoHook: false,
                exteriorImages: null,
                interiorImages: null,
                videoLink: "",
                additionalEquipment: "",
                vendorId: vendor.id,
              });
              setCurrentStep(1);
            } else {
              throw new Error(
                response.data.message || "Failed to create helicopter listing"
              );
            }
          } catch (error) {
            console.error("Submission error:", error);
            toast.error(
              error instanceof Error
                ? error.message
                : "Failed to create helicopter listing. Please try again."
            );
          }
        } else {
          handleNextStep();
        }
      }
    },
    [currentStep, validateStep, handleNextStep, formData, vendor.id]
  );

  const renderStepContent = useCallback(() => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              1. Helicopter Details
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Provide basic information about the helicopter.
            </p>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <InputField
                label="Helicopter Name / Model"
                name="helicopterName"
                value={formData.helicopterName}
                onChange={handleChange}
                error={errors.helicopterName}
                placeholder="Bell 407"
                required
              />
              <div>
                <label
                  htmlFor="helicopterType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Helicopter Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="helicopterType"
                  name="helicopterType"
                  value={formData.helicopterType}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.helicopterType ? "border-red-500" : "border-gray-300"
                  } shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed`}
                  aria-invalid={!!errors.helicopterType}
                  aria-describedby={
                    errors.helicopterType ? "helicopterType-error" : undefined
                  }
                  required
                >
                  <option value="">Select type</option>
                  {helicopterTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.helicopterType && (
                  <p
                    id="helicopterType-error"
                    className="mt-1 text-sm text-red-600"
                  >
                    {errors.helicopterType}
                  </p>
                )}
              </div>
              <InputField
                label="Manufacturer"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
                error={errors.manufacturer}
                placeholder="Bell, Airbus, Sikorsky, etc."
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
              <InputField
                label="Registration Number"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                error={errors.registrationNumber}
                placeholder="N12345"
                required
              />
              <InputField
                label="Serial Number"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                error={errors.serialNumber}
                placeholder="SN-12345"
                required
              />
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
              Specify technical specifications and passenger capacity.
            </p>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <InputField
                label="Seating Capacity"
                name="seatingCapacity"
                type="number"
                value={formData.seatingCapacity}
                onChange={handleChange}
                error={errors.seatingCapacity}
                placeholder="6"
                required
                min="1"
              />
              <InputField
                label="Maximum Range (NM)"
                name="maximumRange"
                type="number"
                value={formData.maximumRange}
                onChange={handleChange}
                error={errors.maximumRange}
                placeholder="350"
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
                placeholder="130"
                required
                min="0"
              />
              <InputField
                label="Baggage Capacity"
                name="baggageCapacity"
                value={formData.baggageCapacity}
                onChange={handleChange}
                error={errors.baggageCapacity}
                placeholder="40 cubic feet"
                required
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              3. Condition & History
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Provide details about the helicopter's condition and history.
            </p>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <InputField
                label="Condition"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                error={errors.condition}
                placeholder="New, Used, Refurbished"
                required
              />
              <InputField
                label="Total Flight Hours"
                name="totalFlightHours"
                type="number"
                value={formData.totalFlightHours}
                onChange={handleChange}
                error={errors.totalFlightHours}
                placeholder="1500"
                required
                min="0"
              />
              <InputField
                label="Maintenance History"
                name="maintenanceHistory"
                value={formData.maintenanceHistory}
                onChange={handleChange}
                error={errors.maintenanceHistory}
                placeholder="Full logs available, major overhaul in 2023"
                required
              />
              <InputField
                label="Last Inspection Date"
                name="lastInspection"
                value={formData.lastInspection}
                onChange={handleChange}
                error={errors.lastInspection}
                placeholder="MM/DD/YYYY"
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
              Provide pricing information for the helicopter sale.
            </p>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="salePrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sale Price (USD) <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="salePrice"
                    id="salePrice"
                    min="0"
                    step="1000"
                    value={formData.salePrice}
                    onChange={handleChange}
                    className={`block w-full rounded-md border ${
                      errors.salePrice ? "border-red-500" : "border-gray-300"
                    } shadow-sm py-2 pl-7 pr-12 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed`}
                    placeholder="500000"
                    aria-invalid={!!errors.salePrice}
                    aria-describedby={
                      errors.salePrice ? "salePrice-error" : undefined
                    }
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">USD</span>
                  </div>
                </div>
                {errors.salePrice && (
                  <p id="salePrice-error" className="mt-1 text-sm text-red-600">
                    {errors.salePrice}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <InputField
                  label="Discounts (optional)"
                  name="discounts"
                  value={formData.discounts}
                  onChange={handleChange}
                  placeholder="e.g., 5% off for immediate purchase"
                />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              5. Features
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Specify onboard features and equipment.
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
              <div className="sm:col-span-2">
                <InputField
                  label="Avionics"
                  name="avionics"
                  value={formData.avionics}
                  onChange={handleChange}
                  error={errors.avionics}
                  placeholder="Garmin G1000, EFIS, etc."
                />
              </div>
              {[
                {
                  name: "emergencyEquipment",
                  label: "Emergency Equipment Included",
                },
                { name: "cargoHook", label: "Cargo Hook Installed" },
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
              Upload visual assets to showcase your helicopter.
            </p>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <FileUpload
                label="Helicopter Exterior Images"
                name="exteriorImages"
                onChange={handleChange}
                error={errors.exteriorImages}
                images={formData.exteriorImages}
                uploading={uploading}
              />
              <FileUpload
                label="Helicopter Interior Images"
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
              7. Extra Equipment
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Specify additional equipment included with the sale.
            </p>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <InputField
                  label="Additional Equipment"
                  name="additionalEquipment"
                  value={formData.additionalEquipment}
                  onChange={handleChange}
                  placeholder="e.g., spare blades, ground handling wheels"
                  disabled={uploading}
                />
              </div>
            </div>
          </div>
        );
      case 8:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">8. Review</h2>
            <p className="mt-1 text-sm text-gray-500">
              Review all details before submitting.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Helicopter Details
                </h3>
                <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Helicopter Name
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.helicopterName || "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Helicopter Type
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.helicopterType || "Not provided"}
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
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Serial Number
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.serialNumber || "Not provided"}
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
                  Condition & History
                </h3>
                <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Condition
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.condition || "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Total Flight Hours
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.totalFlightHours || "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Maintenance History
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.maintenanceHistory || "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Last Inspection
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.lastInspection || "Not provided"}
                    </dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Pricing</h3>
                <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Sale Price
                    </dt>
                    <dd className="text-sm text-gray-900">
                      ${formData.salePrice || "Not provided"}
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
                <h3 className="text-lg font-medium text-gray-900">Features</h3>
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
                      Avionics
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.avionics || "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Emergency Equipment
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.emergencyEquipment ? "Yes" : "No"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Cargo Hook
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.cargoHook ? "Yes" : "No"}
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
                  Extra Equipment
                </h3>
                <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Additional Equipment
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.additionalEquipment || "None"}
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
  }, [currentStep, formData, errors, handleChange, uploading]);

  return (
    <div className="min-h-screen w-[900px] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Helicopter Sale Listing
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            List your helicopter for sale
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
              disabled={currentStep === 1 || uploading}
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              type={currentStep === steps.length ? "submit" : "button"}
              onClick={currentStep < steps.length ? handleNextStep : undefined}
              disabled={uploading}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading
                ? "Processing..."
                : currentStep === steps.length
                ? "Submit Listing"
                : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HelicopterSaleForm;
