import vendorApi from "@/pages/vendor/functions/vendorApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import {
  FiRefreshCw,
  FiTrendingUp,
  FiEye,
  FiDollarSign,
  FiCalendar,
  FiAward,
  FiAlertCircle,
  FiClock,
  FiMapPin,
  FiLayers,
  FiBarChart2,
  FiMessageSquare,
} from "react-icons/fi";
import { Link } from "react-router-dom";

interface Listing {
  id: string;
  createdAt: string;
  manufacturer: string;
  model: string;
  year: number;
  serialNumber: string;
  totalTimeSinceNew: number;
  totalLandings: number;
  price: string;
  currentLocation: string;
  status: string;
  sponsored: boolean;
  views: number;
  sponsoredType?: string;
  end_date?: string;
  imageUrl?: string;
  lastUpdated: string;
}

interface Message {
  id: string;
  customerName: string;
  customerEmail: string;
  customerCountry: string;
  listingId: string;
  vendorId: string;
  message: string;
  createdAt: string;
  read: boolean;
}

function DashboardIndex() {
  const vendor = useSelector((state: any) => state.vendor.vendor);
  const [listingData, setListingData] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const getListings = async (showToast = false) => {
    try {
      setLoading(true);
      setRefreshing(true);
      const response = await vendorApi.get("/mine");
      if (response.data.success) {
        setListingData(response.data.data);
        if (showToast) {
          toast.success("Listings updated successfully");
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch listings");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      const response = await vendorApi.delete(`/delete/${id}`);
      if (response.data.success) {
        setListingData((prev) => prev.filter((listing) => listing.id !== id));
        toast.success("Listing deleted successfully");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete listing");
    } finally {
      setDeletingId(null);
    }
  };

  const getMessages = async () => {
    try {
      const response = await vendorApi.get("/messages");
      if (response.data.success) {
        setMessages(response.data.data);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch messages");
    }
  };

  useEffect(() => {
    getListings();
    getMessages();
  }, []);

  const stats = [
    {
      title: "Active Listings",
      value: listingData.length,
      icon: <FiLayers className="text-xl" />,
      trend: listingData.length > 0 ? "positive" : "neutral",
      description: "Total aircraft listings",
      color: "bg-green-50 text-green-600",
      borderColor: "border-green-200",
    },
    {
      title: "Sponsored Listings",
      value: listingData.filter((l) => l.sponsored).length,
      icon: <FiAward className="text-xl" />,
      trend:
        listingData.filter((l) => l.sponsored).length > 0
          ? "positive"
          : "neutral",
      description: "Premium featured listings",
      color: "bg-blue-50 text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      title: "Total Views",
      value: listingData.reduce((sum, listing) => sum + listing.views, 0),
      icon: <FiEye className="text-xl" />,
      trend: "positive",
      description: "All-time listing views",
      color: "bg-purple-50 text-purple-600",
      borderColor: "border-purple-200",
    },
    {
      title: "Avg. Price",
      value:
        listingData.length > 0
          ? `$${(
              listingData.reduce(
                (sum, listing) => sum + parseInt(listing.price),
                0
              ) /
              listingData.length /
              1000000
            ).toFixed(1)}M`
          : "$0",
      icon: <FiDollarSign className="text-xl" />,
      trend: "neutral",
      description: "Average asking price",
      color: "bg-yellow-50 text-yellow-600",
      borderColor: "border-yellow-200",
    },
    {
      title: "Avg. Age",
      value:
        listingData.length > 0
          ? Math.round(
              new Date().getFullYear() -
                listingData.reduce((sum, listing) => sum + listing.year, 0) /
                  listingData.length
            ) + " yrs"
          : "0 yrs",
      icon: <FiCalendar className="text-xl" />,
      trend: "neutral",
      description: "Average aircraft age",
      color: "bg-red-50 text-red-600",
      borderColor: "border-red-200",
    },
    {
      title: "Pending Approval",
      value: listingData.filter((l) => l.status === "PENDING").length,
      icon: <FiAlertCircle className="text-xl" />,
      trend: "neutral",
      description: "Listings under review",
      color: "bg-orange-50 text-orange-600",
      borderColor: "border-orange-200",
    },
  ];

  const formatPrice = (price: string) => {
    const num = parseInt(price);
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}K`;
    }
    return `$${num}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const recentActivity = listingData
    .sort(
      (a, b) =>
        new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    )
    .slice(0, 5)
    .map((listing) => ({
      id: listing.id,
      title: `${listing.manufacturer} ${listing.model}`,
      type: listing.sponsored ? "Boosted Listing" : "New Listing",
      date: formatDate(listing.lastUpdated),
      views: listing.views,
      sponsored: listing.sponsored,
      status: listing.status,
      price: formatPrice(listing.price),
    }));

  const topListings = [...listingData]
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  return (
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
                  : "Your Aircraft Sales Dashboard"}
              </p>
              <div className="flex items-center mt-2 text-sm text-blue-100">
                <FiClock className="mr-1" />
                <span>Last updated: {new Date().toLocaleString()}</span>
              </div>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={() => getListings(true)}
                className={`flex items-center px-4 py-2 bg-white bg-opacity-20 text-indigo-600 rounded-lg hover:bg-opacity-30 transition-all ${
                  refreshing ? "animate-pulse" : ""
                }`}
              >
                <FiRefreshCw className="mr-2" />
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
              <FiTrendingUp className="mr-1" />
              <span>Real-time data</span>
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
                    <p className="text-sm font-medium">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div
                    className={`p-2 rounded-lg ${
                      stat.trend === "positive"
                        ? "bg-green-100 text-green-600"
                        : stat.trend === "negative"
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {stat.icon}
                  </div>
                </div>
                <p className="text-xs mt-2 text-gray-500">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Top Performing Listings */}
          <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Top Performers
              </h2>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                Most Views
              </span>
            </div>
            {topListings.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                No performance data available
              </div>
            ) : (
              <div className="space-y-4">
                {topListings.map((listing, index) => (
                  <div
                    key={listing.id}
                    className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3 text-gray-600 font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {listing.manufacturer} {listing.model}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatPrice(listing.price)} • {listing.year}
                      </p>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FiEye className="mr-1" />
                      <span>{listing.views}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Activity Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Activity
              </h2>
              <button
                onClick={() => getListings(true)}
                className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
              >
                <FiRefreshCw className="mr-1" />
                Refresh
              </button>
            </div>
            {recentActivity.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                No recent activity
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aircraft
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Views
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentActivity.map((activity) => (
                      <tr
                        key={activity.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          {activity.title}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              activity.sponsored
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {activity.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {activity.price}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              activity.status === "APPROVED"
                                ? "bg-green-100 text-green-800"
                                : activity.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {activity.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <FiEye className="mr-1" />
                            {activity.views}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Recent Messages Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Messages
            </h2>
            <button
              onClick={() => getMessages()}
              className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
            >
              <FiRefreshCw className="mr-1" />
              Refresh
            </button>
          </div>
          {messages.length === 0 ? (
            <div className="text-center py-16">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FiMessageSquare className="text-gray-400 text-3xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No messages found
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                You haven't received any customer inquiries yet.
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
                      Aircraft
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {messages
                    .sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    )
                    .slice(0, 3)
                    .map((message) => {
                      const listing = listingData.find(
                        (l) => l.id === message.listingId
                      );
                      return (
                        <tr
                          key={message.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {message.customerName}
                            </div>
                            <div className="text-xs text-gray-500">
                              {message.customerEmail}
                            </div>
                            <div className="text-xs text-gray-500">
                              {message.customerCountry}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            {listing ? (
                              <Link
                                to={`/jets/${message.listingId}`}
                                className="text-indigo-600 hover:text-indigo-800"
                              >
                                {listing.manufacturer} {listing.model}
                              </Link>
                            ) : (
                              <span className="text-gray-500">
                                Unknown Listing
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500 max-w-xs">
                            <span
                              className="truncate block"
                              title={message.message}
                            >
                              {message.message}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(message.createdAt)}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                message.read
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {message.read ? "Read" : "Unread"}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <a
                              href={`mailto:${
                                message.customerEmail
                              }?subject=Re: Inquiry about ${
                                listing
                                  ? `${listing.manufacturer} ${listing.model}`
                                  : "Aircraft Listing"
                              }`}
                              className="text-indigo-600 hover:text-indigo-900 mr-3"
                            >
                              Reply
                            </a>
                            <Link
                              to={`/jets/${message.listingId}`}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              View Listing
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Listings Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Your Aircraft Inventory
            </h2>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-3">
                Showing {listingData.length} listing
                {listingData.length !== 1 ? "s" : ""}
              </span>
              <Link to="/app/jets/add">
                <button className="text-sm bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition-colors">
                  + Add New Listing
                </button>
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : listingData.length === 0 ? (
            <div className="text-center py-16">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FiBarChart2 className="text-gray-400 text-3xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No listings found
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                You don't have any aircraft listings yet. Create your first
                listing to get started.
              </p>
              <Link to="/app/jets/add">
                <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Create New Listing
                </button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aircraft Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Specs
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pricing
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {listingData.map((listing) => (
                    <tr key={listing.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
                            {listing.imageUrl ? (
                              <img
                                src={listing.imageUrl}
                                alt={`${listing.manufacturer} ${listing.model}`}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span className="text-gray-500 text-xs text-center p-1">
                                {listing.manufacturer.charAt(0)}
                                {listing.model.charAt(0)}
                              </span>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {listing.manufacturer} {listing.model}
                            </div>
                            <div className="text-xs text-gray-500">
                              S/N: {listing.serialNumber}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Listed: {formatDate(listing.createdAt)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {listing.year}
                        </div>
                        <div className="text-xs text-gray-500">
                          {listing.totalTimeSinceNew} hrs
                        </div>
                        <div className="text-xs text-gray-500">
                          {listing.totalLandings} landings
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatPrice(listing.price)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {listing.sponsored ? "Featured" : "Standard"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FiMapPin className="text-gray-400 mr-1" />
                          <span className="text-sm text-gray-500">
                            {listing.currentLocation.split(",")[0]}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col space-y-1">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              listing.status === "APPROVED"
                                ? "bg-green-100 text-green-800"
                                : listing.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {listing.status}
                          </span>
                          {listing.sponsored && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {listing.sponsoredType || "Sponsored"}
                              {listing.end_date &&
                                ` (expires ${formatDate(listing.end_date)})`}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Link to={`/app/listings/edit/${listing.id}`}>
                          <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                            Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(listing.id)}
                          disabled={deletingId === listing.id}
                          className={`text-red-600 hover:text-red-900 ${
                            deletingId === listing.id
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          {deletingId === listing.id ? "Deleting..." : "Remove"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Views Performance */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Views Analytics
            </h2>
            <div className="h-64 bg-gray-50 rounded-lg flex flex-col items-center justify-center p-4 border border-gray-200">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-500">Total Listing Views</p>
                <p className="text-3xl font-bold text-gray-800">
                  {stats[2].value.toLocaleString()}
                </p>
              </div>
              <div className="w-full h-32 bg-white rounded p-2 border border-gray-200 flex items-end">
                {topListings.map((listing, index) => (
                  <div
                    key={listing.id}
                    className="flex-1 mx-1 flex flex-col items-center"
                    style={{
                      height: `${Math.min(
                        100,
                        (listing.views / (topListings[0]?.views || 1)) * 100
                      )}%`,
                    }}
                  >
                    <div
                      className={`w-full ${
                        index === 0
                          ? "bg-indigo-600"
                          : index === 1
                          ? "bg-indigo-400"
                          : "bg-indigo-300"
                      } rounded-t`}
                    ></div>
                    <p className="text-xs mt-1 text-gray-600 truncate w-full text-center">
                      {listing.manufacturer.charAt(0)}.{listing.model}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Top performing listings by views
              </p>
            </div>
          </div>

          {/* Price Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Price Distribution
            </h2>
            <div className="h-64 bg-gray-50 rounded-lg flex flex-col items-center justify-center p-4 border border-gray-200">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-500">Average Listing Price</p>
                <p className="text-3xl font-bold text-gray-800">
                  {stats[3].value}
                </p>
              </div>
              {listingData.length > 0 ? (
                <div className="w-full">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>
                      Low:{" "}
                      {formatPrice(
                        Math.min(
                          ...listingData.map((l) => parseInt(l.price))
                        ).toString()
                      )}
                    </span>
                    <span>
                      High:{" "}
                      {formatPrice(
                        Math.max(
                          ...listingData.map((l) => parseInt(l.price))
                        ).toString()
                      )}
                    </span>
                  </div>
                  <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-blue-500"
                      style={{
                        width: "100%",
                      }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-5 gap-2 mt-2">
                    {["$1M", "$5M", "$10M", "$20M", "$50M+"].map((price) => (
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
                Range of your listed aircraft prices
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl shadow-sm p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-xl font-bold text-white mb-2">
                Boost Your Listings Today
              </p>
              <p className="text-blue-100 max-w-lg">
                Get more visibility for your aircraft with our premium sponsored
                listings. Featured listings receive up to 5x more views.
              </p>
            </div>
            <Link to="/app/listings">
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-md">
                Upgrade Listings
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardIndex;
