import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  FaHelicopter,
  FaCalendarAlt,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaSearch,
  FaPlus,
  FaPaperPlane,
} from "react-icons/fa";
import { GiHelicopter } from "react-icons/gi";
import { MdAirplanemodeActive } from "react-icons/md";
import hApi from "./HApi";

interface RecentListing {
  id: string;
  helicopterName: string;
  manufacturer: string;
  yearOfManufacture: number;
  salePrice: number;
  status: "APPROVED" | "SOLD" | "PENDING";
  views: number;
  createdAt: string;
}

interface RecentCharter {
  id: string;
  model: string;
  location: string;
  pricePerHour: number;
  capacity: number;
  status: "ACTIVE" | "INACTIVE" | "BOOKED" | "APPROVED" | "PENDING";
  views: number;
  createdAt: string;
  availableFrom: string;
  availableTo: string;
  safetyFeatures: string[];
  hasWifi: boolean;
  hasRefreshments: boolean;
  packageDeals?: string;
}

interface Message {
  id: string;
  customerName: string;
  customerEmail: string;
  message: string;
  listingId: string;
  createdAt: string;
  read: boolean;
}

interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  listingId: string;
  createdAt: string;
  read: boolean;
  status: "pending" | "confirmed" | "cancelled" | null;
}

