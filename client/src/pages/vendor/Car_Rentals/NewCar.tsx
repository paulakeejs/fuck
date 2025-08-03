import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import RichTextEditor from "@/components/RichTextEditor";
import { UploadCloud, Loader2 } from "lucide-react";
import { toast } from "sonner";
import carApi from "./api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LUXURY_BRANDS = [
  "Rolls-Royce",
  "Bentley",
  "Lamborghini",
  "Ferrari",
  "Aston Martin",
  "Porsche",
  "Maserati",
  "Mercedes-Benz",
  "BMW",
  "Audi",
  "Land Rover",
  "Jaguar",
  "Tesla",
  "McLaren",
  "Bugatti",
  "Maybach",
  "Lexus",
  "Alfa Romeo",
  "Genesis",
];

const TRANSMISSIONS = ["Automatic", "Manual", "Semi-Automatic", "CVT"];
const FUEL_TYPES = [
  "Petrol",
  "Diesel",
  "Electric",
  "Hybrid",
  "Plug-in Hybrid",
  "Hydrogen",
];
const DRIVE_TYPES = [
  "Rear Wheel Drive",
  "Front Wheel Drive",
  "All Wheel Drive",
  "Four Wheel Drive",
];
const CAR_TYPES = [
  "Sedan",
  "SUV",
  "Coupe",
  "Convertible",
  "Sports Car",
  "Supercar",
  "Hypercar",
  "Wagon",
  "Limousine",
];
const CONDITION_LEVELS = ["Brand New", "Like New", "Excellent", "Good", "Fair"];
const FEATURES = [
  "GPS Navigation",
  "Leather Seats",
  "Bluetooth",
  "Backup Camera",
  "Heated Seats",
  "Cooled Seats",
  "Massage Seats",
  "Sunroof",
  "Panoramic Roof",
  "Premium Sound System",
  "Apple CarPlay",
  "Android Auto",
  "Wireless Charging",
  "Heads-Up Display",
  "Night Vision",
  "Adaptive Cruise Control",
  "Lane Keep Assist",
  "360° Camera",
  "Self-Parking",
  "Keyless Entry",
  "Push Button Start",
  "Tinted Windows",
  "Ambient Lighting",
  "Rear Entertainment",
  "Climate Control",
];

// Add this helper for the Cloudinary widget
const CLOUDINARY_CLOUD_NAME = "dnsgznjyo";
const CLOUDINARY_UPLOAD_PRESET = "images";

