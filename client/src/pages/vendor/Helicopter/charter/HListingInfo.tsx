import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, X, Image as ImageIcon } from "lucide-react";
import axiosInstance from "@/lib/api";
import { Dialog } from "@headlessui/react";
import {
  FaWifi,
  FaTv,
  FaSnowflake,
  FaClock,
  FaGlassCheers,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";
import { GiHelicopter } from "react-icons/gi";
import { IoMdSpeedometer } from "react-icons/io";
import { MdAirlineSeatReclineNormal } from "react-icons/md";

interface HelicopterData {
  id: string;
  createdAt: string;
  updatedAt: string;
  model: string;
  year: number;
  capacity: number;
  range: number;
  pricePerHour: number;
  location: string;
  availableFrom: string;
  availableTo: string;
  description: string;
  registrationNumber: string;
  engineType: string;
  engineCount: number;
  maxSpeed: number;
  cruisingSpeed: number;
  fuelCapacity: number;
  maxAltitude: number;
  flightHours: number;
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
  depositAmount: number;
  minimumHours: number;
  cancellationPolicy: string;
  packageDeals: string;
  imageUrls: string[];
  transactionSignature: string;
  transactionLink: string | null;
  vendorId: string;
  status: string;
  views: number;
  sponsored: boolean;
  sponsoredType: string;
  endDate: string;
}

interface FormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCountry: string;
  departureLocation: string;
  arrivalLocation: string;
  departureDate: string;
  returnDate: string;
  passengerCount: number;
  specialRequests: string;
}

const HListingInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<HelicopterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [viewerImageIndex, setViewerImageIndex] = useState(0);
  const [showFullScreenViewer, setShowFullScreenViewer] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerCountry: "",
    departureLocation: "",
    arrivalLocation: "",
    departureDate: "",
    returnDate: "",
    passengerCount: 1,
    specialRequests: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [vendor, setVendor] = useState<any>(null);
  console.log(vendor?.id);
  const allImages = useMemo(() => data?.imageUrls || [], [data]);

  // Fetch helicopter data with error handling
  const getHelicopter = useCallback(async () => {
    if (!id) {
      setError("Invalid helicopter ID");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(`/h-client/main/charter/${id}`);
      if (response.data.success) {
        setData(response.data.helicopter);
      } else {
        throw new Error(
          response.data.message || "Failed to fetch helicopter details"
        );
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch helicopter details");
      toast.error(err.message || "Failed to fetch helicopter details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getHelicopter();
  }, [getHelicopter]);

  // Set document title when data is loaded
  useEffect(() => {
    if (data) {
      document.title = `${data.model} - Helicopter Charter`;
    } else {
      document.title = "Helicopter Charter";
    }
  }, [data]);

  // Fetch vendor information
  useEffect(() => {
    const fetchVendor = async () => {
      try {
        if (!data?.vendorId) return;

        const response = await axiosInstance.get(
          `/h-client/main/vendor/${data.vendorId}`
        );
        if (response.data?.vendor) {
          setVendor(response.data.vendor);
        }
      } catch (error) {
        console.error("Error fetching vendor details:", error);
        toast.error("Failed to load vendor information");
      }
    };

    if (data) {
      fetchVendor();
    }
  }, [data]);

  // Update views
  useEffect(() => {
    const updateViews = async () => {
      try {
        await axiosInstance.put(`/h-client/main/charter/${id}/views`);
      } catch (err: any) {
        console.error("Error updating views:", err.message);
      }
    };
    if (id) {
      updateViews();
    }
  }, [id]);

  // Image viewer navigation
  const prevViewerImage = useCallback(() => {
    setViewerImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  }, [allImages.length]);

  const nextViewerImage = useCallback(() => {
    setViewerImageIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  // Keyboard handlers for full screen viewer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showFullScreenViewer) {
        if (e.key === "Escape") {
          setShowFullScreenViewer(false);
        } else if (e.key === "ArrowLeft") {
          prevViewerImage();
        } else if (e.key === "ArrowRight") {
          nextViewerImage();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showFullScreenViewer, prevViewerImage, nextViewerImage]);

  // Form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.customerName ||
      !formData.customerEmail ||
      !formData.departureLocation ||
      !formData.arrivalLocation ||
      !formData.departureDate
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);
      const response = await axiosInstance.post("/h-client/main/charter/book", {
        ...formData,
        listingId: data?.id,
        vendorId: data?.vendorId,
      });

      if (response.data.success) {
        toast.success("Booking request submitted successfully!");
        setShowModal(false);
        setFormData({
          customerName: "",
          customerEmail: "",
          customerPhone: "",
          customerCountry: "",
          departureLocation: "",
          arrivalLocation: "",
          departureDate: "",
          returnDate: "",
          passengerCount: 1,
          specialRequests: "",
        });
      } else {
        throw new Error(response.data.message);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to submit booking request");
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "passengerCount" ? parseInt(value) : value,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div
          className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"
          aria-label="Loading"
        />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl font-light text-gray-400 mb-4">404</div>
          <div className="text-xl text-gray-500">
            {error || "Helicopter not found"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        style={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <picture
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <source
            srcSet={
              allImages.length > 0
                ? allImages[0]
                : "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
            }
            media="(min-width: 1600px)"
          />
          <source
            srcSet={
              allImages.length > 0
                ? allImages[0]
                : "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80"
            }
            media="(min-width: 1440px)"
          />
          <source
            srcSet={
              allImages.length > 0
                ? allImages[0]
                : "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1440&q=80"
            }
            media="(min-width: 1280px)"
          />
          <source
            srcSet={
              allImages.length > 0
                ? allImages[0]
                : "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
            }
            media="(min-width: 1024px)"
          />
          <source
            srcSet={
              allImages.length > 0
                ? allImages[0]
                : "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80"
            }
            media="(min-width: 768px)"
          />
          <source
            srcSet={
              allImages.length > 0
                ? allImages[0]
                : "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80"
            }
            media="(min-width: 640px)"
          />
          <source
            srcSet={
              allImages.length > 0
                ? allImages[0]
                : "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80"
            }
            media="(min-width: 480px)"
          />
          <source
            srcSet={
              allImages.length > 0
                ? allImages[0]
                : "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=480&q=80"
            }
            media="(min-width: 375px)"
          />
          <img
            loading="eager"
            fetchPriority="high"
            src={
              allImages.length > 0
                ? allImages[0]
                : "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=375&q=80"
            }
            alt={data ? `${data.model}` : "Helicopter Charter"}
            crossOrigin="anonymous"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              animation: "subtleZoom 20s ease-in-out infinite",
            }}
          />
        </picture>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
            padding: "60px 20px 40px",
            color: "white",
            textAlign: "center",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                marginBottom: "20px",
                animation: "fadeInUp 1s ease-out",
              }}
            >
              <span
                style={{
                  fontSize: "clamp(12px, 2.5vw, 14px)",
                  fontWeight: "500",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  opacity: "0.9",
                  borderBottom: "1px solid rgba(255,255,255,0.3)",
                  paddingBottom: "8px",
                }}
              >
                Available for Charter
              </span>
            </div>

            <p
              style={{
                fontSize: "clamp(2rem, 8vw, 4rem)",
                fontWeight: "300",
                margin: "0 0 10px 0",
                lineHeight: "1.2",
                animation: "fadeInUp 1s ease-out 0.2s both",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
              className="text-white"
            >
              {data?.model}
            </p>
            <p
              style={{
                fontSize: "clamp(16px, 3vw, 18px)",
                fontWeight: "400",
                margin: "0 0 30px 0",
                opacity: "0.9",
                animation: "fadeInUp 1s ease-out 0.4s both",
                letterSpacing: "1px",
              }}
            >
              Premium Helicopter Charter
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "clamp(20px, 4vw, 40px)",
                flexWrap: "wrap",
                animation: "fadeInUp 1s ease-out 0.6s both",
              }}
            >
              <span
                style={{
                  fontSize: "clamp(12px, 2.5vw, 14px)",
                  opacity: "0.8",
                  padding: "8px 16px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "20px",
                  backdropFilter: "blur(10px)",
                }}
              >
                {data?.year}
              </span>
              <span
                style={{
                  fontSize: "clamp(12px, 2.5vw, 14px)",
                  opacity: "0.8",
                  padding: "8px 16px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "20px",
                  backdropFilter: "blur(10px)",
                }}
              >
                {data?.capacity} Passengers
              </span>
              <span
                style={{
                  fontSize: "clamp(12px, 2.5vw, 14px)",
                  opacity: "0.8",
                  padding: "8px 16px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "20px",
                  backdropFilter: "blur(10px)",
                }}
              >
                {data?.range ? `${data.range} nm` : "N/A"}
              </span>
              <span
                style={{
                  fontSize: "clamp(12px, 2.5vw, 14px)",
                  opacity: "0.8",
                  padding: "8px 16px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "20px",
                  backdropFilter: "blur(10px)",
                }}
              >
                ${data?.pricePerHour?.toLocaleString()}/hour
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes subtleZoom {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes shimmer {
            0% { background-position: -200px 0; }
            100% { background-position: calc(200px + 100%) 0; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>

      {/* Stats Section */}
      <div className="bg-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Navigation and Action Buttons */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <ArrowLeft size={20} />
              <span className="text-sm font-medium">Back to Listings</span>
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="border border-gray-300 px-8 py-3 rounded-none font-light tracking-wide transition-all duration-300 text-sm uppercase text-gray-700 hover:bg-gray-50 hover:border-gray-400"
            >
              Book This Helicopter
            </button>
          </div>

          {/* Helicopter Parameters */}
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm md:max-w-full md:flex-nowrap 2xl:text-base">
            <li className="flex flex-col items-center">
              <span className="font-semibold text-gray-900">
                {data?.capacity}
              </span>
              <span className="text-gray-600 text-xs uppercase tracking-wide">
                Passengers
              </span>
            </li>
            <li className="flex flex-col items-center">
              <span className="font-semibold text-gray-900">{data?.year}</span>
              <span className="text-gray-600 text-xs uppercase tracking-wide">
                Year
              </span>
            </li>
            <li className="flex flex-col items-center">
              <span className="font-semibold text-gray-900">
                {data?.range ? `${data.range} nm` : "N/A"}
              </span>
              <span className="text-gray-600 text-xs uppercase tracking-wide">
                Range
              </span>
            </li>
            <li className="flex flex-col items-center">
              <span className="font-semibold text-gray-900">
                {data?.maxSpeed ? `${data.maxSpeed} kts` : "N/A"}
              </span>
              <span className="text-gray-600 text-xs uppercase tracking-wide">
                Max Speed
              </span>
            </li>
            <li className="flex flex-col items-center">
              <span className="font-semibold text-gray-900">
                {data?.engineCount}
              </span>
              <span className="text-gray-600 text-xs uppercase tracking-wide">
                Engines
              </span>
            </li>
            <li className="flex flex-col items-center bg-gray-50 px-4 py-2 rounded-lg md:bg-transparent md:px-0 md:py-0">
              <span className="font-semibold text-gray-900 uppercase">
                ${data?.pricePerHour?.toLocaleString()}/hour
              </span>
              <span className="text-gray-600 text-xs uppercase tracking-wide">
                Price
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-16">
            {/* Header */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full font-medium">
                  AVAILABLE FOR CHARTER
                </span>
                <span>
                  Last updated {new Date(data.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                  {data.model}
                </h1>
                <p className="text-lg text-gray-500">{data.year}</p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {data.description}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-gray-100">
              <div className="text-center">
                <div className="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center mx-auto mb-4 border border-gray-200">
                  <MdAirlineSeatReclineNormal className="text-orange-500 text-2xl" />
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {data.capacity}
                </div>
                <div className="text-sm text-gray-500 mt-1">PASSENGERS</div>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center mx-auto mb-4 border border-gray-200">
                  <IoMdSpeedometer className="text-orange-500 text-2xl" />
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {data.maxSpeed}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  MAX SPEED (KTS)
                </div>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center mx-auto mb-4 border border-gray-200">
                  <GiHelicopter className="text-orange-500 text-2xl" />
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {data.range}
                </div>
                <div className="text-sm text-gray-500 mt-1">RANGE (NM)</div>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center mx-auto mb-4 border border-gray-200">
                  <FaClock className="text-orange-500 text-xl" />
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {data.flightHours}
                </div>
                <div className="text-sm text-gray-500 mt-1">FLIGHT HOURS</div>
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-900">
                <span className="text-orange-500">—</span> AMENITIES & COMFORT
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.hasWifi && (
                  <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors shadow-sm">
                    <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center border border-orange-100">
                      <FaWifi className="text-orange-500 text-xl" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        HIGH-SPEED WIFI
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Stay connected during your flight
                      </p>
                    </div>
                  </div>
                )}
                {data.hasRefreshments && (
                  <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors shadow-sm">
                    <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center border border-orange-100">
                      <FaGlassCheers className="text-orange-500 text-xl" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        PREMIUM CATERING
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Gourmet meals and fine beverages
                      </p>
                    </div>
                  </div>
                )}
                {data.hasEntertainmentSystem && (
                  <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors shadow-sm">
                    <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center border border-orange-100">
                      <FaTv className="text-orange-500 text-xl" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        ENTERTAINMENT SYSTEM
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Latest movies, music and more
                      </p>
                    </div>
                  </div>
                )}
                {data.hasClimatControl && (
                  <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors shadow-sm">
                    <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center border border-orange-100">
                      <FaSnowflake className="text-orange-500 text-xl" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        CLIMATE CONTROL
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Optimal temperature throughout
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Safety Features */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-900">
                <span className="text-orange-500">—</span> SAFETY &
                CERTIFICATIONS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.safetyFeatures.map((feature: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors shadow-sm"
                  >
                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center border border-green-100">
                      <FaCheckCircle className="text-green-500 text-xl" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {feature.toUpperCase()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-900">
                <span className="text-orange-500">—</span> TECHNICAL
                SPECIFICATIONS
              </h2>
              <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                <div className="divide-y divide-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 p-6 hover:bg-gray-50 transition-colors">
                    <span className="text-gray-500">Registration Number</span>
                    <span className="font-medium text-gray-900">
                      {data.registrationNumber}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 p-6 hover:bg-gray-50 transition-colors">
                    <span className="text-gray-500">Engine Type</span>
                    <span className="font-medium text-gray-900">
                      {data.engineType}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 p-6 hover:bg-gray-50 transition-colors">
                    <span className="text-gray-500">Engine Count</span>
                    <span className="font-medium text-gray-900">
                      {data.engineCount}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 p-6 hover:bg-gray-50 transition-colors">
                    <span className="text-gray-500">Cruising Speed</span>
                    <span className="font-medium text-gray-900">
                      {data.cruisingSpeed} knots
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 p-6 hover:bg-gray-50 transition-colors">
                    <span className="text-gray-500">Fuel Capacity</span>
                    <span className="font-medium text-gray-900">
                      {data.fuelCapacity} gallons
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 p-6 hover:bg-gray-50 transition-colors">
                    <span className="text-gray-500">Max Altitude</span>
                    <span className="font-medium text-gray-900">
                      {data.maxAltitude},000 ft
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 p-6 hover:bg-gray-50 transition-colors">
                    <span className="text-gray-500">Last Maintenance</span>
                    <span className="font-medium text-gray-900">
                      {new Date(data.lastMaintenanceDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Pricing Card */}
              <div className="border border-gray-200 p-8 space-y-8">
                <div className="text-center">
                  <div className="text-4xl font-light text-gray-900 mb-2">
                    ${data.pricePerHour.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">per hour</div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Base Rate</span>
                    <span className="text-gray-900">
                      ${data.pricePerHour.toLocaleString()}/hour
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Minimum Hours</span>
                    <span className="text-gray-900">{data.minimumHours}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Landing Fees</span>
                    <span className="text-gray-900">Included</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Insurance</span>
                    <span className="text-gray-900">Included</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium text-gray-900">
                      Estimated Total
                    </span>
                    <span className="text-2xl font-light text-gray-900">
                      $
                      {(data.pricePerHour * data.minimumHours).toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full bg-black text-white py-4 font-light tracking-wider hover:bg-gray-800 transition-colors"
                  >
                    Book This Aircraft
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <Dialog
          open={showModal}
          onClose={() => setShowModal(false)}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
                    <img
                      src={allImages[0]}
                      alt={data?.model}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">
                      {data?.model}
                    </p>
                    <p className="text-sm text-gray-500">
                      HELICOPTER CHARTER REQUEST
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-center border border-gray-200"
                >
                  <FaTimes className="text-gray-500" size={14} />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="p-8 space-y-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <p className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-3">
                    PERSONAL INFORMATION
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 hover:border-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/30 rounded-lg text-gray-900"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        EMAIL *
                      </label>
                      <input
                        type="email"
                        name="customerEmail"
                        value={formData.customerEmail}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 hover:border-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/30 rounded-lg text-gray-900"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PHONE
                      </label>
                      <input
                        type="tel"
                        name="customerPhone"
                        value={formData.customerPhone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 hover:border-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/30 rounded-lg text-gray-900"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        COUNTRY
                      </label>
                      <input
                        type="text"
                        name="customerCountry"
                        value={formData.customerCountry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 hover:border-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/30 rounded-lg text-gray-900"
                        placeholder="Enter your country"
                      />
                    </div>
                  </div>
                </div>

                {/* Flight Details */}
                <div className="space-y-6">
                  <p className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-3">
                    FLIGHT DETAILS
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        DEPARTURE LOCATION *
                      </label>
                      <input
                        type="text"
                        name="departureLocation"
                        value={formData.departureLocation}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 hover:border-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/30 rounded-lg text-gray-900"
                        placeholder="Airport, city or coordinates"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ARRIVAL LOCATION *
                      </label>
                      <input
                        type="text"
                        name="arrivalLocation"
                        value={formData.arrivalLocation}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 hover:border-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/30 rounded-lg text-gray-900"
                        placeholder="Airport, city or coordinates"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        DEPARTURE DATE *
                      </label>
                      <input
                        type="datetime-local"
                        name="departureDate"
                        value={formData.departureDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 hover:border-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/30 rounded-lg text-gray-900"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        RETURN DATE (OPTIONAL)
                      </label>
                      <input
                        type="datetime-local"
                        name="returnDate"
                        value={formData.returnDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 hover:border-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/30 rounded-lg text-gray-900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NUMBER OF PASSENGERS
                    </label>
                    <input
                      type="number"
                      name="passengerCount"
                      value={formData.passengerCount}
                      onChange={handleInputChange}
                      min="1"
                      max={data?.capacity || 10}
                      className="w-full px-4 py-3 bg-white border border-gray-300 hover:border-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/30 rounded-lg text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SPECIAL REQUESTS
                    </label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 hover:border-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/30 rounded-lg text-gray-900 h-32 resize-none"
                      placeholder="Catering preferences, special occasions, accessibility requirements, etc."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full py-4 rounded-lg font-bold transition-all duration-300 ${
                    submitting
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-black hover:bg-gray-900 text-white"
                  }`}
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
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
                      PROCESSING REQUEST...
                    </span>
                  ) : (
                    "SUBMIT BOOKING REQUEST"
                  )}
                </button>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}

      {/* Helicopter Name Section */}
      <div className="bg-white pt-16 md:pt-20 lg:pt-24">
        <section className="pb-6 md:pb-8 lg:pb-10 lg:!max-w-[800px] 3xl:!max-w-[1024px] lg:!px-0 bg-white mx-auto max-w-screen-3xl px-4 sm:px-8 lg:px-10 2xl:px-16 3xl:px-20 overflow-hidden page-container relative">
          <div className="container">
            <div className="w-full text-center text-sm uppercase tracking-wider 2xl:text-md">
              {data?.model}
            </div>
            <div className="heading-seperator mt-3 flex w-full justify-center mb-6 lg:mb-10">
              <span className="h-1 w-[65px] bg-blue-600"></span>
              <span className="h-1 w-[65px] bg-orange-400"></span>
            </div>
            <h2 className="text-black text-xl font-semibold uppercase font-sans leading-tight tracking-normal md:text-3xl 2xl:text-[34px] text-center">
              Image Gallery
            </h2>
          </div>
        </section>
      </div>

      {/* Image Gallery Section */}
      <div className="bg-white">
        <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
            {/* Main Large Image */}
            <div className="relative aspect-[5/4] sm:aspect-[16/10] overflow-hidden rounded-lg shadow-md">
              <img
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                src={
                  allImages[0] ||
                  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                }
                alt={`${data?.model} - Main Image`}
                crossOrigin="anonymous"
              />
            </div>

            {/* Right Column - Grid of 4 Smaller Images */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
              {[1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className={`relative aspect-[5/4] sm:aspect-[16/10] overflow-hidden rounded-lg shadow-md ${
                    index === 4 ? "group" : ""
                  }`}
                >
                  <img
                    loading="lazy"
                    className={`h-full w-full object-cover transition-transform duration-300 hover:scale-105 ${
                      index === 4 ? "group-hover:opacity-75" : ""
                    }`}
                    src={
                      allImages[index] ||
                      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    }
                    alt={`${data?.model} - Image ${index + 1}`}
                    crossOrigin="anonymous"
                  />
                  {index === 4 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors duration-200">
                        All Images ({Math.max(0, (allImages.length || 5) - 5)})
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* All Images Button */}
      <div className="bg-white py-8">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 text-center">
          <button
            onClick={() => setShowImageViewer(true)}
            className="border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 px-8 py-3 rounded-none font-light tracking-wide transition-all duration-300 text-sm uppercase"
          >
            All Images ({allImages.length})
          </button>
        </div>
      </div>

      {/* All Images Modal */}
      {showImageViewer && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Close button */}
            <button
              onClick={() => setShowImageViewer(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors duration-200 z-10"
            >
              <X size={24} />
            </button>

            {/* Modal Header */}
            <div className="text-center p-8 border-b border-gray-200">
              <h2 className="text-2xl font-light text-gray-900 mb-2">
                Image Gallery
              </h2>
              <p className="text-sm text-gray-600 font-light">
                {data?.model} • {data?.year}
              </p>
            </div>

            {/* Image Grid */}
            <div className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-md group cursor-pointer"
                    onClick={() => {
                      setViewerImageIndex(index);
                      setShowFullScreenViewer(true);
                    }}
                  >
                    <img
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      src={image}
                      alt={`${data?.model} - Image ${index + 1}`}
                      crossOrigin="anonymous"
                    />
                    <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ImageIcon className="text-white w-8 h-8" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Image Viewer Modal */}
      {showFullScreenViewer && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex flex-col z-[60]"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowFullScreenViewer(false);
            }
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 text-white pt-20">
            <h3 className="text-xl font-light">
              {data?.model} - Image {viewerImageIndex + 1} of {allImages.length}
            </h3>
            <button
              onClick={() => setShowFullScreenViewer(false)}
              className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
              aria-label="Close full screen viewer"
            >
              <X size={24} />
            </button>
          </div>

          {/* Main Image Container */}
          <div className="flex-1 flex items-center justify-center relative px-6">
            {/* Previous Arrow */}
            <button
              onClick={() =>
                setViewerImageIndex(
                  (prev) => (prev - 1 + allImages.length) % allImages.length
                )
              }
              className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ArrowLeft size={24} />
            </button>

            {/* Main Image */}
            <div className="max-w-4xl max-h-full">
              <img
                src={allImages[viewerImageIndex]}
                alt={`${data?.model} - Image ${viewerImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
                crossOrigin="anonymous"
              />
            </div>

            {/* Next Arrow */}
            <button
              onClick={() =>
                setViewerImageIndex((prev) => (prev + 1) % allImages.length)
              }
              className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
              aria-label="Next image"
            >
              <ArrowRight size={24} />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="p-6">
            <div className="flex justify-center gap-3 overflow-x-auto pb-2">
              {allImages.map((image, index) => (
                <div
                  key={index}
                  className={`relative w-20 h-16 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                    index === viewerImageIndex
                      ? "ring-2 ring-white"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  onClick={() => setViewerImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* About Section */}
      <div className="bg-white pt-16 md:pt-20 lg:pt-24">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8 text-center">
              A little more about {data?.model}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {data?.description ? (
                <p>{data.description}</p>
              ) : (
                <p>
                  Experience unparalleled luxury travel with this {data?.model}.
                  This helicopter represents the pinnacle of private aviation,
                  offering exceptional comfort and performance for the most
                  discerning travelers.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Specification Section */}
      <div className="bg-white pt-16 md:pt-20 lg:pt-24">
        <div className="flex flex-col lg:w-full lg:max-w-screen-lg 2xl:max-w-screen-2xl-container mx-auto">
          <div className="key-details-table flex flex-col px-4 py-8 sm:px-8 sm:py-10 lg:px-10 bg-gray-50">
            <h2 className="mb-8 text-center text-xl font-semibold uppercase leading-tight tracking-normal text-blue-600 sm:mb-10 md:mb-16 md:text-3xl 2xl:text-4xl">
              Specification: {data?.model}
            </h2>
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Accommodation
                </h3>
                <table className="w-full">
                  <tbody className="space-y-2">
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">Passengers</th>
                      <td className="text-gray-900">{data?.capacity}</td>
                    </tr>
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">Crew</th>
                      <td className="text-gray-900">1-2</td>
                    </tr>
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">
                        Registration
                      </th>
                      <td className="text-gray-900">
                        {data?.registrationNumber || "N/A"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Construction & Design
                </h3>
                <table className="w-full">
                  <tbody className="space-y-2">
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">Built</th>
                      <td className="text-gray-900">{data?.year}</td>
                    </tr>
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">Model</th>
                      <td className="text-gray-900">{data?.model}</td>
                    </tr>
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">Engine Type</th>
                      <td className="text-gray-900">{data?.engineType}</td>
                    </tr>
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">
                        Engine Count
                      </th>
                      <td className="text-gray-900">{data?.engineCount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Performance & Capabilities
                </h3>
                <table className="w-full">
                  <tbody className="space-y-2">
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">
                        Maximum Speed
                      </th>
                      <td className="text-gray-900">
                        {data?.maxSpeed ? `${data.maxSpeed} knots` : "N/A"}
                      </td>
                    </tr>
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">
                        Cruising Speed
                      </th>
                      <td className="text-gray-900">
                        {data?.cruisingSpeed
                          ? `${data.cruisingSpeed} knots`
                          : "N/A"}
                      </td>
                    </tr>
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">
                        Maximum Range
                      </th>
                      <td className="text-gray-900">
                        {data?.range ? `${data.range} nm` : "N/A"}
                      </td>
                    </tr>
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">
                        Maximum Altitude
                      </th>
                      <td className="text-gray-900">
                        {data?.maxAltitude
                          ? `${data.maxAltitude},000 ft`
                          : "N/A"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Fuel & Capacity
                </h3>
                <table className="w-full">
                  <tbody className="space-y-2">
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">
                        Fuel Capacity
                      </th>
                      <td className="text-gray-900">
                        {data?.fuelCapacity
                          ? `${data.fuelCapacity} gallons`
                          : "N/A"}
                      </td>
                    </tr>
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">
                        Flight Hours
                      </th>
                      <td className="text-gray-900">
                        {data?.flightHours
                          ? `${data.flightHours} hours`
                          : "N/A"}
                      </td>
                    </tr>
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">
                        Last Maintenance
                      </th>
                      <td className="text-gray-900">
                        {data?.lastMaintenanceDate
                          ? new Date(
                              data.lastMaintenanceDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </td>
                    </tr>
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">
                        Insurance Status
                      </th>
                      <td className="text-gray-900">
                        {data?.insuranceStatus || "N/A"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Safety & Certification
                </h3>
                <table className="w-full">
                  <tbody className="space-y-2">
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">
                        Airworthiness Certificate
                      </th>
                      <td className="text-gray-900">
                        {data?.airworthinessCertificate || "N/A"}
                      </td>
                    </tr>
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">
                        Pilot Qualifications
                      </th>
                      <td className="text-gray-900">
                        {data?.pilotQualifications || "N/A"}
                      </td>
                    </tr>
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">
                        Last Overhaul
                      </th>
                      <td className="text-gray-900">
                        {data?.lastOverhaul
                          ? new Date(data.lastOverhaul).toLocaleDateString()
                          : "N/A"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Amenities & Features
                </h3>
                <table className="w-full">
                  <tbody className="space-y-2">
                    {data?.hasWifi && (
                      <tr className="flex justify-between py-2 border-b border-gray-200">
                        <th className="text-gray-600 font-medium">
                          WiFi Connectivity
                        </th>
                        <td className="text-gray-900">Available</td>
                      </tr>
                    )}
                    {data?.hasRefreshments && (
                      <tr className="flex justify-between py-2 border-b border-gray-200">
                        <th className="text-gray-600 font-medium">
                          Refreshments
                        </th>
                        <td className="text-gray-900">Available</td>
                      </tr>
                    )}
                    {data?.hasEntertainmentSystem && (
                      <tr className="flex justify-between py-2 border-b border-gray-200">
                        <th className="text-gray-600 font-medium">
                          Entertainment System
                        </th>
                        <td className="text-gray-900">Available</td>
                      </tr>
                    )}
                    {data?.hasClimatControl && (
                      <tr className="flex justify-between py-2 border-b border-gray-200">
                        <th className="text-gray-600 font-medium">
                          Climate Control
                        </th>
                        <td className="text-gray-900">Available</td>
                      </tr>
                    )}
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">
                        Safety Features
                      </th>
                      <td className="text-gray-900">
                        {data?.safetyFeatures?.length || 0} features
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Features Section */}
      {data?.safetyFeatures && data.safetyFeatures.length > 0 && (
        <div className="bg-white pt-16 md:pt-20 lg:pt-24">
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8 text-center">
                Safety Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.safetyFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors shadow-sm"
                  >
                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center border border-green-100">
                      <FaCheckCircle className="text-green-500 text-xl" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {feature.toUpperCase()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Back to Listings Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <button
          onClick={() => window.history.back()}
          className="bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-700 hover:bg-white hover:border-gray-300 px-6 py-3 rounded-lg font-light tracking-wide transition-all duration-300 text-sm uppercase shadow-lg hover:shadow-xl"
          aria-label="Back to listings"
        >
          <ArrowLeft size={16} className="inline mr-2" />
          Back to Listings
        </button>
      </div>
    </div>
  );
};

export default HListingInfo;
