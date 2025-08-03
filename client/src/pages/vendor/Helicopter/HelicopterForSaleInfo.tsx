import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import ContactFormModal from "../../../components/ContactFormModal";
import SourceHelicopterModal from "../../../components/SourceHelicopterModal";
import { FaHeart, FaShare, FaTimes, FaChevronRight } from "react-icons/fa";
import axiosInstance from "@/lib/api";

interface Helicopter {
  id: string;
  vendorId: string;
  helicopterName: string;
  helicopterType: string;
  manufacturer: string;
  yearOfManufacture: number;
  seatingCapacity: number;
  maximumRange: number;
  cruisingSpeed: number;
  condition: string;
  salePrice: number;
  exteriorImageUrls: string[];
  interiorImageUrls: string[];
  cabinFeatures: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  }[];
  baggageCapacity: string;
  totalFlightHours: number;
  avionics: string;
  registrationNumber: string;
  lastInspection: string;
  maxTakeoffWeight?: number;
  fuelCapacity?: string;
  description?: string;
  vendorName?: string;
  vendorLocation?: string;
  vendorExperience?: string;
  vendorLanguages?: string;
  status?: "APPROVED" | "SOLD";
}

function HelicopterForSaleInfo() {
  const { id } = useParams();
  const [helicopter, setHelicopter] = useState<Helicopter | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"buy" | "contact" | "source">(
    "contact"
  );
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [viewerImageIndex, setViewerImageIndex] = useState(0);
  console.log(viewerImageIndex);
  const [isFavorite, setIsFavorite] = useState(false);

  // Memoize allImages to prevent unnecessary recalculations
  const allImages = useMemo(
    () => [
      ...(helicopter?.exteriorImageUrls || []),
      ...(helicopter?.interiorImageUrls || []),
    ],
    [helicopter]
  );

  const fetchHelicopter = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/h-client/main/helicopters/sale/${id}`
      );
      if (response.data.success) {
        setHelicopter(response.data.helicopter);
        setLoading(false);
      } else {
        toast("Error fetching helicopter info", {
          description: response.data.message,
          position: "top-right",
        });
      }
    } catch (error: any) {
      toast("Error fetching helicopter info", {
        description: error.message,
        position: "top-right",
      });
    }
  }, [id]);

  useEffect(() => {
    fetchHelicopter();
  }, [fetchHelicopter]);

  useEffect(() => {
    if (helicopter) {
      document.title = `${helicopter.manufacturer} ${helicopter.helicopterName} | SkyRotors`;
    } else {
      document.title = "Helicopter Listing | SkyRotors";
    }
  }, [helicopter]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
      if (showImageViewer) {
        if (e.key === "Escape") {
          setShowImageViewer(false);
        } else if (e.key === "ArrowLeft") {
          prevViewerImage();
        } else if (e.key === "ArrowRight") {
          nextViewerImage();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showImageViewer, prevViewerImage, nextViewerImage]);

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

  if (!helicopter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl font-light text-gray-400 mb-4">404</div>
          <div className="text-xl text-gray-500">Helicopter not found</div>
        </div>
      </div>
    );
  }

  // HERO SECTION (like Jet Info Page)
  const pillStyle: React.CSSProperties = {
    background: "rgba(0,0,0,0.3)",
    color: "white",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "clamp(12px, 2.5vw, 14px)",
    fontWeight: 500,
    letterSpacing: "2px",
    textTransform: "uppercase" as React.CSSProperties["textTransform"],
    opacity: 0.9,
    border: "1px solid rgba(255,255,255,0.3)",
  };

  return (
    <div className="bg-white min-h-screen">
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
          <img
            loading="eager"
            fetchPriority="high"
            src={allImages[0] || "/fallback-image.jpg"}
            alt={`${helicopter.manufacturer} ${helicopter.helicopterName}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              animation: "subtleZoom 20s ease-in-out infinite",
            }}
          />
        </picture>
        {/* Overlay */}
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
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div
              style={{
                marginBottom: "20px",
                animation: "fadeInUp 1s ease-out",
              }}
            >
              <span
                style={{
                  fontSize: "clamp(12px, 2.5vw, 14px)",
                  fontWeight: 500,
                  letterSpacing: "2px",
                  textTransform:
                    "uppercase" as React.CSSProperties["textTransform"],
                  opacity: 0.9,
                  borderBottom: "1px solid rgba(255,255,255,0.3)",
                  paddingBottom: "8px",
                }}
              >
                Helicopter for Sale
              </span>
            </div>
            <p
              style={{
                fontSize: "clamp(2rem, 8vw, 4rem)",
                fontWeight: 300,
                margin: "0 0 10px 0",
                lineHeight: 1.2,
                animation: "fadeInUp 1s ease-out 0.2s both",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              {helicopter.manufacturer} {helicopter.helicopterName}
            </p>
            <p
              style={{
                fontSize: "clamp(16px, 3vw, 18px)",
                fontWeight: 400,
                margin: "0 0 30px 0",
                opacity: 0.9,
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
              <span style={pillStyle}>{helicopter.yearOfManufacture}</span>
              <span style={pillStyle}>{helicopter.seatingCapacity} Seats</span>
              <span style={pillStyle}>{helicopter.maximumRange} nm</span>
              <span style={pillStyle}>{helicopter.cruisingSpeed} Knots</span>
              <span style={pillStyle}>{formatPrice(helicopter.salePrice)}</span>
              {helicopter.status === "SOLD" && (
                <span
                  style={{
                    ...pillStyle,
                    background: "rgba(220, 38, 38, 0.9)",
                    color: "white",
                    fontWeight: 500,
                  }}
                >
                  SOLD
                </span>
              )}
            </div>
            {/* Favorite/Share Buttons */}
            <div
              style={{
                marginTop: 32,
                display: "flex",
                justifyContent: "center",
                gap: 24,
              }}
            >
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-full transition-colors ${
                  isFavorite
                    ? "text-red-500 hover:text-red-600"
                    : "text-white hover:text-gray-200"
                }`}
                aria-label={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
                style={{ background: "rgba(0,0,0,0.3)", border: "none" }}
              >
                <FaHeart className="text-lg" />
              </button>
              <button
                className="p-2 text-white hover:text-gray-200 rounded-full transition-colors"
                aria-label="Share this listing"
                style={{ background: "rgba(0,0,0,0.3)", border: "none" }}
              >
                <FaShare className="text-lg" />
              </button>
            </div>
          </div>
        </div>
        <style>{`
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
        `}</style>
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
                src={allImages[0] || "/fallback-image.jpg"}
                alt={`${helicopter.manufacturer} ${helicopter.helicopterName} - Main Image`}
              />
            </div>
            {/* Right Column - Grid of 4 Smaller Images */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
              {[1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className="relative aspect-[5/4] sm:aspect-[16/10] overflow-hidden rounded-lg shadow-md"
                >
                  <img
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    src={allImages[index] || "/fallback-image.jpg"}
                    alt={`${helicopter.manufacturer} ${
                      helicopter.helicopterName
                    } - Image ${index + 1}`}
                  />
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
              <FaTimes size={24} />
            </button>
            {/* Modal Header */}
            <div className="text-center p-8 border-b border-gray-200">
              <h2 className="text-2xl font-light text-gray-900 mb-2">
                Image Gallery
              </h2>
              <p className="text-sm text-gray-600 font-light">
                {helicopter.manufacturer} {helicopter.helicopterName} •{" "}
                {helicopter.yearOfManufacture}
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
                      setShowImageViewer(false);
                      setTimeout(() => setShowImageViewer(true), 0);
                    }}
                  >
                    <img
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      src={image}
                      alt={`${helicopter.manufacturer} ${
                        helicopter.helicopterName
                      } - Image ${index + 1}`}
                    />
                    <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <FaChevronRight className="text-white w-8 h-8" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* About Section */}
      <div className="bg-white pt-16 md:pt-20 lg:pt-24">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8 text-center">
              About {helicopter.manufacturer} {helicopter.helicopterName}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {helicopter.description ? (
                <div>
                  {helicopter.description.split("\n").map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              ) : (
                <p>
                  Discover the versatility and performance of the{" "}
                  {helicopter.manufacturer} {helicopter.helicopterName}. This
                  helicopter offers exceptional comfort and reliability for a
                  wide range of missions.
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
              Specification: {helicopter.manufacturer}{" "}
              {helicopter.helicopterName}
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
                      <td className="text-gray-900">
                        {helicopter.seatingCapacity}
                      </td>
                    </tr>
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">
                        Cabin Features
                      </th>
                      <td className="text-gray-900">
                        {helicopter.cabinFeatures
                          ?.map((f) => f.name)
                          .join(", ") || "N/A"}
                      </td>
                    </tr>
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">
                        Baggage Capacity
                      </th>
                      <td className="text-gray-900">
                        {helicopter.baggageCapacity}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Performance
                </h3>
                <table className="w-full">
                  <tbody className="space-y-2">
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">
                        Cruising Speed
                      </th>
                      <td className="text-gray-900">
                        {helicopter.cruisingSpeed} Knots
                      </td>
                    </tr>
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">
                        Maximum Range
                      </th>
                      <td className="text-gray-900">
                        {helicopter.maximumRange} nm
                      </td>
                    </tr>
                    {helicopter.fuelCapacity && (
                      <tr className="flex justify-between py-2 border-b border-gray-200">
                        <th className="text-gray-600 font-medium">
                          Fuel Capacity
                        </th>
                        <td className="text-gray-900">
                          {helicopter.fuelCapacity}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Technical Details
                </h3>
                <table className="w-full">
                  <tbody className="space-y-2">
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">Year Built</th>
                      <td className="text-gray-900">
                        {helicopter.yearOfManufacture}
                      </td>
                    </tr>
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">
                        Flight Hours
                      </th>
                      <td className="text-gray-900">
                        {helicopter.totalFlightHours.toLocaleString()}
                      </td>
                    </tr>
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">
                        Last Inspection
                      </th>
                      <td className="text-gray-900">
                        {formatDate(helicopter.lastInspection)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Identification
                </h3>
                <table className="w-full">
                  <tbody className="space-y-2">
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">
                        Manufacturer
                      </th>
                      <td className="text-gray-900">
                        {helicopter.manufacturer}
                      </td>
                    </tr>
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">Model</th>
                      <td className="text-gray-900">
                        {helicopter.helicopterType}
                      </td>
                    </tr>
                    <tr className="flex justify-between py-2 border-b border-gray-200">
                      <th className="text-gray-600 font-medium">
                        Registration
                      </th>
                      <td className="text-gray-900">
                        {helicopter.registrationNumber}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact & Vendor Info - Minimalistic */}
      <div className="w-full py-10 px-0 bg-white">
        <div className="w-full flex flex-col items-center justify-center px-2 sm:px-4 md:px-8">
          <div className="w-full flex flex-col items-center justify-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2 text-center">
              {helicopter.status === "SOLD"
                ? "This helicopter has been sold"
                : "Enquire about this helicopter"}
            </h2>
            <p className="text-gray-500 mb-6 text-base text-center">
              {helicopter.status === "SOLD"
                ? "Contact us to find a similar model or explore other options."
                : "Get in touch with our team for more information and viewing arrangements."}
            </p>
            <div className="w-full flex justify-center">
              {helicopter.status === "SOLD" ? (
                <button
                  onClick={() => {
                    setModalType("source");
                    setIsModalOpen(true);
                  }}
                  className="w-full max-w-xl bg-gray-900 text-white py-5 px-0 font-semibold text-lg tracking-wide hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                  style={{ borderRadius: 0 }}
                >
                  Find Similar Helicopter
                </button>
              ) : (
                <button
                  onClick={() => {
                    setModalType("contact");
                    setIsModalOpen(true);
                  }}
                  className="w-full max-w-xl bg-gray-900 text-white py-4 px-0 font-semibold text-base hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                  style={{ borderRadius: 0 }}
                >
                  Contact Seller
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* MODALS */}
      <ContactFormModal
        isOpen={isModalOpen && modalType === "contact"}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
        helicopterName={helicopter.helicopterName}
        vendorId={helicopter.vendorId}
        listingId={helicopter.id}
      />
      <SourceHelicopterModal
        isOpen={isModalOpen && modalType === "source"}
        onClose={() => setIsModalOpen(false)}
        helicopterName={helicopter.helicopterName}
        vendorId={helicopter.vendorId}
        listingId={helicopter.id}
      />
    </div>
  );
}

export default HelicopterForSaleInfo;
