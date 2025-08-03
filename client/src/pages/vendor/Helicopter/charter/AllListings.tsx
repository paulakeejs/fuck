import { useEffect, useState, useMemo } from "react";
import hApi from "../HApi";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Pencil,
  Trash2,
  CalendarCheck,
  Plus,
  Loader2,
  Rocket,
  X,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import EmptyState from "@/components/EmptyState";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

interface Listing {
  id: string;
  model: string;
  pricePerHour: number;
  location: string;
  status: "APPROVED" | "inactive" | "pending" | "BOOKED";
  imageUrls: string[];
  capacity: number;
  year: number;
  sponsored?: boolean;
  sponsoredType?: "Basic Boost" | "Pro Boost" | "Elite Boost";
}

interface BoostPlan {
  name: "Basic Boost" | "Pro Boost" | "Elite Boost";
  duration: string;
  priceSol: number;
  priceUsd: number;
  features: string[];
}

function HelicopterCharterListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState<string | null>(null);
  const [isMarkingAvailable, setIsMarkingAvailable] = useState<string | null>(
    null
  );
  const [isBoosting, setIsBoosting] = useState<string | null>(null);
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
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setIsLoading(true);
        const response = await hApi.get("/helicopters/charter/all", {
          params: {
            vendorId: localStorage.getItem("vendorId"),
          },
        });

        console.log("Raw API Response:", response.data);

        if (response.data.success) {
          const listingsData = Array.isArray(response.data.listings)
            ? response.data.listings
            : [response.data.listings];

          console.log("Processed listings:", listingsData);
          setListings(listingsData);
        } else {
          throw new Error(response.data.message || "Failed to fetch listings");
        }
      } catch (error: any) {
        console.error("Error fetching listings:", error);
        toast.error(error.message || "Failed to load listings");
      } finally {
        setIsLoading(false);
      }
    };
    fetchListings();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(id);
      const response = await hApi.delete(`/charter/${id}`);
      if (response.data.success) {
        setListings(listings.filter((listing) => listing.id !== id));
        toast.success("Listing deleted successfully");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleMarkAsBooked = async (id: string) => {
    try {
      setIsBooking(id);
      const response = await hApi.put(`/charter/${id}/book`, {
        status: "BOOKED",
      });
      if (response.data.success) {
        setListings(
          listings.map((listing) =>
            listing.id === id ? { ...listing, status: "BOOKED" } : listing
          )
        );
        toast.success("Helicopter marked as booked");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsBooking(null);
    }
  };

  const handleMarkAsAvailable = async (id: string) => {
    try {
      setIsMarkingAvailable(id);
      const response = await hApi.put(`/charter/${id}/available`, {
        status: "APPROVED",
      });
      if (response.data.success) {
        setListings(
          listings.map((listing) =>
            listing.id === id ? { ...listing, status: "APPROVED" } : listing
          )
        );
        toast.success("Helicopter marked as available");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsMarkingAvailable(null);
    }
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
      setIsBoosting(selectedListingId);
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

      const response = await hApi.put(`/charter/${selectedListingId}/boost`, {
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
      }
    } catch (err: any) {
      setPaymentStatus("error");
      toast.error(err.message || "Failed to boost listing");
    } finally {
      setIsBoosting(null);
      setShowBoostModal(false);
      setSelectedPlan(null);
      setSelectedListingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return (
          <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            Available
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            Inactive
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            Pending Approval
          </Badge>
        );
      case "BOOKED":
        return (
          <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            Booked
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Temporarily disable filters for debugging
  const filteredListings = useMemo(() => {
    console.log("All available listings:", listings);
    return listings; // Return all listings without filtering for now
  }, [listings]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Helicopter Fleet Management
              </h1>
              <p className="text-base text-gray-600 mt-2">
                Manage your charter listings and boost visibility
              </p>
            </div>
            <Button
              onClick={() => navigate("/h-broker/charters/add")}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="mr-2 h-5 w-5" />
              Add New Helicopter
            </Button>
          </div>

          {/* Temporarily hide filters while debugging */}
          {/* <div className="mt-8 space-y-4">
            ... existing filters code ...
          </div> */}
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card
                key={i}
                className="overflow-hidden border-0 shadow-lg bg-white/50 backdrop-blur-sm"
              >
                <div className="p-6 space-y-4">
                  <Skeleton className="h-48 w-full rounded-xl" />
                  <div className="space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-20 rounded-full" />
                      <Skeleton className="h-8 w-20 rounded-full" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : filteredListings.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredListings.map((listing) => (
              <Card
                key={listing.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/50 backdrop-blur-sm"
              >
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={listing.imageUrls[0]}
                      alt={listing.model}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      {getStatusBadge(listing.status)}
                    </div>
                    {listing.sponsored && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                          {listing.sponsoredType}
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {listing.model}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {listing.year}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-2">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-sm">{listing.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        <span className="text-sm">
                          {listing.capacity} seats
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600 col-span-2">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-sm font-medium">
                          ${Number(listing.pricePerHour).toLocaleString()}/hr
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleBoost(listing.id)}
                        disabled={
                          isBoosting === listing.id ||
                          listing.status !== "APPROVED" ||
                          listing.sponsored
                        }
                        className="flex-1 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 border-purple-200 hover:from-purple-100 hover:to-purple-200 disabled:opacity-50"
                      >
                        {isBoosting === listing.id ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Rocket className="h-4 w-4 mr-2" />
                        )}
                        {listing.sponsored ? "Boosted" : "Boost"}
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          navigate(`/h-broker/charter/edit/${listing.id}`)
                        }
                        className="flex-1 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-200 hover:from-blue-100 hover:to-blue-200"
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Button>

                      {listing.status === "APPROVED" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkAsBooked(listing.id)}
                          disabled={isBooking === listing.id}
                          className="flex-1 bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 border-amber-200 hover:from-amber-100 hover:to-amber-200"
                        >
                          {isBooking === listing.id ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <CalendarCheck className="h-4 w-4 mr-2" />
                          )}
                          Mark Booked
                        </Button>
                      ) : listing.status === "BOOKED" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkAsAvailable(listing.id)}
                          disabled={isMarkingAvailable === listing.id}
                          className="flex-1 bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 border-emerald-200 hover:from-emerald-100 hover:to-emerald-200"
                        >
                          {isMarkingAvailable === listing.id ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <CalendarCheck className="h-4 w-4 mr-2" />
                          )}
                          Mark Available
                        </Button>
                      ) : null}

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-red-50 to-red-100 text-red-700 border-red-200 hover:from-red-100 hover:to-red-200"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-xl font-semibold text-gray-900">
                              Confirm Deletion
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-600">
                              This will permanently remove the helicopter from
                              your listings and cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="gap-2">
                            <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-700">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(listing.id)}
                              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                              disabled={isDeleting === listing.id}
                            >
                              {isDeleting === listing.id ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : null}
                              Delete Listing
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Helicopters Found"
            description="There are no helicopter listings available at the moment."
            action={() => (
              <Button
                onClick={() => navigate("/vendor/helicopter/charter/create")}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="mr-2 h-5 w-5" />
                Add Your First Helicopter
              </Button>
            )}
          />
        )}
      </div>

      {/* Boost Modal */}
      {showBoostModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full p-8 shadow-2xl border-0">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Boost Your Listing
              </h3>
              <button
                onClick={() => setShowBoostModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              {boostPlans.map((plan) => (
                <div
                  key={plan.name}
                  onClick={() => setSelectedPlan(plan)}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-200 ${
                    selectedPlan?.name === plan.name
                      ? "bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-200"
                      : "bg-white border-2 border-gray-100 hover:border-purple-200"
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        {plan.name}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {plan.duration}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">
                        {plan.priceSol} SOL
                      </p>
                      <p className="text-sm text-gray-500">≈${plan.priceUsd}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <Rocket className="mr-2 text-purple-500" size={14} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8">
              {solscanLink && (
                <a
                  href={solscanLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center mb-4"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  View transaction on Solscan
                </a>
              )}

              <button
                onClick={handleConfirmBoost}
                disabled={!selectedPlan || paymentStatus === "processing"}
                className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                  !selectedPlan || paymentStatus === "processing"
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl"
                }`}
              >
                {paymentStatus === "processing" ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Processing Payment...
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

export default HelicopterCharterListings;
