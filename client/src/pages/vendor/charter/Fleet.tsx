import { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import {
  Edit,
  Trash2,
  Rocket,
  ChevronRight,
  Search,
  SlidersHorizontal,
  X,
  MapPin,
  Gauge,
  Clock,
  Calendar,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import charterVendorApi from "./api";
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
  status: "APPROVED" | "BOOKED" | "PENDING";
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

function CharterFleet() {
  const [fleets, setFleets] = useState<Fleet[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [boostingId, setBoostingId] = useState<string | null>(null);
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);
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
        item.status === "APPROVED" ||
        item.status === "BOOKED" ||
        item.status === "PENDING"
          ? item.status
          : "PENDING",
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

  const updateFleetStatus = async (
    id: string,
    status: "APPROVED" | "BOOKED" | "PENDING"
  ) => {
    try {
      setUpdatingStatusId(id);
      const response = await charterVendorApi.put(`/book/${id}`, {
        status,
      });
      if (response.data.success) {
        toast.success(`Aircraft status updated to ${status}`);
        await fetchFleets();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update aircraft status");
    } finally {
      setUpdatingStatusId(null);
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Stats */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Aircraft Fleet Management
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-sm text-gray-600 mb-1">Total Aircraft</div>
              <div className="text-2xl font-bold text-gray-900">
                {fleets.length}
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-sm text-gray-600 mb-1">Available</div>
              <div className="text-2xl font-bold text-green-600">
                {fleets.filter((f) => f.status === "APPROVED").length}
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-sm text-gray-600 mb-1">Booked</div>
              <div className="text-2xl font-bold text-purple-600">
                {fleets.filter((f) => f.status === "BOOKED").length}
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by aircraft name, manufacturer, or location..."
                className="block w-full pl-12 pr-4 py-3 border-0 rounded-xl bg-white shadow-md focus:ring-2 focus:ring-blue-500 transition-all text-gray-900"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center px-6 py-3 rounded-xl text-sm font-medium transition-all shadow-md ${
                showFilters
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-6 rounded-xl bg-white shadow-md border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Manufacturer
                  </label>
                  <select
                    className="block w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
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
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Price Range (per hour)
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      placeholder="Min"
                      className="block w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                      value={filters.minPrice}
                      onChange={(e) => {
                        setFilters({ ...filters, minPrice: e.target.value });
                        setCurrentPage(1);
                      }}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="block w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                      value={filters.maxPrice}
                      onChange={(e) => {
                        setFilters({ ...filters, maxPrice: e.target.value });
                        setCurrentPage(1);
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Seating Capacity
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      placeholder="Min"
                      className="block w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                      value={filters.minSeats}
                      onChange={(e) => {
                        setFilters({ ...filters, minSeats: e.target.value });
                        setCurrentPage(1);
                      }}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="block w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                      value={filters.maxSeats}
                      onChange={(e) => {
                        setFilters({ ...filters, maxSeats: e.target.value });
                        setCurrentPage(1);
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Min Range (nm)
                  </label>
                  <input
                    type="number"
                    placeholder="Minimum range"
                    className="block w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                    value={filters.minRange}
                    onChange={(e) => {
                      setFilters({ ...filters, minRange: e.target.value });
                      setCurrentPage(1);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    className="block w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                    value={filters.status}
                    onChange={(e) => {
                      setFilters({ ...filters, status: e.target.value });
                      setCurrentPage(1);
                    }}
                  >
                    <option value="">All Statuses</option>
                    <option value="APPROVED">Available</option>
                    <option value="BOOKED">Booked</option>
                    <option value="PENDING">Pending</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-4 border-blue-200 animate-spin"></div>
              <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin absolute top-0"></div>
            </div>
          </div>
        ) : filteredFleets.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-12 text-center max-w-2xl mx-auto">
            <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <Rocket className="text-blue-600" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No Aircraft Found
            </h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any aircraft matching your criteria. Try
              adjusting your search or filters.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-md text-sm font-medium"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-6">
              {currentItems.map((fleet) => (
                <div
                  key={fleet.id}
                  className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Image Section */}
                      <div className="w-full sm:w-64 h-48 flex-shrink-0 rounded-xl overflow-hidden relative">
                        <img
                          src={
                            fleet.exteriorImages[0] ||
                            "https://via.placeholder.com/256x192?text=No+Image"
                          }
                          alt={fleet.jetName}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                        {fleet.isBoosted &&
                          new Date(fleet.end_date) > new Date() && (
                            <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-black/80 to-transparent p-3">
                              <div className="flex items-center">
                                <Rocket
                                  size={16}
                                  className="text-yellow-400 mr-2"
                                />
                                <span className="text-white text-sm font-medium">
                                  Boosted until{" "}
                                  {new Date(
                                    fleet.end_date
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          )}
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 min-w-0">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                              {fleet.jetName}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                  fleet.status === "APPROVED"
                                    ? "bg-green-100 text-green-800"
                                    : fleet.status === "BOOKED"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {fleet.status === "APPROVED"
                                  ? "Available"
                                  : fleet.status === "BOOKED"
                                  ? "Booked"
                                  : "Pending"}
                              </span>
                              {fleet.isBoosted &&
                                new Date(fleet.end_date) > new Date() && (
                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                    Boosted
                                  </span>
                                )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">
                              {formatPrice(fleet.pricePerHour)}
                            </div>
                            <div className="text-sm text-gray-500">
                              per hour
                            </div>
                          </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="mr-2 h-5 w-5 text-gray-400" />
                            <div>
                              <div className="text-sm font-medium">
                                Manufacturer
                              </div>
                              <div className="text-sm">
                                {fleet.manufacturer}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Gauge className="mr-2 h-5 w-5 text-gray-400" />
                            <div>
                              <div className="text-sm font-medium">Type</div>
                              <div className="text-sm">
                                {fleet.aircraftType}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="mr-2 h-5 w-5 text-gray-400" />
                            <div>
                              <div className="text-sm font-medium">
                                Home Base
                              </div>
                              <div className="text-sm">{fleet.homeBase}</div>
                            </div>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="mr-2 h-5 w-5 text-gray-400" />
                            <div>
                              <div className="text-sm font-medium">Range</div>
                              <div className="text-sm">
                                {formatRange(fleet.maximumRange)}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                          <Link
                            to={`/charter/${fleet.id}`}
                            className="inline-flex items-center px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-900 transition-colors"
                          >
                            View Details
                            <ChevronRight size={16} className="ml-1" />
                          </Link>
                          <div className="flex space-x-2">
                            {/* Status-specific actions */}
                            {fleet.status === "BOOKED" ? (
                              <button
                                onClick={() =>
                                  updateFleetStatus(fleet.id, "APPROVED")
                                }
                                disabled={updatingStatusId === fleet.id}
                                className="flex items-center px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                title="Mark as Available"
                              >
                                {updatingStatusId === fleet.id ? (
                                  <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                                ) : (
                                  <RefreshCw size={16} className="mr-2" />
                                )}
                                Mark Available
                              </button>
                            ) : fleet.status === "APPROVED" ? (
                              <button
                                onClick={() =>
                                  updateFleetStatus(fleet.id, "BOOKED")
                                }
                                disabled={updatingStatusId === fleet.id}
                                className="flex items-center px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                title="Mark as Booked"
                              >
                                {updatingStatusId === fleet.id ? (
                                  <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                                ) : (
                                  <CheckCircle size={16} className="mr-2" />
                                )}
                                Mark Booked
                              </button>
                            ) : // For PENDING status, no status change buttons are shown
                            null}

                            {/* Common actions */}
                            <Link
                              to={`/broker/fleet/edit/${fleet.id}`}
                              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit aircraft"
                            >
                              <Edit size={20} />
                            </Link>
                            <button
                              onClick={() => handleDelete(fleet.id)}
                              disabled={deletingId === fleet.id}
                              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                              title="Delete aircraft"
                            >
                              {deletingId === fleet.id ? (
                                <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <Trash2 size={20} />
                              )}
                            </button>
                            <button
                              onClick={() => initiateBoost(fleet.id)}
                              disabled={
                                boostingId === fleet.id ||
                                (fleet.isBoosted &&
                                  new Date(fleet.end_date) > new Date())
                              }
                              className={`p-2 rounded-lg transition-colors ${
                                fleet.isBoosted &&
                                new Date(fleet.end_date) > new Date()
                                  ? "text-blue-600 bg-blue-50"
                                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                              }`}
                              title={
                                fleet.isBoosted &&
                                new Date(fleet.end_date) > new Date()
                                  ? `Boosted until ${new Date(
                                      fleet.end_date
                                    ).toLocaleDateString()}`
                                  : "Boost aircraft"
                              }
                            >
                              {boostingId === fleet.id ? (
                                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <Rocket size={20} />
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
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg bg-white shadow-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === pageNum
                            ? "bg-blue-600 text-white shadow-md"
                            : "bg-white text-gray-700 shadow-md hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <span className="px-3 py-2 text-gray-600">...</span>
                  )}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <button
                      onClick={() => paginate(totalPages)}
                      className="px-4 py-2 rounded-lg bg-white shadow-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {totalPages}
                    </button>
                  )}
                  <button
                    onClick={() =>
                      paginate(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg bg-white shadow-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Boost Modal */}
        {showBoostModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
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
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {paymentStatus === "processing" && (
                <div className="mb-4 sm:mb-6 p-4 sm:p-6 bg-blue-50 rounded-xl text-center">
                  <div className="relative mx-auto w-12 h-12 mb-4">
                    <div className="w-12 h-12 rounded-full border-4 border-blue-200 animate-spin"></div>
                    <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin absolute top-0"></div>
                  </div>
                  <p className="text-sm font-medium text-blue-900">
                    Processing Payment...
                  </p>
                </div>
              )}

              {paymentStatus === "success" && solscanLink && (
                <div className="mb-4 sm:mb-6 p-4 sm:p-6 bg-green-50 rounded-xl text-center">
                  <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-green-900">
                    Payment Successful!{" "}
                    <a
                      href={solscanLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 hover:underline"
                    >
                      View on Solscan
                    </a>
                  </p>
                </div>
              )}

              {paymentStatus === "error" && (
                <div className="mb-4 sm:mb-6 p-4 sm:p-6 bg-red-50 rounded-xl text-center">
                  <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <X className="h-6 w-6 text-red-600" />
                  </div>
                  <p className="text-sm font-medium text-red-900">
                    Payment Failed. Please try again.
                  </p>
                </div>
              )}

              <div className="space-y-3 sm:space-y-4">
                {boostPlans.map((plan) => (
                  <div
                    key={plan.name}
                    onClick={() => setSelectedPlan(plan)}
                    className={`border-2 rounded-xl p-4 sm:p-6 cursor-pointer transition-all duration-200 ${
                      selectedPlan?.name === plan.name
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0">
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                          {plan.name}
                        </h3>
                        <div className="flex items-center mt-1 text-sm text-gray-600">
                          <Clock className="mr-2 h-4 w-4" />
                          {plan.duration}
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="text-base sm:text-lg font-bold text-gray-900">
                          {plan.priceSol} SOL
                        </div>
                        <div className="text-sm text-gray-600">
                          ≈ ${plan.priceUsd}
                        </div>
                      </div>
                    </div>
                    <ul className="mt-3 sm:mt-4 space-y-1 sm:space-y-2">
                      {plan.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <CheckCircle className="mr-2 h-4 w-4 text-blue-600 flex-shrink-0" />
                          <span className="text-xs sm:text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-end gap-3">
                <button
                  onClick={() => {
                    setShowBoostModal(false);
                    setSelectedPlan(null);
                    setSelectedFleetId(null);
                    setPaymentStatus("idle");
                    setSolscanLink(null);
                  }}
                  className="w-full sm:w-auto px-6 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                {paymentStatus === "success" ? (
                  <button
                    onClick={handleConfirmBoost}
                    className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
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
                    className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {!publicKey ? "Connect Wallet" : "Pay with SOL"}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CharterFleet;