function VendorDashboard() {
  const vendor = useSelector((state: any) => state.vendor.vendor);
  const navigate = useNavigate();
  const [recentListings, setRecentListings] = useState<RecentListing[]>([]);
  const [recentCharters, setRecentCharters] = useState<RecentCharter[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<
    "listings" | "charters" | "messages" | "bookings"
  >("listings");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"createdAt" | "views" | "price">(
    "createdAt"
  );
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [
          listingsResponse,
          chartersResponse,
          messagesResponse,
          bookingsResponse,
        ] = await Promise.all([
          hApi.get("/listings"),
          hApi.get("/helicopters/charter/all"),
          hApi.get("/messages"),
          hApi.get("/charter/bookings"),
        ]);

        if (listingsResponse.data.success) {
          setRecentListings(
            listingsResponse.data.listings.map((listing: any) => ({
              id: listing.id,
              helicopterName: listing.helicopterName,
              manufacturer: listing.manufacturer,
              yearOfManufacture: listing.yearOfManufacture,
              salePrice: listing.salePrice,
              status: listing.status,
              views: listing.views || 0,
              createdAt: listing.createdAt,
            }))
          );
        }

        if (chartersResponse.data.success) {
          setRecentCharters(
            chartersResponse.data.listings.map((charter: any) => ({
              id: charter.id,
              model: charter.model,
              location: charter.location,
              pricePerHour: charter.pricePerHour,
              capacity: charter.capacity,
              status: charter.status,
              views: charter.views || 0,
              createdAt: charter.createdAt,
              availableFrom: charter.availableFrom,
              availableTo: charter.availableTo,
              safetyFeatures: charter.safetyFeatures || [],
              hasWifi: charter.hasWifi,
              hasRefreshments: charter.hasRefreshments,
              packageDeals: charter.packageDeals,
            }))
          );
        }

        if (messagesResponse.data.success) {
          setMessages(messagesResponse.data.messages);
        }

        if (bookingsResponse.data.success) {
          setBookings(
            bookingsResponse.data.bookings.map((booking: any) => ({
              id: booking.id,
              customerName: booking.customerName || "Unknown",
              customerEmail: booking.customerEmail,
              listingId: booking.listingId,
              createdAt: booking.createdAt,
              read: booking.read,
              status: booking.status || null,
            }))
          );
        }
      } catch (error) {
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleDeleteListing = async (id: string) => {
    try {
      const response = await hApi.delete(`/sales/${id}`);
      if (response.data.success) {
        setRecentListings((listings) => listings.filter((l) => l.id !== id));
        toast.success("Listing deleted successfully");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete listing");
    }
  };

  const handleDeleteCharter = async (id: string) => {
    try {
      const response = await hApi.delete(`/charter/${id}`);
      if (response.data.success) {
        setRecentCharters((charters) => charters.filter((c) => c.id !== id));
        toast.success("Charter deleted successfully");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete charter");
    }
  };

  const handleMarkAsBooked = async (id: string) => {
    try {
      const response = await hApi.put(`/charter/${id}/book`, {
        status: "BOOKED",
      });
      if (response.data.success) {
        setRecentCharters((charters) =>
          charters.map((c) =>
            c.id === id ? { ...c, status: "BOOKED" as const } : c
          )
        );
        toast.success("Helicopter marked as booked");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update status");
    }
  };

  const handleMarkAsAvailable = async (id: string) => {
    try {
      const response = await hApi.put(`/charter/${id}/available`, {
        status: "ACTIVE",
      });
      if (response.data.success) {
        setRecentCharters((charters) =>
          charters.map((c) =>
            c.id === id ? { ...c, status: "ACTIVE" as const } : c
          )
        );
        toast.success("Helicopter marked as available");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update status");
    }
  };

  const handleMarkMessageAsRead = async (id: string) => {
    try {
      const response = await hApi.put(`/messages/${id}/read`, { read: true });
      if (response.data.success) {
        setMessages((msgs) =>
          msgs.map((m) => (m.id === id ? { ...m, read: true } : m))
        );
        toast.success("Message marked as read");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to mark message as read");
    }
  };

  const handleMarkBookingAsRead = async (id: string) => {
    try {
      const response = await hApi.put(`/charter/bookings/${id}/read`, {
        read: true,
      });
      if (response.data.success) {
        setBookings((bks) =>
          bks.map((b) => (b.id === id ? { ...b, read: true } : b))
        );
        toast.success("Booking marked as read");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to mark booking as read");
    }
  };

  const filteredListings = useMemo(() => {
    return recentListings
      .filter(
        (listing) =>
          (listing.helicopterName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
            listing.manufacturer
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) &&
          (statusFilter === "all" || listing.status === statusFilter)
      )
      .sort((a, b) => {
        if (sortBy === "price") return b.salePrice - a.salePrice;
        if (sortBy === "views") return b.views - a.views;
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
  }, [recentListings, searchTerm, sortBy, statusFilter]);

  const filteredCharters = useMemo(() => {
    return recentCharters
      .filter(
        (charter) =>
          (charter.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
            charter.location
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) &&
          (statusFilter === "all" || charter.status === statusFilter) &&
          (locationFilter === "all" || charter.location === locationFilter)
      )
      .sort((a, b) => {
        if (sortBy === "price") return b.pricePerHour - a.pricePerHour;
        if (sortBy === "views") return b.views - a.views;
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
  }, [recentCharters, searchTerm, sortBy, statusFilter, locationFilter]);

  const uniqueLocations = useMemo(
    () => [
      "all",
      ...new Set(recentCharters.map((charter) => charter.location)),
    ],
    [recentCharters]
  );

  const paginatedListings = filteredListings.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const paginatedCharters = filteredCharters.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const paginatedBookings = bookings.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8 bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <GiHelicopter className="text-blue-600 mr-3 text-4xl" />
              Vendor Dashboard
            </h1>
            <p className="mt-2 text-gray-600">Welcome back, {vendor?.name}</p>
          </div>
          <div className="w-full md:w-96">
            <div className="relative">
              <input
                type="text"
                placeholder="Search listings, charters, or bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                aria-label="Search dashboard content"
              />
              <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8 bg-white rounded-2xl p-2 shadow-sm">
        <nav className="flex flex-wrap gap-2">
          {[
            { id: "listings", label: "Listings", icon: FaHelicopter },
            { id: "charters", label: "Charters", icon: MdAirplanemodeActive },
            { id: "messages", label: "Messages", icon: FaPaperPlane },
            { id: "bookings", label: "Bookings", icon: FaCalendarAlt },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all ${
                selectedTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              aria-label={`Switch to ${tab.label} tab`}
            >
              <tab.icon className="mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {selectedTab === "listings" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Recent Listings
              </h2>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                  aria-label="Filter listings by status"
                >
                  <option value="all">All Statuses</option>
                  <option value="APPROVED">Approved</option>
                  <option value="SOLD">Sold</option>
                  <option value="PENDING">Pending</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "createdAt" | "views" | "price")
                  }
                  className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                  aria-label="Sort listings"
                >
                  <option value="createdAt">Sort by Date</option>
                  <option value="views">Sort by Views</option>
                  <option value="price">Sort by Price</option>
                </select>
                <button
                  onClick={() => navigate("/h-broker/helicopters/add")}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <FaPlus className="mr-2" />
                  Add New Listing
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {paginatedListings.length === 0 && (
                <p className="text-gray-600 text-center py-4">
                  No listings found
                </p>
              )}
              {paginatedListings.map((listing) => (
                <div
                  key={listing.id}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <GiHelicopter className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {listing.helicopterName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {listing.manufacturer} • {listing.yearOfManufacture}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        ${listing.salePrice.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        {listing.views} views
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/h-broker/${listing.id}/edit`)}
                        className="p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg"
                        title="Edit listing"
                        aria-label="Edit listing"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteListing(listing.id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                        title="Delete listing"
                        aria-label="Delete listing"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-center space-x-2">
              {Array.from({
                length: Math.ceil(filteredListings.length / itemsPerPage),
              }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-4 py-2 rounded-lg ${
                    page === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedTab === "charters" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Recent Charters
              </h2>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                  aria-label="Filter charters by status"
                >
                  <option value="all">All Statuses</option>
                  <option value="ACTIVE">Active</option>
                  <option value="BOOKED">Booked</option>
                  <option value="PENDING">Pending</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                  aria-label="Filter charters by location"
                >
                  {uniqueLocations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc === "all" ? "All Locations" : loc}
                    </option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "createdAt" | "views" | "price")
                  }
                  className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                  aria-label="Sort charters"
                >
                  <option value="createdAt">Sort by Date</option>
                  <option value="views">Sort by Views</option>
                  <option value="price">Sort by Price</option>
                </select>
                <button
                  onClick={() => navigate("/h-broker/charters/add")}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <FaPlus className="mr-2" />
                  Add New Charter
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {paginatedCharters.length === 0 && (
                <p className="text-gray-600 text-center py-4">
                  No charters found
                </p>
              )}
              {paginatedCharters.map((charter) => (
                <div
                  key={charter.id}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <MdAirplanemodeActive className="text-green-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {charter.model}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {charter.location} • Capacity: {charter.capacity}
                      </p>
                      <p className="text-sm text-gray-500">
                        Available:{" "}
                        {new Date(charter.availableFrom).toLocaleDateString()} -{" "}
                        {new Date(charter.availableTo).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        Features: {charter.safetyFeatures.join(", ")}
                        {charter.hasWifi && ", WiFi"}
                        {charter.hasRefreshments && ", Refreshments"}
                      </p>
                      {charter.packageDeals && (
                        <p className="text-sm text-gray-500">
                          Package: {charter.packageDeals}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        ${charter.pricePerHour.toLocaleString()}/hr
                      </p>
                      <p className="text-sm text-gray-600">
                        {charter.views} views
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          navigate(`/h-broker/charter/edit/${charter.id}`)
                        }
                        className="p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg"
                        title="Edit charter"
                        aria-label="Edit charter"
                      >
                        <FaEdit />
                      </button>
                      {charter.status === "ACTIVE" && (
                        <button
                          onClick={() => handleMarkAsBooked(charter.id)}
                          className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg"
                          title="Mark as booked"
                          aria-label="Mark as booked"
                        >
                          <FaCheckCircle />
                        </button>
                      )}
                      {charter.status === "BOOKED" && (
                        <button
                          onClick={() => handleMarkAsAvailable(charter.id)}
                          className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                          title="Mark as available"
                          aria-label="Mark as available"
                        >
                          <FaCalendarAlt />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteCharter(charter.id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                        title="Delete charter"
                        aria-label="Delete charter"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-center space-x-2">
              {Array.from({
                length: Math.ceil(filteredCharters.length / itemsPerPage),
              }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-4 py-2 rounded-lg ${
                    page === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedTab === "messages" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Messages</h2>
            <div className="space-y-4">
              {messages.length === 0 && (
                <p className="text-gray-600 text-center py-4">
                  No messages found
                </p>
              )}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="p-4 bg-gray-50 rounded-xl flex flex-col space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-900">
                      {message.customerName}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        message.read
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {message.read ? "Read" : "Unread"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{message.message}</p>
                  <p className="text-sm text-gray-500">
                    From: {message.customerEmail} •{" "}
                    {new Date(message.createdAt).toLocaleString()}
                  </p>
                  <div className="flex space-x-2">
                    {!message.read && (
                      <button
                        onClick={() => handleMarkMessageAsRead(message.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                        aria-label="Mark message as read"
                      >
                        Mark as Read
                      </button>
                    )}
                    <button
                      onClick={() =>
                        toast.info("Reply functionality coming soon!")
                      }
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700"
                      aria-label="Reply to message"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedTab === "bookings" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Charter Bookings
            </h2>
            <div className="space-y-4">
              {paginatedBookings.length === 0 && (
                <p className="text-gray-600 text-center py-4">
                  No bookings found
                </p>
              )}
              {paginatedBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-4 bg-gray-50 rounded-xl flex flex-col space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-900">
                      {booking.customerName}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : booking.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {booking.status
                        ? booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)
                        : "Unknown"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Booking for Listing ID: {booking.listingId}
                  </p>
                  <p className="text-sm text-gray-500">
                    From: {booking.customerEmail} •{" "}
                    {new Date(booking.createdAt).toLocaleString()}
                  </p>
                  {!booking.read && (
                    <button
                      onClick={() => handleMarkBookingAsRead(booking.id)}
                      className="self-start px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                      aria-label="Mark booking as read"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-center space-x-2">
              {Array.from({
                length: Math.ceil(bookings.length / itemsPerPage),
              }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-4 py-2 rounded-lg ${
                    page === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          onClick={() => navigate("/h-broker/helicopters/add")}
          className="flex items-center justify-center p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          aria-label="Add new listing"
        >
          <GiHelicopter className="text-xl mr-2" />
          <span>Add Listing</span>
        </button>
        <button
          onClick={() => navigate("/h-broker/charters/add")}
          className="flex items-center justify-center p-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
          aria-label="Add new charter"
        >
          <MdAirplanemodeActive className="text-xl mr-2" />
          <span>Add Charter</span>
        </button>
        <button
          onClick={() => setSelectedTab("bookings")}
          className="flex items-center justify-center p-4 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors"
          aria-label="View bookings"
        >
          <FaCalendarAlt className="text-xl mr-2" />
          <span>View Bookings</span>
        </button>
      </div>
    </div>
  );
}

export default VendorDashboard;
