import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Car,
  Fuel,
  Gauge,
  MapPin,
  Settings,
  Users,
  Wrench,
  Heart,
  CalendarDays,
  ShieldCheck,
  Clock,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Star,
  GaugeCircle,
  Palette,
  Sofa,
  Shield,
  FileText,
  CarFront,
  Milestone,
  BadgeCheck,
} from "lucide-react";
import axiosInstance from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface CarDetails {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  weeklyDiscount: number;
  monthlyDiscount: number;
  location: string;
  carType: string;
  seats: number;
  transmission: string;
  fuel: string;
  horsepower: number;
  engineSize: string;
  features: string[];
  description: string;
  insuranceInfo: string;
  rentalTerms: string;
  deliveryOption: string;
  deposit: number;
  images: string[];
  color: string;
  interiorColor: string;
  doors: number;
  driveType: string;
  condition: string;
  vin: string;
  licensePlate: string;
  isAvailable: boolean;
  mileage: number;
  acceleration: number;
  topSpeed: number;
  isFeatured: boolean;
  sponsored: boolean;
  vendorId: string;
}

function CarInformation() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<CarDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [localCurrency, setLocalCurrency] = useState<string>("USD");
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");
  const [currencyLoading, setCurrencyLoading] = useState(true);
  const [showOriginalPrice, setShowOriginalPrice] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    listingId: car?.id,
    vendorId: car?.vendorId,
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Ensure vendorId and listingId are set from car
    const bookingData = {
      ...formData,
      vendorId: car?.vendorId || "",
      listingId: car?.id || "",
    };
    try {
      const response = await axiosInstance.post(
        "/cars/client/bookings/new",
        bookingData
      );
      if (response.data.success) {
        toast(response.data.message);
      } else throw new Error(response.data.message);
    } catch (error: any) {
      toast(error.message);
    }
    setBookingModalOpen(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      vendorId: "",
      listingId: "",
    }); // Reset form
  };

  // Utility: Get currency symbol from code
  const getCurrencySymbol = (code: string): string => {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: code,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
        .format(0)
        .replace(/\d/g, "")
        .trim();
    } catch {
      return code;
    }
  };

  const fetchUserCurrency = async (): Promise<string> => {
    try {
      const res1 = await fetch(
        `https://api.ipgeolocation.io/ipgeo?apiKey=51ad654b528e41babec8d4ad3b865d0a`
      );
      const data1 = await res1.json();
      if (data1?.currency?.code) {
        return data1.currency.code;
      }
    } catch (err) {
      console.error("Error with ipgeolocation.io:", err);
    }

    try {
      const res = await fetch("http://ip-api.com/json/");
      const data = await res.json();
      if (data?.currency) {
        return data.currency;
      }
    } catch (err) {
      console.error("Error with ip-api.com:", err);
    }

    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      if (data?.currency) {
        return data.currency;
      }
    } catch (err) {
      console.error("Error with ipapi.co:", err);
    }

    return "USD";
  };

  const fetchExchangeRate = async (currency: string): Promise<number> => {
    if (currency === "USD") return 1;

    try {
      const res = await fetch(`https://open.er-api.com/v6/latest/USD`);
      const data = await res.json();

      if (data.result === "success" && data.rates?.[currency]) {
        return data.rates[currency];
      }
      throw new Error("Failed to get rates from ExchangeRate-API");
    } catch (err) {
      console.error("Error with ExchangeRate-API:", err);

      try {
        const fallbackRes = await fetch(
          `https://api.exchangerate.host/latest?base=USD&symbols=${currency}`
        );
        const fallbackData = await fallbackRes.json();

        if (fallbackData?.rates?.[currency]) {
          return fallbackData.rates[currency];
        }
        throw new Error("Both exchange rate APIs failed");
      } catch (fallbackErr) {
        console.error("Error with exchangerate.host:", fallbackErr);
        return 1;
      }
    }
  };

  const fetchCarInfo = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/cars/client/${id}`);
      if (response.data.success) {
        setCar(response.data.car);
      } else {
        throw new Error(response.data.message || "Failed to fetch car details");
      }
    } catch (error: any) {
      setError(error.message || "An error occurred while fetching car details");
    } finally {
      setLoading(false);
    }
  };

  const initializeCurrency = async () => {
    try {
      setCurrencyLoading(true);
      const currency = await fetchUserCurrency();
      const rate = await fetchExchangeRate(currency);

      setLocalCurrency(currency);
      setExchangeRate(rate);
      setCurrencySymbol(getCurrencySymbol(currency));
    } catch (error) {
      console.error("Currency initialization failed:", error);
      setLocalCurrency("USD");
      setExchangeRate(1);
      setCurrencySymbol("$");
    } finally {
      setCurrencyLoading(false);
    }
  };

  useEffect(() => {
    fetchCarInfo();
    initializeCurrency();
  }, [id]);

  const formatPrice = (usd: number) => {
    const localPrice = usd * exchangeRate;

    return (
      <span className="text-gray-900">
        {currencySymbol}
        {localPrice.toLocaleString("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}
        {showOriginalPrice && localCurrency !== "USD" && (
          <span className="text-gray-500 text-base ml-2">
            ($
            {usd.toLocaleString("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}{" "}
            USD)
          </span>
        )}
      </span>
    );
  };

  // Modal navigation handlers
  const handlePrevImage = () => {
    setModalImageIndex((prev) =>
      prev === 0 ? (car?.images.length || 1) - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setModalImageIndex((prev) =>
      prev === (car?.images.length || 1) - 1 ? 0 : prev + 1
    );
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalOpen) return;
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "Escape") setModalOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  if (loading || currencyLoading) {
    return (
      <div className="min-h-screen mt-25 bg-gray-50">
        {/* Navigation Skeleton */}
        <div className="bg-white py-4 px-6 border-b border-gray-100">
          <div className="max-w-7xl mx-auto flex items-center">
            <Skeleton className="h-8 w-40" />
          </div>
        </div>
        {/* Main Content Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {/* Header Skeleton */}
          <div className="mb-8">
            <Skeleton className="h-8 w-1/3 mb-2" />
            <Skeleton className="h-5 w-1/4" />
          </div>
          {/* Gallery & Details Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery Skeleton */}
            <div>
              <Skeleton className="w-full h-96 mb-4" />
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="w-24 h-24 rounded-md" />
                ))}
              </div>
            </div>
            {/* Details Skeleton */}
            <div>
              <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                {/* Price Skeleton */}
                <div className="mb-8">
                  <Skeleton className="h-10 w-32 mb-2" />
                  <div className="flex space-x-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </div>
                {/* Key Specs Skeleton */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="w-5 h-5" />
                      <div>
                        <Skeleton className="h-3 w-16 mb-1" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Booking Skeleton */}
                <Skeleton className="h-12 w-full mb-2" />
                <Skeleton className="h-4 w-40 mx-auto" />
              </div>
              {/* Features Skeleton */}
              <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <Skeleton className="h-6 w-32 mb-6" />
                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="w-2 h-2 rounded-full" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Description & Details Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <Skeleton className="h-6 w-32 mb-6" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div className="bg-white rounded-xl shadow-sm p-8">
              <Skeleton className="h-6 w-40 mb-6" />
              <div className="space-y-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Skeleton className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        {error}
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        Car not found
      </div>
    );
  }

  // Helper function to format car type
  const formatCarType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Helper function to format drive type
  const formatDriveType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Helper function to format condition
  const formatCondition = (condition: string) => {
    return condition
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className="min-h-screen mt-24 bg-gradient-to-b from-gray-50 to-white font-sans">
      {/* Navigation */}
      <div className="bg-white py-4 px-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="flex items-center text-gray-700 font-medium hover:bg-gray-100 rounded-xl px-4 py-2 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Collection
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {car.brand} <span className="font-extrabold">{car.model}</span>
          </h1>
          <div className="flex items-center text-gray-500 mt-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{car.location}</span>
            {localCurrency !== "USD" && (
              <button
                onClick={() => setShowOriginalPrice(!showOriginalPrice)}
                className="ml-2 text-xs text-blue-500 hover:underline font-semibold"
              >
                {showOriginalPrice ? "Hide USD" : "Show USD"}
              </button>
            )}
          </div>
        </div>

        {/* Gallery & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div
              className="relative bg-white rounded-2xl overflow-hidden shadow-xl mb-4 cursor-pointer group transition-shadow hover:shadow-2xl"
              onClick={() => {
                setModalOpen(true);
                setModalImageIndex(activeImage);
              }}
            >
              <img
                src={car.images[activeImage]}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-96 object-cover transition-opacity duration-300 group-hover:opacity-90"
                loading="lazy"
              />
              <div className="absolute top-4 right-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-transform"
                >
                  <Heart className="w-5 h-5 text-gray-700" />
                </Button>
              </div>
              {(car.isFeatured || car.sponsored) && (
                <div className="absolute top-4 left-4 flex gap-2">
                  {car.isFeatured && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center shadow">
                      <Star className="w-3 h-3 mr-1" /> Featured
                    </span>
                  )}
                  {car.sponsored && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center shadow">
                      <BadgeCheck className="w-3 h-3 mr-1" /> Sponsored
                    </span>
                  )}
                </div>
              )}
            </div>

            <Carousel className="w-full">
              <CarouselContent>
                {car.images.map((img: string, index: number) => (
                  <CarouselItem key={index} className="basis-1/4">
                    <button
                      onClick={() => setActiveImage(index)}
                      className={`w-full h-24 bg-white rounded-lg overflow-hidden border transition-all duration-200
                        ${
                          activeImage === index
                            ? "border-blue-600 ring-2 ring-blue-200"
                            : "border-gray-200"
                        }
                        hover:scale-105 hover:border-blue-400`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover transition-opacity duration-300"
                        loading="lazy"
                        style={{ opacity: activeImage === index ? 1 : 0.7 }}
                      />
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Details */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-10 mb-10 transition-shadow hover:shadow-2xl">
              {/* Price */}
              <div className="mb-8">
                <div className="flex items-end mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(car.price)}
                  </span>
                  <span className="text-gray-500 ml-1 text-lg">/ day</span>
                </div>
                <div className="flex space-x-4 text-base text-gray-500 font-medium">
                  <span>
                    Weekly:{" "}
                    {formatPrice(
                      car.price * 7 * (1 - car.weeklyDiscount / 100)
                    )}{" "}
                    (-{car.weeklyDiscount}%)
                  </span>
                  <span>
                    Monthly:{" "}
                    {formatPrice(
                      car.price * 30 * (1 - car.monthlyDiscount / 100)
                    )}{" "}
                    (-{car.monthlyDiscount}%)
                  </span>
                </div>
              </div>

              {/* Key Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center">
                  <Car className="w-6 h-6 text-blue-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="font-semibold text-gray-900">
                      {formatCarType(car.carType)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="w-6 h-6 text-blue-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Seats</p>
                    <p className="font-semibold text-gray-900">{car.seats}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Settings className="w-6 h-6 text-blue-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Transmission</p>
                    <p className="font-semibold text-gray-900">
                      {car.transmission}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Fuel className="w-6 h-6 text-blue-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Fuel</p>
                    <p className="font-semibold text-gray-900">{car.fuel}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Gauge className="w-6 h-6 text-blue-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Horsepower</p>
                    <p className="font-semibold text-gray-900">
                      {car.horsepower} hp
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Wrench className="w-6 h-6 text-blue-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Engine</p>
                    <p className="font-semibold text-gray-900">
                      {car.engineSize}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Palette className="w-6 h-6 text-blue-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Exterior</p>
                    <p className="font-semibold text-gray-900">{car.color}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Sofa className="w-6 h-6 text-blue-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Interior</p>
                    <p className="font-semibold text-gray-900">
                      {car.interiorColor}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <CarFront className="w-6 h-6 text-blue-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Doors</p>
                    <p className="font-semibold text-gray-900">{car.doors}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Milestone className="w-6 h-6 text-blue-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Drive Type</p>
                    <p className="font-semibold text-gray-900">
                      {formatDriveType(car.driveType)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Shield className="w-6 h-6 text-blue-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Condition</p>
                    <p className="font-semibold text-gray-900">
                      {formatCondition(car.condition)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <GaugeCircle className="w-6 h-6 text-blue-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Mileage</p>
                    <p className="font-semibold text-gray-900">
                      {car.mileage.toLocaleString()} miles
                    </p>
                  </div>
                </div>
              </div>

              {/* Performance */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Top Speed</p>
                  <p className="font-semibold text-gray-900">
                    {car.topSpeed} mph
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Acceleration</p>
                  <p className="font-semibold text-gray-900">
                    {car.acceleration} s (0-60 mph)
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Year</p>
                  <p className="font-semibold text-gray-900">{car.year}</p>
                </div>
              </div>

              {/* Booking */}
              <div className="border-t border-gray-100 pt-6">
                <Button
                  className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform"
                  disabled={!car.isAvailable}
                  onClick={() => {
                    if (car.isAvailable) {
                      setBookingModalOpen(true);
                    }
                  }}
                >
                  {car.isAvailable ? "Book Now" : "Not Available"}
                </Button>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  {formatPrice(car.deposit)} security deposit required
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl shadow-xl p-10 mb-10 transition-shadow hover:shadow-2xl">
              <h3 className="text-lg font-bold mb-6 text-gray-900">Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {car.features.map((feature: string) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-7 h-7 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
                      <Star className="w-4 h-4" />
                    </div>
                    <span className="text-base text-gray-800">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section Divider */}
        <hr className="my-12 border-t-2 border-gray-100" />

        {/* Description & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Description */}
          <div className="bg-white rounded-2xl shadow-xl p-10">
            <h3 className="text-lg font-bold mb-6 text-gray-900">
              Description
            </h3>
            <div
              className="prose prose-sm text-gray-700"
              dangerouslySetInnerHTML={{
                __html: car.description,
              }}
            />
          </div>

          {/* Rental Information */}
          <div className="bg-white rounded-2xl shadow-xl p-10">
            <h3 className="text-lg font-bold mb-6 text-gray-900">
              Rental Information
            </h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <ShieldCheck className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Insurance</h4>
                  <p className="text-sm text-gray-600">{car.insuranceInfo}</p>
                </div>
              </div>
              <div className="flex items-start">
                <CalendarDays className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Rental Terms</h4>
                  <p className="text-sm text-gray-600">{car.rentalTerms}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Delivery</h4>
                  <p className="text-sm text-gray-600">
                    {car.deliveryOption} delivery available
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <FileText className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Vehicle Details</h4>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">VIN:</span> {car.vin}
                    <br />
                    <span className="font-medium">License Plate:</span>{" "}
                    {car.licensePlate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal with fade/scale animation */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-4xl p-0 bg-transparent border-none animate-fadeInScale">
          <div className="relative">
            <img
              src={car.images[modalImageIndex]}
              alt=""
              className="w-full max-h-[80vh] object-contain rounded-lg transition-opacity duration-300"
            />
            <div className="absolute top-4 right-4">
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-transform"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </DialogClose>
            </div>
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-transform"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-transform"
                onClick={handleNextImage}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
              <div className="bg-black/50 text-white px-2 py-1 rounded text-sm">
                {modalImageIndex + 1} / {car.images.length}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Booking Modal */}
      <Dialog open={bookingModalOpen} onOpenChange={setBookingModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              Book {car.brand} {car.model}
            </DialogTitle>
            <DialogDescription>
              Fill out the form below to request a booking. We will contact you
              shortly to confirm.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleBookingSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleFormChange}
                className="col-span-3"
                required
                placeholder="Your Name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleFormChange}
                className="col-span-3"
                required
                placeholder="your@email.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={handleFormChange}
                className="col-span-3"
                placeholder="Your Phone Number"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right">
                Message
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={handleFormChange}
                className="col-span-3"
                placeholder="Any special requests or questions?"
              />
            </div>
            <DialogFooter>
              <Button type="submit">Submit Request</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CarInformation;
