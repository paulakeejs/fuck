import { useEffect, useState } from "react";
import { toast } from "sonner";
import hApi from "./HApi";
import {
  Mail,
  User,
  Globe,
  Clock,
  CheckCircle,
  ChevronDown,
  MessageSquare,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

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
  helicopterName?: string;
}

interface GroupedMessages {
  [listingId: string]: {
    messages: Message[];
    unreadCount: number;
    helicopterName?: string;
  };
}

function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedListings, setExpandedListings] = useState<Set<string>>(
    new Set()
  );

  const getMessages = async () => {
    try {
      setLoading(true);
      const response = await hApi.get("/messages");
      if (response.data.success) {
        setMessages(response.data.messages);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const response = await hApi.put(`/messages/${messageId}/read`);
      if (response.data.success) {
        setMessages((prev) =>
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

  const handleEmailReply = (email: string, customerName: string) => {
    const subject = `Re: Your Helicopter Inquiry`;
    const body = `Dear ${customerName},\n\nThank you for your inquiry.\n\nBest regards`;
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, "_blank");
  };

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
    if (expandedListings.size === Object.keys(groupedMessages).length) {
      setExpandedListings(new Set());
    } else {
      setExpandedListings(new Set(Object.keys(groupedMessages)));
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  // Group messages by listing
  const groupedMessages: GroupedMessages = messages.reduce((acc, message) => {
    if (!acc[message.listingId]) {
      acc[message.listingId] = {
        messages: [],
        unreadCount: 0,
        helicopterName: message.helicopterName,
      };
    }
    acc[message.listingId].messages.push(message);
    if (!message.read) {
      acc[message.listingId].unreadCount += 1;
    }
    return acc;
  }, {} as GroupedMessages);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FAFAFA]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-light text-gray-900 tracking-tight">
          Messages
        </h1>
        <div className="flex space-x-6">
          <button
            onClick={toggleAllListings}
            className="px-6 py-2.5 text-gray-700 hover:text-gray-900 transition-colors duration-200 font-light text-sm tracking-wide"
          >
            {expandedListings.size === Object.keys(groupedMessages).length
              ? "Collapse all"
              : "Expand all"}
          </button>
          <button
            onClick={getMessages}
            className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 font-light text-sm tracking-wide shadow-sm hover:shadow-md"
          >
            Refresh
          </button>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg font-light">No messages yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedMessages).map(
            ([listingId, { messages, unreadCount, helicopterName }]) => (
              <div
                key={listingId}
                className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-shadow duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
              >
                <button
                  onClick={() => toggleListing(listingId)}
                  className="w-full px-8 py-6 flex justify-between items-center hover:bg-gray-50/50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
                        <MessageSquare className="text-gray-900" size={24} />
                        {unreadCount > 0 && (
                          <div className="absolute -top-1.5 -right-1.5 bg-gray-900 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                            {unreadCount}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-left">
                      <h3 className="text-lg text-gray-900 font-light tracking-wide">
                        {helicopterName ||
                          `Listing ${listingId.slice(0, 6)}...`}
                      </h3>
                      <p className="text-gray-400 mt-1 text-sm font-light tracking-wide">
                        {messages.length} message
                        {messages.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  <ChevronDown
                    size={18}
                    className={`text-gray-400 transition-transform duration-200 ${
                      expandedListings.has(listingId) ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedListings.has(listingId) && (
                  <div className="border-t border-gray-100">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`px-8 py-6 hover:bg-gray-50/50 transition-colors duration-200 ${
                          message.read ? "bg-gray-50/30" : ""
                        } border-b border-gray-100 last:border-b-0`}
                      >
                        <div className="flex space-x-6">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full flex items-center justify-center">
                              <User size={16} className="text-gray-900" />
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="text-base text-gray-900 font-light tracking-wide flex items-center">
                                  {message.customerName}
                                  {!message.read && (
                                    <span className="ml-3 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-900/5 text-gray-900">
                                      New
                                    </span>
                                  )}
                                </h4>
                                <div className="mt-3 flex flex-wrap gap-3">
                                  <span className="inline-flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg font-light tracking-wide">
                                    <Mail
                                      size={14}
                                      className="mr-2 text-gray-400"
                                    />
                                    {message.customerEmail}
                                  </span>
                                  {message.customerCountry && (
                                    <span className="inline-flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg font-light tracking-wide">
                                      <Globe
                                        size={14}
                                        className="mr-2 text-gray-400"
                                      />
                                      {message.customerCountry}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-400 flex items-center font-light tracking-wide">
                                  <Clock size={14} className="mr-2" />
                                  {formatDistanceToNow(
                                    new Date(message.createdAt),
                                    {
                                      addSuffix: true,
                                    }
                                  )}
                                </span>
                                {!message.read && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      markAsRead(message.id);
                                    }}
                                    className="text-sm text-gray-900 hover:text-gray-700 flex items-center transition-colors duration-200 font-light tracking-wide"
                                    title="Mark as read"
                                  >
                                    <CheckCircle size={14} className="mr-1.5" />
                                    Mark as read
                                  </button>
                                )}
                              </div>
                            </div>

                            {message.message && (
                              <div className="mt-4 p-5 bg-gray-50/50 rounded-lg border border-gray-100">
                                <p className="text-gray-600 font-light leading-relaxed">
                                  {message.message}
                                </p>
                              </div>
                            )}

                            <div className="mt-5 flex justify-end">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEmailReply(
                                    message.customerEmail,
                                    message.customerName
                                  );
                                }}
                                className="inline-flex items-center px-5 py-2.5 text-sm font-light tracking-wide text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                              >
                                <Mail size={14} className="mr-2" />
                                Reply via Email
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default Messages;
