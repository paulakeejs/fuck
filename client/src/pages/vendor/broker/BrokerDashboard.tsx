import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import {
  Plane,
  List,
  Mail,
  Calendar,
  Users,
  Clock,
  TrendingUp,
  MessageSquare,
  RefreshCw,
  ChevronRight,
  MapPin,
  FileText,
} from "lucide-react";
import vendorApi from "../functions/vendorApi";
import charterVendorApi from "../charter/api";

interface JetListing {
  id: string;
  manufacturer: string;
  model: string;
  price: string;
  year: number;
  totalTimeSinceNew: number;
  currentLocation: string;
  status: string;
  views: number;
  exteriorImageUrls: string[];
}

interface CharterListing {
  id: string;
  jetName: string;
  aircraftType: string;
  manufacturer: string;
  pricePerHour: string;
  homeBase: string;
  status: string;
  views: number;
  exteriorImages: string[];
}

interface Message {
  id: string;
  customerName: string;
  customerEmail: string;
  customerCountry: string;
  listingId: string;
  message: string;
  createdAt: string;
  read: boolean;
}

interface BookingRequest {
  id: string;
  customerName: string;
  departureLocation: string;
  arrivalLocation: string;
  departureDate: string;
  returnDate: string | null;
  passengerCount: number;
  status: string;
  createdAt: string;
}

