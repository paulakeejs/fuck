import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, X, Image as ImageIcon } from "lucide-react";
import axiosInstance from "@/lib/api";

interface JetData {
  id: string;
  createdAt: string;
  manufacturer: string;
  otherManufacturer: string | null;
  model: string;
  year: number;
  serialNumber: string;
  totalTimeSinceNew: number;
  totalLandings: number;
  engineMakeModel: string;
  engineHours: number;
  avionicsSuite: string;
  interiorConfig: string;
  interiorImageUrls: string[];
  exteriorImageUrls: string[];
  price: string;
  currentLocation: string;
  registrationNumber: string;
  contactDetails: string;
  aircraftType: string;
  seatingCapacity: number;
  cabinHeight: number;
  cabinWidth: number;
  cabinLength: number;
  baggageCapacity: number;
  numberOfEngines: number;
  engineType: string;
  engineThrust: number;
  certification: string;
  noiseCompliance: string;
  lastInspectionDate: string;
  nextInspectionDue: string;
  maintenanceStatus: string;
  previousOwners: number | null;
  maintenanceProgram: string | null;
  airframeEngineStatus: string | null;
  refurbishmentDate: string | null;
  wifiConnectivity?: string | null;
  lavatoryGalleyDetails: string | null;
  cabinAmenities: string | null;
  range: number | null;
  cruiseSpeed: number | null;
  maxAltitude: number | null;
  runwayLength: number | null;
  emptyWeight: number | null;
  maxTakeoffWeight: number | null;
  deliveryAvailability: string | null;
  paymentTxSignature: string;
  transactionLink: string;
  vendorId: string;
  views: number;
  status: string;
  sponsored: boolean;
  sponsoredType: string;
  end_date: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  fuelCapacity?: number | null;
  serviceCeiling?: number | null;
  takeoffDistance?: number | null;
  landingDistance?: number | null;
  interiorDesigner?: string | null;
  exteriorPaintScheme?: string | null;
  avionicsUpdates?: string | null;
  warrantyRemaining?: string | null;
  operationalRestrictions?: string | null;
  recentUpgrades?: string | null;
  layoutImageUrl?: string | null;
}

interface FormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCountry: string;
  message: string;
}

const JetListingInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<JetData | null>(null);
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
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  console.log(submitting);
  // Memoize allImages to prevent unnecessary recalculations
  const allImages = useMemo(
    () => [
      ...(data?.interiorImageUrls || []),
      ...(data?.exteriorImageUrls || []),
    ],
    [data]
  );

  // Fetch jet data with error handling
  const getJet = useCallback(async () => {
    if (!id) {
      setError("Invalid jet ID");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(`/jets/sale/${id}`);
      if (response.data.success) {
        setData(response.data.data);
      } else {
        throw new Error(response.data.message || "Failed to fetch jet details");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch jet details");
      toast.error(err.message || "Failed to fetch jet details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getJet();
  }, [getJet]);

  // Set document title when data is loaded
  useEffect(() => {
    if (data) {
      document.title = `${data.manufacturer} ${data.model} ${data.year} - Private Jet for Sale`;
    } else {
      document.title = "Private Jet Listing";
    }
  }, [data]);

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
      !formData.message
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);
      const response = await axiosInstance.post("/jets/sale/messages/new", {
        listingId: id,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        customerCountry: formData.customerCountry,
        message: formData.message,
        vendorId: data?.vendorId,
      });

      if (response.data.success) {
        toast.success("Inquiry submitted successfully!");
        setShowModal(false);
        setFormData({
          customerName: "",
          customerEmail: "",
          customerPhone: "",
          customerCountry: "",
          message: "",
        });
      } else {
        throw new Error(response.data.message);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to submit inquiry");
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
      [name]: value,
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
            {error || "Aircraft not found"}
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
            alt={
              data
                ? `${data.manufacturer} ${data.model}`
                : "Private Jet for Sale"
            }
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
                Aircraft for Sale
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
              {data?.manufacturer} {data?.model}
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
              Available for Purchase
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
                {data?.seatingCapacity} Seats
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
                {!isNaN(Number(data?.price))
                  ? `$${data?.price}`
                  : data?.price || "N/A"}
              </span>
              {data?.status === "SOLD" && (
                <span
                  style={{
                    fontSize: "clamp(12px, 2.5vw, 14px)",
                    padding: "8px 16px",
                    background: "rgba(220, 38, 38, 0.9)",
                    color: "white",
                    borderRadius: "20px",
                    backdropFilter: "blur(10px)",
                    fontWeight: "500",
                  }}
                >
                  SOLD
                </span>
              )}
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

          /* Leaflet Map Styles */
          .leaflet-container {
            font-family: inherit;
          }
          
          .leaflet-marker-icon {
            background: transparent;
            border: none;
          }
          
          .leaflet-marker-icon svg {
            fill: #3b82f6;
            stroke: #ffffff;
            stroke-width: 2;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
          }
          
          .leaflet-marker-icon:hover svg {
            fill: #2563eb;
            transform: scale(1.1);
            transition: all 0.2s ease;
          }
          
          .airtownLabel {
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 500;
            white-space: nowrap;
            opacity: 0;
            transition: opacity 0.2s ease;
            pointer-events: none;
            z-index: 1000;
          }
          
          .leaflet-marker-icon:hover .airtownLabel {
            opacity: 1;
          }
          
          .labelMarker__bottom .airtownLabel {
            top: 100%;
            margin-top: 4px;
          }
        `}
      </style>

      {/* Stats Section */}
      <div className="bg-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Sold Status Banner */}
          {data?.status === "SOLD" && (
            <div className="mb-8 text-center">
              <div className="inline-flex items-center gap-3 bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="font-medium text-lg">
                  This aircraft has been sold
                </span>
              </div>
            </div>
          )}

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
              disabled={data?.status === "sold"}
              className={`border border-gray-300 px-8 py-3 rounded-none font-light tracking-wide transition-all duration-300 text-sm uppercase ${
                data?.status === "sold"
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-50 hover:border-gray-400"
              }`}
            >
              {data?.status === "SOLD" ? "Aircraft Sold" : "Send Inquiry"}
            </button>
          </div>

          {/* Jet Parameters */}
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm md:max-w-full md:flex-nowrap 2xl:text-base">
            <li className="flex flex-col items-center">
              <span className="font-semibold text-gray-900">
                {data?.cabinLength ? `${data.cabinLength}m` : "N/A"}
              </span>
              <span className="text-gray-600 text-xs uppercase tracking-wide">
                Cabin Length
              </span>
            </li>
            <li className="flex flex-col items-center">
              <span className="font-semibold text-gray-900">
                {data?.year}/
                {data?.refurbishmentDate
                  ? new Date(data.refurbishmentDate).getFullYear()
                  : "N/A"}
              </span>
              <span className="text-gray-600 text-xs uppercase tracking-wide">
                Built/Refit
              </span>
            </li>
            <li className="flex flex-col items-center">
              <span className="font-semibold text-gray-900">
                {data?.seatingCapacity}
              </span>
              <span className="text-gray-600 text-xs uppercase tracking-wide">
                Guests
              </span>
            </li>
            <li className="flex flex-col items-center">
              <span className="font-semibold text-gray-900">
                {data?.interiorConfig
                  ? data.interiorConfig.split(",").length
                  : "N/A"}
              </span>
              <span className="text-gray-600 text-xs uppercase tracking-wide">
                Cabin Config
              </span>
            </li>
            <li className="flex flex-col items-center">
              <span className="font-semibold text-gray-900">2-4</span>
              <span className="text-gray-600 text-xs uppercase tracking-wide">
                Crew
              </span>
            </li>
            <li className="flex flex-col items-center bg-gray-50 px-4 py-2 rounded-lg md:bg-transparent md:px-0 md:py-0">
              <span className="font-semibold text-gray-900 uppercase">
                {!isNaN(Number(data?.price))
                  ? `$${data?.price}`
                  : data?.price || "POA"}
              </span>
              <span className="text-gray-600 text-xs uppercase tracking-wide">
                Price
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Jet Name Section */}
      <div className="bg-white pt-16 md:pt-20 lg:pt-24">
        <section className="pb-6 md:pb-8 lg:pb-10 lg:!max-w-[800px] 3xl:!max-w-[1024px] lg:!px-0 bg-white mx-auto max-w-screen-3xl px-4 sm:px-8 lg:px-10 2xl:px-16 3xl:px-20 overflow-hidden page-container relative">
          <div className="container">
            <div className="w-full text-center text-sm uppercase tracking-wider 2xl:text-md">
              {data?.manufacturer} {data?.model}
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
                alt={`${data?.manufacturer} ${data?.model} - Main Image`}
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
                    alt={`${data?.manufacturer} ${data?.model} - Image ${
                      index + 1
                    }`}
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
                {data?.manufacturer} {data?.model} • {data?.year}
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
                      alt={`${data?.manufacturer} ${data?.model} - Image ${
                        index + 1
                      }`}
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
              {data?.manufacturer} {data?.model} - Image {viewerImageIndex + 1}{" "}
              of {allImages.length}
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
                alt={`${data?.manufacturer} ${data?.model} - Image ${
                  viewerImageIndex + 1
                }`}
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
              A little more about {data?.manufacturer} {data?.model}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {data?.description ? (
                <div dangerouslySetInnerHTML={{ __html: data.description }} />
              ) : (
                <p>
                  Experience unparalleled luxury travel with this{" "}
                  {data?.manufacturer} {data?.model}. This {data?.aircraftType}{" "}
                  aircraft represents the pinnacle of private aviation, offering
                  exceptional comfort and performance for the most discerning
                  travelers.
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
              Specification: {data?.manufacturer} {data?.model}
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
                      <td className="text-gray-900">{data?.seatingCapacity}</td>
                    </tr>
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">
                        Cabin Configuration
                      </th>
                      <td className="text-gray-900">
                        {data?.interiorConfig || "N/A"}
                      </td>
                    </tr>
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">Crew</th>
                      <td className="text-gray-900">2-4</td>
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
                      <th className="text-gray-600 font-medium">
                        Manufacturer
                      </th>
                      <td className="text-gray-900">{data?.manufacturer}</td>
                    </tr>
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">
                        Aircraft Type
                      </th>
                      <td className="text-gray-900">{data?.aircraftType}</td>
                    </tr>
                    {data?.interiorDesigner && (
                      <tr className="flex justify-between py-2 border-b border-gray-200">
                        <th className="text-gray-600 font-medium">
                          Interior Designer
                        </th>
                        <td className="text-gray-900">
                          {data.interiorDesigner}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Dimensions & Capacity
                </h3>
                <table className="w-full">
                  <tbody className="space-y-2">
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">
                        Cabin Length
                      </th>
                      <td className="text-gray-900">
                        {data?.cabinLength ? `${data.cabinLength}m` : "N/A"}
                      </td>
                    </tr>
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">Cabin Width</th>
                      <td className="text-gray-900">
                        {data?.cabinWidth ? `${data.cabinWidth}m` : "N/A"}
                      </td>
                    </tr>
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">
                        Cabin Height
                      </th>
                      <td className="text-gray-900">
                        {data?.cabinHeight ? `${data.cabinHeight}m` : "N/A"}
                      </td>
                    </tr>
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">
                        Baggage Capacity
                      </th>
                      <td className="text-gray-900">
                        {data?.baggageCapacity
                          ? `${data.baggageCapacity}kg`
                          : "N/A"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Performance & Engines
                </h3>
                <table className="w-full">
                  <tbody className="space-y-2">
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">
                        Cruising Speed
                      </th>
                      <td className="text-gray-900">
                        {data?.cruiseSpeed
                          ? `${data.cruiseSpeed} knots`
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
                        {data?.maxAltitude ? `${data.maxAltitude} ft` : "N/A"}
                      </td>
                    </tr>
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">Engines</th>
                      <td className="text-gray-900">
                        {data?.numberOfEngines
                          ? `${data.numberOfEngines} x ${data.engineMakeModel}`
                          : "N/A"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Certification & Maintenance
                </h3>
                <table className="w-full">
                  <tbody className="space-y-2">
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">
                        Certification
                      </th>
                      <td className="text-gray-900">
                        {data?.certification || "N/A"}
                      </td>
                    </tr>
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">
                        Noise Compliance
                      </th>
                      <td className="text-gray-900">
                        {data?.noiseCompliance || "N/A"}
                      </td>
                    </tr>
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">
                        Maintenance Status
                      </th>
                      <td className="text-gray-900">
                        {data?.maintenanceStatus || "N/A"}
                      </td>
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
                  Additional Features
                </h3>
                <table className="w-full">
                  <tbody className="space-y-2">
                    {data?.wifiConnectivity && (
                      <tr className="flex justify-between py-2 border-b border-gray-200">
                        <th className="text-gray-600 font-medium">
                          WiFi Connectivity
                        </th>
                        <td className="text-gray-900">
                          {data.wifiConnectivity}
                        </td>
                      </tr>
                    )}
                    {data?.cabinAmenities && (
                      <tr className="flex justify-between py-2 border-b border-gray-200">
                        <th className="text-gray-600 font-medium">
                          Cabin Amenities
                        </th>
                        <td className="text-gray-900">{data.cabinAmenities}</td>
                      </tr>
                    )}
                    {data?.avionicsSuite && (
                      <tr className="flex justify-between py-2 border-b border-gray-200">
                        <th className="text-gray-600 font-medium">
                          Avionics Suite
                        </th>
                        <td className="text-gray-900">{data.avionicsSuite}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Upgrades Section */}
      {data?.recentUpgrades && (
        <div className="bg-white pt-16 md:pt-20 lg:pt-24">
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8 text-center">
                Recent Upgrades
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <div
                  dangerouslySetInnerHTML={{ __html: data.recentUpgrades }}
                />
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

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-2 md:p-4 bg-white/30 backdrop-blur-md">
          <div
            className="bg-white/95 backdrop-blur-sm w-full max-w-2xl sm:max-w-lg p-2 sm:p-4 md:p-8 shadow-2xl border border-gray-100 rounded-lg max-h-screen overflow-y-auto flex flex-col"
            style={{ minHeight: "0" }}
          >
            <div className="flex justify-between items-center mb-4 md:mb-8 sticky top-0 bg-white/95 z-10 rounded-t-lg">
              <div className="min-w-0">
                <p className="text-xl sm:text-2xl md:text-3xl font-light text-gray-900 break-words">
                  Contact Us
                </p>
                <p className="text-gray-500 mt-1 text-xs sm:text-sm md:text-base break-words">
                  We'll get back to you within 24 hours
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-full"
                aria-label="Close"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form
              onSubmit={handleFormSubmit}
              className="space-y-4 md:space-y-6 flex-1"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-6 gap-y-2 md:gap-y-6">
                <div className="min-w-0">
                  <label
                    htmlFor="customerName"
                    className="block text-sm font-light text-gray-700 mb-2 break-words"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    required
                    className="w-full min-w-0 px-3 sm:px-4 py-2 sm:py-3 bg-white/50 border border-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus:border-black transition-all duration-200 text-base rounded"
                    placeholder="John Doe"
                  />
                </div>
                <div className="min-w-0">
                  <label
                    htmlFor="customerEmail"
                    className="block text-sm font-light text-gray-700 mb-2 break-words"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="customerEmail"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full min-w-0 px-3 sm:px-4 py-2 sm:py-3 bg-white/50 border border-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus:border-black transition-all duration-200 text-base rounded"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="min-w-0">
                  <label
                    htmlFor="customerPhone"
                    className="block text-sm font-light text-gray-700 mb-2 break-words"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="customerPhone"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    className="w-full min-w-0 px-3 sm:px-4 py-2 sm:py-3 bg-white/50 border border-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus:border-black transition-all duration-200 text-base rounded"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="min-w-0">
                  <label
                    htmlFor="customerCountry"
                    className="block text-sm font-light text-gray-700 mb-2 break-words"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="customerCountry"
                    name="customerCountry"
                    value={formData.customerCountry}
                    onChange={handleInputChange}
                    required
                    className="w-full min-w-0 px-3 sm:px-4 py-2 sm:py-3 bg-white/50 border border-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus:border-black transition-all duration-200 text-base rounded"
                    placeholder="Country"
                  />
                </div>
              </div>
              <div className="min-w-0">
                <label
                  htmlFor="message"
                  className="block text-sm font-light text-gray-700 mb-2 break-words"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full min-w-0 px-3 sm:px-4 py-2 sm:py-3 bg-white/50 border border-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus:border-black transition-all duration-200 text-base rounded resize-none"
                  placeholder="Tell us about your requirements..."
                />
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between pt-4 gap-2 sm:gap-4 md:gap-0 w-full">
                <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left break-words w-full sm:w-auto">
                  By submitting this form, you agree to our privacy policy
                </p>
                <button
                  type="submit"
                  className="bg-black text-white px-6 sm:px-8 py-2 sm:py-3 font-light hover:bg-gray-900 transition duration-300 min-w-[140px] sm:min-w-[200px] rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                  disabled={submitting}
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JetListingInfoPage;