function NewCar() {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [mileage, setMileage] = useState("");
  const [engineSize, setEngineSize] = useState("");
  const [horsepower, setHorsepower] = useState("");
  const [acceleration, setAcceleration] = useState("");
  const [topSpeed, setTopSpeed] = useState("");
  const [carImages, setCarImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [location, setLocation] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const vendor = useSelector((state: any) => state.vendor.vendor);
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [cityLoading, setCityLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFeatureChange = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  // New: Handle file input and upload to Cloudinary
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadError(null);
    const uploadedUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("folder", "luxury-cars");
      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        if (data.secure_url) {
          uploadedUrls.push(data.secure_url);
        } else {
          setUploadError("Failed to upload one or more images.");
        }
      } catch (err) {
        setUploadError("Failed to upload one or more images.");
      }
    }
    setCarImages((prev) => [...prev, ...uploadedUrls]);
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);

    // Validation
    if (!location || location.trim() === "") {
      setFormError("Pickup location is required.");
      setSubmitting(false);
      return;
    }
    if (carImages.length === 0) {
      setFormError("Please upload at least one car image.");
      setSubmitting(false);
      return;
    }
    // You can add more validations here as needed

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Build the payload
    const payload = {
      brand: formData.get("brand"),
      model: formData.get("model"),
      year: formData.get("year"),
      carType: formData.get("carType"),
      color: formData.get("color"),
      interiorColor: formData.get("interiorColor"),
      seats: formData.get("seats"),
      doors: formData.get("doors"),
      transmission: formData.get("transmission"),
      driveType: formData.get("driveType"),
      fuel: formData.get("fuel"),
      condition: formData.get("condition"),
      price: formData.get("price"),
      weeklyDiscount: formData.get("weeklyDiscount"),
      monthlyDiscount: formData.get("monthlyDiscount"),
      deposit: formData.get("deposit"),
      vin: formData.get("vin"),
      licensePlate: formData.get("licensePlate"),
      deliveryOption: formData.get("deliveryOption"),
      insuranceInfo: formData.get("insuranceInfo"),
      rentalTerms: formData.get("rentalTerms"),
      // Controlled fields:
      description,
      features: selectedFeatures,
      isFeatured,
      isAvailable,
      mileage,
      engineSize,
      horsepower,
      acceleration,
      topSpeed,
      images: carImages,
      location,
      vendorId: vendor.id,
    };

    try {
      const response = await carApi.post("/new", payload);
      if (response.data.success) {
        navigate("/lux/listings");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      toast(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Detect user location on mount
  useEffect(() => {
    const fetchLocation: () => Promise<void> = async () => {
      setLocationLoading(true);

      // Try Geolocation API first
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              // Use a reverse geocoding API to get city/state from lat/lon
              const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
              );
              const data = await res.json();
              if (data && data.address) {
                const city =
                  data.address.city ||
                  data.address.town ||
                  data.address.village ||
                  "";
                const state = data.address.state || "";
                const country = data.address.country_code
                  ? data.address.country_code.toUpperCase()
                  : "";
                setLocation([city, state, country].filter(Boolean).join(", "));
              }
            } catch (err) {
              setLocationError("Failed to get location from coordinates.");
            }
            setLocationLoading(false);
          },
          async (error) => {
            console.log(error);
            // Fallback to IP geolocation
            try {
              const res = await fetch("https://ipapi.co/json/");
              const data = await res.json();
              if (data && data.city && data.region && data.country_code) {
                setLocation(
                  `${data.city}, ${data.region}, ${data.country_code}`
                );
              }
            } catch (err) {
              setLocationError("Failed to get location from IP address.");
            }
            setLocationLoading(false);
          }
        );
      } else {
        // If Geolocation API not available, fallback to IP geolocation
        try {
          const res = await fetch("https://ipapi.co/json/");
          const data = await res.json();
          if (data && data.city && data.region && data.country_code) {
            setLocation(`${data.city}, ${data.region}, ${data.country_code}`);
          }
        } catch (err) {
          setLocationError("Failed to get location from IP address.");
        }
        setLocationLoading(false);
      }
    };
    fetchLocation();
  }, []);

  const fetchCitySuggestions = async (query: string) => {
    if (!query) {
      setCitySuggestions([]);
      return;
    }
    setCityLoading(true);
    try {
      const res = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${encodeURIComponent(
          query
        )}&limit=10&sort=-population`,
        {
          headers: {
            "X-RapidAPI-Key":
              "72a3073863msh8e55c9def9e10c8p1912f1jsnc072631e094b", // <-- Replace with your key
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );
      const data = await res.json();
      if (data.data) {
        setCitySuggestions(
          data.data.map(
            (city: any) =>
              `${city.city}, ${city.regionCode || city.region}, ${
                city.countryCode
              }`
          )
        );
      }
    } catch (err) {
      setCitySuggestions([]);
    }
    setCityLoading(false);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);

    if (value.length > 1) {
      fetchCitySuggestions(value);
    } else {
      setCitySuggestions([]);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-12">
      <Card className="w-full max-w-4xl shadow-2xl border border-gray-200 rounded-3xl bg-white p-2 md:p-8">
        <CardHeader>
          <CardTitle className="text-4xl font-serif mb-2 tracking-tight text-gray-900 drop-shadow-sm">
            List a Luxury Car
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground mb-2">
            Enter comprehensive details to add a new luxury car for rent.
            Complete information increases rental potential.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-12">
            {/* Basic Details */}
            <div className="mb-2">
              <h2 className="text-2xl font-bold mb-6 text-primary border-l-4 border-primary pl-4 bg-gray-50 py-2 rounded shadow-sm">
                Basic Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Label htmlFor="brand">Brand *</Label>
                  <Select name="brand" required>
                    <SelectTrigger className="mt-1 focus:ring-2 focus:ring-primary/50">
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {LUXURY_BRANDS.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="model">Model *</Label>
                  <Input
                    id="model"
                    name="model"
                    placeholder="e.g. Phantom, Continental GT, Urus"
                    required
                    className="mt-1 focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <Label htmlFor="year">Manufacture Year *</Label>
                  <Input
                    id="year"
                    name="year"
                    type="number"
                    min="1990"
                    max={new Date().getFullYear()}
                    placeholder="e.g. 2023"
                    required
                    className="mt-1 focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <Label htmlFor="carType">Vehicle Type *</Label>
                  <Select name="carType" required>
                    <SelectTrigger className="mt-1 focus:ring-2 focus:ring-primary/50">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {CAR_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="color">Exterior Color *</Label>
                  <Input
                    id="color"
                    name="color"
                    placeholder="e.g. Metallic Black, Pearl White"
                    required
                    className="mt-1 focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <Label htmlFor="interiorColor">Interior Color *</Label>
                  <Input
                    id="interiorColor"
                    name="interiorColor"
                    placeholder="e.g. Cognac Leather, Black Alcantara"
                    required
                    className="mt-1 focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <Label htmlFor="seats">Number of Seats *</Label>
                  <Input
                    id="seats"
                    name="seats"
                    type="number"
                    min="2"
                    max="8"
                    placeholder="e.g. 4"
                    required
                    className="mt-1 focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <Label htmlFor="doors">Number of Doors</Label>
                  <Input
                    id="doors"
                    name="doors"
                    type="number"
                    min="2"
                    max="6"
                    placeholder="e.g. 2 or 4"
                    className="mt-1 focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
            </div>

            <hr className="my-6 border-gray-200" />

            {/* Specifications */}
            <div className="mb-2">
              <h2 className="text-2xl font-bold mb-6 text-primary border-l-4 border-primary pl-4 bg-gray-50 py-2 rounded shadow-sm">
                Specifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Label htmlFor="transmission">Transmission *</Label>
                  <Select name="transmission" required>
                    <SelectTrigger className="mt-1 focus:ring-2 focus:ring-primary/50">
                      <SelectValue placeholder="Select transmission" />
                    </SelectTrigger>
                    <SelectContent>
                      {TRANSMISSIONS.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="driveType">Drive Type *</Label>
                  <Select name="driveType" required>
                    <SelectTrigger className="mt-1 focus:ring-2 focus:ring-primary/50">
                      <SelectValue placeholder="Select drive type" />
                    </SelectTrigger>
                    <SelectContent>
                      {DRIVE_TYPES.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="fuel">Fuel Type *</Label>
                  <Select name="fuel" required>
                    <SelectTrigger className="mt-1 focus:ring-2 focus:ring-primary/50">
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      {FUEL_TYPES.map((f) => (
                        <SelectItem key={f} value={f}>
                          {f}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="engineSize">Engine Size (L)</Label>
                  <Input
                    id="engineSize"
                    name="engineSize"
                    type="text"
                    placeholder="e.g. 4.0 V8, 6.6L V12"
                    value={engineSize}
                    onChange={(e) => setEngineSize(e.target.value)}
                    className="mt-1 focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <Label htmlFor="horsepower">Horsepower (HP)</Label>
                  <Input
                    id="horsepower"
                    name="horsepower"
                    type="number"
                    min="0"
                    placeholder="e.g. 563"
                    value={horsepower}
                    onChange={(e) => setHorsepower(e.target.value)}
                    className="mt-1 focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <Label htmlFor="acceleration">0-60 mph (seconds)</Label>
                  <Input
                    id="acceleration"
                    name="acceleration"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="e.g. 3.5"
                    value={acceleration}
                    onChange={(e) => setAcceleration(e.target.value)}
                    className="mt-1 focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <Label htmlFor="topSpeed">Top Speed (mph)</Label>
                  <Input
                    id="topSpeed"
                    name="topSpeed"
                    type="number"
                    min="0"
                    placeholder="e.g. 155"
                    value={topSpeed}
                    onChange={(e) => setTopSpeed(e.target.value)}
                    className="mt-1 focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <Label htmlFor="mileage">Mileage (mi)</Label>
                  <Input
                    id="mileage"
                    name="mileage"
                    type="number"
                    min="0"
                    placeholder="e.g. 12000"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    className="mt-1 focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <Label htmlFor="condition">Condition</Label>
                  <Select name="condition">
                    <SelectTrigger className="mt-1 focus:ring-2 focus:ring-primary/50">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {CONDITION_LEVELS.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <hr className="my-6 border-gray-200" />

            {/* Pricing */}
            <div className="mb-2">
              <h2 className="text-2xl font-bold mb-6 text-primary border-l-4 border-primary pl-4 bg-gray-50 py-2 rounded shadow-sm">
                Pricing
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Label htmlFor="price">Daily Rental Price ($) *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="e.g. 999"
                    required
                    className="mt-1 focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <Label htmlFor="weeklyDiscount">Weekly Discount (%)</Label>
                  <Input
                    id="weeklyDiscount"
                    name="weeklyDiscount"
                    type="number"
                    min="0"
                    max="50"
                    placeholder="e.g. 10"
                    className="mt-1 focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <Label htmlFor="monthlyDiscount">Monthly Discount (%)</Label>
                  <Input
                    id="monthlyDiscount"
                    name="monthlyDiscount"
                    type="number"
                    min="0"
                    max="50"
                    placeholder="e.g. 20"
                    className="mt-1 focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <Label htmlFor="deposit">Security Deposit ($)</Label>
                  <Input
                    id="deposit"
                    name="deposit"
                    type="number"
                    min="0"
                    placeholder="e.g. 5000"
                    className="mt-1 focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <Label htmlFor="vin">
                    VIN (Vehicle Identification Number)
                  </Label>
                  <Input
                    id="vin"
                    name="vin"
                    placeholder="17-character VIN"
                    maxLength={17}
                    className="mt-1 focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <Label htmlFor="licensePlate">License Plate</Label>
                  <Input
                    id="licensePlate"
                    name="licensePlate"
                    placeholder="e.g. LUX2023"
                    className="mt-1 focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
            </div>

            <hr className="my-6 border-gray-200" />

            {/* Images */}
            <div className="mb-2">
              <h2 className="text-2xl font-bold mb-6 text-primary border-l-4 border-primary pl-4 bg-gray-50 py-2 rounded shadow-sm">
                Car Images
              </h2>
              <div className="space-y-2 bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm">
                {/* Hidden file input */}
                <input
                  id="images"
                  name="images"
                  type="file"
                  accept="image/*"
                  multiple
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
                {/* Styled upload button */}
                <Button
                  type="button"
                  size="lg"
                  variant="default"
                  className="mb-2 flex items-center gap-2 px-6 py-3 text-base font-semibold shadow-md bg-primary hover:bg-primary/90 focus:ring-2 focus:ring-primary/50 transition"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? (
                    <Loader2 className="animate-spin size-5" />
                  ) : (
                    <UploadCloud className="size-5" />
                  )}
                  {uploading ? "Uploading..." : "Upload Images"}
                </Button>
                {uploadError && (
                  <div className="text-xs text-red-600">{uploadError}</div>
                )}
                <div className="flex flex-wrap gap-2">
                  {carImages.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`Car Image ${idx + 1}`}
                      className="w-24 h-24 object-cover rounded border border-gray-200 shadow-sm hover:scale-105 transition"
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  Upload high-quality images (5-10 recommended). Include
                  exterior, interior, dashboard, and special features.
                </span>
                {formError && carImages.length === 0 && (
                  <div className="text-xs text-red-600 mt-1">{formError}</div>
                )}
              </div>
            </div>

            <hr className="my-6 border-gray-200" />

            {/* Description */}
            <div className="mb-2">
              <h2 className="text-2xl font-bold mb-6 text-primary border-l-4 border-primary pl-4 bg-gray-50 py-2 rounded shadow-sm">
                Detailed Description
              </h2>
              <RichTextEditor
                value={description}
                onChange={setDescription}
                placeholder="Describe the car's features, condition, unique aspects, rental terms, and what makes it special..."
                className="mt-1 bg-white rounded-lg border border-gray-100 shadow focus:ring-2 focus:ring-primary/50 min-h-[120px]"
              />
            </div>

            <hr className="my-6 border-gray-200" />

            {/* Location & Availability */}
            <div className="mb-2">
              <h2 className="text-2xl font-bold mb-6 text-primary border-l-4 border-primary pl-4 bg-gray-50 py-2 rounded shadow-sm">
                Location & Availability
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
                <div>
                  <Label htmlFor="location">Pickup Location *</Label>
                  <div className="relative">
                    <Input
                      id="location"
                      name="location"
                      placeholder="e.g. Miami Beach, FL"
                      required
                      className="mt-1 focus:ring-2 focus:ring-primary/50"
                      value={location}
                      onChange={handleLocationChange}
                      disabled={locationLoading}
                      autoComplete="off"
                    />
                    {cityLoading && (
                      <div className="absolute left-0 mt-1 text-xs text-muted-foreground">
                        Loading...
                      </div>
                    )}
                    {citySuggestions.length > 0 && (
                      <ul className="absolute z-10 bg-white border rounded shadow max-h-48 overflow-y-auto w-full">
                        {citySuggestions.map((city, idx) => (
                          <li
                            key={idx}
                            className="px-4 py-2 hover:bg-primary/10 cursor-pointer"
                            onClick={() => {
                              setLocation(city);
                              setCitySuggestions([]);
                            }}
                          >
                            {city}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {formError && (
                    <span className="text-xs text-red-600 block mt-1">
                      {formError}
                    </span>
                  )}
                  {locationLoading && (
                    <span className="text-xs text-muted-foreground">
                      Detecting your location...
                    </span>
                  )}
                  {locationError && (
                    <span className="text-xs text-red-600">
                      {locationError}
                    </span>
                  )}
                </div>
                <div>
                  <Label htmlFor="deliveryOption">Delivery Option</Label>
                  <Select name="deliveryOption">
                    <SelectTrigger className="mt-1 focus:ring-2 focus:ring-primary/50">
                      <SelectValue placeholder="Select delivery option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Not Available</SelectItem>
                      <SelectItem value="local">
                        Local Delivery (+$50)
                      </SelectItem>
                      <SelectItem value="airport">
                        Airport Delivery (+$100)
                      </SelectItem>
                      <SelectItem value="custom">
                        Custom (Contact for Quote)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <hr className="my-6 border-gray-200" />

            {/* Features & Amenities */}
            <div className="mb-2">
              <h2 className="text-2xl font-bold mb-6 text-primary border-l-4 border-primary pl-4 bg-gray-50 py-2 rounded shadow-sm">
                Features & Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
                {FEATURES.map((feature) => (
                  <label
                    key={feature}
                    className="flex items-center gap-2 text-sm font-normal hover:bg-primary/10 rounded-lg px-3 py-2 cursor-pointer transition border border-transparent hover:border-primary/30 shadow-sm"
                  >
                    <Checkbox
                      checked={selectedFeatures.includes(feature)}
                      onCheckedChange={() => handleFeatureChange(feature)}
                    />
                    {feature}
                  </label>
                ))}
              </div>
            </div>

            <hr className="my-6 border-gray-200" />

            {/* Other Details */}
            <div className="mb-2">
              <h2 className="text-2xl font-bold mb-6 text-primary border-l-4 border-primary pl-4 bg-gray-50 py-2 rounded shadow-sm">
                Other Details
              </h2>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                  <label className="flex items-center gap-2 text-sm font-normal">
                    <Checkbox
                      checked={isFeatured}
                      onCheckedChange={() => setIsFeatured((v) => !v)}
                    />
                    Featured Listing (extra visibility)
                  </label>
                  <label className="flex items-center gap-2 text-sm font-normal">
                    <Checkbox
                      checked={isAvailable}
                      onCheckedChange={() => setIsAvailable((v) => !v)}
                    />
                    Currently Available
                  </label>
                </div>
                <div>
                  <Label htmlFor="insuranceInfo">Insurance Information</Label>
                  <Input
                    id="insuranceInfo"
                    name="insuranceInfo"
                    placeholder="Any special insurance requirements"
                    className="mt-1 focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <Label htmlFor="rentalTerms">Rental Terms & Conditions</Label>
                  <Input
                    id="rentalTerms"
                    name="rentalTerms"
                    placeholder="e.g. Minimum rental period, age requirements, etc."
                    className="mt-1 focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end border-t pt-8 mt-6 gap-4 bg-white rounded-b-3xl">
            <Button
              type="submit"
              size="lg"
              className="px-12 py-4 text-xl font-bold tracking-wide bg-primary hover:bg-primary/90 focus:ring-2 focus:ring-primary/50 rounded-xl shadow-xl transition duration-200 flex items-center gap-2"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin size-5" /> Listing...
                </>
              ) : (
                "List Luxury Car"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default NewCar;
