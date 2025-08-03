import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Calendar, Globe, Link2, MapPin } from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "@/lib/api";

// Interfaces
interface VendorData {
  id: string;
  companyName: string;
  brandImage: string;
  name: string;
  phone: string;
  status: string;
  description: string;
  serviceType: string;
  createdAt: string;
  website: string;
}

interface JetListing {
  id: string;
  model: string;
  price: string;
  exteriorImageUrls: string[];
  year: number;
  totalTimeSinceNew: number;
  currentLocation: string;
  specs: {
    range: number;
    cruiseSpeed: number;
    maxAltitude: number;
  };
  sponsored: boolean;
}

function JetSeller() {
  const [vendorData, setVendorData] = useState<VendorData | null>(null);
  const [jets, setJets] = useState<JetListing[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch vendor profile
        const vendorResponse = await axiosInstance.get(`/jets/sale/user/${id}`);
        if (!vendorResponse.data.success) {
          throw new Error(
            vendorResponse.data.message || "Failed to fetch vendor data"
          );
        }
        setVendorData(vendorResponse.data.vendor);

        // Fetch jets
        const jetsResponse = await axiosInstance.get(`/jets/sale/seller/${id}`);
        if (!jetsResponse.data.success) {
          throw new Error(
            jetsResponse.data.message || "Failed to fetch jets data"
          );
        }

        // Filter only sponsored jets and map to our interface
        const sponsoredJets = jetsResponse.data.data
          .filter((jet: any) => jet.sponsored)
          .map((jet: any) => ({
            id: jet.id,
            model: `${jet.manufacturer} ${jet.model}`,
            price: `$${parseInt(jet.price).toLocaleString()}`,
            exteriorImageUrls: jet.exteriorImageUrls,
            year: jet.year,
            totalTimeSinceNew: jet.totalTimeSinceNew,
            currentLocation: jet.currentLocation,
            specs: {
              range: jet.range,
              cruiseSpeed: jet.cruiseSpeed,
              maxAltitude: jet.maxAltitude,
            },
            sponsored: jet.sponsored,
          }));

        setJets(sponsoredJets);
      } catch (error: any) {
        toast.error(error.message || "Failed to fetch data");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Format date to show only year
  const formatYear = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  return (
    <div className="min-h-screen mt-20 bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Vendor Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden">
          <div className="p-6 sm:p-8">
            {loading ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 animate-pulse">
                <div className="flex-shrink-0">
                  <div className="h-24 w-24 rounded-full bg-gray-200"></div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ) : vendorData ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="flex-shrink-0">
                  <img
                    className="h-24 w-24 rounded-full object-cover border-4 border-gray-100"
                    src={vendorData.brandImage}
                    alt={`${vendorData.companyName} logo`}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        {vendorData.companyName}
                      </h1>
                      <div className="flex flex-wrap items-center gap-4 mt-2">
                        <div className="flex items-center text-gray-500">
                          <Calendar
                            className="h-4 w-4 mr-1"
                            aria-hidden="true"
                          />
                          <span>
                            Member since {formatYear(vendorData.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <a
                        href={`tel:${vendorData.phone}`}
                        className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900"
                        aria-label="Contact seller"
                      >
                        Contact Seller
                      </a>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-600">{vendorData.description}</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Contact Information
            </h2>
            {loading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ) : vendorData ? (
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin
                    className="h-5 w-5 text-gray-400 mr-3"
                    aria-hidden="true"
                  />
                  <span className="text-gray-600">Based in USA</span>
                </div>
                <div className="flex items-center">
                  <Globe
                    className="h-5 w-5 text-gray-400 mr-3"
                    aria-hidden="true"
                  />
                  <a
                    href={
                      vendorData.website.startsWith("http")
                        ? vendorData.website
                        : `https://${vendorData.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 hover:underline"
                  >
                    {vendorData.website}
                  </a>
                </div>
                <div className="flex items-center">
                  <Link2
                    className="h-5 w-5 text-gray-400 mr-3"
                    aria-hidden="true"
                  />
                  <a
                    href={`tel:${vendorData.phone}`}
                    className="text-gray-900 hover:underline"
                  >
                    {vendorData.phone}
                  </a>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Featured Listings */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Featured Jet Listings
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-gray-200 rounded"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : jets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jets.map((jet) => (
                <div
                  key={jet.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48">
                    <img
                      className="w-full h-full object-cover"
                      src={
                        jet.exteriorImageUrls[0] ||
                        "https://via.placeholder.com/400x200?text=Jet+Image"
                      }
                      alt={`${jet.model} jet`}
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-xl font-bold text-white">
                        {jet.model}
                      </h3>
                      <p className="text-white/90">{jet.price}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Year</p>
                        <p className="font-medium text-gray-900">{jet.year}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Flight Hours</p>
                        <p className="font-medium text-gray-900">
                          {jet.totalTimeSinceNew.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Range</p>
                        <p className="font-medium text-gray-900">
                          {jet.specs.range.toLocaleString()} nm
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Cruise Speed</p>
                        <p className="font-medium text-gray-900">
                          {jet.specs.cruiseSpeed} knots
                        </p>
                      </div>
                    </div>
                    <hr className="my-4 border-gray-200" />
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" aria-hidden="true" />
                        {jet.currentLocation}
                      </div>
                      <Link
                        to={`/jets/${jet.id}`}
                        className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900"
                        aria-label={`View details for ${jet.model}`}
                      >
                        View Details
                        <ArrowRight
                          className="ml-2 h-4 w-4"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <p className="text-gray-500">
                No sponsored jets available from this vendor
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JetSeller;
