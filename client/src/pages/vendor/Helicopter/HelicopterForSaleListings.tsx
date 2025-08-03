import { useEffect, useState } from "react";
import hApi from "./HApi";
import {
  FiEdit2,
  FiTrash2,
  FiDollarSign,
  FiStar,
  FiSearch,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiX,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

interface Listing {
  id: string;
  helicopterName: string;
  manufacturer: string;
  yearOfManufacture: number;
  salePrice: number;
  condition: string;
  exteriorImageUrls: string[];
  status: string;
  helicopterType: string;
  sponsored?: boolean;
  sponsoredType?: "Basic Boost" | "Pro Boost" | "Elite Boost";
  end_date?: string;
  totalFlightHours: number;
  seatingCapacity: number;
  registrationNumber: string;
  views: number;
}

interface FilterState {
  search: string;
  manufacturer: string;
  type: string;
  minPrice: string;
  maxPrice: string;
  minYear: string;
  maxYear: string;
  condition: string;
}

interface BoostPlan {
  name: "Basic Boost" | "Pro Boost" | "Elite Boost";
  duration: string;
  priceSol: number;
  priceUsd: number;
  features: string[];
}

const ITEMS_PER_PAGE = 8;

function HelicopterForSaleListings() {
  const navigate = useNavigate();
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [showBoostModal, setShowBoostModal] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(
    null
  );
  const [selectedPlan, setSelectedPlan] = useState<BoostPlan | null>(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [solPrice, setSolPrice] = useState<number>(100);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const [solscanLink, setSolscanLink] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    manufacturer: "",
    type: "",
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    condition: "",
  });

  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const boostPlans: BoostPlan[] = [
    {
      name: "Basic Boost",
      duration: "7 days",
      priceSol: 0.25,
      priceUsd: Math.round(0.25 * solPrice),
      features: ["7-day listing boost"],
    },
    {
      name: "Pro Boost",
      duration: "14 days",
      priceSol: 0.6,
      priceUsd: Math.round(0.6 * solPrice),
      features: [
        "14-day listing boost",
        "Homepage feature",
        "Instagram promo mention",
      ],
    },
    {
      name: "Elite Boost",
      duration: "30 days",
      priceSol: 1.2,
      priceUsd: Math.round(1.2 * solPrice),
      features: [
        "30-day listing boost",
        "Homepage feature",
        "Featured on Instagram story",
        "Featured tag",
      ],
    },
  ];

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await hApi.get("/listings");
        setListings(response.data.listings);
        setFilteredListings(response.data.listings);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  useEffect(() => {
    let result = [...listings];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (item) =>
          item.helicopterName.toLowerCase().includes(searchLower) ||
          item.manufacturer.toLowerCase().includes(searchLower)
      );
    }

    if (filters.manufacturer) {
      result = result.filter(
        (item) => item.manufacturer === filters.manufacturer
      );
    }

    if (filters.type) {
      result = result.filter((item) => item.helicopterType === filters.type);
    }

    if (filters.minPrice) {
      result = result.filter(
        (item) => item.salePrice >= parseInt(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      result = result.filter(
        (item) => item.salePrice <= parseInt(filters.maxPrice)
      );
    }

    if (filters.minYear) {
      result = result.filter(
        (item) => item.yearOfManufacture >= parseInt(filters.minYear)
      );
    }

    if (filters.maxYear) {
      result = result.filter(
        (item) => item.yearOfManufacture <= parseInt(filters.maxYear)
      );
    }

    if (filters.condition) {
      result = result.filter((item) => item.condition === filters.condition);
    }

    setFilteredListings(result);
    setCurrentPage(1);
  }, [filters, listings]);

  useEffect(() => {
    const fetchRecipient = async () => {
      try {
        const response = await hApi.get("/payment/recipient");
        if (response.data.success) {
          setWalletAddress(response.data.data.wallet);
        } else {
          throw new Error(response.data.message);
        }
      } catch (error: any) {
        console.error("Failed to fetch recipient:", error);
        toast.error("Failed to load payment information");
      }
    };

    const fetchSolPrice = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
        );
        const data = await response.json();
        setSolPrice(data.solana.usd);
      } catch (error) {
        console.error("Failed to fetch SOL price:", error);
        setSolPrice(100);
      }
    };

    fetchRecipient();
    fetchSolPrice();

    const priceInterval = setInterval(fetchSolPrice, 30000);
    return () => clearInterval(priceInterval);
  }, []);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleBoost = (id: string) => {
    setSelectedListingId(id);
    setShowBoostModal(true);
    setPaymentStatus("idle");
    setSolscanLink(null);
  };

  const handleConfirmBoost = async () => {
    if (!selectedListingId || !selectedPlan) {
      toast.error("Please select a boost plan");
      return;
    }

    try {
      setProcessingId(selectedListingId);
      setPaymentStatus("processing");

      if (!publicKey) {
        throw new Error("Please connect your wallet");
      }

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(walletAddress),
          lamports: selectedPlan.priceSol * LAMPORTS_PER_SOL,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      const solscanUrl = `https://solscan.io/tx/${signature}?cluster=devnet`;
      setSolscanLink(solscanUrl);

      await connection.confirmTransaction(signature);

      const response = await hApi.put(`/sales/${selectedListingId}/boost`, {
        plan: selectedPlan.name,
        duration: selectedPlan.duration,
        transactionSignature: signature,
        transactionLink: solscanUrl,
      });

      if (response.data.success) {
        setPaymentStatus("success");
        toast.success("Listing boosted successfully!");

        const updatedListings = listings.map((listing) =>
          listing.id === selectedListingId
            ? { ...listing, sponsored: true, sponsoredType: selectedPlan.name }
            : listing
        );
        setListings(updatedListings);
        setFilteredListings((prev) =>
          prev.map((listing) =>
            listing.id === selectedListingId
              ? {
                  ...listing,
                  sponsored: true,
                  sponsoredType: selectedPlan.name,
                }
              : listing
          )
        );
      }
    } catch (err: any) {
      setPaymentStatus("error");
      toast.error(err.message || "Failed to boost listing");
    } finally {
      setProcessingId(null);
      setShowBoostModal(false);
      setSelectedPlan(null);
      setSelectedListingId(null);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/h-broker/${id}/edit`);
  };

  const handleDelete = async (id: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this listing? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      setProcessingId(id);
      await hApi.delete(`/sales/${id}`);

      const updatedListings = listings.filter((listing) => listing.id !== id);
      setListings(updatedListings);
      setFilteredListings((prev) =>
        prev.filter((listing) => listing.id !== id)
      );

      toast.success("Listing deleted successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete listing");
    } finally {
      setProcessingId(null);
    }
  };

  const handleMarkAsSold = async (id: string) => {
    try {
      setProcessingId(id);
      await hApi.put(`/sales/${id}/status`, { status: "SOLD" });

      const updatedListings = listings.map((listing) =>
        listing.id === id ? { ...listing, status: "SOLD" } : listing
      );
      setListings(updatedListings);
      setFilteredListings((prev) =>
        prev.map((listing) =>
          listing.id === id ? { ...listing, status: "SOLD" } : listing
        )
      );

      toast.success("Listing marked as sold!");
    } catch (err: any) {
      toast.error(err.message || "Failed to mark listing as sold");
    } finally {
      setProcessingId(null);
    }
  };

  const totalPages = Math.ceil(filteredListings.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentListings = filteredListings.slice(startIndex, endIndex);

  const manufacturers = Array.from(
    new Set(listings.map((item) => item.manufacturer))
  );
  const types = Array.from(
    new Set(listings.map((item) => item.helicopterType))
  );
  const conditions = Array.from(
    new Set(listings.map((item) => item.condition))
  );

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-red-500 bg-red-50 p-4 rounded-lg shadow">
          Error: {error}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4 md:mb-0">
            Helicopter Listings
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search helicopters..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>
            <button
              onClick={() => document.getElementById("filters")?.focus()}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <FiFilter size={20} />
            </button>
          </div>
        </div>

        <div
          id="filters"
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <select
            className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.manufacturer}
            onChange={(e) => handleFilterChange("manufacturer", e.target.value)}
          >
            <option value="">All Manufacturers</option>
            {manufacturers.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <select
            className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.type}
            onChange={(e) => handleFilterChange("type", e.target.value)}
          >
            <option value="">All Types</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <select
            className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.condition}
            onChange={(e) => handleFilterChange("condition", e.target.value)}
          >
            <option value="">All Conditions</option>
            {conditions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min Price"
              className="w-1/2 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
            />
            <input
              type="number"
              placeholder="Max Price"
              className="w-1/2 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
            />
          </div>
        </div>

        {currentListings.length === 0 ? (
          <div className="text-center py-12">
            <FiFilter className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No results found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-video">
                  <img
                    src={listing.exteriorImageUrls[0]}
                    alt={listing.helicopterName}
                    className="w-full h-full object-cover"
                  />
                  {listing.sponsored && (
                    <div className="absolute top-2 left-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                      {listing.sponsoredType?.split(" ")[0]}
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                    {listing.status}
                  </div>
                </div>

                <div className="p-4">
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {listing.helicopterName}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {listing.manufacturer} • {listing.yearOfManufacture}
                    </p>
                    <p className="text-lg font-bold text-blue-600 mt-1">
                      ${listing.salePrice.toLocaleString()}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>
                        {listing.totalFlightHours.toLocaleString()} hrs
                      </span>
                      <span>{listing.registrationNumber}</span>
                    </div>
                    <div className="text-sm text-gray-600 text-center border-t border-gray-100 pt-2">
                      {listing.views.toLocaleString()} views
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleEdit(listing.id)}
                        disabled={processingId === listing.id}
                        className="flex items-center justify-center px-3 py-1.5 border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50"
                      >
                        <FiEdit2 className="mr-1" size={14} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(listing.id)}
                        disabled={processingId === listing.id}
                        className="flex items-center justify-center px-3 py-1.5 border border-red-200 rounded text-sm text-red-600 hover:bg-red-50"
                      >
                        <FiTrash2 className="mr-1" size={14} /> Delete
                      </button>
                    </div>

                    <button
                      onClick={() => handleBoost(listing.id)}
                      disabled={
                        processingId === listing.id ||
                        listing.sponsored ||
                        listing.status === "SOLD" ||
                        listing.status === "PENDING"
                      }
                      className={`w-full flex items-center justify-center px-3 py-1.5 rounded text-sm ${
                        processingId === listing.id ||
                        listing.sponsored ||
                        listing.status === "SOLD" ||
                        listing.status === "PENDING"
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                      }`}
                    >
                      <FiStar className="mr-1" size={14} />
                      {listing.sponsored
                        ? "Boosted"
                        : listing.status === "SOLD"
                        ? "Cannot boost sold listing"
                        : listing.status === "PENDING"
                        ? "Cannot boost pending listing"
                        : "Boost Listing"}
                    </button>

                    <button
                      onClick={() => handleMarkAsSold(listing.id)}
                      disabled={
                        processingId === listing.id || listing.status === "SOLD"
                      }
                      className={`w-full flex items-center justify-center px-3 py-1.5 rounded text-sm ${
                        processingId === listing.id || listing.status === "SOLD"
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-green-50 text-green-600 hover:bg-green-100"
                      }`}
                    >
                      <FiDollarSign className="mr-1" size={14} />
                      {listing.status === "SOLD" ? "Sold" : "Mark as Sold"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center space-x-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`flex items-center px-4 py-2 rounded ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <FiChevronLeft className="mr-1" /> Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`flex items-center px-4 py-2 rounded ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              Next <FiChevronRight className="ml-1" />
            </button>
          </div>
        )}
      </div>

      {showBoostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Boost Listing
              </h3>
              <button
                onClick={() => setShowBoostModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {boostPlans.map((plan) => (
                <div
                  key={plan.name}
                  onClick={() => setSelectedPlan(plan)}
                  className={`p-4 border rounded-lg cursor-pointer ${
                    selectedPlan?.name === plan.name
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{plan.name}</h4>
                      <p className="text-sm text-gray-600">{plan.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {plan.priceSol} SOL
                      </p>
                      <p className="text-sm text-gray-500">
                        (≈${plan.priceUsd})
                      </p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <FiStar className="mr-2 text-yellow-500" size={12} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-6">
              {solscanLink && (
                <a
                  href={solscanLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 text-sm block mb-4"
                >
                  View transaction on Solscan
                </a>
              )}

              <button
                onClick={handleConfirmBoost}
                disabled={!selectedPlan || paymentStatus === "processing"}
                className={`w-full py-2 px-4 rounded ${
                  !selectedPlan || paymentStatus === "processing"
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                {paymentStatus === "processing" ? (
                  <span className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </span>
                ) : (
                  "Confirm Boost"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HelicopterForSaleListings;
