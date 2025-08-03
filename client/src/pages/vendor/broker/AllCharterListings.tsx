import { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import {
  Edit,
  Trash2,
  Rocket,
  Plus,
  ChevronRight,
  Search,
  SlidersHorizontal,
  X,
  MapPin,
  Gauge,
  Clock,
  Calendar,
} from "lucide-react";
import charterVendorApi from "../charter/api";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

interface Fleet {
  id: string;
  jetName: string;
  aircraftType: string;
  manufacturer: string;
  seatingCapacity: string;
  maximumRange: string;
  pricePerHour: string;
  homeBase: string;
  exteriorImages: string[];
  cabinFeatures: string[];
  inFlightMeals: boolean;
  flightAttendant: boolean;
  petsAllowed: boolean;
  smokingAllowed: boolean;
  isBoosted: boolean;
  status: string;
  sponsoredType: string;
  end_date: string;
  transactionSignature?: string;
  transactionLink?: string;
}

interface BoostPlan {
  name: string;
  duration: string;
  priceSol: number;
  priceUsd: number;
  features: string[];
}

function AllCharterListings() {
  const [fleets, setFleets] = useState<Fleet[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [boostingId, setBoostingId] = useState<string | null>(null);
  const [showBoostModal, setShowBoostModal] = useState(false);
  const [selectedFleetId, setSelectedFleetId] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<BoostPlan | null>(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [solPrice, setSolPrice] = useState<number>(100);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const [solscanLink, setSolscanLink] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    manufacturer: "",
    minPrice: "",
    maxPrice: "",
    minSeats: "",
    maxSeats: "",
    minRange: "",
    status: "",
  });

  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const boostPlans: BoostPlan[] = useMemo(
    () => [
      {
        name: "Basic",
        duration: "7 days",
        priceSol: 0.15,
        priceUsd: Math.round(0.15 * solPrice),
        features: ["Top 3 placement", "Standard badge"],
      },
      {
        name: "Premium",
        duration: "14 days",
        priceSol: 0.25,
        priceUsd: Math.round(0.25 * solPrice),
        features: ["Homepage feature", "Premium badge", "Email mention"],
      },
      {
        name: "Ultimate",
        duration: "30 days",
        priceSol: 0.5,
        priceUsd: Math.round(0.5 * solPrice),
        features: [
          "Homepage banner",
          "Newsletter feature",
          "Social media mention",
        ],
      },
    ],
    [solPrice]
  );

  // Fetch recipient address and poll SOL price
  useEffect(() => {
    const fetchRecipient = async () => {
      try {
        const response = await charterVendorApi.get("/payment/recipient");
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
        setSolPrice(data.solana.usd || 100); // Fallback to 100 if API fails
      } catch (error) {
        console.error("Failed to fetch SOL price:", error);
        setSolPrice(100); // Fallback price
      }
    };

    fetchRecipient();
    fetchSolPrice();

    // Poll SOL price every 30 seconds
    const priceInterval = setInterval(fetchSolPrice, 30000);

    return () => clearInterval(priceInterval);
  }, []);

  const mapApiResponseToFleet = (data: any[]): Fleet[] => {
    return data.map((item) => ({
      id: item.id,
      jetName: item.jetName || "Unknown",
      aircraftType: item.aircraftType || "Unknown",
      manufacturer: item.manufacturer || "Unknown",
      seatingCapacity: item.seatingCapacity || "0",
      maximumRange: item.maximumRange || "0",
      pricePerHour: item.pricePerHour || "0",
      homeBase: item.homeBase || "Unknown",
      exteriorImages: item.exteriorImages || [],
      cabinFeatures: item.cabinFeatures || [],
      inFlightMeals: !!item.inFlightMeals,
      flightAttendant: !!item.flightAttendant,
      petsAllowed: !!item.petsAllowed,
      smokingAllowed: !!item.smokingAllowed,
      isBoosted: !!item.sponsored,
      status:
        item.status === "APPROVED"
          ? "active"
          : (item.status || "unknown").toLowerCase(),
      sponsoredType: item.sponsoredType || "None",
      end_date: item.end_date || new Date().toISOString(),
      transactionSignature: item.transactionSignature || "",
      transactionLink: item.transactionLink || "",
    }));
  };

  const fetchFleets = async () => {
    try {
      setLoading(true);
      const response = await charterVendorApi.get("/fleet");
      if (response.data.success) {
        setFleets(mapApiResponseToFleet(response.data.data));
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch fleets");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      const response = await charterVendorApi.delete(`/${id}`);
      if (response.data.success) {
        setFleets((prev) => prev.filter((fleet) => fleet.id !== id));
        toast.success("Aircraft deleted successfully");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete aircraft");
    } finally {
      setDeletingId(null);
    }
  };

  const initiateBoost = (id: string) => {
    setSelectedFleetId(id);
    setShowBoostModal(true);
    setPaymentStatus("idle");
    setSolscanLink(null);
  };

  const handleBoostPayment = async () => {
    if (!publicKey || !selectedPlan || !selectedFleetId) {
      toast.error("Please select a plan and connect your wallet");
      return;
    }

    if (!walletAddress) {
      toast.error("Payment recipient address not available");
      return;
    }

    try {
      setBoostingId(selectedFleetId);
      setPaymentStatus("processing");

      // Validate recipient address
      let recipientPubkey: PublicKey;
      try {
        recipientPubkey = new PublicKey(walletAddress);
      } catch (error) {
        throw new Error("Invalid recipient wallet address");
      }

      // Calculate lamports
      const lamports = Math.floor(selectedPlan.priceSol * LAMPORTS_PER_SOL);

      // Create transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubkey,
          lamports,
        })
      );

      // Get recent blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      // Send transaction
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "confirmed");

      // Set payment success and Solscan link
      setPaymentStatus("success");
      setSolscanLink(`https://solscan.io/tx/${signature}?cluster=devnet`);
    } catch (error: any) {
      setPaymentStatus("error");
      toast.error(error.message || "Failed to process payment");
    } finally {
      setBoostingId(null);
    }
  };

  const handleConfirmBoost = async () => {
    if (!selectedFleetId || !selectedPlan) {
      toast.error("Invalid aircraft or plan");
      return;
    }

    try {
      const response = await charterVendorApi.put(`/boost/${selectedFleetId}`, {
        plan: selectedPlan.name,
        duration: parseInt(selectedPlan.duration.replace(" days", ""), 10),
      });

      if (response.data.success) {
        toast.success("Aircraft boosted successfully");
        await fetchFleets();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to boost aircraft");
    } finally {
      setShowBoostModal(false);
      setSelectedPlan(null);
      setSelectedFleetId(null);
      setPaymentStatus("idle");
      setSolscanLink(null);
    }
  };

  useEffect(() => {
    fetchFleets();
  }, []);

  // Filter and search logic
  const filteredFleets = useMemo(() => {
    return fleets.filter((fleet) => {
      const matchesSearch =
        fleet.jetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fleet.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fleet.aircraftType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fleet.homeBase.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilters =
        (filters.manufacturer === "" ||
          fleet.manufacturer === filters.manufacturer) &&
        (filters.minPrice === "" ||
          Number(fleet.pricePerHour) >= Number(filters.minPrice)) &&
        (filters.maxPrice === "" ||
          Number(fleet.pricePerHour) <= Number(filters.maxPrice)) &&
        (filters.minSeats === "" ||
          Number(fleet.seatingCapacity) >= Number(filters.minSeats)) &&
        (filters.maxSeats === "" ||
          Number(fleet.seatingCapacity) <= Number(filters.maxSeats)) &&
        (filters.minRange === "" ||
          Number(fleet.maximumRange) >= Number(filters.minRange)) &&
        (filters.status === "" || fleet.status === filters.status);

      return matchesSearch && matchesFilters;
    });
  }, [fleets, searchTerm, filters]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFleets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFleets.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const formatPrice = (price: string): string => {
    const num = Number(price);
    if (isNaN(num)) return "$0";
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
    return `$${num}`;
  };

  const formatRange = (range: string): string => {
    const num = Number(range);
    if (isNaN(num)) return "Unknown";
    return `${num.toLocaleString()} nm`;
  };

  const manufacturers = useMemo(() => {
    const uniqueManufacturers = new Set(
      fleets.map((item) => item.manufacturer)
    );
    return Array.from(uniqueManufacturers).sort();
  }, [fleets]);

  const resetFilters = () => {
    setFilters({
      manufacturer: "",
      minPrice: "",
      maxPrice: "",
      minSeats: "",
      maxSeats: "",
      minRange: "",
      status: "",
    });
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Your Aircraft Fleet
          </h1>
          <p className="mt-1 text-sm sm:text-base text-gray-600">
            Showing {filteredFleets.length} of {fleets.length} aircraft
            {fleets.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-600" />
              </div>
              <input
                type="text"
                placeholder="Search by jet name, manufacturer, type, or home base..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center px-4 py-2 border rounded-lg shadow-sm text-sm font-medium transition-colors ${
                showFilters
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-900">Filter Aircraft</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Manufacturer
                  </label>
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 rounded-lg transition-all"
                    value={filters.manufacturer}
                    onChange={(e) => {
                      setFilters({ ...filters, manufacturer: e.target.value });
                      setCurrentPage(1);
                    }}
                  >
                    <option value="">All Manufacturers</option>
                    {manufacturers.map((man) => (
                      <option key={man} value={man}>
                        {man}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Per Hour ($)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all"
                      value={filters.minPrice}
                      onChange={(e) => {
                        setFilters({ ...filters, minPrice: e.target.value });
                        setCurrentPage(1);
                      }}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all"
                      value={filters.maxPrice}
                      onChange={(e) => {
                        setFilters({ ...filters, maxPrice: e.target.value });
                        setCurrentPage(1);
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Seating Capacity
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all"
                      value={filters.minSeats}
                      onChange={(e) => {
                        setFilters({ ...filters, minSeats: e.target.value });
                        setCurrentPage(1);
                      }}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all"
                      value={filters.maxSeats}
                      onChange={(e) => {
                        setFilters({ ...filters, maxSeats: e.target.value });
                        setCurrentPage(1);
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Range (nm)
                  </label>
                  <input
                    type="number"
                    placeholder="Minimum range"
                    className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all"
                    value={filters.minRange}
                    onChange={(e) => {
                      setFilters({ ...filters, minRange: e.target.value });
                      setCurrentPage(1);
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 rounded-lg transition-all"
                    value={filters.status}
                    onChange={(e) => {
                      setFilters({ ...filters, status: e.target.value });
                      setCurrentPage(1);
                    }}
                  >
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="chartered">Chartered</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Reset Filters
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Boost Modal */}
        {showBoostModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Boost Your Aircraft
                </h2>
                <button
                  onClick={() => {
                    setShowBoostModal(false);
                    setSelectedPlan(null);
                    setSelectedFleetId(null);
                    setPaymentStatus("idle");
                    setSolscanLink(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              {paymentStatus === "processing" && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800 mx-auto mb-2"></div>
                  <p className="text-sm font-medium text-gray-700">
                    Processing Payment...
                  </p>
                </div>
              )}

              {paymentStatus === "success" && solscanLink && (
                <div className="mb-4 p-4 bg-green-50 rounded-lg text-center">
                  <div className="mx-auto mb-2 text-green-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    Payment Successful!{" "}
                    <a
                      href={solscanLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 hover:underline"
                    >
                      View on Solscan
                    </a>
                  </p>
                </div>
              )}

              {paymentStatus === "error" && (
                <div className="mb-4 p-4 bg-red-50 rounded-lg text-center">
                  <div className="mx-auto mb-2 text-red-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    Payment Failed. Please try again.
                  </p>
                </div>
              )}

              <div className="space-y-3">
                {boostPlans.map((plan) => (
                  <div
                    key={plan.name}
                    onClick={() => setSelectedPlan(plan)}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPlan?.name === plan.name
                        ? "border-gray-800 bg-gray-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {plan.name}
                        </h3>
                        <div className="flex items-center mt-1 text-sm text-gray-600">
                          <Clock className="mr-1 h-4 w-4" />
                          {plan.duration}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          {plan.priceSol} SOL
                        </div>
                        <div className="text-sm text-gray-600">
                          ≈ ${plan.priceUsd}
                        </div>
                      </div>
                    </div>
                    <ul className="mt-3 space-y-1 text-sm text-gray-600">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2 text-gray-500">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowBoostModal(false);
                    setSelectedPlan(null);
                    setSelectedFleetId(null);
                    setPaymentStatus("idle");
                    setSolscanLink(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                {paymentStatus === "success" ? (
                  <button
                    onClick={handleConfirmBoost}
                    className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    Confirm Boost
                  </button>
                ) : (
                  <button
                    onClick={handleBoostPayment}
                    disabled={
                      !selectedPlan ||
                      !publicKey ||
                      !walletAddress ||
                      paymentStatus === "processing"
                    }
                    className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {!publicKey ? "Connect Wallet" : "Pay with SOL"}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600"></div>
          </div>
        ) : filteredFleets.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center max-w-2xl mx-auto">
            <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
              <Rocket className="text-gray-600" size={28} />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">
              No Matching Aircraft Found
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Try adjusting your search or filters to find what you're looking
              for
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors shadow-sm text-sm sm:text-base"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:gap-6">
              {currentItems.map((fleet) => (
                <div
                  key={fleet.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <div className="w-full sm:w-56 h-48 flex-shrink-0 rounded-lg overflow-hidden relative">
                        <img
                          src={
                            fleet.exteriorImages[0] ||
                            "https://via.placeholder.com/224x192?text=No+Image"
                          }
                          alt={fleet.jetName}
                          className="w-full h-full object-cover"
                        />
                        {fleet.isBoosted &&
                          new Date(fleet.end_date) > new Date() && (
                            <div className="absolute top-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-2 text-white text-xs font-bold">
                              Boosted: {fleet.sponsoredType} until{" "}
                              {new Date(fleet.end_date).toLocaleDateString()}
                            </div>
                          )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div className="min-w-0">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                              {fleet.jetName}
                            </h3>
                            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                              <div className="flex items-center text-sm text-gray-600">
                                <Calendar className="mr-1 h-4 w-4" />
                                {fleet.manufacturer}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Gauge className="mr-1 h-4 w-4" />
                                {fleet.aircraftType}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <MapPin className="mr-1 h-4 w-4" />
                                {fleet.homeBase}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Clock className="mr-1 h-4 w-4" />
                                {formatRange(fleet.maximumRange)}
                              </div>
                            </div>
                          </div>
                          <div className="text-right pl-2">
                            <span
                              className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                                fleet.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : fleet.status === "maintenance"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {fleet.status.charAt(0).toUpperCase() +
                                fleet.status.slice(1)}
                            </span>
                            <div className="text-xl font-bold text-gray-900 mt-2">
                              {formatPrice(fleet.pricePerHour)}/hr
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {fleet.seatingCapacity} seats
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <Link
                            to={`/charter/${fleet.id}`}
                            className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
                          >
                            View details{" "}
                            <ChevronRight size={16} className="ml-1" />
                          </Link>
                          <div className="flex space-x-2">
                            <Link
                              to={`/fleet/edit/${fleet.id}`}
                              className="inline-flex items-center p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Edit aircraft"
                            >
                              <Edit size={18} />
                            </Link>
                            <button
                              onClick={() => handleDelete(fleet.id)}
                              disabled={deletingId === fleet.id}
                              className="inline-flex items-center p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                              title="Delete aircraft"
                            >
                              {deletingId === fleet.id ? (
                                <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <Trash2 size={18} />
                              )}
                            </button>
                            <button
                              onClick={() => initiateBoost(fleet.id)}
                              disabled={
                                boostingId === fleet.id ||
                                (fleet.isBoosted &&
                                  new Date(fleet.end_date) > new Date()) ||
                                fleet.status !== "Approved"
                              }
                              className={`inline-flex items-center p-2 rounded-lg transition-colors ${
                                fleet.status !== "Approved" ||
                                (fleet.isBoosted &&
                                  new Date(fleet.end_date) > new Date())
                                  ? "text-gray-400 cursor-not-allowed"
                                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                              }`}
                              title={
                                fleet.status !== "Approved"
                                  ? "Aircraft must be approved to boost"
                                  : fleet.isBoosted &&
                                    new Date(fleet.end_date) > new Date()
                                  ? `Already boosted until ${new Date(
                                      fleet.end_date
                                    ).toLocaleDateString()}`
                                  : "Boost aircraft"
                              }
                            >
                              {boostingId === fleet.id ? (
                                <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <Rocket
                                  size={18}
                                  className={
                                    fleet.isBoosted &&
                                    new Date(fleet.end_date) > new Date()
                                      ? "text-yellow-500"
                                      : ""
                                  }
                                />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  Showing {indexOfFirstItem + 1} to{" "}
                  {Math.min(indexOfLastItem, filteredFleets.length)} of{" "}
                  {filteredFleets.length} results
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => paginate(pageNum)}
                        className={`px-3 py-1 border rounded-lg text-sm font-medium transition-colors ${
                          currentPage === pageNum
                            ? "bg-green-500 text-white border-green-500"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <span className="px-3 py-1 text-gray-600">...</span>
                  )}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <button
                      onClick={() => paginate(totalPages)}
                      className="px-3 py-1 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      {totalPages}
                    </button>
                  )}
                  <button
                    onClick={() =>
                      paginate(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        <Link
          to="/program/charters/new"
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-14 h-14 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition-all hover:shadow-xl"
          title="Add new aircraft"
        >
          <Plus size={24} />
        </Link>
      </div>
    </div>
  );
}

export default AllCharterListings;