function BrokerDashboard() {
  const vendor = useSelector((state: any) => state.vendor.vendor);
  const [jetListings, setJetListings] = useState<JetListing[]>([]);
  const [charterListings, setCharterListings] = useState<CharterListing[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState({
    jets: true,
    charters: true,
    messages: true,
    bookings: true,
  });
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    setRefreshing(true);
    try {
      // Fetch jet listings
      const jetsResponse = await vendorApi.get("/mine");
      if (jetsResponse.data.success) {
        setJetListings(jetsResponse.data.data);
      }

      // Fetch charter listings
      const chartersResponse = await charterVendorApi.get("/fleet");
      if (chartersResponse.data.success) {
        setCharterListings(chartersResponse.data.data);
      }

      // Fetch messages
      const messagesResponse = await vendorApi.get("/messages");
      if (messagesResponse.data.success) {
        setMessages(messagesResponse.data.data);
      }

      // Fetch booking requests
      const bookingsResponse = await charterVendorApi.get("/bookings");
      if (bookingsResponse.data.success) {
        setBookingRequests(bookingsResponse.data.data);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch data");
    } finally {
      setLoading({
        jets: false,
        charters: false,
        messages: false,
        bookings: false,
      });
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Calculate statistics
  const stats = [
    {
      title: "Total Listings",
      value: jetListings.length + charterListings.length,
      icon: <List className="w-5 h-5" />,
      color: "bg-blue-50",
      borderColor: "border-blue-100",
      trend: "neutral",
    },
    {
      title: "Active Jets",
      value: jetListings.filter((jet) => jet.status === "APPROVED").length,
      icon: <Plane className="w-5 h-5" />,
      color: "bg-green-50",
      borderColor: "border-green-100",
      trend: "positive",
    },
    {
      title: "Charter Fleet",
      value: charterListings.filter((charter) => charter.status === "APPROVED")
        .length,
      icon: <Calendar className="w-5 h-5" />,
      color: "bg-purple-50",
      borderColor: "border-purple-100",
      trend: "positive",
    },
    {
      title: "Total Views",
      value:
        jetListings.reduce((sum, jet) => sum + (jet.views || 0), 0) +
        charterListings.reduce((sum, charter) => sum + (charter.views || 0), 0),
      icon: <TrendingUp className="w-5 h-5" />,
      color: "bg-yellow-50",
      borderColor: "border-yellow-100",
      trend: "positive",
    },
    {
      title: "Unread Messages",
      value: messages.filter((msg) => !msg.read).length,
      icon: <Mail className="w-5 h-5" />,
      color: "bg-red-50",
      borderColor: "border-red-100",
      trend: "neutral",
    },
    {
      title: "Booking Requests",
      value: bookingRequests.length,
      icon: <FileText className="w-5 h-5" />,
      color: "bg-indigo-50",
      borderColor: "border-indigo-100",
      trend: "positive",
    },
  ];

  return (
    <div className="min-h-screen w-[900px] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-sm p-6 mb-6 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div>
              <p className="text-2xl md:text-3xl font-bold text-white">
                Welcome back, {vendor?.name || "Broker"}!
              </p>
              <p className="text-sm text-blue-100 mt-1">
                {vendor?.email
                  ? `Company: ${vendor.email.split("@")[1]}`
                  : "Your Broker Dashboard"}
              </p>
              <div className="flex items-center mt-2 text-sm text-blue-100">
                <Clock className="mr-1" />
                <span>Last updated: {new Date().toLocaleString()}</span>
              </div>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={fetchData}
                disabled={refreshing}
                className={`flex items-center px-4 py-2  bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-all ${
                  refreshing ? "animate-pulse" : ""
                }`}
              >
                <RefreshCw className="mr-2" />
                {refreshing ? "Refreshing..." : "Refresh Data"}
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
              <TrendingUp className="mr-1" />
              <span>Real-time metrics</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`${stat.color} border ${stat.borderColor} rounded-xl p-4 shadow-sm hover:shadow-md transition-all`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {stat.value}
                    </p>
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
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Jet Listings */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Jet Listings
              </h2>
              <Link
                to="/broker/listings"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                View all <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            <div className="space-y-4">
              {loading.jets ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : jetListings.length === 0 ? (
                <div className="text-center py-8">
                  <Plane className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No jet listings
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Get started by adding a new jet listing.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/broker/jets/add"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <Plane className="mr-2 h-4 w-4" />
                      Add Jet Listing
                    </Link>
                  </div>
                </div>
              ) : (
                jetListings.slice(0, 3).map((listing) => (
                  <div
                    key={listing.id}
                    className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={
                        listing.exteriorImageUrls[0] ||
                        "https://via.placeholder.com/150"
                      }
                      alt={`${listing.manufacturer} ${listing.model}`}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {listing.manufacturer} {listing.model}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4" />
                        <p className="truncate">{listing.currentLocation}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(Number(listing.price))}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {listing.views || 0} views
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Charter Listings */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Charter Fleet
              </h2>
              <Link
                to="/broker/charter/listings"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                View all <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            <div className="space-y-4">
              {loading.charters ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : charterListings.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No charter listings
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Get started by adding a new charter listing.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/broker/charters/add"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Add Charter Listing
                    </Link>
                  </div>
                </div>
              ) : (
                charterListings.slice(0, 3).map((charter) => (
                  <div
                    key={charter.id}
                    className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={
                        charter.exteriorImages[0] ||
                        "https://via.placeholder.com/150"
                      }
                      alt={`${charter.manufacturer} ${charter.jetName}`}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {charter.manufacturer} {charter.jetName}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4" />
                        <p className="truncate">{charter.homeBase}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(Number(charter.pricePerHour))}
                        /hr
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {charter.views || 0} views
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity Grid - Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Messages */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Messages
              </h2>
              <Link
                to="/broker/messages"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                View all <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            <div className="space-y-4">
              {loading.messages ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No messages
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    You haven't received any messages yet.
                  </p>
                </div>
              ) : (
                messages.slice(0, 3).map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 border rounded-lg ${
                      message.read
                        ? "bg-gray-50 border-gray-100"
                        : "bg-blue-50 border-blue-100"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {message.customerName}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {message.customerEmail}
                        </p>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {message.message}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Booking Requests */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Charter Requests
              </h2>
              <Link
                to="/broker/requests"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                View all <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            <div className="space-y-4">
              {loading.bookings ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : bookingRequests.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No booking requests
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    You haven't received any charter requests yet.
                  </p>
                </div>
              ) : (
                bookingRequests.slice(0, 3).map((request) => (
                  <div
                    key={request.id}
                    className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {request.customerName}
                        </p>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="mr-1.5 h-4 w-4" />
                            {request.departureLocation} →{" "}
                            {request.arrivalLocation}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="mr-1.5 h-4 w-4" />
                            {new Date(
                              request.departureDate
                            ).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Users className="mr-1.5 h-4 w-4" />
                            {request.passengerCount} passengers
                          </div>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          request.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : request.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {request.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrokerDashboard;
