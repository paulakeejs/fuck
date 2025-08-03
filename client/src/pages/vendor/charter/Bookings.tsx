import { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import charterVendorApi from "./api";
import {
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  Users,
  Calendar,
  FileText,
  CheckCircle,
  Reply,
  Plane,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BookingMessage {
  id: string;
  customerName: string;
  customerEmail: string;
  customerCountry: string | null;
  departureLocation: string;
  arrivalLocation: string;
  departureDate: string;
  returnDate: string | null;
  passengerCount: number;
  specialRequests: string | null;
  listingId: string;
  vendorId: string;
  createdAt: string;
  read: boolean;
  listingName?: string; // Added to store listing name
}

interface Vendor {
  id: string;
  companyName: string;
  name: string;
}

function Bookings() {
  const [allBookings, setAllBookings] = useState<BookingMessage[]>([]);
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<
    "createdAt-desc" | "createdAt-asc" | "read-asc"
  >("createdAt-desc");

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await charterVendorApi.get<{
        success: boolean;
        data: BookingMessage[];
        vendor: Vendor;
      }>("/bookings");

      if (response?.data?.success) {
        // Sort bookings by listingId and add listingName (assuming API returns it or we fetch separately)
        const bookings = response.data.data.map((booking) => ({
          ...booking,
          listingName:
            booking.listingName || `Jet Listing ${booking.listingId}`, // Fallback name
        }));
        setAllBookings(bookings);
        setVendor(response.data.vendor || null);
      } else {
        // @ts-ignore
        throw new Error(response?.data?.message || "Failed to fetch bookings");
      }
    } catch (error: any) {
      console.error("Failed to load bookings", {
        description: error?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Group bookings by listingId
  const groupedBookings = useMemo(() => {
    const groups = allBookings.reduce((acc, booking) => {
      if (!acc[booking.listingId]) {
        acc[booking.listingId] = [];
      }
      acc[booking.listingId].push(booking);
      return acc;
    }, {} as Record<string, BookingMessage[]>);

    // Sort bookings within each group
    Object.keys(groups).forEach((listingId) => {
      groups[listingId].sort((a, b) => {
        if (sortBy === "createdAt-desc") {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        } else if (sortBy === "createdAt-asc") {
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        } else {
          return (a.read ? 1 : -1) - (b.read ? 1 : -1);
        }
      });
    });

    return groups;
  }, [allBookings, sortBy]);

  // Paginate bookings
  const paginatedGroups = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const groupKeys = Object.keys(groupedBookings);
    return groupKeys.slice(startIndex, startIndex + itemsPerPage);
  }, [groupedBookings, currentPage, itemsPerPage]);

  const handlePageChange = (newPage: number) => {
    if (
      newPage >= 1 &&
      newPage <= Math.ceil(Object.keys(groupedBookings).length / itemsPerPage)
    ) {
      setCurrentPage(newPage);
    }
  };

  const markAsRead = async (bookingId: string) => {
    try {
      setActionLoading((prev) => [...prev, bookingId]);
      const response = await charterVendorApi.put(
        `/bookings/${bookingId}/read`
      );
      if (response?.data?.success) {
        setAllBookings((prev) =>
          prev.map((booking) =>
            booking.id === bookingId ? { ...booking, read: true } : booking
          )
        );
        toast.success("Booking marked as read");
      } else {
        throw new Error(response?.data?.message || "Failed to mark as read");
      }
    } catch (error: any) {
      toast.error("Failed to mark booking as read", {
        description: error?.message || "Something went wrong",
      });
    } finally {
      setActionLoading((prev) => prev.filter((id) => id !== bookingId));
    }
  };

  const handleEmailReply = (email: string) => {
    const subject = `Re: Your Charter Booking Inquiry`;
    const body = `Dear Customer,\n\nThank you for your inquiry. \n\nBest regards,\n${
      vendor?.companyName || "Our Team"
    }`;
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, "_blank");
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="text-center space-y-6 max-w-md lg:w-[900px]">
          {/* Modern animated spinner with gradient */}
          <div className="relative h-16 w-16 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-600 animate-spin"></div>
            <div className="absolute inset-1 rounded-full border-4 border-transparent border-b-blue-400 border-l-blue-300 animate-spin animation-delay-200"></div>

            {/* Optional: Logo or icon in center */}
            <div className="absolute inset-2 flex items-center justify-center">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {/* Loading text with animated dots */}
          <div className="space-y-2">
            <h3 className="text-xl font-medium text-gray-800">
              Loading your bookings
            </h3>
            <p className="text-gray-500 flex justify-center items-center">
              <span className="inline-block animate-bounce animation-delay-0">
                .
              </span>
              <span className="inline-block animate-bounce animation-delay-150">
                .
              </span>
              <span className="inline-block animate-bounce animation-delay-300">
                .
              </span>
            </p>
          </div>

          {/* Optional progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
            <div className="bg-blue-600 h-1.5 rounded-full animate-progress"></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen py-8 sm:py-12 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            {vendor?.companyName
              ? `${vendor.companyName} Bookings`
              : "Vendor Bookings"}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-gray-600">
            Review and manage your charter booking requests
          </p>
        </motion.div>

        {allBookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 sm:p-12 text-center"
          >
            <Mail size={48} className="mx-auto text-gray-400 mb-6" />
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
              No Booking Requests
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
              You currently have no booking requests. Check back later for new
              inquiries.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                Booking Requests ({allBookings.length})
              </h2>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Sort bookings"
              >
                <option value="createdAt-desc">Newest First</option>
                <option value="createdAt-asc">Oldest First</option>
                <option value="read-asc">Unread First</option>
              </select>
            </motion.div>

            <AnimatePresence>
              {paginatedGroups.map((listingId) => (
                <motion.section
                  key={listingId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {groupedBookings[listingId][0].listingName}
                    </h3>
                    <a
                      href={`/charter/${listingId}`}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                      aria-label={`View listing ${groupedBookings[listingId][0].listingName}`}
                    >
                      <Plane size={16} />
                      View Listing
                    </a>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    {groupedBookings[listingId].map((booking, index) => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-t border-gray-200 pt-6 first:pt-0 first:border-t-0"
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
                          <div className="flex-1 space-y-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-gray-900">
                                  {booking.customerName}
                                </span>
                                <span
                                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                    booking.read
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {booking.read ? "Read" : "Unread"}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500">
                                {booking.customerEmail}
                                {booking.customerCountry &&
                                  `, ${booking.customerCountry}`}
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <div className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                                  Route
                                </div>
                                <div className="text-sm text-gray-900 flex items-center gap-2">
                                  <MapPin size={16} className="text-blue-600" />
                                  {booking.departureLocation} →{" "}
                                  {booking.arrivalLocation}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                                  Dates
                                </div>
                                <div className="text-sm text-gray-900 flex items-center gap-2">
                                  <Calendar
                                    size={16}
                                    className="text-blue-600"
                                  />
                                  {formatDate(booking.departureDate)}
                                </div>
                                {booking.returnDate && (
                                  <div className="text-xs text-gray-600 mt-1">
                                    Return: {formatDate(booking.returnDate)}
                                  </div>
                                )}
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                                  Passengers
                                </div>
                                <div className="text-sm text-gray-900 flex items-center gap-2">
                                  <Users size={16} className="text-blue-600" />
                                  {booking.passengerCount}
                                </div>
                              </div>
                              {booking.specialRequests && (
                                <div>
                                  <div className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                                    Special Requests
                                  </div>
                                  <div className="text-sm text-gray-600 flex items-center gap-2">
                                    <FileText
                                      size={16}
                                      className="text-blue-600"
                                    />
                                    {booking.specialRequests}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            {!booking.read && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => markAsRead(booking.id)}
                                disabled={actionLoading.includes(booking.id)}
                                className={`w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 justify-center ${
                                  actionLoading.includes(booking.id)
                                    ? "bg-blue-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 text-white"
                                } transition-colors duration-200`}
                                aria-label={`Mark booking from ${booking.customerName} as read`}
                              >
                                <CheckCircle size={16} />
                                {actionLoading.includes(booking.id)
                                  ? "Marking..."
                                  : "Mark as Read"}
                              </motion.button>
                            )}
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                handleEmailReply(booking.customerEmail)
                              }
                              className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2 justify-center"
                              aria-label={`Reply to ${booking.customerName} via email`}
                            >
                              <Reply size={16} />
                              Reply via Email
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              ))}
            </AnimatePresence>

            {Object.keys(groupedBookings).length > itemsPerPage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 flex justify-between items-center"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 sm:px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>
                <span className="text-sm text-gray-700">
                  Page {currentPage} of{" "}
                  {Math.ceil(
                    Object.keys(groupedBookings).length / itemsPerPage
                  )}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={
                    currentPage >=
                    Math.ceil(
                      Object.keys(groupedBookings).length / itemsPerPage
                    )
                  }
                  className="flex items-center gap-2 px-4 sm:px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next page"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Bookings;
