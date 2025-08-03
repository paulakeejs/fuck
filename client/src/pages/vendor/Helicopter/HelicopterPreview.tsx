import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import hApi from "./HApi";
import { toast } from "sonner";

interface CabinFeature {
  name: string;
}

interface HelicopterData {
  id: string;
  helicopterName: string;
  helicopterType: string;
  manufacturer: string;
  yearOfManufacture: number;
  registrationNumber: string;
  serialNumber: string;
  seatingCapacity: number;
  maximumRange: number;
  cruisingSpeed: number;
  baggageCapacity: string;
  condition: string;
  totalFlightHours: number;
  maintenanceHistory: string;
  lastInspection: string; // ISO date string from Prisma
  salePrice: number;
  discounts?: string;
  cabinFeatures: CabinFeature[];
  avionics?: string;
  emergencyEquipment: boolean;
  cargoHook: boolean;
  exteriorImageUrls: string[];
  interiorImageUrls: string[];
  videoLink?: string;
  additionalEquipment?: string;
  transactionSignature: string;
  transactionLink?: string;
  vendorId: string;
}

const HelicopterPreview: React.FC = React.memo(() => {
  const { id } = useParams<{ id: string }>();
  const [helicopter, setHelicopter] = useState<HelicopterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHelicopter = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await hApi.get(`/preview/${id}`);
      if (response.data.success) {
        setHelicopter(response.data.helicopter);
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to load helicopter details";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchHelicopter();
  }, [fetchHelicopter]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-4 animate-pulse">
            <div className="h-96 bg-gray-300 rounded-lg"></div>
            <div className="h-8 bg-gray-300 rounded w-3/4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
              </div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !helicopter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {error ? "Error Loading Helicopter" : "Helicopter Not Found"}
          </h2>
          <p className="text-gray-600 mb-6">
            {error ||
              "The helicopter listing you're looking for doesn't exist."}
          </p>
          <button
            onClick={fetchHelicopter}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            aria-label="Retry loading helicopter details"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const getVideoEmbedUrl = (url?: string): string | null => {
    if (!url) return null;
    // Handle YouTube URLs
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)?.[1];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }
    // Add support for other platforms if needed
    return url;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="relative">
            <div className="w-full aspect-[16/9]">
              <Carousel
                showArrows={true}
                showStatus={false}
                showThumbs={true}
                infiniteLoop={true}
                autoPlay={true}
                interval={5000}
                className="w-full"
              >
                {[
                  ...helicopter.exteriorImageUrls,
                  ...helicopter.interiorImageUrls,
                ].map((image, index) => (
                  <div key={index} className="w-full aspect-[16/9]">
                    <img
                      src={image}
                      alt={`Helicopter ${
                        index < helicopter.exteriorImageUrls.length
                          ? "exterior"
                          : "interior"
                      } view ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                {helicopter.helicopterName}
              </h1>
              <p className="text-lg sm:text-xl text-gray-200 mt-2">
                {helicopter.manufacturer} - {helicopter.yearOfManufacture}
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6 sm:p-8">
            {/* Price and Quick Stats */}
            <div className="flex flex-wrap justify-center sm:justify-between items-center mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
              <div className="text-center px-4 mb-4 sm:mb-0">
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  ${helicopter.salePrice.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">List Price</p>
              </div>
              <div className="text-center px-4 mb-4 sm:mb-0">
                <p className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {helicopter.totalFlightHours.toLocaleString()} hrs
                </p>
                <p className="text-sm text-gray-600">Total Hours</p>
              </div>
              <div className="text-center px-4 mb-4 sm:mb-0">
                <p className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {helicopter.seatingCapacity}
                </p>
                <p className="text-sm text-gray-600">Seats</p>
              </div>
              <div className="text-center px-4">
                <p className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {helicopter.condition}
                </p>
                <p className="text-sm text-gray-600">Condition</p>
              </div>
            </div>

            {/* Detailed Specifications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                  Aircraft Details
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Registration</p>
                      <p className="font-medium">
                        {helicopter.registrationNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Serial Number</p>
                      <p className="font-medium">{helicopter.serialNumber}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="font-medium">{helicopter.helicopterType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Inspection</p>
                    <p className="font-medium">
                      {new Date(helicopter.lastInspection).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">
                  Performance
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Maximum Range</p>
                      <p className="font-medium">
                        {helicopter.maximumRange} NM
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Cruising Speed</p>
                      <p className="font-medium">
                        {helicopter.cruisingSpeed} knots
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Baggage Capacity</p>
                    <p className="font-medium">{helicopter.baggageCapacity}</p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                  Features & Equipment
                </h2>
                <div className="space-y-6 text-gray-700">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Cabin Features
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {helicopter.cabinFeatures.length > 0 ? (
                        helicopter.cabinFeatures.map((feature, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {feature.name}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500">
                          No cabin features specified
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Avionics</h3>
                    <p>{helicopter.avionics || "None specified"}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Additional Equipment
                    </h3>
                    <p>{helicopter.additionalEquipment || "None specified"}</p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center">
                      <div
                        className={`w-4 h-4 rounded-full mr-2 ${
                          helicopter.emergencyEquipment
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                      <span>Emergency Equipment</span>
                    </div>
                    <div className="flex items-center">
                      <div
                        className={`w-4 h-4 rounded-full mr-2 ${
                          helicopter.cargoHook ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                      <span>Cargo Hook</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Maintenance History */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Maintenance History
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <p className="text-gray-700 whitespace-pre-line">
                  {helicopter.maintenanceHistory ||
                    "No maintenance history provided"}
                </p>
              </div>
            </div>

            {/* Video Tour */}
            {getVideoEmbedUrl(helicopter.videoLink) && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                  Video Tour
                </h2>
                <div className="relative w-full aspect-[16/9]">
                  <iframe
                    src={getVideoEmbedUrl(helicopter.videoLink)!}
                    title="Helicopter Video Tour"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                  ></iframe>
                </div>
              </div>
            )}

            {/* Contact Section */}
            <div className="mt-8 text-center">
              <button
                onClick={() => toast.info("Contact form coming soon!")}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Contact the seller for this helicopter"
              >
                Contact Seller
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default HelicopterPreview;
