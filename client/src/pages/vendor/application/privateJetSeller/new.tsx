import { useState, ChangeEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import vendorApi from "../../functions/vendorApi";
import RichTextEditor from "../../../../components/RichTextEditor";
import {
  JetManufacturers,
  AircraftTypes,
  EngineTypes,
  Certifications,
} from "./constants";
import { FiUpload, FiTrash2, FiCheckCircle } from "react-icons/fi";
import {
  FaPlane,
  FaImage,
  FaMoneyBillWave,
  FaRegIdCard,
  FaInfoCircle,
  FaCogs,
  FaCertificate,
  FaHistory,
} from "react-icons/fa";

// Cloudinary widget script
declare global {
  interface Window {
    cloudinary: any;
  }
}

type JetFormData = {
  manufacturer: string;
  otherManufacturer?: string;
  model: string;
  year: number | string;
  serialNumber: string;
  totalTimeSinceNew: number | string;
  totalLandings: number | string;
  engineMakeModel: string;
  engineHours: number | string;
  avionicsSuite: string;
  interiorConfig: string;
  interiorImageUrls: string[];
  exteriorImageUrls: string[];
  layoutImageUrl: string;
  price: string;
  currentLocation: string;
  registrationNumber: string;
  contactDetails: string;
  description: string;
  previousOwners?: number | string;
  maintenanceProgram?: string;
  airframeEngineStatus?: string;
  refurbishmentDate?: string;
  wifiConnectivity?: string;
  lavatoryGalleyDetails?: string;
  cabinAmenities?: string;
  range?: number | string;
  cruiseSpeed?: number | string;
  maxAltitude?: number | string;
  runwayLength?: number | string;
  emptyWeight?: number | string;
  maxTakeoffWeight?: number | string;
  deliveryAvailability?: string;
  aircraftType: string;
  seatingCapacity: number | string;
  cabinHeight: number | string;
  cabinWidth: number | string;
  cabinLength: number | string;
  baggageCapacity: number | string;
  numberOfEngines: number | string;
  engineType: string;
  engineThrust: number | string;
  certification: string;
  noiseCompliance: string;
  lastInspectionDate: string;
  nextInspectionDue: string;
  maintenanceStatus: string;
  paymentTxSignature?: string;
  transactionLink?: string;
  vendorId: string;
  fuelCapacity?: number | string;
  fuelConsumption?: number | string;
  serviceCeiling?: number | string;
  takeoffDistance?: number | string;
  landingDistance?: number | string;
  warrantyRemaining?: string;
  avionicsUpdates?: string;
  interiorDesigner?: string;
  exteriorPaintScheme?: string;
  recentUpgrades?: string;
  operationalRestrictions?: string;
};

export default function JetListingForm() {
  const vendorId = useSelector((state: any) => state.vendor.vendor.id);
  // Remove Solana wallet and payment-related hooks and state
  // const { connection } = useConnection();
  // const { publicKey, sendTransaction, connected } = useWallet();

  const [formData, setFormData] = useState<JetFormData>({
    manufacturer: "",
    model: "",
    year: "",
    serialNumber: "",
    totalTimeSinceNew: "",
    totalLandings: "",
    engineMakeModel: "",
    engineHours: "",
    avionicsSuite: "",
    interiorConfig: "",
    interiorImageUrls: [],
    exteriorImageUrls: [],
    layoutImageUrl: "",
    price: "",
    currentLocation: "",
    registrationNumber: "",
    contactDetails: "",
    description: "",
    previousOwners: "",
    maintenanceProgram: "",
    airframeEngineStatus: "",
    refurbishmentDate: "",
    wifiConnectivity: "",
    lavatoryGalleyDetails: "",
    cabinAmenities: "",
    range: "",
    cruiseSpeed: "",
    maxAltitude: "",
    runwayLength: "",
    emptyWeight: "",
    maxTakeoffWeight: "",
    deliveryAvailability: "",
    aircraftType: "",
    seatingCapacity: "",
    cabinHeight: "",
    cabinWidth: "",
    cabinLength: "",
    baggageCapacity: "",
    numberOfEngines: "",
    engineType: "",
    engineThrust: "",
    certification: "",
    noiseCompliance: "",
    lastInspectionDate: "",
    nextInspectionDue: "",
    maintenanceStatus: "",
    paymentTxSignature: "",
    transactionLink: "",
    vendorId: "",
    fuelCapacity: "",
    fuelConsumption: "",
    serviceCeiling: "",
    takeoffDistance: "",
    landingDistance: "",
    warrantyRemaining: "",
    avionicsUpdates: "",
    interiorDesigner: "",
    exteriorPaintScheme: "",
    recentUpgrades: "",
    operationalRestrictions: "",
  });

  const [interiorPreviews, setInteriorPreviews] = useState<string[]>([]);
  const [exteriorPreviews, setExteriorPreviews] = useState<string[]>([]);
  const [layoutPreview, setLayoutPreview] = useState<string>("");
  console.log(interiorPreviews, exteriorPreviews, layoutPreview);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Remove payment state
  // const [paymentTxSignature, setPaymentTxSignature] = useState("");
  // const [paymentVerified, setPaymentVerified] = useState(false);
  // const [paymentLoading, setPaymentLoading] = useState(false);
  // const [recipientAddress, setRecipientAddress] = useState<PublicKey | null>(null);
  const [activeSection, setActiveSection] = useState<string>("basic");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Define sections for progress tracking
  const sections = [
    { id: "basic", name: "Basic Info", icon: FaPlane },
    { id: "images", name: "Photos", icon: FaImage },
    { id: "pricing", name: "Pricing", icon: FaMoneyBillWave },
    { id: "registration", name: "Registration", icon: FaRegIdCard },
    { id: "description", name: "Description", icon: FaInfoCircle },
    { id: "specs", name: "Specifications", icon: FaCogs },
    { id: "certification", name: "Certification", icon: FaCertificate },
    { id: "history", name: "Maintenance", icon: FaHistory },
    // Remove payment section
    // { id: "payment", name: "Payment", icon: FaMoneyBillWave },
  ];

  // Calculate progress percentage
  const getProgressPercentage = () => {
    const currentIndex = sections.findIndex(
      (section) => section.id === activeSection
    );
    return ((currentIndex + 1) / sections.length) * 100;
  };

  // Sync vendorId from Redux to formData
  useEffect(() => {
    if (vendorId) {
      setFormData((prev) => ({ ...prev, vendorId }));
    }
  }, [vendorId]);

  // Initialize Cloudinary widget
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/global/all.js";
    script.async = true;
    script.onload = () => {
      console.log("Cloudinary widget loaded");
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const openCloudinaryWidget = (type: "interior" | "exterior" | "layout") => {
    if (!window.cloudinary) {
      toast.error("Cloudinary widget not loaded. Please refresh the page.");
      return;
    }

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dnsgznjyo",
        uploadPreset: "images",
        sources: ["local", "url"],
        multiple: type !== "layout",
        maxFiles: type === "layout" ? 1 : 10,
        maxFileSize: 10 * 1024 * 1024, // 10MB
        allowedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
        resourceType: "image",
        clientAllowedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
        maxImageFileSize: 10 * 1024 * 1024,
        theme: "minimal",
        styles: {
          palette: {
            window: "#FFFFFF",
            windowBorder: "#90A0B3",
            tabIcon: "#0078FF",
            menuIcons: "#5A616A",
            textDark: "#000000",
            textLight: "#FFFFFF",
            link: "#0078FF",
            action: "#FF620C",
            inactiveTabIcon: "#0E2F5A",
            error: "#F44235",
            inProgress: "#0078FF",
            complete: "#20B832",
            sourceBg: "#E4EBF1",
          },
          fonts: {
            default: null,
            "'Fira Sans', sans-serif": {
              url: "https://fonts.googleapis.com/css?family=Fira+Sans",
              active: true,
            },
          },
        },
      },
      (error: any, result: any) => {
        if (error) {
          console.error("Upload error:", error);
          toast.error("Upload failed. Please try again.");
          return;
        }

        if (result.event === "success") {
          const imageUrl = result.info.secure_url;

          if (type === "interior") {
            setFormData((prev) => ({
              ...prev,
              interiorImageUrls: [...prev.interiorImageUrls, imageUrl],
            }));
            toast.success("Interior image uploaded successfully!");
          } else if (type === "exterior") {
            setFormData((prev) => ({
              ...prev,
              exteriorImageUrls: [...prev.exteriorImageUrls, imageUrl],
            }));
            toast.success("Exterior image uploaded successfully!");
          } else if (type === "layout") {
            setFormData((prev) => ({
              ...prev,
              layoutImageUrl: imageUrl,
            }));
            toast.success("Layout image uploaded successfully!");
          }
        }
      }
    );

    widget.open();
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? "" : Number(value),
    }));
  };

  const removeImage = (
    index: number,
    type: "interior" | "exterior" | "layout"
  ) => {
    if (type === "interior") {
      setFormData((prev) => ({
        ...prev,
        interiorImageUrls: prev.interiorImageUrls.filter((_, i) => i !== index),
      }));
    } else if (type === "exterior") {
      setFormData((prev) => ({
        ...prev,
        exteriorImageUrls: prev.exteriorImageUrls.filter((_, i) => i !== index),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        layoutImageUrl: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.vendorId) {
      toast.error("Vendor ID is required");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Please provide a detailed description of your aircraft");
      return;
    }

    if (
      formData.interiorImageUrls.length < 3 ||
      formData.exteriorImageUrls.length < 2
    ) {
      toast.error(
        `Please upload at least ${
          3 - formData.interiorImageUrls.length
        } more interior and ${
          2 - formData.exteriorImageUrls.length
        } more exterior images`
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        ...formData,
        manufacturer:
          formData.manufacturer === "Other"
            ? formData.otherManufacturer
            : formData.manufacturer,
      };

      const response = await vendorApi.post("/jets/add", submissionData);
      if (response.data.success) {
        toast.success("Jet listing submitted successfully!");
        window.location.href = "/preview/jet/sale/" + response.data.jet.id;
        setFormData({
          manufacturer: "",
          model: "",
          year: "",
          serialNumber: "",
          totalTimeSinceNew: "",
          totalLandings: "",
          engineMakeModel: "",
          engineHours: "",
          avionicsSuite: "",
          interiorConfig: "",
          interiorImageUrls: [],
          exteriorImageUrls: [],
          layoutImageUrl: "",
          price: "",
          currentLocation: "",
          registrationNumber: "",
          contactDetails: "",
          description: "",
          previousOwners: "",
          maintenanceProgram: "",
          airframeEngineStatus: "",
          refurbishmentDate: "",
          wifiConnectivity: "",
          lavatoryGalleyDetails: "",
          cabinAmenities: "",
          range: "",
          cruiseSpeed: "",
          maxAltitude: "",
          runwayLength: "",
          emptyWeight: "",
          maxTakeoffWeight: "",
          deliveryAvailability: "",
          aircraftType: "",
          seatingCapacity: "",
          cabinHeight: "",
          cabinWidth: "",
          cabinLength: "",
          baggageCapacity: "",
          numberOfEngines: "",
          engineType: "",
          engineThrust: "",
          certification: "",
          noiseCompliance: "",
          lastInspectionDate: "",
          nextInspectionDue: "",
          maintenanceStatus: "",
          paymentTxSignature: "",
          transactionLink: "",
          vendorId: "",
          fuelCapacity: "",
          fuelConsumption: "",
          serviceCeiling: "",
          takeoffDistance: "",
          landingDistance: "",
          warrantyRemaining: "",
          avionicsUpdates: "",
          interiorDesigner: "",
          exteriorPaintScheme: "",
          recentUpgrades: "",
          operationalRestrictions: "",
        });
        setInteriorPreviews([]);
        setExteriorPreviews([]);
        setLayoutPreview("");
      } else {
        throw new Error(response.data.message || "Submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error instanceof Error ? error.message : "Error submitting form"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Validation logic
  const validateSection = (sectionId: string) => {
    const newErrors: { [key: string]: string } = {};
    // Basic Info
    if (sectionId === "basic") {
      if (!formData.manufacturer)
        newErrors.manufacturer = "Manufacturer is required";
      if (formData.manufacturer === "Other" && !formData.otherManufacturer)
        newErrors.otherManufacturer = "Please specify manufacturer";
      if (!formData.model) newErrors.model = "Model is required";
      if (!formData.year) newErrors.year = "Year is required";
      if (!formData.serialNumber)
        newErrors.serialNumber = "Serial number is required";
      if (!formData.totalTimeSinceNew)
        newErrors.totalTimeSinceNew = "Total time since new is required";
      if (!formData.totalLandings)
        newErrors.totalLandings = "Total landings is required";
      if (!formData.engineMakeModel)
        newErrors.engineMakeModel = "Engine make/model is required";
      if (!formData.engineHours)
        newErrors.engineHours = "Engine hours is required";
      if (!formData.avionicsSuite)
        newErrors.avionicsSuite = "Avionics suite is required";
      if (!formData.interiorConfig)
        newErrors.interiorConfig = "Interior config is required";
      if (!formData.aircraftType)
        newErrors.aircraftType = "Aircraft type is required";
    }
    // Images
    if (sectionId === "images") {
      if (formData.interiorImageUrls.length < 3)
        newErrors.interiorImageUrls = "At least 3 interior images required";
      if (formData.exteriorImageUrls.length < 2)
        newErrors.exteriorImageUrls = "At least 2 exterior images required";
    }
    // Pricing
    if (sectionId === "pricing") {
      if (!formData.price) newErrors.price = "Price is required";
      if (!formData.currentLocation)
        newErrors.currentLocation = "Current location is required";
    }
    // Registration
    if (sectionId === "registration") {
      if (!formData.registrationNumber)
        newErrors.registrationNumber = "Registration number is required";
      if (!formData.contactDetails)
        newErrors.contactDetails = "Contact details are required";
    }
    // Description
    if (sectionId === "description") {
      if (!formData.description || !formData.description.trim())
        newErrors.description = "Description is required";
    }
    // Specs
    if (sectionId === "specs") {
      if (!formData.seatingCapacity)
        newErrors.seatingCapacity = "Seating capacity is required";
      if (!formData.numberOfEngines)
        newErrors.numberOfEngines = "Number of engines is required";
      if (!formData.cabinHeight)
        newErrors.cabinHeight = "Cabin height is required";
      if (!formData.cabinWidth)
        newErrors.cabinWidth = "Cabin width is required";
      if (!formData.cabinLength)
        newErrors.cabinLength = "Cabin length is required";
      if (!formData.baggageCapacity)
        newErrors.baggageCapacity = "Baggage capacity is required";
      if (!formData.engineType)
        newErrors.engineType = "Engine type is required";
      if (!formData.engineThrust)
        newErrors.engineThrust = "Engine thrust is required";
    }
    // Certification
    if (sectionId === "certification") {
      if (!formData.certification)
        newErrors.certification = "Certification is required";
      if (!formData.noiseCompliance)
        newErrors.noiseCompliance = "Noise compliance is required";
    }
    // History
    if (sectionId === "history") {
      if (!formData.lastInspectionDate)
        newErrors.lastInspectionDate = "Last inspection date is required";
      if (!formData.nextInspectionDue)
        newErrors.nextInspectionDue = "Next inspection due is required";
      if (!formData.maintenanceStatus)
        newErrors.maintenanceStatus = "Maintenance status is required";
    }
    return newErrors;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-gray-100 py-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-6xl font-light text-slate-900 sm:text-7xl lg:text-8xl mb-6 tracking-wide">
            List Your Private Jet
          </p>
          <p className="max-w-4xl mx-auto text-xl text-slate-600 leading-relaxed font-light">
            Complete this comprehensive form to showcase your aircraft to
            qualified buyers worldwide.
          </p>
          <div className="mt-12 flex justify-center">
            <div className="bg-white/80 backdrop-blur-md rounded-full px-8 py-3 border border-slate-200 shadow-lg">
              <span className="text-sm font-light text-slate-700 tracking-wide">
                Premium Listing Platform
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-slate-200">
          {/* Header Navigation with Progress Bar */}
          <div className="bg-gradient-to-r from-slate-100 to-white border-b border-slate-200 p-8">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-light text-slate-900 tracking-wide">
                  Step{" "}
                  {sections.findIndex(
                    (section) => section.id === activeSection
                  ) + 1}{" "}
                  of {sections.length}
                </h2>
                <span className="text-lg font-light text-slate-600 tracking-wide">
                  {Math.round(getProgressPercentage())}% Complete
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-slate-600 to-slate-800 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 justify-center">
              {sections.map((section, index) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                const isCompleted =
                  sections.findIndex((s) => s.id === activeSection) > index;

                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all duration-300 font-light tracking-wide ${
                      isActive
                        ? "bg-white shadow-lg border border-slate-200 text-slate-900"
                        : isCompleted
                        ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
                        : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-white hover:shadow-md"
                    }`}
                  >
                    <Icon
                      className={`text-lg ${
                        isCompleted ? "text-green-600" : ""
                      }`}
                    />
                    <span className="hidden sm:inline">{section.name}</span>
                    {isCompleted && (
                      <FiCheckCircle className="text-green-600 text-sm" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Form Content */}
          <div className="p-12 bg-white">
            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Basic Information Section */}
              {activeSection === "basic" && (
                <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-xl">
                  <p className="text-4xl font-light text-slate-900 mb-12 flex items-center tracking-wide">
                    <FaPlane className="mr-6 text-slate-600" />
                    Basic Aircraft Information
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label
                        htmlFor="manufacturer"
                        className="block text-sm font-light text-slate-700 mb-4 tracking-wide"
                      >
                        Aircraft Manufacturer{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="manufacturer"
                        name="manufacturer"
                        value={formData.manufacturer}
                        onChange={handleChange}
                        className="w-full px-6 py-5 border border-slate-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-300 bg-white text-slate-900 placeholder-slate-400"
                        required
                      >
                        <option value="" className="bg-white">
                          Select Manufacturer
                        </option>
                        {JetManufacturers.map((manufacturer) => (
                          <option
                            key={manufacturer}
                            value={manufacturer}
                            className="bg-white"
                          >
                            {manufacturer}
                          </option>
                        ))}
                      </select>
                      {errors.manufacturer && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.manufacturer}
                        </p>
                      )}
                    </div>
                    <div className="space-y-4">
                      <label
                        htmlFor="model"
                        className="block text-sm font-light text-slate-700 mb-4 tracking-wide"
                      >
                        Model Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="model"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        className="w-full px-6 py-5 border border-slate-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-300 bg-white text-slate-900 placeholder-slate-400"
                        placeholder="e.g. G650"
                        required
                      />
                      {errors.model && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.model}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div className="space-y-2">
                      <label
                        htmlFor="year"
                        className="block text-sm font-semibold text-gray-700 mb-3"
                      >
                        Year of Manufacture{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleNumberChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                        min="1950"
                        max={new Date().getFullYear()}
                        required
                      />
                      {errors.year && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.year}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="serialNumber"
                        className="block text-sm font-semibold text-gray-700 mb-3"
                      >
                        Serial Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="serialNumber"
                        name="serialNumber"
                        value={formData.serialNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                        placeholder="e.g. 6069"
                        required
                      />
                      {errors.serialNumber && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.serialNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div className="space-y-2">
                      <label
                        htmlFor="totalTimeSinceNew"
                        className="block text-sm font-semibold text-gray-700 mb-3"
                      >
                        Total Time Since New (Hours){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="totalTimeSinceNew"
                        name="totalTimeSinceNew"
                        value={formData.totalTimeSinceNew}
                        onChange={handleNumberChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                        min="0"
                        step="0.1"
                        required
                      />
                      {errors.totalTimeSinceNew && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.totalTimeSinceNew}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="totalLandings"
                        className="block text-sm font-semibold text-gray-700 mb-3"
                      >
                        Total Landings/Cycles{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="totalLandings"
                        name="totalLandings"
                        value={formData.totalLandings}
                        onChange={handleNumberChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                        min="0"
                        required
                      />
                      {errors.totalLandings && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.totalLandings}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div className="space-y-2">
                      <label
                        htmlFor="engineMakeModel"
                        className="block text-sm font-semibold text-gray-700 mb-3"
                      >
                        Engine Make & Model{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="engineMakeModel"
                        name="engineMakeModel"
                        value={formData.engineMakeModel}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                        placeholder="e.g. CFM56-5B4/3"
                        required
                      />
                      {errors.engineMakeModel && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.engineMakeModel}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="engineHours"
                        className="block text-sm font-semibold text-gray-700 mb-3"
                      >
                        Engine Hours <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="engineHours"
                        name="engineHours"
                        value={formData.engineHours}
                        onChange={handleNumberChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                        min="0"
                        step="0.1"
                        required
                      />
                      {errors.engineHours && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.engineHours}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div className="space-y-2">
                      <label
                        htmlFor="avionicsSuite"
                        className="block text-sm font-semibold text-gray-700 mb-3"
                      >
                        Avionics Suite <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="avionicsSuite"
                        name="avionicsSuite"
                        value={formData.avionicsSuite}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                        placeholder="e.g. Honeywell Primus"
                        required
                      />
                      {errors.avionicsSuite && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.avionicsSuite}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="interiorConfig"
                        className="block text-sm font-semibold text-gray-700 mb-3"
                      >
                        Interior Configuration{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="interiorConfig"
                        name="interiorConfig"
                        value={formData.interiorConfig}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                        placeholder="e.g. 14 pax, club + divan"
                        required
                      />
                      {errors.interiorConfig && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.interiorConfig}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="space-y-2">
                      <label
                        htmlFor="aircraftType"
                        className="block text-sm font-semibold text-gray-700 mb-3"
                      >
                        Aircraft Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="aircraftType"
                        name="aircraftType"
                        value={formData.aircraftType}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                        required
                      >
                        <option value="">Select Type</option>
                        {AircraftTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.aircraftType && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.aircraftType}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Images Section */}
              {activeSection === "images" && (
                <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-xl">
                  <p className="text-4xl font-light text-slate-900 mb-12 flex items-center tracking-wide">
                    <FaImage className="mr-6 text-slate-600" />
                    Aircraft Photos & Media
                  </p>

                  <div className="space-y-16">
                    <div>
                      <label className="block text-sm font-light text-slate-700 mb-6 flex items-center tracking-wide">
                        Interior Photos (Minimum 3){" "}
                        <span className="text-red-500">*</span>
                        {formData.interiorImageUrls.length > 0 && (
                          <span className="ml-4 text-green-600 text-xs flex items-center">
                            <FiCheckCircle className="mr-1" />
                            {formData.interiorImageUrls.length} uploaded
                          </span>
                        )}
                      </label>
                      <div
                        onClick={() => openCloudinaryWidget("interior")}
                        className="relative border-2 border-dashed border-slate-300 rounded-3xl p-16 bg-gradient-to-br from-slate-50 to-white hover:from-slate-100 hover:to-slate-50 transition-all duration-500 group cursor-pointer text-center"
                      >
                        <div className="flex justify-center mb-8">
                          <div className="p-6 bg-white rounded-full shadow-2xl group-hover:shadow-3xl transition-all duration-500 border border-slate-200">
                            <FiUpload className="h-16 w-16 text-slate-600" />
                          </div>
                        </div>
                        <p className="text-xl font-light text-slate-900 mb-3 tracking-wide">
                          Click to upload interior photos
                        </p>
                        <p className="text-sm text-slate-500 tracking-wide">
                          High-resolution images recommended (max 10MB each)
                        </p>
                        {formData.interiorImageUrls.length > 0 && (
                          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                            {formData.interiorImageUrls.map((url, index) => (
                              <div key={index} className="relative group">
                                <img
                                  src={url}
                                  className="w-full h-56 object-cover rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500"
                                  alt={`Interior image ${index + 1}`}
                                />
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeImage(index, "interior");
                                  }}
                                  className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 shadow-lg"
                                >
                                  <FiTrash2 size={18} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-light text-slate-700 mb-6 flex items-center tracking-wide">
                        Exterior Photos (Minimum 2){" "}
                        <span className="text-red-500">*</span>
                        {formData.exteriorImageUrls.length > 0 && (
                          <span className="ml-4 text-green-600 text-xs flex items-center">
                            <FiCheckCircle className="mr-1" />
                            {formData.exteriorImageUrls.length} uploaded
                          </span>
                        )}
                      </label>
                      <div
                        onClick={() => openCloudinaryWidget("exterior")}
                        className="relative border-2 border-dashed border-slate-300 rounded-3xl p-16 bg-gradient-to-br from-slate-50 to-white hover:from-slate-100 hover:to-slate-50 transition-all duration-500 group cursor-pointer text-center"
                      >
                        <div className="flex justify-center mb-8">
                          <div className="p-6 bg-white rounded-full shadow-2xl group-hover:shadow-3xl transition-all duration-500 border border-slate-200">
                            <FiUpload className="h-16 w-16 text-slate-600" />
                          </div>
                        </div>
                        <p className="text-xl font-light text-slate-900 mb-3 tracking-wide">
                          Click to upload exterior photos
                        </p>
                        <p className="text-sm text-slate-500 tracking-wide">
                          Include multiple angles (max 10MB each)
                        </p>
                        {formData.exteriorImageUrls.length > 0 && (
                          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                            {formData.exteriorImageUrls.map((url, index) => (
                              <div key={index} className="relative group">
                                <img
                                  src={url}
                                  className="w-full h-56 object-cover rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500"
                                  alt={`Exterior image ${index + 1}`}
                                />
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeImage(index, "exterior");
                                  }}
                                  className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 shadow-lg"
                                >
                                  <FiTrash2 size={18} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className=" text-sm font-light text-slate-700 mb-6 flex items-center tracking-wide">
                        Jet Layout & Design Image (Optional)
                        {formData.layoutImageUrl && (
                          <span className="ml-4 text-green-600 text-xs flex items-center">
                            <FiCheckCircle className="mr-1" />
                            Layout image uploaded
                          </span>
                        )}
                      </label>
                      <div
                        onClick={() => openCloudinaryWidget("layout")}
                        className="relative border-2 border-dashed border-slate-300 rounded-3xl p-16 bg-gradient-to-br from-slate-50 to-white hover:from-slate-100 hover:to-slate-50 transition-all duration-500 group cursor-pointer text-center"
                      >
                        <div className="flex justify-center mb-8">
                          <div className="p-6 bg-white rounded-full shadow-2xl group-hover:shadow-3xl transition-all duration-500 border border-slate-200">
                            <FiUpload className="h-16 w-16 text-slate-600" />
                          </div>
                        </div>
                        <p className="text-xl font-light text-slate-900 mb-3 tracking-wide">
                          Upload jet layout or design diagram
                        </p>
                        <p className="text-sm text-slate-500 tracking-wide">
                          Show cabin layout, seating arrangement, or technical
                          diagrams (max 10MB)
                        </p>
                        {formData.layoutImageUrl && (
                          <div className="mt-12 flex justify-center">
                            <div className="relative group">
                              <img
                                src={formData.layoutImageUrl}
                                className="max-w-full h-auto max-h-96 object-contain rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500"
                                alt="Layout image"
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeImage(0, "layout");
                                }}
                                className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 shadow-lg"
                              >
                                <FiTrash2 size={18} />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Pricing & Location Section */}
              {activeSection === "pricing" && (
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 shadow-xl">
                  <p className="text-3xl font-bold text-gray-900 mb-8 flex items-center bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text">
                    <FaMoneyBillWave className="mr-4 text-indigo-600" />
                    Pricing & Location
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label
                        htmlFor="price"
                        className="block text-sm font-semibold text-gray-700 mb-3"
                      >
                        Asking Price <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                        placeholder="e.g. $25,000,000 or Price on Request"
                        required
                      />
                      {errors.price && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.price}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="currentLocation"
                        className="block text-sm font-semibold text-gray-700 mb-3"
                      >
                        Current Location / Base Airport{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="currentLocation"
                        name="currentLocation"
                        value={formData.currentLocation}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                        placeholder="e.g. Teterboro, NJ, USA (KTEB)"
                        required
                      />
                      {errors.currentLocation && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.currentLocation}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="space-y-2">
                      <label
                        htmlFor="deliveryAvailability"
                        className="block text-sm font-semibold text-gray-700 mb-3"
                      >
                        Delivery Availability
                      </label>
                      <input
                        type="text"
                        id="deliveryAvailability"
                        name="deliveryAvailability"
                        value={formData.deliveryAvailability}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                        placeholder="e.g. Immediate, Q1 2025, etc."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Registration & Contact Section */}
              {activeSection === "registration" && (
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 shadow-xl">
                  <p className="text-3xl font-bold text-gray-900 mb-8 flex items-center bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                    <FaRegIdCard className="mr-4 text-indigo-600" />
                    Registration & Contact
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label
                        htmlFor="registrationNumber"
                        className="block text-sm font-semibold text-gray-700 mb-3"
                      >
                        Registration Number{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="registrationNumber"
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                        placeholder="e.g. N123AB"
                        required
                      />
                      {errors.registrationNumber && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.registrationNumber}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="contactDetails"
                        className="block text-sm font-semibold text-gray-700 mb-3"
                      >
                        Contact Details <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="contactDetails"
                        name="contactDetails"
                        value={formData.contactDetails}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                        placeholder="e.g. John Doe, johndoe@example.com, +1 (555) 123-4567"
                        required
                      />
                      {errors.contactDetails && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.contactDetails}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Description Section */}
              {activeSection === "description" && (
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 shadow-xl">
                  <p className="text-3xl font-bold text-gray-900 mb-8 flex items-center bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                    <FaInfoCircle className="mr-4 text-indigo-600" />
                    Detailed Description
                  </p>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-gray-700">
                        Aircraft Description{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <RichTextEditor
                        value={formData.description}
                        onChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            description: value,
                          }))
                        }
                        placeholder="Describe your aircraft in detail. Include information about its condition, features, maintenance history, and any unique selling points. You can use formatting options to make your description more engaging."
                        className="min-h-[300px]"
                      />
                      <p className="text-sm text-gray-500">
                        Provide a comprehensive description of your aircraft to
                        attract potential buyers. Include details about
                        condition, features, and maintenance history.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <label
                        htmlFor="cabinAmenities"
                        className="block text-sm font-semibold text-gray-700"
                      >
                        Cabin Amenities & Features
                      </label>
                      <textarea
                        id="cabinAmenities"
                        name="cabinAmenities"
                        value={formData.cabinAmenities}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                        rows={4}
                        placeholder="e.g. Entertainment systems, LED lighting, galley equipment, lavatory features, etc."
                      />
                    </div>

                    <div className="space-y-3">
                      <label
                        htmlFor="recentUpgrades"
                        className="block text-sm font-semibold text-gray-700"
                      >
                        Recent Upgrades & Refurbishments
                      </label>
                      <textarea
                        id="recentUpgrades"
                        name="recentUpgrades"
                        value={formData.recentUpgrades}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                        rows={4}
                        placeholder="List any recent upgrades to avionics, interior, paint, engines, etc."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Specifications Section */}
              {activeSection === "specs" && (
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 shadow-xl">
                  <p className="text-3xl font-bold text-gray-900 mb-8 flex items-center bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                    <FaCogs className="mr-4 text-indigo-600" />
                    Technical Specifications
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="seatingCapacity"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Seating Capacity <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="seatingCapacity"
                        name="seatingCapacity"
                        value={formData.seatingCapacity}
                        onChange={handleNumberChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        min="1"
                        required
                      />
                      {errors.seatingCapacity && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.seatingCapacity}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="numberOfEngines"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Number of Engines{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="numberOfEngines"
                        name="numberOfEngines"
                        value={formData.numberOfEngines}
                        onChange={handleNumberChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        min="1"
                        max="4"
                        required
                      />
                      {errors.numberOfEngines && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.numberOfEngines}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div>
                      <label
                        htmlFor="cabinHeight"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Cabin Height (ft){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="cabinHeight"
                        name="cabinHeight"
                        value={formData.cabinHeight}
                        onChange={handleNumberChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        step="0.1"
                        required
                      />
                      {errors.cabinHeight && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.cabinHeight}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="cabinWidth"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Cabin Width (ft) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="cabinWidth"
                        name="cabinWidth"
                        value={formData.cabinWidth}
                        onChange={handleNumberChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        step="0.1"
                        required
                      />
                      {errors.cabinWidth && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.cabinWidth}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="cabinLength"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Cabin Length (ft){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="cabinLength"
                        name="cabinLength"
                        value={formData.cabinLength}
                        onChange={handleNumberChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        step="0.1"
                        required
                      />
                      {errors.cabinLength && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.cabinLength}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label
                        htmlFor="baggageCapacity"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Baggage Capacity (cu ft){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="baggageCapacity"
                        name="baggageCapacity"
                        value={formData.baggageCapacity}
                        onChange={handleNumberChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                      {errors.baggageCapacity && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.baggageCapacity}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="fuelCapacity"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Fuel Capacity (gallons)
                      </label>
                      <input
                        type="number"
                        id="fuelCapacity"
                        name="fuelCapacity"
                        value={formData.fuelCapacity}
                        onChange={handleNumberChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label
                        htmlFor="range"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Range (nautical miles)
                      </label>
                      <input
                        type="number"
                        id="range"
                        name="range"
                        value={formData.range}
                        onChange={handleNumberChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        min="0"
                        placeholder="e.g. 4750"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cruiseSpeed"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Cruise Speed (knots)
                      </label>
                      <input
                        type="number"
                        id="cruiseSpeed"
                        name="cruiseSpeed"
                        value={formData.cruiseSpeed}
                        onChange={handleNumberChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        min="0"
                        placeholder="e.g. 450"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label
                        htmlFor="maxAltitude"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Max Altitude (feet)
                      </label>
                      <input
                        type="number"
                        id="maxAltitude"
                        name="maxAltitude"
                        value={formData.maxAltitude}
                        onChange={handleNumberChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        min="0"
                        placeholder="e.g. 51000"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="runwayLength"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Required Runway Length (feet)
                      </label>
                      <input
                        type="number"
                        id="runwayLength"
                        name="runwayLength"
                        value={formData.runwayLength}
                        onChange={handleNumberChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        min="0"
                        placeholder="e.g. 6000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label
                        htmlFor="emptyWeight"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Empty Weight (lbs)
                      </label>
                      <input
                        type="number"
                        id="emptyWeight"
                        name="emptyWeight"
                        value={formData.emptyWeight}
                        onChange={handleNumberChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        min="0"
                        placeholder="e.g. 50000"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="maxTakeoffWeight"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Max Takeoff Weight (lbs)
                      </label>
                      <input
                        type="number"
                        id="maxTakeoffWeight"
                        name="maxTakeoffWeight"
                        value={formData.maxTakeoffWeight}
                        onChange={handleNumberChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        min="0"
                        placeholder="e.g. 99000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label
                        htmlFor="takeoffDistance"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Takeoff Distance (feet)
                      </label>
                      <input
                        type="number"
                        id="takeoffDistance"
                        name="takeoffDistance"
                        value={formData.takeoffDistance}
                        onChange={handleNumberChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        min="0"
                        placeholder="e.g. 5000"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="landingDistance"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Landing Distance (feet)
                      </label>
                      <input
                        type="number"
                        id="landingDistance"
                        name="landingDistance"
                        value={formData.landingDistance}
                        onChange={handleNumberChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        min="0"
                        placeholder="e.g. 3500"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="engineType"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Engine Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="engineType"
                      name="engineType"
                      value={formData.engineType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                      <option value="">Select Type</option>
                      {EngineTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.engineType && (
                      <p className="text-red-500 text-xs mt-2">
                        {errors.engineType}
                      </p>
                    )}
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="engineThrust"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Engine Thrust/HP (lbs/HP){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="engineThrust"
                      name="engineThrust"
                      value={formData.engineThrust}
                      onChange={handleNumberChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                    {errors.engineThrust && (
                      <p className="text-red-500 text-xs mt-2">
                        {errors.engineThrust}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Certification Section */}
              {activeSection === "certification" && (
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 shadow-xl">
                  <p className="text-3xl font-bold text-gray-900 mb-8 flex items-center bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                    <FaCertificate className="mr-4 text-indigo-600" />
                    Certification & Compliance
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="certification"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Certification <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="certification"
                        name="certification"
                        value={formData.certification}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      >
                        <option value="">Select Certification</option>
                        {Certifications.map((cert) => (
                          <option key={cert} value={cert}>
                            {cert}
                          </option>
                        ))}
                      </select>
                      {errors.certification && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.certification}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="noiseCompliance"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Noise Compliance <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="noiseCompliance"
                        name="noiseCompliance"
                        value={formData.noiseCompliance}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      >
                        <option value="">Select Compliance</option>
                        <option value="Stage 3">Stage 3</option>
                        <option value="Stage 4">Stage 4</option>
                        <option value="Stage 5">Stage 5</option>
                        <option value="Chapter 3">Chapter 3</option>
                        <option value="Chapter 4">Chapter 4</option>
                      </select>
                      {errors.noiseCompliance && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.noiseCompliance}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="operationalRestrictions"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Operational Restrictions
                    </label>
                    <textarea
                      id="operationalRestrictions"
                      name="operationalRestrictions"
                      value={formData.operationalRestrictions}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      rows={3}
                      placeholder="List any operational restrictions or special considerations"
                    />
                  </div>
                </div>
              )}

              {/* Maintenance History Section */}
              {activeSection === "history" && (
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 shadow-xl">
                  <p className="text-3xl font-bold text-gray-900 mb-8 flex items-center bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                    <FaHistory className="mr-4 text-indigo-600" />
                    Maintenance & History
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label
                        htmlFor="lastInspectionDate"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Last Inspection Date{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="lastInspectionDate"
                        name="lastInspectionDate"
                        value={formData.lastInspectionDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                      {errors.lastInspectionDate && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.lastInspectionDate}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="nextInspectionDue"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Next Inspection Due{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="nextInspectionDue"
                        name="nextInspectionDue"
                        value={formData.nextInspectionDue}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                      {errors.nextInspectionDue && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.nextInspectionDue}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="maintenanceStatus"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Maintenance Status{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="maintenanceStatus"
                        name="maintenanceStatus"
                        value={formData.maintenanceStatus}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      >
                        <option value="">Select Status</option>
                        <option value="Current">Current</option>
                        <option value="Due Soon">Due Soon</option>
                        <option value="Overdue">Overdue</option>
                        <option value="Fresh Inspection">
                          Fresh Inspection
                        </option>
                      </select>
                      {errors.maintenanceStatus && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.maintenanceStatus}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label
                        htmlFor="maintenanceProgram"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Maintenance Program
                      </label>
                      <input
                        type="text"
                        id="maintenanceProgram"
                        name="maintenanceProgram"
                        value={formData.maintenanceProgram}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g. CAMP, JSSI, MSP"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="warrantyRemaining"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Warranty Remaining
                      </label>
                      <input
                        type="text"
                        id="warrantyRemaining"
                        name="warrantyRemaining"
                        value={formData.warrantyRemaining}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g. 24 months remaining"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label
                        htmlFor="airframeEngineStatus"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Airframe & Engine Status Reports
                      </label>
                      <input
                        type="text"
                        id="airframeEngineStatus"
                        name="airframeEngineStatus"
                        value={formData.airframeEngineStatus}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g. Available upon request"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="refurbishmentDate"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Last Refurbishment Date
                      </label>
                      <input
                        type="text"
                        id="refurbishmentDate"
                        name="refurbishmentDate"
                        value={formData.refurbishmentDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g. January 2023"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label
                        htmlFor="previousOwners"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Number of Previous Owners
                      </label>
                      <input
                        type="number"
                        id="previousOwners"
                        name="previousOwners"
                        value={formData.previousOwners}
                        onChange={handleNumberChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        min="0"
                        placeholder="e.g. 1"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="avionicsUpdates"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Recent Avionics Updates
                      </label>
                      <input
                        type="text"
                        id="avionicsUpdates"
                        name="avionicsUpdates"
                        value={formData.avionicsUpdates}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g. 2022 Garmin upgrade"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label
                        htmlFor="interiorDesigner"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Interior Designer
                      </label>
                      <input
                        type="text"
                        id="interiorDesigner"
                        name="interiorDesigner"
                        value={formData.interiorDesigner}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g. BMW Designworks"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="exteriorPaintScheme"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Exterior Paint Scheme
                      </label>
                      <input
                        type="text"
                        id="exteriorPaintScheme"
                        name="exteriorPaintScheme"
                        value={formData.exteriorPaintScheme}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g. Custom livery by Jet Aviation"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="wifiConnectivity"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Wi-Fi / Connectivity
                    </label>
                    <input
                      type="text"
                      id="wifiConnectivity"
                      name="wifiConnectivity"
                      value={formData.wifiConnectivity}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="e.g. JetWave, GoGo, Ka-band"
                    />
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="lavatoryGalleyDetails"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Lavatory & Galley Details
                    </label>
                    <input
                      type="text"
                      id="lavatoryGalleyDetails"
                      name="lavatoryGalleyDetails"
                      value={formData.lavatoryGalleyDetails}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="e.g. Forward crew & VIP lav, forward galley"
                    />
                  </div>
                </div>
              )}

              {/* Submit/Next Button Navigation */}
              <div className="mt-16">
                {(() => {
                  const currentIndex = sections.findIndex(
                    (section) => section.id === activeSection
                  );
                  const isLastSection = currentIndex === sections.length - 1;
                  return isLastSection ? (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 hover:from-slate-800 hover:via-slate-700 hover:to-slate-800 text-white font-light py-8 px-12 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-slate-500 text-xl tracking-wide ${
                        isSubmitting
                          ? "opacity-50 cursor-not-allowed"
                          : "transform hover:scale-[1.02]"
                      }`}
                      onClick={(e) => {
                        const allErrors = sections.reduce(
                          (acc, s) => ({ ...acc, ...validateSection(s.id) }),
                          {}
                        );
                        setErrors(allErrors);
                        if (Object.keys(allErrors).length > 0) {
                          e.preventDefault();
                        }
                      }}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting Your Listing...
                        </span>
                      ) : (
                        "Submit Jet Listing"
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        const sectionErrors = validateSection(activeSection);
                        setErrors(sectionErrors);
                        if (Object.keys(sectionErrors).length === 0) {
                          const nextSection = sections[currentIndex + 1];
                          if (nextSection) setActiveSection(nextSection.id);
                        }
                      }}
                      className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 hover:from-slate-800 hover:via-slate-700 hover:to-slate-800 text-white font-light py-8 px-12 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-slate-500 text-xl tracking-wide transform hover:scale-[1.02]"
                    >
                      Next
                    </button>
                  );
                })()}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

