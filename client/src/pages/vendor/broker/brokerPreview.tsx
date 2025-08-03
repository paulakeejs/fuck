import { useParams } from "react-router-dom";
import { toast } from "sonner";
import charterVendorApi from "../charter/api";
import { useEffect, useState } from "react";

interface AdditionalFee {
  name: string;
  price: number;
}

interface JetData {
  jetName: string;
  aircraftType: string;
  manufacturer: string;
  yearOfManufacture: string;
  registrationNumber: string;
  homeBase: string;
  availableRoutes: string;
  operatingDays: string;
  seatingCapacity: number;
  cabinConfiguration: string;
  maximumRange: number;
  cruisingSpeed: number;
  baggageCapacity: number;
  pricePerHour: number;
  minimumFlightTime: number;
  tripOption: string;
  noticeRequired: number;
  discounts?: string;
  additionalFees: AdditionalFee[];
  cabinFeatures: string[];
  inFlightMeals: boolean;
  flightAttendant: boolean;
  petsAllowed: boolean;
  smokingAllowed: boolean;
  luxuryCarService: boolean;
  exteriorImages: string[];
  interiorImages: string[];
  videoLink?: string;
  transactionSignature: string;
  transactionLink: string;
  status: "pending" | "approved" | "rejected";
}

function BrokerPreview() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<JetData | null>(null);
  const [loading, setLoading] = useState(true);

  const information = async () => {
    try {
      setLoading(true);
      const response = await charterVendorApi.get(`/preview/${id}`);
      if (response.data.success) {
        setData(response.data.data);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to fetch jet details");
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    information();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        No data available
      </div>
    );
  }

  return (
    <div className="p-5 max-w-6xl mx-auto bg-white rounded-lg shadow-md">
      {/* Approval Status Banner */}
      {data.status === "approved" && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="font-bold">
              This listing has been approved and is now visible to customers.
            </p>
          </div>
        </div>
      )}

      {/* Jet Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {data.jetName} - {data.aircraftType}
        </h1>
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="bg-blue-50 px-3 py-1 rounded-full text-sm text-blue-800">
            <strong>Manufacturer:</strong> {data.manufacturer}
          </div>
          <div className="bg-blue-50 px-3 py-1 rounded-full text-sm text-blue-800">
            <strong>Year:</strong> {data.yearOfManufacture}
          </div>
          <div className="bg-blue-50 px-3 py-1 rounded-full text-sm text-blue-800">
            <strong>Reg:</strong> {data.registrationNumber}
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Images */}
        <div className="md:col-span-2">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
              Exterior
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data.exteriorImages.map((url, index) => (
                <img
                  key={`exterior-${index}`}
                  src={url}
                  alt={`Exterior ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow"
                />
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
              Interior
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data.interiorImages.map((url, index) => (
                <img
                  key={`interior-${index}`}
                  src={url}
                  alt={`Interior ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow"
                />
              ))}
            </div>
          </div>

          {data.videoLink && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
                Video Tour
              </h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={data.videoLink}
                  className="w-full h-96 rounded-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          {/* Quick Facts */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-3 text-gray-700">
              Quick Facts
            </h2>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-600">Seats:</span>
                <span className="font-medium">{data.seatingCapacity}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Range:</span>
                <span className="font-medium">{data.maximumRange} nm</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Speed:</span>
                <span className="font-medium">{data.cruisingSpeed} knots</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Home Base:</span>
                <span className="font-medium">{data.homeBase}</span>
              </li>
            </ul>
          </div>

          {/* Pricing */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-3 text-gray-700">
              Pricing
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">Hourly Rate</p>
                  <p className="text-sm text-gray-500">
                    Min {data.minimumFlightTime} hours
                  </p>
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  ${data.pricePerHour}/hr
                </p>
              </div>

              {data.discounts && (
                <div className="bg-blue-100 p-2 rounded">
                  <p className="text-sm text-blue-800">
                    <strong>Discounts:</strong> {data.discounts}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Additional Fees */}
          {data.additionalFees.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-3 text-gray-700">
                Additional Fees
              </h2>
              <ul className="space-y-2">
                {data.additionalFees.map((fee, index) => (
                  <li key={index} className="flex justify-between">
                    <span className="text-gray-600">{fee.name}:</span>
                    <span className="font-medium">${fee.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Amenities */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-3 text-gray-700">
              Amenities
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <span
                  className={`inline-block w-3 h-3 rounded-full mr-2 ${
                    data.inFlightMeals ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
                <span>Meals</span>
              </div>
              <div className="flex items-center">
                <span
                  className={`inline-block w-3 h-3 rounded-full mr-2 ${
                    data.flightAttendant ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
                <span>Attendant</span>
              </div>
              <div className="flex items-center">
                <span
                  className={`inline-block w-3 h-3 rounded-full mr-2 ${
                    data.petsAllowed ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
                <span>Pets</span>
              </div>
              <div className="flex items-center">
                <span
                  className={`inline-block w-3 h-3 rounded-full mr-2 ${
                    data.smokingAllowed ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
                <span>Smoking</span>
              </div>
              <div className="flex items-center">
                <span
                  className={`inline-block w-3 h-3 rounded-full mr-2 ${
                    data.luxuryCarService ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
                <span>Luxury Car</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Sections */}
      <div className="mt-8 space-y-8">
        {/* Cabin Features */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Cabin Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.cabinFeatures.map((feature, index) => (
              <div key={index} className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-500 mr-2 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-700">
              Operational Details
            </h2>
            <ul className="space-y-2">
              <li className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Available Routes</span>
                <span className="font-medium">{data.availableRoutes}</span>
              </li>
              <li className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Operating Days</span>
                <span className="font-medium">{data.operatingDays}</span>
              </li>
              <li className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Notice Required</span>
                <span className="font-medium">
                  {data.noticeRequired} day(s)
                </span>
              </li>
              <li className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Trip Option</span>
                <span className="font-medium">{data.tripOption}</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-700">
              Technical Specifications
            </h2>
            <ul className="space-y-2">
              <li className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Cabin Configuration</span>
                <span className="font-medium">{data.cabinConfiguration}</span>
              </li>
              <li className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Baggage Capacity</span>
                <span className="font-medium">
                  {data.baggageCapacity} cu.ft
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Blockchain Verification */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            Blockchain Verification
          </h2>
          <div className="space-y-2">
            <p className="text-sm text-gray-600 break-all">
              <strong>Transaction Signature:</strong>{" "}
              {data.transactionSignature}
            </p>
            <a
              href={data.transactionLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              View on Solscan
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrokerPreview;
