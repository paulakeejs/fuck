import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Building2,
  Star,
  Wifi,
  Car,
  Plane,
  Accessibility,
  Eye,
  Ear,
  Heart,
  Shield,
  Users,
  Camera,
  UtensilsCrossed,
  Dumbbell,
  Waves,
  Sparkles,
  UserCheck,
  Car as Parking,
  Baby,
  Dog,
  CheckCircle,
  Info,
  AlertCircle,
  Bell,
  Coffee,
  Wine,
  Bike,
  ShoppingBag,
  Music,
  Theater,
  Landmark,
  ParkingCircle,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { countries } from "./countries";
import destinationApi from "./api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiUpload,
  FiTrash2,
  FiInfo,
  FiRefreshCw,
  FiPlus,
  FiX,
  FiLoader,
} from "react-icons/fi";

function Registration() {
  const [formData, setFormData] = useState({
    // Overview
    propertyName: "",
    propertyType: "",
    starRating: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    phone: "",
    email: "",
    website: "",
    checkInTime: "15:00",
    checkOutTime: "11:00",
    languagesSpoken: [] as string[],

    // About
    description: "",
    highlights: "",
    amenities: [] as string[],
    roomTypes: "",
    totalRooms: "",
    yearBuilt: "",
    lastRenovated: "",
    awards: "",
    sustainabilityPractices: [] as string[],

    // Accessibility
    wheelchairAccessible: false,
    accessibleRooms: "",
    accessibleBathrooms: false,
    accessibleParking: false,
    accessibleRestaurants: false,
    accessiblePools: false,
    brailleSignage: false,
    hearingImpairedServices: false,
    visualImpairedServices: false,
    serviceAnimalsAllowed: false,

    // Policies
    cancellationPolicy: "",
    petPolicy: "",
    smokingPolicy: "",
    childrenPolicy: "",
    groupPolicy: "",
    paymentMethods: [] as string[],
    depositRequired: false,
    depositAmount: "",
    minimumStay: "",
    ageRestriction: "",
    quietHours: "22:00 - 08:00",
    specialOffers: "",
    loyaltyProgram: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const [mainImageUrl, setMainImageUrl] = useState<string>("");
  const [otherImageUrls, setOtherImageUrls] = useState<string[]>([]);
  const [uploadingMain, setUploadingMain] = useState(false);
  console.log(setOtherImageUrls);

  // Section names for images
  const defaultImageSections = [
    "Rooms",
    "Bathroom",
    "Living area",
    "Exterior",
    "Common areas",
    "Pool",
    "Dining",
    "Amenities",
    "Views",
    "What's nearby",
    "Family",
    "Accessibility",
  ];
  const [imageSections, setImageSections] = useState<string[]>([
    ...defaultImageSections,
  ]);
  const [sectionImages, setSectionImages] = useState<Record<string, string[]>>(
    {}
  );
  const [uploadingSection, setUploadingSection] = useState<string | null>(null);
  const [customSectionName, setCustomSectionName] = useState("");
  // Image descriptions: { [section]: { [idx]: string } }
  const [imageDescriptions, setImageDescriptions] = useState<
    Record<string, Record<number, string>>
  >({});

  const tabOrder = ["overview", "images", "about", "accessibility", "policies"];
  const tabLabels = [
    "Overview",
    "Images",
    "About",
    "Accessibility",
    "Policies",
  ];

  // Required fields for each tab
  const requiredFieldsByTab: Record<string, string[]> = {
    overview: [
      "propertyName",
      "propertyType",
      "address",
      "city",
      "country",
      "phone",
      "email",
    ],
    images: [], // We'll check mainImageUrl manually
    about: ["description"],
    accessibility: [], // No required fields
    policies: ["cancellationPolicy"],
  };

  const validateField = (field: string, value: string | boolean | string[]) => {
    let error = "";

    switch (field) {
      case "propertyName":
        if (!value) error = "Property name is required";
        break;
      case "propertyType":
        if (!value) error = "Property type is required";
        break;
      case "address":
        if (!value) error = "Address is required";
        break;
      case "city":
        if (!value) error = "City is required";
        break;
      case "country":
        if (!value) error = "Country is required";
        break;
      case "phone":
        if (!value) {
          error = "Phone number is required";
        } else if (!/^\+?[\d\s\-()]{7,}$/.test(value as string)) {
          error = "Invalid phone number format";
        }
        break;
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string)) {
          error = "Invalid email format";
        }
        break;
      case "description":
        if (!value) error = "Description is required";
        break;
      case "cancellationPolicy":
        if (!value) error = "Cancellation policy is required";
        break;
      default:
        break;
    }

    return error;
  };

  const handleInputChange = (
    field: string,
    value: string | boolean | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Validate on change
    const error = validateField(field, value);
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const handleBlur = (field: string, value: string | boolean | string[]) => {
    const error = validateField(field, value);
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Required fields
    const requiredFields = [
      "propertyName",
      "propertyType",
      "address",
      "city",
      "country",
      "phone",
      "email",
      "description",
      "cancellationPolicy",
    ];

    requiredFields.forEach((field) => {
      const error = validateField(
        field,
        formData[field as keyof typeof formData]
      );
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Cloudinary upload helper
  const uploadToCloudinary = async (files: FileList): Promise<string[]> => {
    const uploadPreset = "images";
    const cloudName = "dnsgznjyo";
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const urls: string[] = [];
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
    } catch (error: any) {
      toast.error(error?.message || "Failed to upload images");
      throw error;
    }
  };

  // Main image upload handler
  const handleMainImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploadingMain(true);
    try {
      const [url] = await uploadToCloudinary(files);
      setMainImageUrl(url);
      toast.success("Main image uploaded!");
    } catch {}
    setUploadingMain(false);
  };

  // Section image upload handler
  const handleSectionImagesUpload = async (
    section: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploadingSection(section);
    try {
      const urls = await uploadToCloudinary(files);
      setSectionImages((prev) => ({
        ...prev,
        [section]: [...(prev[section] || []), ...urls],
      }));
      toast.success(`Images uploaded to ${section}!`);
    } catch {}
    setUploadingSection(null);
  };

  // Add custom section
  const handleAddCustomSection = () => {
    const name = customSectionName.trim();
    if (!name || imageSections.includes(name)) return;
    setImageSections((prev) => [...prev, name]);
    setCustomSectionName("");
  };

  // Remove a photo from a specific section
  const removeSectionImage = (section: string, idx: number) => {
    setSectionImages((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== idx),
    }));
  };

  // Handle image description change
  const handleImageDescriptionChange = (
    section: string,
    idx: number,
    value: string
  ) => {
    setImageDescriptions((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [idx]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        mainImageUrl,
        otherImageUrls,
        sectionImages,
        imageDescriptions,
      };
      await destinationApi.post("/register", submitData);
      setSubmitSuccess(true);
      toast.success(
        "Registration submitted successfully! Our team will contact you shortly."
      );
      setTimeout(() => {
        navigate("/l-h");
      }, 2500);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const propertyTypes = ["Hotels", "Apartments", "Resorts", "Villas", "Cabins"];
  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Mandarin",
    "Japanese",
    "Arabic",
    "Russian",
    "Portuguese",
    "Other",
  ];

  const sustainabilityPractices = [
    "Energy-efficient lighting",
    "Water conservation program",
    "Waste reduction & recycling",
    "Local & organic food sourcing",
    "Green cleaning products",
    "LEED certified",
    "Carbon offset program",
    "Sustainable architecture",
    "Electric vehicle charging",
    "Community engagement",
  ];

  const amenities = [
    { name: "Infinity Pool", icon: <Waves className="w-4 h-4" /> },
    { name: "Luxury Spa", icon: <Sparkles className="w-4 h-4" /> },
    { name: "24/7 Fitness Center", icon: <Dumbbell className="w-4 h-4" /> },
    {
      name: "Michelin-star Restaurant",
      icon: <UtensilsCrossed className="w-4 h-4" />,
    },
    { name: "Rooftop Bar", icon: <Wine className="w-4 h-4" /> },
    { name: "24-hour Room Service", icon: <Bell className="w-4 h-4" /> },
    { name: "Personal Concierge", icon: <UserCheck className="w-4 h-4" /> },
    { name: "Valet Parking", icon: <ParkingCircle className="w-4 h-4" /> },
    { name: "Premium WiFi", icon: <Wifi className="w-4 h-4" /> },
    { name: "Executive Lounge", icon: <Building2 className="w-4 h-4" /> },
    { name: "Grand Ballroom", icon: <Users className="w-4 h-4" /> },
    { name: "Wedding Chapel", icon: <Heart className="w-4 h-4" /> },
    { name: "Kids Club", icon: <Baby className="w-4 h-4" /> },
    { name: "Tennis Courts", icon: <Dumbbell className="w-4 h-4" /> },
    { name: "Championship Golf", icon: <Dumbbell className="w-4 h-4" /> },
    { name: "Water Sports Center", icon: <Waves className="w-4 h-4" /> },
    { name: "Ski Valet", icon: <Dumbbell className="w-4 h-4" /> },
    { name: "Helipad", icon: <Plane className="w-4 h-4" /> },
    { name: "Private Beach", icon: <Waves className="w-4 h-4" /> },
    { name: "Limousine Service", icon: <Car className="w-4 h-4" /> },
    { name: "Butler Service", icon: <UserCheck className="w-4 h-4" /> },
    { name: "Wine Cellar", icon: <Wine className="w-4 h-4" /> },
    { name: "Art Gallery", icon: <Camera className="w-4 h-4" /> },
    { name: "Library", icon: <Landmark className="w-4 h-4" /> },
    { name: "Theater", icon: <Theater className="w-4 h-4" /> },
    { name: "Shopping Arcade", icon: <ShoppingBag className="w-4 h-4" /> },
    { name: "Bicycle Rental", icon: <Bike className="w-4 h-4" /> },
    { name: "Pet Amenities", icon: <Dog className="w-4 h-4" /> },
    { name: "In-room Dining", icon: <Coffee className="w-4 h-4" /> },
    { name: "Live Entertainment", icon: <Music className="w-4 h-4" /> },
  ];

  const handleNext = () => {
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // Checks if all required fields for the current tab are valid
  const isCurrentTabValid = () => {
    if (activeTab === "images") {
      return !!mainImageUrl;
    }
    const requiredFields = requiredFieldsByTab[activeTab] || [];
    return requiredFields.every(
      (field) => formData[field as keyof typeof formData] && !errors[field]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-6">
      <title>Luxury Destination Registration</title>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
            Luxury Destination Registration
          </h1>
          <p className="text-slate-600 text-base md:text-lg">
            Register your premium hotel, resort, or luxury accommodation with
            our exclusive network
          </p>
        </div>

        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span>
              Registration submitted successfully! Our team will contact you
              shortly.
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6 gap-1">
              <TabsTrigger
                value="overview"
                className="flex items-center gap-2 py-2"
              >
                <Building2 className="w-4 h-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger
                value="images"
                className="flex items-center gap-2 py-2"
              >
                <Camera className="w-4 h-4" />
                <span className="hidden sm:inline">Images</span>
              </TabsTrigger>
              <TabsTrigger
                value="about"
                className="flex items-center gap-2 py-2"
              >
                <Star className="w-4 h-4" />
                <span className="hidden sm:inline">About</span>
              </TabsTrigger>
              <TabsTrigger
                value="accessibility"
                className="flex items-center gap-2 py-2"
              >
                <Accessibility className="w-4 h-4" />
                <span className="hidden sm:inline">Accessibility</span>
              </TabsTrigger>
              <TabsTrigger
                value="policies"
                className="flex items-center gap-2 py-2"
              >
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Policies</span>
              </TabsTrigger>
            </TabsList>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                {tabLabels.map((label, idx) => (
                  <span
                    key={label}
                    className={`text-xs font-medium ${
                      activeTab === tabOrder[idx]
                        ? "text-blue-700"
                        : "text-slate-400"
                    }`}
                  >
                    {label}
                  </span>
                ))}
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      ((tabOrder.indexOf(activeTab) + 1) / tabOrder.length) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            {/* End Progress Bar */}

            {/* Overview Tab */}
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Property Overview
                  </CardTitle>
                  <CardDescription>
                    Basic information about your luxury destination
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="propertyName">
                        Property Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="propertyName"
                        placeholder="e.g., The Ritz-Carlton Maldives"
                        value={formData.propertyName}
                        onChange={(e) =>
                          handleInputChange("propertyName", e.target.value)
                        }
                        onBlur={(e) =>
                          handleBlur("propertyName", e.target.value)
                        }
                        className={errors.propertyName ? "border-red-500" : ""}
                      />
                      {errors.propertyName && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.propertyName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="propertyType">
                        Property Type <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.propertyType}
                        onValueChange={(value) =>
                          handleInputChange("propertyType", value)
                        }
                      >
                        <SelectTrigger
                          className={
                            errors.propertyType ? "border-red-500" : ""
                          }
                        >
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          {propertyTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.propertyType && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.propertyType}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="starRating">Star Rating</Label>
                      <Select
                        value={formData.starRating}
                        onValueChange={(value) =>
                          handleInputChange("starRating", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select star rating" />
                        </SelectTrigger>
                        <SelectContent>
                          {[3, 4, 5, 6, 7].map((stars) => (
                            <SelectItem key={stars} value={stars.toString()}>
                              {stars} Star{stars > 1 ? "s" : ""}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        onBlur={(e) => handleBlur("phone", e.target.value)}
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">
                      Street Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="address"
                      placeholder="123 Luxury Avenue"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      onBlur={(e) => handleBlur("address", e.target.value)}
                      className={errors.address ? "border-red-500" : ""}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city">
                        City <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="city"
                        placeholder="e.g., Malé"
                        value={formData.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        onBlur={(e) => handleBlur("city", e.target.value)}
                        className={errors.city ? "border-red-500" : ""}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">
                        Country <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) =>
                          handleInputChange("country", value)
                        }
                      >
                        <SelectTrigger
                          className={errors.country ? "border-red-500" : ""}
                        >
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px] overflow-y-auto">
                          {countries.map((country) => (
                            <SelectItem key={country.code} value={country.name}>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.country && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.country}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        placeholder="20000"
                        value={formData.postalCode}
                        onChange={(e) =>
                          handleInputChange("postalCode", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="info@luxuryresort.com"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        onBlur={(e) => handleBlur("email", e.target.value)}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        placeholder="https://www.luxuryresort.com"
                        value={formData.website}
                        onChange={(e) =>
                          handleInputChange("website", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base font-medium">
                      Languages Spoken by Staff
                    </Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {languages.map((language) => (
                        <div
                          key={language}
                          className={`flex items-center space-x-2 p-2 rounded-lg border ${
                            formData.languagesSpoken.includes(language)
                              ? "bg-blue-50 border-blue-200"
                              : "border-gray-200"
                          }`}
                        >
                          <input
                            type="checkbox"
                            id={language}
                            checked={formData.languagesSpoken.includes(
                              language
                            )}
                            onChange={(e) => {
                              if (e.target.checked) {
                                handleInputChange("languagesSpoken", [
                                  ...formData.languagesSpoken,
                                  language,
                                ]);
                              } else {
                                handleInputChange(
                                  "languagesSpoken",
                                  formData.languagesSpoken.filter(
                                    (l) => l !== language
                                  )
                                );
                              }
                            }}
                            className="rounded h-4 w-4 text-blue-600 focus:ring-blue-500"
                          />
                          <Label htmlFor={language} className="text-sm">
                            {language}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="checkInTime">Check-in Time</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="checkInTime"
                          type="time"
                          value={formData.checkInTime}
                          onChange={(e) =>
                            handleInputChange("checkInTime", e.target.value)
                          }
                        />
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="w-4 h-4 text-gray-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Default check-in time for guests</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="checkOutTime">Check-out Time</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="checkOutTime"
                          type="time"
                          value={formData.checkOutTime}
                          onChange={(e) =>
                            handleInputChange("checkOutTime", e.target.value)
                          }
                        />
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="w-4 h-4 text-gray-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Default check-out time for guests</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4">
                <Button
                  type="button"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={handleNext}
                  disabled={!isCurrentTabValid()}
                >
                  Next
                </Button>
              </div>
            </TabsContent>
            {/* Images Tab */}
            <TabsContent value="images">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-800 font-serif tracking-tight">
                    Property Images
                  </h2>
                  <div className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1">
                    <FiInfo className="w-4 h-4" />
                    <span>Max 300 images total</span>
                  </div>
                </div>

                {/* Main Image Upload */}
                <div className="mb-8">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-lg font-semibold text-slate-700">
                      Main Property Image
                    </span>
                    <span className="text-red-500">*</span>
                    {mainImageUrl && !uploadingMain && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        Uploaded
                      </span>
                    )}
                    {uploadingMain && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <FiLoader className="w-3 h-3 animate-spin" />
                        Uploading...
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-slate-500 mb-4">
                    This will be the featured image for your property listing
                  </div>
                  <label className="relative border-2 border-dashed border-blue-100 rounded-xl p-6 bg-gradient-to-br from-slate-50 to-white hover:border-blue-200 transition-all duration-200 group cursor-pointer text-center block">
                    {uploadingMain ? (
                      <div className="flex flex-col items-center justify-center gap-3 h-48">
                        <FiLoader className="h-8 w-8 text-blue-500 animate-spin" />
                        <span className="text-blue-600 font-medium">
                          Uploading image...
                        </span>
                        <div className="w-full bg-slate-200 rounded-full h-1.5 max-w-xs">
                          <div className="bg-blue-600 h-1.5 rounded-full animate-pulse w-3/4"></div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2">
                        {mainImageUrl ? (
                          <>
                            <div className="relative w-full max-w-md">
                              <img
                                src={mainImageUrl}
                                alt="Main Preview"
                                className="w-full h-48 object-cover rounded-lg shadow-md border border-slate-200 mb-3"
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setMainImageUrl("");
                                }}
                                className="absolute top-2 right-2 bg-white/90 hover:bg-red-100 text-red-500 p-1.5 rounded-full shadow-sm transition"
                                aria-label="Remove main image"
                              >
                                <FiX className="w-4 h-4" />
                              </button>
                            </div>
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition cursor-pointer shadow-sm text-blue-600 font-medium">
                              <FiRefreshCw className="w-4 h-4" />
                              Replace Main Image
                            </span>
                          </>
                        ) : (
                          <>
                            <div className="p-3 bg-blue-50 rounded-full mb-2">
                              <FiUpload className="h-6 w-6 text-blue-500" />
                            </div>
                            <span className="block text-blue-600 font-medium">
                              Upload Main Image
                            </span>
                            <p className="text-sm text-slate-400 mt-1">
                              Drag & drop or click to browse (JPEG, PNG, max
                              10MB)
                            </p>
                          </>
                        )}
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleMainImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={uploadingMain}
                    />
                  </label>
                </div>

                {/* Sectioned Images */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-slate-700 font-serif mb-4">
                    Organized Sections
                  </h3>

                  {imageSections.map((section) => (
                    <div key={section} className="mb-6 last:mb-0">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-slate-700">
                          {section} Photos
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                            {sectionImages[section]?.length || 0} photos
                          </span>
                          {uploadingSection === section ? (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1">
                              <FiLoader className="w-3 h-3 animate-spin" />
                              Uploading...
                            </span>
                          ) : (
                            sectionImages[section]?.length > 0 && (
                              <button
                                type="button"
                                onClick={() => {
                                  if (
                                    confirm(`Remove all ${section} photos?`)
                                  ) {
                                    setSectionImages((prev) => ({
                                      ...prev,
                                      [section]: [],
                                    }));
                                  }
                                }}
                                className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
                              >
                                <FiTrash2 className="w-3 h-3" />
                                Remove all
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        {uploadingSection === section ? (
                          <div className="border-2 border-dashed border-blue-100 rounded-lg p-6 bg-blue-50/50 flex flex-col items-center justify-center gap-3">
                            <FiLoader className="h-8 w-8 text-blue-500 animate-spin" />
                            <span className="text-blue-600 font-medium">
                              Uploading images...
                            </span>
                            <div className="w-full bg-slate-200 rounded-full h-1.5 max-w-xs">
                              <div className="bg-blue-600 h-1.5 rounded-full animate-pulse w-3/4"></div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 bg-white hover:bg-slate-50 transition cursor-pointer">
                              <label className="flex flex-col items-center justify-center gap-2 cursor-pointer">
                                <div className="p-2 bg-blue-50 rounded-full">
                                  <FiUpload className="h-5 w-5 text-blue-500" />
                                </div>
                                <span className="text-blue-600 font-medium text-sm">
                                  Add {section} Photos
                                </span>
                                <p className="text-xs text-slate-400">
                                  JPEG or PNG, max 10MB each
                                </p>
                                <input
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  onChange={(e) =>
                                    handleSectionImagesUpload(section, e)
                                  }
                                  className="sr-only"
                                  disabled={uploadingSection === section}
                                />
                              </label>
                            </div>

                            {(sectionImages[section]?.length ?? 0) > 0 && (
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {sectionImages[section].map((src, idx) => (
                                  <div key={idx} className="relative group">
                                    <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-100">
                                      <img
                                        src={src}
                                        alt={`${section} ${idx + 1}`}
                                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                      />
                                      <button
                                        type="button"
                                        onClick={() =>
                                          removeSectionImage(section, idx)
                                        }
                                        className="absolute top-2 right-2 bg-white/90 hover:bg-red-100 text-red-500 p-1.5 rounded-full shadow-sm transition opacity-0 group-hover:opacity-100"
                                        aria-label="Remove image"
                                      >
                                        <FiX className="w-4 h-4" />
                                      </button>
                                    </div>
                                    <div className="mt-2 relative">
                                      <input
                                        type="text"
                                        value={
                                          imageDescriptions[section]?.[idx] ||
                                          ""
                                        }
                                        onChange={(e) =>
                                          handleImageDescriptionChange(
                                            section,
                                            idx,
                                            e.target.value
                                          )
                                        }
                                        placeholder="Add image description..."
                                        className="w-full text-sm border border-slate-200 rounded px-3 py-2 pr-8 focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition"
                                      />
                                      {imageDescriptions[section]?.[idx] && (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleImageDescriptionChange(
                                              section,
                                              idx,
                                              ""
                                            )
                                          }
                                          className="absolute right-2 top-2 text-slate-400 hover:text-red-500"
                                          aria-label="Clear description"
                                        >
                                          <FiX className="w-4 h-4" />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Custom Section */}
                <div className="border-t border-slate-100 pt-6">
                  <h3 className="text-lg font-semibold text-slate-700 mb-3">
                    Add Custom Section
                  </h3>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={customSectionName}
                      onChange={(e) => setCustomSectionName(e.target.value)}
                      placeholder="e.g. Rooftop, Garden, Gym"
                      className="flex-1 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomSection}
                      disabled={!customSectionName.trim()}
                      className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition"
                    >
                      <FiPlus className="w-4 h-4" />
                      Add Section
                    </button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* About Tab */}
            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    About Your Property
                  </CardTitle>
                  <CardDescription>
                    Detailed information about your luxury destination
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="description">
                      Property Description{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your luxury destination, its unique features, and what makes it special..."
                      rows={6}
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      onBlur={(e) => handleBlur("description", e.target.value)}
                      className={errors.description ? "border-red-500" : ""}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.description}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      Minimum 200 characters. Describe the unique experience
                      guests can expect.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="highlights">Key Highlights</Label>
                    <Textarea
                      id="highlights"
                      placeholder="List the main highlights and unique selling points of your property (one per line)..."
                      rows={4}
                      value={formData.highlights}
                      onChange={(e) =>
                        handleInputChange("highlights", e.target.value)
                      }
                    />
                    <p className="text-sm text-gray-500">
                      Separate each highlight with a new line. These will be
                      displayed as bullet points.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="awards">Awards & Recognitions</Label>
                    <Textarea
                      id="awards"
                      placeholder="List any awards, recognitions, or notable mentions your property has received..."
                      rows={3}
                      value={formData.awards}
                      onChange={(e) =>
                        handleInputChange("awards", e.target.value)
                      }
                    />
                    <p className="text-sm text-gray-500">
                      Example: "Condé Nast Traveler Gold List 2023"
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base font-medium">
                      Amenities & Services
                    </Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {amenities.map((amenity) => (
                        <div
                          key={amenity.name}
                          className={`flex items-center space-x-2 p-2 rounded-lg border ${
                            formData.amenities.includes(amenity.name)
                              ? "bg-blue-50 border-blue-200"
                              : "border-gray-200"
                          }`}
                        >
                          <input
                            type="checkbox"
                            id={amenity.name}
                            checked={formData.amenities.includes(amenity.name)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                handleInputChange("amenities", [
                                  ...formData.amenities,
                                  amenity.name,
                                ]);
                              } else {
                                handleInputChange(
                                  "amenities",
                                  formData.amenities.filter(
                                    (a) => a !== amenity.name
                                  )
                                );
                              }
                            }}
                            className="rounded h-4 w-4 text-blue-600 focus:ring-blue-500"
                          />
                          <Label
                            htmlFor={amenity.name}
                            className="text-sm flex items-center gap-2"
                          >
                            {amenity.icon}
                            {amenity.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base font-medium">
                      Sustainability Practices
                    </Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {sustainabilityPractices.map((practice) => (
                        <div
                          key={practice}
                          className={`flex items-center space-x-2 p-2 rounded-lg border ${
                            formData.sustainabilityPractices.includes(practice)
                              ? "bg-blue-50 border-blue-200"
                              : "border-gray-200"
                          }`}
                        >
                          <input
                            type="checkbox"
                            id={practice}
                            checked={formData.sustainabilityPractices.includes(
                              practice
                            )}
                            onChange={(e) => {
                              if (e.target.checked) {
                                handleInputChange("sustainabilityPractices", [
                                  ...formData.sustainabilityPractices,
                                  practice,
                                ]);
                              } else {
                                handleInputChange(
                                  "sustainabilityPractices",
                                  formData.sustainabilityPractices.filter(
                                    (p) => p !== practice
                                  )
                                );
                              }
                            }}
                            className="rounded h-4 w-4 text-blue-600 focus:ring-blue-500"
                          />
                          <Label htmlFor={practice} className="text-sm">
                            {practice}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="roomTypes">Room Types</Label>
                      <Textarea
                        id="roomTypes"
                        placeholder="e.g., Deluxe Room, Suite, Presidential Suite, Villa..."
                        rows={3}
                        value={formData.roomTypes}
                        onChange={(e) =>
                          handleInputChange("roomTypes", e.target.value)
                        }
                      />
                      <p className="text-sm text-gray-500">
                        Separate each room type with a comma
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="totalRooms">Total Number of Rooms</Label>
                      <Input
                        id="totalRooms"
                        type="number"
                        min="0"
                        placeholder="150"
                        value={formData.totalRooms}
                        onChange={(e) =>
                          handleInputChange("totalRooms", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="yearBuilt">Year Built</Label>
                      <Input
                        id="yearBuilt"
                        type="number"
                        min="1800"
                        max={new Date().getFullYear()}
                        placeholder="2010"
                        value={formData.yearBuilt}
                        onChange={(e) =>
                          handleInputChange("yearBuilt", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastRenovated">Last Renovated</Label>
                      <Input
                        id="lastRenovated"
                        type="number"
                        min="1800"
                        max={new Date().getFullYear()}
                        placeholder="2023"
                        value={formData.lastRenovated}
                        onChange={(e) =>
                          handleInputChange("lastRenovated", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4">
                <Button
                  type="button"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={handleNext}
                  disabled={!isCurrentTabValid()}
                >
                  Next
                </Button>
              </div>
            </TabsContent>

            {/* Accessibility Tab */}
            <TabsContent value="accessibility">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Accessibility className="w-5 h-5" />
                    Accessibility Features
                  </CardTitle>
                  <CardDescription>
                    Information about accessibility features for guests with
                    disabilities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="accessibleRooms">
                        Number of Accessible Rooms
                      </Label>
                      <Input
                        id="accessibleRooms"
                        type="number"
                        min="0"
                        placeholder="5"
                        value={formData.accessibleRooms}
                        onChange={(e) =>
                          handleInputChange("accessibleRooms", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base font-medium">
                      Accessibility Features
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        className={`flex items-center space-x-3 p-3 rounded-lg border ${
                          formData.wheelchairAccessible
                            ? "bg-blue-50 border-blue-200"
                            : "border-gray-200"
                        }`}
                      >
                        <input
                          type="checkbox"
                          id="wheelchairAccessible"
                          checked={formData.wheelchairAccessible}
                          onChange={(e) =>
                            handleInputChange(
                              "wheelchairAccessible",
                              e.target.checked
                            )
                          }
                          className="rounded h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <Label
                          htmlFor="wheelchairAccessible"
                          className="flex items-center gap-2"
                        >
                          <Accessibility className="w-4 h-4" />
                          Wheelchair Accessible
                        </Label>
                      </div>

                      <div
                        className={`flex items-center space-x-3 p-3 rounded-lg border ${
                          formData.accessibleBathrooms
                            ? "bg-blue-50 border-blue-200"
                            : "border-gray-200"
                        }`}
                      >
                        <input
                          type="checkbox"
                          id="accessibleBathrooms"
                          checked={formData.accessibleBathrooms}
                          onChange={(e) =>
                            handleInputChange(
                              "accessibleBathrooms",
                              e.target.checked
                            )
                          }
                          className="rounded h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <Label
                          htmlFor="accessibleBathrooms"
                          className="flex items-center gap-2"
                        >
                          <Accessibility className="w-4 h-4" />
                          Accessible Bathrooms
                        </Label>
                      </div>

                      <div
                        className={`flex items-center space-x-3 p-3 rounded-lg border ${
                          formData.accessibleParking
                            ? "bg-blue-50 border-blue-200"
                            : "border-gray-200"
                        }`}
                      >
                        <input
                          type="checkbox"
                          id="accessibleParking"
                          checked={formData.accessibleParking}
                          onChange={(e) =>
                            handleInputChange(
                              "accessibleParking",
                              e.target.checked
                            )
                          }
                          className="rounded h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <Label
                          htmlFor="accessibleParking"
                          className="flex items-center gap-2"
                        >
                          <Parking className="w-4 h-4" />
                          Accessible Parking
                        </Label>
                      </div>

                      <div
                        className={`flex items-center space-x-3 p-3 rounded-lg border ${
                          formData.accessibleRestaurants
                            ? "bg-blue-50 border-blue-200"
                            : "border-gray-200"
                        }`}
                      >
                        <input
                          type="checkbox"
                          id="accessibleRestaurants"
                          checked={formData.accessibleRestaurants}
                          onChange={(e) =>
                            handleInputChange(
                              "accessibleRestaurants",
                              e.target.checked
                            )
                          }
                          className="rounded h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <Label
                          htmlFor="accessibleRestaurants"
                          className="flex items-center gap-2"
                        >
                          <UtensilsCrossed className="w-4 h-4" />
                          Accessible Restaurants
                        </Label>
                      </div>

                      <div
                        className={`flex items-center space-x-3 p-3 rounded-lg border ${
                          formData.accessiblePools
                            ? "bg-blue-50 border-blue-200"
                            : "border-gray-200"
                        }`}
                      >
                        <input
                          type="checkbox"
                          id="accessiblePools"
                          checked={formData.accessiblePools}
                          onChange={(e) =>
                            handleInputChange(
                              "accessiblePools",
                              e.target.checked
                            )
                          }
                          className="rounded h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <Label
                          htmlFor="accessiblePools"
                          className="flex items-center gap-2"
                        >
                          <Waves className="w-4 h-4" />
                          Accessible Pools
                        </Label>
                      </div>

                      <div
                        className={`flex items-center space-x-3 p-3 rounded-lg border ${
                          formData.brailleSignage
                            ? "bg-blue-50 border-blue-200"
                            : "border-gray-200"
                        }`}
                      >
                        <input
                          type="checkbox"
                          id="brailleSignage"
                          checked={formData.brailleSignage}
                          onChange={(e) =>
                            handleInputChange(
                              "brailleSignage",
                              e.target.checked
                            )
                          }
                          className="rounded h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <Label
                          htmlFor="brailleSignage"
                          className="flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          Braille Signage
                        </Label>
                      </div>

                      <div
                        className={`flex items-center space-x-3 p-3 rounded-lg border ${
                          formData.hearingImpairedServices
                            ? "bg-blue-50 border-blue-200"
                            : "border-gray-200"
                        }`}
                      >
                        <input
                          type="checkbox"
                          id="hearingImpairedServices"
                          checked={formData.hearingImpairedServices}
                          onChange={(e) =>
                            handleInputChange(
                              "hearingImpairedServices",
                              e.target.checked
                            )
                          }
                          className="rounded h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <Label
                          htmlFor="hearingImpairedServices"
                          className="flex items-center gap-2"
                        >
                          <Ear className="w-4 h-4" />
                          Hearing Impaired Services
                        </Label>
                      </div>

                      <div
                        className={`flex items-center space-x-3 p-3 rounded-lg border ${
                          formData.visualImpairedServices
                            ? "bg-blue-50 border-blue-200"
                            : "border-gray-200"
                        }`}
                      >
                        <input
                          type="checkbox"
                          id="visualImpairedServices"
                          checked={formData.visualImpairedServices}
                          onChange={(e) =>
                            handleInputChange(
                              "visualImpairedServices",
                              e.target.checked
                            )
                          }
                          className="rounded h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <Label
                          htmlFor="visualImpairedServices"
                          className="flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          Visual Impaired Services
                        </Label>
                      </div>

                      <div
                        className={`flex items-center space-x-3 p-3 rounded-lg border ${
                          formData.serviceAnimalsAllowed
                            ? "bg-blue-50 border-blue-200"
                            : "border-gray-200"
                        }`}
                      >
                        <input
                          type="checkbox"
                          id="serviceAnimalsAllowed"
                          checked={formData.serviceAnimalsAllowed}
                          onChange={(e) =>
                            handleInputChange(
                              "serviceAnimalsAllowed",
                              e.target.checked
                            )
                          }
                          className="rounded h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <Label
                          htmlFor="serviceAnimalsAllowed"
                          className="flex items-center gap-2"
                        >
                          <Heart className="w-4 h-4" />
                          Service Animals Allowed
                        </Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4">
                <Button
                  type="button"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={handleNext}
                  disabled={!isCurrentTabValid()}
                >
                  Next
                </Button>
              </div>
            </TabsContent>

            {/* Policies Tab */}
            <TabsContent value="policies">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Hotel Policies
                  </CardTitle>
                  <CardDescription>
                    Important policies and rules for your guests
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="cancellationPolicy">
                      Cancellation Policy{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="cancellationPolicy"
                      placeholder="Describe your cancellation policy, including timeframes and fees..."
                      rows={4}
                      value={formData.cancellationPolicy}
                      onChange={(e) =>
                        handleInputChange("cancellationPolicy", e.target.value)
                      }
                      onBlur={(e) =>
                        handleBlur("cancellationPolicy", e.target.value)
                      }
                      className={
                        errors.cancellationPolicy ? "border-red-500" : ""
                      }
                    />
                    {errors.cancellationPolicy && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.cancellationPolicy}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      Be clear about deadlines and any penalties for
                      cancellations.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="petPolicy">Pet Policy</Label>
                      <Textarea
                        id="petPolicy"
                        placeholder="Are pets allowed? Any restrictions or fees?"
                        rows={3}
                        value={formData.petPolicy}
                        onChange={(e) =>
                          handleInputChange("petPolicy", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="smokingPolicy">Smoking Policy</Label>
                      <Textarea
                        id="smokingPolicy"
                        placeholder="Smoking allowed? Designated areas?"
                        rows={3}
                        value={formData.smokingPolicy}
                        onChange={(e) =>
                          handleInputChange("smokingPolicy", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="childrenPolicy">Children Policy</Label>
                      <Textarea
                        id="childrenPolicy"
                        placeholder="Age restrictions, child rates, facilities for children..."
                        rows={3}
                        value={formData.childrenPolicy}
                        onChange={(e) =>
                          handleInputChange("childrenPolicy", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="groupPolicy">Group Policy</Label>
                      <Textarea
                        id="groupPolicy"
                        placeholder="Group booking policies, minimum group size, special rates..."
                        rows={3}
                        value={formData.groupPolicy}
                        onChange={(e) =>
                          handleInputChange("groupPolicy", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="specialOffers">Special Offers</Label>
                      <Textarea
                        id="specialOffers"
                        placeholder="Describe any ongoing special offers, packages, or seasonal promotions..."
                        rows={3}
                        value={formData.specialOffers}
                        onChange={(e) =>
                          handleInputChange("specialOffers", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="loyaltyProgram">Loyalty Program</Label>
                      <div className="flex items-center gap-3 p-2">
                        <input
                          type="checkbox"
                          id="loyaltyProgram"
                          checked={formData.loyaltyProgram}
                          onChange={(e) =>
                            handleInputChange(
                              "loyaltyProgram",
                              e.target.checked
                            )
                          }
                          className="rounded h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <Label htmlFor="loyaltyProgram">
                          We offer a loyalty/rewards program
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="depositAmount">Deposit Amount</Label>
                      <Input
                        id="depositAmount"
                        placeholder="e.g., 50% of total booking"
                        value={formData.depositAmount}
                        onChange={(e) =>
                          handleInputChange("depositAmount", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="minimumStay">Minimum Stay</Label>
                      <Input
                        id="minimumStay"
                        placeholder="e.g., 2 nights"
                        value={formData.minimumStay}
                        onChange={(e) =>
                          handleInputChange("minimumStay", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="ageRestriction">Age Restriction</Label>
                      <Input
                        id="ageRestriction"
                        placeholder="e.g., 18+ for check-in"
                        value={formData.ageRestriction}
                        onChange={(e) =>
                          handleInputChange("ageRestriction", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quietHours">Quiet Hours</Label>
                      <Input
                        id="quietHours"
                        placeholder="e.g., 10:00 PM - 8:00 AM"
                        value={formData.quietHours}
                        onChange={(e) =>
                          handleInputChange("quietHours", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting || !isCurrentTabValid()}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
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
                      Submitting...
                    </span>
                  ) : (
                    "Submit Registration"
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </div>
    </div>
  );
}

export default Registration;
