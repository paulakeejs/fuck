import { useEffect, useState, useCallback } from "react";
import hApi from "../HApi";
import { toast } from "sonner";
import { format } from "date-fns";
import { FiMapPin, FiUsers } from "react-icons/fi";

interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerCountry: string;
  departureLocation: string;
  arrivalLocation: string;
  departureDate: string;
  returnDate: string;
  passengerCount: number;
  specialRequests: string;
  listingId: string;
  vendorId: string;
  createdAt: string;
  read: boolean;
}

function BookingsCharter() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPolling, setIsPolling] = useState(false);
  const POLLING_INTERVAL = 30000; // 30 seconds

  const fetchBookings = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true);
      } else {
        setIsPolling(true);
      }
      const response = await hApi.get("/charter/bookings");
      if (response.data.success) {
        setBookings(response.data.bookings);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
      setIsPolling(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchBookings();

    // Set up polling
    const pollInterval = setInterval(() => {
      fetchBookings(false);
    }, POLLING_INTERVAL);

    // Cleanup
    return () => clearInterval(pollInterval);
  }, [fetchBookings]);

  const handleMarkAsRead = async (bookingId: string) => {
    try {
      const response = await hApi.put(`/charter/bookings/${bookingId}/read`);
      if (response.data.success) {
        setBookings(
          bookings.map((booking) =>
            booking.id === bookingId ? { ...booking, read: true } : booking
          )
        );
        toast.success("Marked as read");
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error("Failed to mark as read");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-gray-900">
              Charter Bookings
            </h1>
            {isPolling && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
            )}
          </div>
          <p className="mt-2 text-sm text-gray-700">
            A list of all charter bookings including customer details, trip
            information, and status. Updates automatically every 30 seconds.
          </p>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Trip Details
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Dates
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Passengers
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {bookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className={!booking.read ? "bg-blue-50" : ""}
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                        <div className="flex items-center">
                          <div>
                            <div className="font-medium text-gray-900">
                              {booking.customerName}
                            </div>
                            <div className="text-gray-500">
                              {booking.customerEmail}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center mt-1">
                              <FiMapPin className="mr-1 h-4 w-4" />
                              {booking.customerCountry}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <div>
                            <div className="font-medium text-gray-900">
                              {booking.departureLocation} →{" "}
                              {booking.arrivalLocation}
                            </div>
                            {booking.specialRequests && (
                              <div className="mt-1 text-gray-500 italic">
                                "{booking.specialRequests}"
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div>
                          <div className="font-medium text-gray-900">
                            {format(new Date(booking.departureDate), "PPp")}
                          </div>
                          {booking.returnDate && (
                            <div className="text-gray-500">
                              to {format(new Date(booking.returnDate), "PPp")}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <FiUsers className="mr-1 h-4 w-4" />
                          <span className="font-medium text-gray-900">
                            {booking.passengerCount}
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            booking.read
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {booking.read ? "Read" : "Unread"}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        {!booking.read && (
                          <button
                            onClick={() => handleMarkAsRead(booking.id)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Mark as Read
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingsCharter;
