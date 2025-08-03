import React, { useEffect, useState, useCallback, useMemo } from "react";
import charterVendorApi from "./api";
import { toast } from "sonner";
import { format, parseISO } from "date-fns";
import {
  FiRefreshCw,
  FiMail,
  FiUsers,
  FiMapPin,
  FiTrendingUp,
  FiClock,
  FiEye,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { Plane } from "lucide-react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  departureLocation: string;
  arrivalLocation: string;
  departureDate: string;
  returnDate: string;
  passengerCount: number;
  specialRequests: string;
  createdAt: string;
  read: boolean;
}

interface Fleet {
  id: string;
  jetName: string;
  aircraftType: string;
  manufacturer: string;
  seatingCapacity: string;
  maximumRange: string;
  pricePerHour: string;
  status: string;
  exteriorImages: string[];
  cabinFeatures?: string[];
  inFlightMeals?: boolean;
  flightAttendant?: boolean;
  views: number;
}

interface Vendor {
  name: string;
  email: string;
  phone: string;
  status: string;
}

interface Message {
  id: string;
  customerName: string;
  customerEmail: string;
  message: string;
  createdAt: string;
  read: boolean;
}

interface Stat {
  title: string;
  // @ts-ignore
  value: string | number | JSX.Element;
  // @ts-ignore
  icon: JSX.Element;
  trend: "positive" | "neutral";
  description: string;
  color: string;
  borderColor: string;
}

interface ApiError {
  message: string;
}

const mapApiResponseToFleet = (data: any[]): Fleet[] => {
  return data.map((item) => ({
    id: item.id || "",
    jetName: item.jetName || "Unknown",
    aircraftType: item.aircraftType || "",
    manufacturer: item.manufacturer || "",
    seatingCapacity: item.seatingCapacity || "0",
    maximumRange: item.maximumRange || "0",
    pricePerHour: item.pricePerHour || "0",
    status: item.status || "INACTIVE",
    exteriorImages: Array.isArray(item.exteriorImages)
      ? item.exteriorImages
      : [],
    cabinFeatures: Array.isArray(item.cabinFeatures) ? item.cabinFeatures : [],
    inFlightMeals: !!item.inFlightMeals,
    flightAttendant: !!item.flightAttendant,
    views: Number(item.views) || 0,
  }));
};

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = () => setHasError(true);
    window.addEventListener("error", errorHandler);
    return () => window.removeEventListener("error", errorHandler);
  }, []);

  if (hasError) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600">Something went wrong.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 text-indigo-600 hover:text-indigo-800"
        >
          Reload Page
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

const CharterDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [fleets, setFleets] = useState<Fleet[]>([]);
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  console.log(messages);
  const [loading, setLoading] = useState({
    bookings: false,
    fleets: false,
    vendor: false,
    messages: false,
  });
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedFleet, setSelectedFleet] = useState<Fleet | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading((prev) => ({
        ...prev,
        bookings: true,
        fleets: true,
        vendor: true,
        messages: true,
      }));

      const [
        bookingsResponse,
        fleetsResponse,
        vendorResponse,
        messagesResponse,
      ] = await Promise.all([
        charterVendorApi.get<{ success: boolean; data: Booking[] }>(
          "/bookings"
        ),
        charterVendorApi.get<{ success: boolean; data: any[] }>("/fleet"),
        charterVendorApi.get<{ success: boolean; vendor: Vendor }>("/vendor"),
        charterVendorApi.get<{ success: boolean; data: Message[] }>(
          "/messages"
        ),
      ]);

      if (bookingsResponse?.data?.success) {
        setBookings(bookingsResponse.data.data || []);
      }

      if (fleetsResponse?.data?.success) {
        setFleets(mapApiResponseToFleet(fleetsResponse.data.data || []));
      }

      if (vendorResponse?.data?.success) {
        setVendor(vendorResponse.data.vendor || null);
      }

      if (messagesResponse?.data?.success) {
        setMessages(messagesResponse.data.data || []);
      }
    } catch (error: unknown) {
      const err = error as ApiError;
      toast.error("Failed to load data", {
        description: err.message || "Something went wrong",
        action: { label: "Retry", onClick: fetchData },
      });
    } finally {
      setLoading({
        bookings: false,
        fleets: false,
        vendor: false,
        messages: false,
      });
    }
  }, []);

  const handleDeleteFleet = async (id: string) => {
    try {
      setDeletingId(id);
      const response = await charterVendorApi.delete(`/fleet/${id}`);
      if (response.data.success) {
        setFleets((prev) => prev.filter((fleet) => fleet.id !== id));
        toast.success("Aircraft deleted successfully");
      } else {
        throw new Error(response.data.message || "Failed to delete aircraft");
      }
    } catch (error: unknown) {
      const err = error as ApiError;
      toast.error(err.message || "Failed to delete aircraft");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string): string => {
    try {
      return format(parseISO(dateString), "MMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  const formatPrice = (price: string): string => {
    const num = parseInt(price, 10);
    if (isNaN(num)) return "$0";
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
    return `$${num}`;
  };

  const stats = useMemo<Stat[]>(
    () => [
      {
        title: "Total Bookings",
        value: loading.bookings ? (
          <span className="inline-block h-6 w-8 bg-gray-200 rounded animate-pulse"></span>
        ) : (
          bookings.length
        ),
        icon: <FiUsers className="text-xl" />,
        trend: bookings.length > 0 ? "positive" : "neutral",
        description: "Total customer bookings",
        color: "bg-green-50 text-green-600",
        borderColor: "border-green-200",
      },
      {
        title: "Unread Bookings",
        value: loading.bookings ? (
          <span className="inline-block h-6 w-8 bg-gray-200 rounded animate-pulse"></span>
        ) : (
          bookings.filter((b) => !b.read).length
        ),
        icon: <FiMail className="text-xl" />,
        trend:
          bookings.filter((b) => !b.read).length > 0 ? "positive" : "neutral",
        description: "Pending customer inquiries",
        color: "bg-blue-50 text-blue-600",
        borderColor: "border-blue-200",
      },
      {
        title: "Average Price",
        value: loading.fleets ? (
          <span className="inline-block h-6 w-8 bg-gray-200 rounded animate-pulse"></span>
        ) : fleets.length > 0 ? (
          formatPrice(
            (
              fleets.reduce(
                (sum, fleet) => sum + parseInt(fleet.pricePerHour, 10),
                0
              ) / fleets.length
            ).toString()
          )
        ) : (
          "$0"
        ),
        icon: <FiTrendingUp className="text-xl" />,
        trend: fleets.length > 0 ? "positive" : "neutral",
        description: "Average price per hour",
        color: "bg-purple-50 text-purple-600",
        borderColor: "border-purple-200",
      },
      {
        title: "Total Capacity",
        value: loading.fleets ? (
          <span className="inline-block h-6 w-8 bg-gray-200 rounded animate-pulse"></span>
        ) : (
          fleets.reduce(
            (sum, fleet) => sum + parseInt(fleet.seatingCapacity, 10),
            0
          )
        ),
        icon: <FiUsers className="text-xl" />,
        trend: "neutral",
        description: "Total seats available",
        color: "bg-yellow-50 text-yellow-600",
        borderColor: "border-yellow-200",
      },
    ],
    [bookings, fleets, loading]
  );

  const topPerformingFleets = useMemo(() => {
    return [...fleets]
      .sort((a, b) => b.views - a.views)
      .slice(0, 3)
      .map((fleet) => ({
        ...fleet,
        performance: fleet.views,
      }));
  }, [fleets]);

  const chartData = useMemo(
    () => ({
      labels: bookings.slice(0, 5).map((b) => b.customerName.split(" ")[0]),
      datasets: [
        {
          label: "Passenger Count",
          data: bookings.slice(0, 5).map((b) => b.passengerCount),
          backgroundColor: "rgba(99, 102, 241, 0.6)",
          borderColor: "rgba(99, 102, 241, 1)",
          borderWidth: 1,
        },
      ],
    }),
    [bookings]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-sm p-6 mb-6 text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-white">
                  Welcome back, {vendor?.name || "Vendor"}!
                </p>
                <p className="text-sm text-blue-100 mt-1">
                  {vendor?.email
                    ? `Company: ${vendor.email.split("@")[1]}`
                    : "Your Charter Dashboard"}
                </p>
                <div className="flex items-center mt-2 text-sm text-blue-100">
                  <FiClock className="mr-1" />
                  <span>Last updated: {new Date().toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-4 sm:mt-0">
                <button
                  onClick={fetchData}
                  disabled={Object.values(loading).some(Boolean)}
                  className={`flex items-center px-4 py-2 bg-white bg-opacity-20 text-indigo-600 rounded-lg hover:bg-opacity-30 transition-all ${
                    Object.values(loading).some(Boolean) ? "animate-pulse" : ""
                  }`}
                >
                  <FiRefreshCw className="mr-2" />
                  {Object.values(loading).some(Boolean)
                    ? "Refreshing..."
                    : "Refresh Data"}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Performance Overview
              </h2>
              <div className="flex items-center text-sm text-gray-500">
                <FiTrendingUp className="mr-1" />
                <span>Real-time data</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`${stat.color} border ${stat.borderColor} rounded-xl p-4 shadow-sm hover:shadow-md transition-all`}
                  role="region"
                  aria-label={stat.title}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium">{stat.title}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <div
                      className={`p-2 rounded-lg ${
                        stat.trend === "positive"
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {stat.icon}
                    </div>
                  </div>
                  <p className="text-xs mt-2 text-gray-500">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performing Aircraft */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Top Performing Aircraft
              </h2>
              <Link
                to="/program/fleet"
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                View All
              </Link>
            </div>
            {loading.fleets ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : topPerformingFleets.length === 0 ? (
              <div className="text-center py-16">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Plane className="text-gray-400 text-3xl" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No aircraft found
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Add aircraft to track performance.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topPerformingFleets.map((fleet) => (
                  <div
                    key={fleet.id}
                    className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="relative">
                      {fleet.exteriorImages?.length > 0 ? (
                        <img
                          src={fleet.exteriorImages[0]}
                          alt={fleet.jetName}
                          className="w-full h-48 object-cover rounded-t-xl"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-t-xl">
                          <span className="text-gray-500 text-xs">
                            {fleet.jetName.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                        {formatPrice(fleet.pricePerHour)}/hr
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-900">
                        {fleet.jetName}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {fleet.manufacturer} {fleet.aircraftType}
                      </p>
                      <div className="mt-2 text-xs text-gray-500">
                        <div className="flex items-center">
                          <FiEye className="mr-1" />
                          <span>{fleet.views.toLocaleString()} views</span>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between">
                        <button
                          onClick={() => setSelectedFleet(fleet)}
                          className="text-sm text-indigo-600 hover:text-indigo-900"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Bookings
              </h2>
              <button
                onClick={fetchData}
                className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
              >
                <FiRefreshCw className="mr-1" />
                Refresh
              </button>
            </div>
            {loading.bookings ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-16">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FiUsers className="text-gray-400 text-3xl" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No bookings found
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  You haven't received any bookings yet.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Itinerary
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dates
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Passengers
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Special Requests
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <tr
                        key={booking.id}
                        className={`hover:bg-gray-50 transition-colors ${
                          !booking.read ? "bg-blue-50" : ""
                        }`}
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {booking.customerName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {booking.customerEmail}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {booking.departureLocation} →{" "}
                          {booking.arrivalLocation}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(booking.departureDate)}
                          {booking.returnDate && (
                            <div className="text-xs">
                              to {formatDate(booking.returnDate)}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {booking.passengerCount}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500 max-w-xs">
                          <span
                            className="truncate block"
                            title={booking.specialRequests}
                          >
                            {booking.specialRequests || "None"}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              booking.read
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {booking.read ? "Read" : "Unread"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Fleet Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Your Fleet
              </h2>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-3">
                  Showing {fleets.length} aircraft
                </span>
                <Link to="/program/fleet/add">
                  <button className="text-sm bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition-colors">
                    + Add New Aircraft
                  </button>
                </Link>
              </div>
            </div>
            {loading.fleets ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : fleets.length === 0 ? (
              <div className="text-center py-16">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Plane className="text-gray-400 text-3xl" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No aircraft found
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  You don't have any aircraft in your fleet yet. Add one to get
                  started.
                </p>
                <Link to="/program/fleet/add">
                  <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Add New Aircraft
                  </button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fleets.map((fleet) => (
                  <div
                    key={fleet.id}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="relative">
                      {fleet.exteriorImages?.length > 0 ? (
                        <img
                          src={fleet.exteriorImages[0]}
                          alt={fleet.jetName}
                          className="w-full h-48 object-cover rounded-t-xl"
                          onClick={() => setSelectedFleet(fleet)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) =>
                            e.key === "Enter" && setSelectedFleet(fleet)
                          }
                        />
                      ) : (
                        <div
                          className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-t-xl"
                          onClick={() => setSelectedFleet(fleet)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) =>
                            e.key === "Enter" && setSelectedFleet(fleet)
                          }
                        >
                          <span className="text-gray-500 text-xs">
                            {fleet.jetName.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                        {formatPrice(fleet.pricePerHour)}/hr
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium text-gray-900">
                          {fleet.jetName}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            fleet.status === "ACTIVE"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {fleet.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {fleet.manufacturer} {fleet.aircraftType}
                      </p>
                      <div className="mt-2 text-xs text-gray-500">
                        <div className="flex items-center">
                          <FiUsers className="mr-1" />
                          <span>{fleet.seatingCapacity} seats</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <FiMapPin className="mr-1" />
                          <span>{fleet.maximumRange} nm</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <FiEye className="mr-1" />
                          <span>{fleet.views.toLocaleString()} views</span>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {fleet.inFlightMeals && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            Meals
                          </span>
                        )}
                        {fleet.flightAttendant && (
                          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                            Attendant
                          </span>
                        )}
                        {fleet.cabinFeatures?.includes("WiFi") && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            WiFi
                          </span>
                        )}
                      </div>
                      <div className="mt-3 flex justify-between">
                        <Link to={`/program/fleet/edit/${fleet.id}`}>
                          <button className="text-sm text-indigo-600 hover:text-indigo-900">
                            Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeleteFleet(fleet.id)}
                          disabled={deletingId === fleet.id}
                          className={`text-sm ${
                            deletingId === fleet.id
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-red-600 hover:text-red-500"
                          }`}
                        >
                          {deletingId === fleet.id ? "Deleting..." : "Remove"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Bookings Analytics
              </h2>
              <div className="h-64">
                {loading.bookings ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="text-center h-full flex items-center justify-center">
                    <p className="text-gray-500 text-sm">
                      No booking data available
                    </p>
                  </div>
                ) : (
                  <Bar
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false },
                        tooltip: { enabled: true },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: { display: true, text: "Passenger Count" },
                        },
                        x: {
                          title: { display: true, text: "Customer" },
                        },
                      },
                    }}
                  />
                )}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Price Distribution
              </h2>
              <div className="h-64 bg-gray-50 rounded-lg flex flex-col items-center justify-center p-4 border border-gray-200">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-500">
                    Average Price Per Hour
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    {loading.fleets ? (
                      <span className="inline-block h-8 w-12 bg-gray-200 rounded animate-pulse"></span>
                    ) : fleets.length > 0 ? (
                      formatPrice(
                        (
                          fleets.reduce(
                            (sum, fleet) =>
                              sum + parseInt(fleet.pricePerHour, 10),
                            0
                          ) / fleets.length
                        ).toString()
                      )
                    ) : (
                      "$0"
                    )}
                  </p>
                </div>
                {fleets.length > 0 ? (
                  <div className="w-full">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>
                        Low:{" "}
                        {formatPrice(
                          Math.min(
                            ...fleets.map((f) => parseInt(f.pricePerHour, 10))
                          ).toString()
                        )}
                      </span>
                      <span>
                        High:{" "}
                        {formatPrice(
                          Math.max(
                            ...fleets.map((f) => parseInt(f.pricePerHour, 10))
                          ).toString()
                        )}
                      </span>
                    </div>
                    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-blue-500"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                    <div className="grid grid-cols-5 gap-2 mt-2">
                      {["$1K", "$5K", "$10K", "$20K", "$50K+"].map((price) => (
                        <div
                          key={price}
                          className="text-xs text-gray-500 text-center"
                        >
                          {price}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm">
                    No price data available
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-4">
                  Range of aircraft rental prices
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl shadow-sm p-6 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <p className="text-xl font-bold text-white mb-2">
                  Expand Your Fleet Today
                </p>
                <p className="text-blue-100 max-w-lg">
                  Add more aircraft to your fleet to attract more bookings.
                  Premium listings get up to 5x more inquiries.
                </p>
              </div>
              <Link to="/program/fleet/add">
                <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-md">
                  Add Aircraft
                </button>
              </Link>
            </div>
          </div>

          {/* Fleet Detail Modal */}
          {selectedFleet && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedFleet.jetName}
                    </h2>
                    <button
                      onClick={() => setSelectedFleet(null)}
                      className="text-gray-400 hover:text-gray-500"
                      aria-label="Close"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedFleet.manufacturer} • {selectedFleet.aircraftType}
                  </p>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Details
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-gray-600">Status</span>
                          <span className="font-medium">
                            {selectedFleet.status}
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-gray-600">
                            Seating Capacity
                          </span>
                          <span className="font-medium">
                            {selectedFleet.seatingCapacity}
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-gray-600">Maximum Range</span>
                          <span className="font-medium">
                            {selectedFleet.maximumRange} nm
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-gray-600">Price Per Hour</span>
                          <span className="font-medium">
                            {formatPrice(selectedFleet.pricePerHour)}
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-gray-600">Views</span>
                          <span className="font-medium">
                            {selectedFleet.views.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-gray-600">In-Flight Meals</span>
                          <span className="font-medium">
                            {selectedFleet.inFlightMeals
                              ? "Available"
                              : "Not Available"}
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-gray-600">
                            Flight Attendant
                          </span>
                          <span className="font-medium">
                            {selectedFleet.flightAttendant
                              ? "Included"
                              : "Not Included"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Images
                      </h3>
                      {selectedFleet.exteriorImages?.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4">
                          {selectedFleet.exteriorImages.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`${selectedFleet.jetName} image ${
                                index + 1
                              }`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="text-gray-500 text-sm">
                          No images available
                        </div>
                      )}
                      <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
                        Cabin Features
                      </h3>
                      {
                        // @ts-ignore
                        selectedFleet.cabinFeatures?.length > 0 ? (
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {
                              // @ts-ignore
                              selectedFleet.cabinFeatures.map(
                                (feature, index) => (
                                  <li key={index}>{feature}</li>
                                )
                              )
                            }
                          </ul>
                        ) : (
                          <div className="text-gray-500 text-sm">
                            No cabin features listed
                          </div>
                        )
                      }
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end gap-4">
                    <Link to={`/program/fleet/edit/${selectedFleet.id}`}>
                      <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                        Edit Aircraft
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        handleDeleteFleet(selectedFleet.id);
                        setSelectedFleet(null);
                      }}
                      disabled={deletingId === selectedFleet.id}
                      className={`px-4 py-2 rounded-lg ${
                        deletingId === selectedFleet.id
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-red-600 text-white hover:bg-red-700"
                      } transition-colors`}
                    >
                      {deletingId === selectedFleet.id
                        ? "Deleting..."
                        : "Delete Aircraft"}
                    </button>
                    <button
                      onClick={() => setSelectedFleet(null)}
                      className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default CharterDashboard;

