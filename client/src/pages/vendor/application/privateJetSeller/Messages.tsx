import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  Mail,
  User,
  Globe,
  Phone,
  ChevronRight,
  ChevronDown,
  Search,
  X,
  MessageSquare,
  Clock,
  CheckCircle,
  Frown,
  Inbox,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import vendorApi from "../../functions/vendorApi";
import { formatDistanceToNow } from "date-fns";

interface Message {
  id: string;
  customerName: string;
  customerEmail: string;
  customerCountry: string;
  customerPhone: string;
  listingId: string;
  vendorId: string;
  message: string;
  createdAt: string;
  read: boolean;
  listingDetails?: {
    manufacturer: string;
    model: string;
    exteriorImageUrls?: string[];
  };
}

interface GroupedMessages {
  [listingId: string]: {
    messages: Message[];
    unreadCount: number;
    listingDetails?: {
      manufacturer: string;
      model: string;
      exteriorImageUrls?: string[];
    };
  };
}

function JetForSaleMessages() {
  const [data, setData] = useState<Message[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isPolling, setIsPolling] = useState(false);
  const [expandedListings, setExpandedListings] = useState<Set<string>>(
    new Set()
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<"all" | "unread">("all");
  const [pollCount, setPollCount] = useState(0);
  const [lastMessageCount, setLastMessageCount] = useState(0);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  console.log(isPolling, pollCount, lastMessageCount);
  const POLL_INTERVAL = 5000; // 5 seconds
  const MAX_POLL_ATTEMPTS = 10;
  const LONG_POLL_DELAY = 10 * 60 * 1000; // 10 minutes

  const getMessages = async () => {
    try {
      setIsPolling(true);
      const response = await vendorApi.get("/messages");
      if (response.data.success) {
        const newData = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setData((prevData) => {
          // Check if new messages were received
          if (newData.length > prevData.length) {
            setPollCount(0); // Reset poll count on new messages
            setLastMessageCount(newData.length);
          }
          return newData;
        });
      } else {
        throw new Error(response.data.message || "Failed to fetch messages");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred while fetching messages");
    } finally {
      setInitialLoading(false);
      setIsPolling(false);
    }
  };

  const startPolling = () => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
    }

    const poll = () => {
      setPollCount((prev) => {
        if (prev >= MAX_POLL_ATTEMPTS) {
          // Stop polling and set timeout for 10 minutes
          if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
          }
          setTimeout(() => {
            setPollCount(0); // Reset counter
            getMessages(); // Try fetching again
            startPolling(); // Restart polling
          }, LONG_POLL_DELAY);
          return prev;
        }
        getMessages();
        return prev + 1;
      });
    };

    poll(); // Initial fetch
    pollIntervalRef.current = setInterval(poll, POLL_INTERVAL);
  };

  const markAsRead = async (messageId: string) => {
    try {
      const response = await vendorApi.put(`/messages/${messageId}/read`);
      if (response.data.success) {
        setData((prev) =>
          prev.map((msg) =>
            msg.id === messageId ? { ...msg, read: true } : msg
          )
        );
        toast.success("Message marked as read");
      } else {
        throw new Error(response.data.message || "Failed to mark as read");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to mark message as read");
    }
  };

  const handleRefresh = () => {
    setPollCount(0);
    getMessages();
    toast.info("Refreshing messages...");
  };

  useEffect(() => {
    startPolling();
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  // Group and filter messages
  const groupedMessages: GroupedMessages = data.reduce((acc, message) => {
    if (!acc[message.listingId]) {
      acc[message.listingId] = {
        messages: [],
        unreadCount: 0,
        listingDetails: message.listingDetails,
      };
    }
    acc[message.listingId].messages.push(message);
    if (!message.read) {
      acc[message.listingId].unreadCount += 1;
    }
    return acc;
  }, {} as GroupedMessages);

  const filteredGroupedMessages = Object.entries(groupedMessages).reduce(
    (acc, [listingId, { messages, listingDetails }]) => {
      const filtered = messages.filter((msg) => {
        const matchesSearch =
          msg.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          msg.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
          msg.customerCountry
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (msg.customerPhone &&
            msg.customerPhone
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          (msg.message &&
            msg.message.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesTab =
          selectedTab === "all" || (selectedTab === "unread" && !msg.read);

        return matchesSearch && matchesTab;
      });

      if (filtered.length > 0) {
        acc[listingId] = {
          messages: filtered,
          unreadCount: filtered.filter((msg) => !msg.read).length,
          listingDetails,
        };
      }
      return acc;
    },
    {} as GroupedMessages
  );

  const toggleListing = (listingId: string) => {
    setExpandedListings((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(listingId)) {
        newSet.delete(listingId);
      } else {
        newSet.add(listingId);
      }
      return newSet;
    });
  };

  const toggleAllListings = () => {
    if (expandedListings.size === Object.keys(filteredGroupedMessages).length) {
      setExpandedListings(new Set());
    } else {
      setExpandedListings(new Set(Object.keys(filteredGroupedMessages)));
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
              <div className="h-1 w-32 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full mt-2"></div>
            </div>
            <div className="h-12 w-[500px] bg-white rounded-xl shadow-sm border border-gray-200 animate-pulse"></div>
          </div>

          <div className="flex space-x-4">
            <div className="h-10 w-24 bg-gray-100 rounded-lg animate-pulse"></div>
            <div className="h-10 w-24 bg-gray-100 rounded-lg animate-pulse"></div>
          </div>

          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden"
              >
                <div className="p-6 flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 bg-gray-100 rounded-lg animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-5 w-56 bg-gray-100 rounded animate-pulse"></div>
                      <div className="h-4 w-40 bg-gray-100 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="h-8 w-8 bg-gray-100 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
            {data.length > 0 && (
              <p className="text-gray-500 mt-2">
                {Object.keys(filteredGroupedMessages).length} active
                conversations
              </p>
            )}
          </div>

          <div className="relative w-full md:w-[500px]">
            <Search
              size={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages by name, email, phone, country, or content..."
              className="w-full pl-12 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-base shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {data.length > 0 && (
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSelectedTab("all")}
              className={`px-4 py-2 rounded-lg font-medium ${
                selectedTab === "all"
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              All Messages
            </button>
            <button
              onClick={() => setSelectedTab("unread")}
              className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-1 ${
                selectedTab === "unread"
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              <span>Unread</span>
              {data.filter((msg) => !msg.read).length > 0 && (
                <span className="bg-yellow-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {data.filter((msg) => !msg.read).length}
                </span>
              )}
            </button>
            <button
              onClick={handleRefresh}
              className="ml-auto text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              <RefreshCw size={16} className="mr-1.5" />
              Refresh
            </button>
            <button
              onClick={toggleAllListings}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              {expandedListings.size ===
              Object.keys(filteredGroupedMessages).length
                ? "Collapse all"
                : "Expand all"}
            </button>
          </div>
        )}

        {!data.length ? (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center max-w-2xl mx-auto">
            <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <Inbox className="text-blue-500" size={32} />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Your inbox is empty
            </h3>
            <p className="text-gray-500 mb-6">
              When customers contact you about your listings, messages will
              appear here
            </p>
            <Link
              to="/jets"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all text-base font-medium shadow-md"
            >
              View your listings
            </Link>
          </div>
        ) : !Object.keys(filteredGroupedMessages).length ? (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center max-w-2xl mx-auto">
            <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <Frown className="text-blue-500" size={32} />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              No messages found
            </h3>
            <p className="text-gray-500 mb-6">
              We couldn't find any messages matching your search criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTab("all");
              }}
              className="inline-block px-6 py-3 bg-black text-white hover:from-blue-700 hover:to-indigo-700 transition-all text-base font-medium shadow-md"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(filteredGroupedMessages).map(
              ([listingId, { messages, unreadCount, listingDetails }]) => (
                <div
                  key={listingId}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all hover:shadow-xl"
                >
                  <button
                    onClick={() => toggleListing(listingId)}
                    className="w-full p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-5">
                      {listingDetails?.exteriorImageUrls?.[0] ? (
                        <div className="relative">
                          <img
                            src={listingDetails.exteriorImageUrls[0]}
                            alt={`${listingDetails.manufacturer} ${listingDetails.model}`}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          {unreadCount > 0 && (
                            <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                              {unreadCount}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center relative">
                          <MessageSquare className="text-gray-400" size={24} />
                          {unreadCount > 0 && (
                            <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                              {unreadCount}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="text-left">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {listingDetails
                              ? `${listingDetails.manufacturer} ${listingDetails.model}`
                              : `Listing ${listingId.slice(0, 6)}...`}
                          </h3>
                        </div>
                        <p className="text-gray-500 mt-1">
                          {messages.length} message
                          {messages.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-5">
                      <Link
                        to={`/jets/${listingId}`}
                        className="hidden sm:flex items-center text-base text-gray-500 hover:text-blue-600 transition-colors font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View listing{" "}
                        <ChevronRight size={18} className="ml-1.5" />
                      </Link>
                      <ChevronDown
                        size={20}
                        className={`text-gray-400 transition-transform ${
                          expandedListings.has(listingId) ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedListings.has(listingId) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-gray-200"
                      >
                        <div className="divide-y divide-gray-100">
                          {messages.map((message) => (
                            <div
                              key={message.id}
                              className={`p-6 hover:bg-gray-50 transition-colors ${
                                message.read ? "bg-gray-50" : "bg-white"
                              }`}
                            >
                              <div className="flex space-x-5">
                                <div className="flex-shrink-0">
                                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                                    <User size={18} className="text-blue-600" />
                                  </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <h4 className="text-base font-medium text-gray-900 flex items-center">
                                        {message.customerName}
                                        {!message.read && (
                                          <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded text-sm font-medium bg-blue-100 text-blue-800">
                                            New
                                          </span>
                                        )}
                                      </h4>
                                      <div className="mt-3 flex flex-wrap gap-3">
                                        <span className="inline-flex items-center text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
                                          <Mail size={14} className="mr-2" />
                                          {message.customerEmail}
                                        </span>
                                        {message.customerPhone && (
                                          <span className="inline-flex items-center text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
                                            <Phone size={14} className="mr-2" />
                                            {message.customerPhone}
                                          </span>
                                        )}
                                        <span className="inline-flex items-center text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
                                          <Globe size={14} className="mr-2" />
                                          {message.customerCountry}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                      <span className="text-sm text-gray-500 flex items-center">
                                        <Clock size={14} className="mr-2" />
                                        {formatDistanceToNow(
                                          new Date(message.createdAt),
                                          { addSuffix: true }
                                        )}
                                      </span>
                                      {!message.read && (
                                        <button
                                          onClick={() => markAsRead(message.id)}
                                          className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                                          title="Mark as read"
                                        >
                                          <CheckCircle
                                            size={16}
                                            className="mr-1.5"
                                          />
                                        </button>
                                      )}
                                    </div>
                                  </div>

                                  {message.message && (
                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                      <p className="text-gray-700">
                                        {message.message}
                                      </p>
                                    </div>
                                  )}

                                  <div className="mt-4 flex justify-end space-x-3">
                                    <a
                                      href={`mailto:${message.customerEmail}`}
                                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                      <Mail size={16} className="mr-2" />
                                      Reply
                                    </a>
                                    {message.customerPhone && (
                                      <a
                                        href={`tel:${message.customerPhone.replace(
                                          /\D/g,
                                          ""
                                        )}`}
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                      >
                                        <Phone size={16} className="mr-2" />
                                        Call
                                      </a>
                                    )}
                                    <Link
                                      to={`/jets/${listingId}`}
                                      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-black hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                      View Listing
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default JetForSaleMessages;
