import { useEffect, useState } from "react";
import { toast } from "sonner";
import carApi from "./api";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Grid,
  List,
  Trash2,
  Edit,
  Rocket,
  CalendarCheck,
  X,
  Clock,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  carType?: string;
  color?: string;
  interiorColor?: string;
  seats?: number;
  doors?: number;
  transmission?: string;
  driveType?: string;
  fuel?: string;
  condition?: string;
  price: number;
  weeklyDiscount?: number;
  monthlyDiscount?: number;
  deposit?: number;
  vin?: string;
  licensePlate: string;
  deliveryOption?: string;
  insuranceInfo?: string;
  rentalTerms?: string;
  description?: string;
  features?: string[];
  isFeatured?: boolean;
  mileage?: number;
  engineSize?: string;
  horsepower?: number;
  acceleration?: number;
  topSpeed?: number;
  images: string[];
  location?: string;
  vendorId?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  sponsored?: boolean;
  endDate?: string;
}

function AllCarListings() {
  const navigate = useNavigate();
  const vendor = useSelector((state: any) => state.vendor.vendor);
  const [data, setData] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "available" | "booked"
  >("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [carToDelete, setCarToDelete] = useState<string | null>(null);
  const [showBoostModal, setShowBoostModal] = useState(false);
  const [boostingCarId, setBoostingCarId] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<number | null>(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [solPrice, setSolPrice] = useState<number>(100);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const [solscanLink, setSolscanLink] = useState<string | null>(null);

  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const solPriceMap = {
    7: 0.25,
    14: 0.6,
    30: 1.2,
  };

  const fetchCars = async () => {
    setLoading(true);
    try {
      const response = await carApi.get("/all", {
        params: { vendorId: vendor.id },
      });
      if (response.data.success) {
        setData(response.data.cars);
      } else throw new Error(response.data.message);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch cars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (vendor?.id) {
      fetchCars();
    }
  }, [vendor]);

  useEffect(() => {
    const fetchRecipient = async () => {
      try {
        const response = await carApi.get("/payment/recipient");
        if (response.data.success) {
          setWalletAddress(response.data.data.wallet);
        }
      } catch (error) {
        setWalletAddress("");
      }
    };
    const fetchSolPrice = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
        );
        const data = await response.json();
        setSolPrice(data.solana.usd);
      } catch {
        setSolPrice(100);
      }
    };
    fetchRecipient();
    fetchSolPrice();
    const priceInterval = setInterval(fetchSolPrice, 30000);
    return () => clearInterval(priceInterval);
  }, []);

  const filteredCars = data.filter((car) => {
    const matchesSearch = `${car.brand} ${car.model} ${car.licensePlate}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const carStatus = car.status?.toUpperCase();
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "available" && carStatus === "APPROVED") ||
      (statusFilter === "booked" && carStatus === "BOOKED");
    return matchesSearch && matchesStatus;
  });

  const handleBoost = (id: string) => {
    setBoostingCarId(id);
    setShowBoostModal(true);
    setSelectedDays(null);
    setPaymentStatus("idle");
    setSolscanLink(null);
  };

  const handleBoostPayment = async () => {
    if (!publicKey || !selectedDays || !boostingCarId) {
      toast.error("Please select a duration and connect your wallet");
      return;
    }
    if (!walletAddress) {
      toast.error("Payment recipient address not available");
      return;
    }
    try {
      setPaymentStatus("processing");
      const recipientPubkey = new PublicKey(walletAddress);
      const lamports = Math.floor(
        solPriceMap[selectedDays as 7 | 14 | 30] * LAMPORTS_PER_SOL
      );
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubkey,
          lamports,
        })
      );
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "confirmed");
      setPaymentStatus("success");
      setSolscanLink(`https://solscan.io/tx/${signature}?cluster=devnet`);
    } catch (error: any) {
      setPaymentStatus("error");
      toast.error(error.message || "Failed to process payment");
    }
  };

  const handleConfirmBoost = async () => {
    if (!boostingCarId || !selectedDays) return;
    if (paymentStatus !== "success" || !solscanLink) {
      toast.error("You must complete payment before confirming boost.");
      return;
    }
    try {
      const response = await carApi.put(`/boost/${boostingCarId}`, {
        days: selectedDays,
        transactionSignature: solscanLink,
      });
      if (response.data.success) {
        toast.success("Listing boosted successfully!");
        fetchCars();
        setShowBoostModal(false);
        setBoostingCarId(null);
        setSelectedDays(null);
        setPaymentStatus("idle");
        setSolscanLink(null);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to boost listing");
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/lux/listings/edit/${id}`);
  };

  const handleDelete = async () => {
    if (!carToDelete) return;
    try {
      const response = await carApi.delete(`/${carToDelete}`);
      if (response.data.success) {
        toast("Listing deleted successfully!");
        setData(data.filter((car) => car.id !== carToDelete));
        setDeleteDialogOpen(false);
        setCarToDelete(null);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      toast(error.message || "Failed to delete listing");
    }
  };

  const handleMarkBooked = async (id: string) => {
    try {
      const car = data.find((c) => c.id === id);
      if (!car) return;
      const currentStatus = car.status?.toUpperCase();
      const newStatus = currentStatus === "BOOKED" ? "APPROVED" : "BOOKED";
      const response = await carApi.put(`/book/${id}`, {
        newStatus,
      });
      if (response.data.success) {
        toast.success(
          `Listing marked as ${
            newStatus === "APPROVED" ? "available" : "booked"
          }!`
        );
        fetchCars(); // Refresh data
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update status");
    }
  };

  const openDeleteDialog = (id: string) => {
    setCarToDelete(id);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="p-6 w-[1000px] min-h-screen">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Car Listings</h1>
        <div className="flex gap-4 flex-wrap">
          <Button
            onClick={() => navigate("/lux/add")}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Add New Listing
          </Button>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("table")}
              aria-label="Table view"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by brand, model, or license plate..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-gray-300 focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(v) =>
            setStatusFilter(v as "all" | "available" | "booked")
          }
        >
          <SelectTrigger className="w-[180px] border-gray-300 focus:ring-2 focus:ring-primary/50">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="booked">Booked</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table View */}
      {viewMode === "table" && (
        <Card className="border-gray-200 shadow-lg rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="font-semibold text-gray-700">
                  Image
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Brand / Model
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Year
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Price ($/day)
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Sponsored
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array(5)
                  .fill(0)
                  .map((_, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <Skeleton className="w-20 h-14 rounded" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-16" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-48" />
                      </TableCell>
                    </TableRow>
                  ))
              ) : filteredCars.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    No listings found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredCars.map((car) => (
                  <TableRow
                    key={car.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell>
                      <img
                        src={
                          car.images?.[0] ||
                          "https://via.placeholder.com/80x60?text=No+Image"
                        }
                        alt={`${car.brand} ${car.model}`}
                        className="w-20 h-14 object-cover rounded-md border border-gray-200"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-gray-900">
                        {car.brand} {car.model}
                      </div>
                      <div className="text-xs text-gray-500">
                        {car.licensePlate || "N/A"}
                      </div>
                    </TableCell>
                    <TableCell>{car.year}</TableCell>
                    <TableCell>${car.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          car.status?.toUpperCase() === "APPROVED"
                            ? "bg-green-100 text-green-800"
                            : car.status?.toUpperCase() === "BOOKED"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {car.status?.toUpperCase() === "APPROVED"
                          ? "Available"
                          : car.status?.toUpperCase() === "BOOKED"
                          ? "Booked"
                          : "Pending Approval"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {car.sponsored ? (
                        <div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800">
                            Sponsored
                          </span>
                          {car.endDate && (
                            <p className="text-xs text-gray-500 mt-1">
                              Ends on{" "}
                              {new Date(car.endDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 flex-wrap">
                        <Button
                          size="sm"
                          onClick={() => handleBoost(car.id)}
                          disabled={car.status !== "APPROVED" || car.sponsored}
                          aria-label={`Boost ${car.brand} ${car.model}`}
                          className={`bg-purple-600 text-white hover:bg-purple-700 ${
                            car.status !== "APPROVED" || car.sponsored
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <Rocket className="h-4 w-4 mr-1" />
                          Boost
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(car.id)}
                          aria-label={`Edit ${car.brand} ${car.model}`}
                          className="text-blue-600 border-blue-600 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => openDeleteDialog(car.id)}
                          aria-label={`Delete ${car.brand} ${car.model}`}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkBooked(car.id)}
                          disabled={car.status?.toUpperCase() === "PENDING"}
                          aria-label={`Mark ${car.brand} ${car.model} as ${
                            car.status?.toUpperCase() === "BOOKED"
                              ? "available"
                              : "booked"
                          }`}
                          className={`${
                            car.status?.toUpperCase() === "BOOKED"
                              ? "text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700"
                              : "text-orange-600 border-orange-600 hover:bg-orange-50 hover:text-orange-700"
                          } ${
                            car.status?.toUpperCase() === "PENDING"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <CalendarCheck className="h-4 w-4 mr-1" />
                          Mark{" "}
                          {car.status?.toUpperCase() === "BOOKED"
                            ? "Available"
                            : "Booked"}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array(6)
              .fill(0)
              .map((_, idx) => (
                <Card key={idx} className="shadow-lg">
                  <CardContent className="p-4">
                    <Skeleton className="w-full h-40 rounded-md mb-4" />
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-1/4" />
                  </CardContent>
                </Card>
              ))
          ) : filteredCars.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-12">
              No listings found.
            </div>
          ) : (
            filteredCars.map((car) => (
              <Card
                key={car.id}
                className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-gray-200 rounded-xl"
              >
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <img
                      src={
                        car.images?.[0] ||
                        "https://via.placeholder.com/300x200?text=No+Image"
                      }
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-40 object-cover rounded-md border border-gray-200"
                    />
                    {car.sponsored && (
                      <div className="absolute top-2 right-2 text-right">
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2.5 py-0.5 rounded-full shadow">
                          Sponsored
                        </span>
                        {car.endDate && (
                          <p
                            className="text-white text-xs mt-1"
                            style={{ textShadow: "1px 1px 2px black" }}
                          >
                            Ends: {new Date(car.endDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {car.brand} {car.model}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {car.licensePlate || "N/A"} • {car.year}
                  </p>
                  <p className="text-base font-medium text-gray-900 mb-2">
                    ${car.price.toFixed(2)}/day
                  </p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-4 ${
                      car.status?.toUpperCase() === "APPROVED"
                        ? "bg-green-100 text-green-800"
                        : car.status?.toUpperCase() === "BOOKED"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {car.status?.toUpperCase() === "APPROVED"
                      ? "Available"
                      : car.status?.toUpperCase() === "BOOKED"
                      ? "Booked"
                      : "Pending"}
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      size="sm"
                      onClick={() => handleBoost(car.id)}
                      disabled={car.status !== "APPROVED" || car.sponsored}
                      aria-label={`Boost ${car.brand} ${car.model}`}
                      className={`bg-purple-600 text-white hover:bg-purple-700 ${
                        car.status !== "APPROVED" || car.sponsored
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <Rocket className="h-4 w-4 mr-1" />
                      Boost
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(car.id)}
                      aria-label={`Edit ${car.brand} ${car.model}`}
                      className="text-blue-600 border-blue-600 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => openDeleteDialog(car.id)}
                      aria-label={`Delete ${car.brand} ${car.model}`}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleMarkBooked(car.id)}
                      disabled={car.status?.toUpperCase() === "PENDING"}
                      aria-label={`Mark ${car.brand} ${car.model} as ${
                        car.status?.toUpperCase() === "BOOKED"
                          ? "available"
                          : "booked"
                      }`}
                      className={`${
                        car.status?.toUpperCase() === "BOOKED"
                          ? "text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700"
                          : "text-orange-600 border-orange-600 hover:bg-orange-50 hover:text-orange-700"
                      } ${
                        car.status?.toUpperCase() === "PENDING"
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <CalendarCheck className="h-4 w-4 mr-1" />
                      Mark{" "}
                      {car.status?.toUpperCase() === "BOOKED"
                        ? "Available"
                        : "Booked"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this car listing? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              aria-label="Confirm deletion"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Boost Modal */}
      {showBoostModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Boost Your Listing
              </h2>
              <button
                onClick={() => {
                  setShowBoostModal(false);
                  setSelectedDays(null);
                  setBoostingCarId(null);
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
              {[7, 14, 30].map((days) => (
                <div
                  key={days}
                  onClick={() => setSelectedDays(days)}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedDays === days
                      ? "border-gray-800 bg-gray-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="mr-1 h-4 w-4" />
                      {days} days
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        {solPriceMap[days as 7 | 14 | 30]} SOL
                      </div>
                      <div className="text-sm text-gray-600">
                        ≈ $
                        {Math.round(
                          solPriceMap[days as 7 | 14 | 30] * solPrice
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowBoostModal(false);
                  setSelectedDays(null);
                  setBoostingCarId(null);
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
                    !selectedDays ||
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
    </div>
  );
}

export default AllCarListings;
