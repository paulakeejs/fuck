import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  Edit,
  Trash2,
  Star,
  Search,
  SlidersHorizontal,
  X,
  MapPin,
  Bed,
  Users,
  Ruler,
  DollarSign,
  Plus,
  ChevronRight,
  Clock,
  Home,
  Tv,
  Utensils,
  ParkingCircle,
  Waves,
  Shield,
} from "lucide-react";
import destinationApi from "./api";
import { FaWheelchair } from "react-icons/fa";

interface ExtraFee {
  id: string;
  name: string;
  amount: number;
  roomTypeId: string;
  createdAt: string;
}

interface Image {
  id: string;
  url: string;
  description: string | null;
  roomTypeId: string;
  createdAt: string;
}

interface Room {
  id: string;
  name: string;
  description: string;
  size: number;
  occupancy: number;
  bedConfiguration: string;
  basePrice: number;
  minimumStay: number;
  currentLocation: string;
  status: string;
  amenities: string[];
  images: Image[];
  views: number;
  rating: number;
  totalRooms: number;
  accessibilityFeatures: string[];
  bathroomFeatures: string[];
  bedroomFeatures: string[];
  entertainment: string[];
  familyFriendly: string[];
  foodAndDrink: string[];
  moreFeatures: string[];
  outdoorSpace: string[];
  safetyFeatures: string[];
  freebies: string[];
  extraFees: ExtraFee[];
  createdAt: string;
  updatedAt: string;
}

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    minSize: "",
    minOccupancy: "",
    location: "",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const res = await destinationApi.get("/all");
      if (res.data.success) {
        const transformedRooms = res.data.data.map((room: any) => ({
          ...room,
          views: room.views || 0,
          rating: room.rating || 0,
          currentLocation: room.currentLocation || "Unknown",
          status: room.status || "Available",
        }));
        setRooms(transformedRooms);
      } else {
        throw new Error(res.data.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch rooms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      const response = await destinationApi.delete(`/delete/${id}`);
      if (response.data.success) {
        setRooms((prev) => prev.filter((room) => room.id !== id));
        toast.success("Room deleted successfully");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete room");
    } finally {
      setDeletingId(null);
    }
  };

  const openModal = (room: Room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRoom(null);
  };

  // Filter and search logic
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchesSearch =
        room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.currentLocation.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilters =
        (filters.minPrice === "" ||
          room.basePrice >= Number(filters.minPrice)) &&
        (filters.maxPrice === "" ||
          room.basePrice <= Number(filters.maxPrice)) &&
        (filters.minSize === "" || room.size >= Number(filters.minSize)) &&
        (filters.minOccupancy === "" ||
          room.occupancy >= Number(filters.minOccupancy)) &&
        (filters.location === "" ||
          room.currentLocation
            .toLowerCase()
            .includes(filters.location.toLowerCase()));

      return matchesSearch && matchesFilters;
    });
  }, [rooms, searchTerm, filters]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const resetFilters = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      minSize: "",
      minOccupancy: "",
      location: "",
    });
    setSearchTerm("");
    setCurrentPage(1);
  };

  const locations = useMemo(() => {
    const uniqueLocations = new Set(rooms.map((room) => room.currentLocation));
    return Array.from(uniqueLocations).sort();
  }, [rooms]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatViews = (views: number) => {
    return views.toLocaleString();
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  const renderFeatureIcons = (featureType: string) => {
    switch (featureType) {
      case "amenities":
        return <Home className="h-4 w-4 mr-2" />;
      case "bathroomFeatures":
        return <Waves className="h-4 w-4 mr-2" />;
      case "foodAndDrink":
        return <Utensils className="h-4 w-4 mr-2" />;
      case "entertainment":
        return <Tv className="h-4 w-4 mr-2" />;
      case "outdoorSpace":
        return <ParkingCircle className="h-4 w-4 mr-2" />;
      case "safetyFeatures":
        return <Shield className="h-4 w-4 mr-2" />;
      case "familyFriendly":
        return <Users className="h-4 w-4 mr-2" />;
      case "accessibilityFeatures":
        return <FaWheelchair className="h-4 w-4 mr-2" />;
      default:
        return <Home className="h-4 w-4 mr-2" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Luxury Rooms & Suites
          </h1>
          <p className="mt-1 text-sm sm:text-base text-gray-600">
            Showing {filteredRooms.length} premium accommodation
            {filteredRooms.length !== 1 ? "s" : ""}
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
                placeholder="Search by name, description, or location..."
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
                <h3 className="font-medium text-gray-900">Filter Rooms</h3>
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
                    Price Range
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
                    Min Size (sqm)
                  </label>
                  <input
                    type="number"
                    placeholder="Minimum size"
                    className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all"
                    value={filters.minSize}
                    onChange={(e) => {
                      setFilters({ ...filters, minSize: e.target.value });
                      setCurrentPage(1);
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Occupancy
                  </label>
                  <input
                    type="number"
                    placeholder="Minimum guests"
                    className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all"
                    value={filters.minOccupancy}
                    onChange={(e) => {
                      setFilters({ ...filters, minOccupancy: e.target.value });
                      setCurrentPage(1);
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 rounded-lg transition-all"
                    value={filters.location}
                    onChange={(e) => {
                      setFilters({ ...filters, location: e.target.value });
                      setCurrentPage(1);
                    }}
                  >
                    <option value="">All Locations</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
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

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600"></div>
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center max-w-2xl mx-auto">
            <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
              <Bed className="text-gray-600" size={28} />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">
              No Matching Rooms Found
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
              {currentRooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <div className="w-full sm:w-56 h-48 flex-shrink-0 rounded-lg overflow-hidden relative">
                        <img
                          src={
                            room.images[0]?.url ||
                            "https://via.placeholder.com/224x192?text=No+Image"
                          }
                          alt={room.name}
                          className="w-full h-full object-cover"
                        />
                        {room.rating > 0 && (
                          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center text-xs font-semibold">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                            {formatRating(room.rating)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div className="min-w-0">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                              {room.name}
                            </h3>
                            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                              <div className="flex items-center text-sm text-gray-600">
                                <DollarSign className="mr-1 h-4 w-4" />
                                {formatPrice(room.basePrice)}/night
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Ruler className="mr-1 h-4 w-4" />
                                {room.size} sqm
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Users className="mr-1 h-4 w-4" />
                                Sleeps {room.occupancy}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <MapPin className="mr-1 h-4 w-4" />
                                {room.currentLocation}
                              </div>
                            </div>
                            <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                              {room.description}
                            </p>
                          </div>
                          <div className="text-right pl-2">
                            <span
                              className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                                room.status === "Available"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {room.status || "Available"}
                            </span>
                            <div className="text-xs text-gray-500 mt-2">
                              {formatViews(room.views)} views
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <button
                            onClick={() => openModal(room)}
                            className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
                          >
                            View details{" "}
                            <ChevronRight size={16} className="ml-1" />
                          </button>
                          <div className="flex space-x-2">
                            <Link
                              to={`/l-h/rooms/edit/${room.id}`}
                              className="inline-flex items-center p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Edit room"
                            >
                              <Edit size={18} />
                            </Link>
                            <button
                              onClick={() => handleDelete(room.id)}
                              disabled={deletingId === room.id}
                              className="inline-flex items-center p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                              title="Delete room"
                            >
                              {deletingId === room.id ? (
                                <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <Trash2 size={18} />
                              )}
                            </button>
                            <button
                              className="inline-flex items-center p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Feature room"
                            >
                              <Star size={18} />
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
                  {Math.min(indexOfLastItem, filteredRooms.length)} of{" "}
                  {filteredRooms.length} results
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
                            ? "bg-black text-white border-black"
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
      </div>

      <Link
        to="/rooms/add"
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-all hover:shadow-xl"
        title="Add new room"
      >
        <Plus size={24} />
      </Link>

      {/* Room Details Modal */}
      {showModal && selectedRoom && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">{selectedRoom.name}</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {/* Image Gallery */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {selectedRoom.images.length > 0 ? (
                  selectedRoom.images.map((image, index) => (
                    <div key={image.id} className="rounded-lg overflow-hidden">
                      <img
                        src={image.url}
                        alt={`${selectedRoom.name} ${index + 1}`}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 bg-gray-100 rounded-lg h-64 flex items-center justify-center text-gray-500">
                    No images available
                  </div>
                )}
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Overview</h3>
                  <p className="text-gray-700 mb-4">
                    {selectedRoom.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-gray-600 mr-2" />
                      <span>
                        <span className="font-medium">Price:</span>{" "}
                        {formatPrice(selectedRoom.basePrice)} per night
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Ruler className="h-5 w-5 text-gray-600 mr-2" />
                      <span>
                        <span className="font-medium">Size:</span>{" "}
                        {selectedRoom.size} sqm
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-gray-600 mr-2" />
                      <span>
                        <span className="font-medium">Occupancy:</span>{" "}
                        {selectedRoom.occupancy} guests
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Bed className="h-5 w-5 text-gray-600 mr-2" />
                      <span>
                        <span className="font-medium">Bed Configuration:</span>{" "}
                        {selectedRoom.bedConfiguration}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-600 mr-2" />
                      <span>
                        <span className="font-medium">Location:</span>{" "}
                        {selectedRoom.currentLocation}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-600 mr-2" />
                      <span>
                        <span className="font-medium">Minimum Stay:</span>{" "}
                        {selectedRoom.minimumStay} night
                        {selectedRoom.minimumStay !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Features</h3>
                  <div className="space-y-4">
                    {selectedRoom.amenities.length > 0 && (
                      <div>
                        <h4 className="font-medium flex items-center mb-2">
                          {renderFeatureIcons("amenities")} Amenities
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedRoom.amenities.map((amenity, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedRoom.bathroomFeatures.length > 0 && (
                      <div>
                        <h4 className="font-medium flex items-center mb-2">
                          {renderFeatureIcons("bathroomFeatures")} Bathroom
                          Features
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedRoom.bathroomFeatures.map(
                            (feature, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                              >
                                {feature}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {selectedRoom.foodAndDrink.length > 0 && (
                      <div>
                        <h4 className="font-medium flex items-center mb-2">
                          {renderFeatureIcons("foodAndDrink")} Food & Drink
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedRoom.foodAndDrink.map((item, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedRoom.entertainment.length > 0 && (
                      <div>
                        <h4 className="font-medium flex items-center mb-2">
                          {renderFeatureIcons("entertainment")} Entertainment
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedRoom.entertainment.map((item, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedRoom.outdoorSpace.length > 0 && (
                  <div>
                    <h4 className="font-medium flex items-center mb-2">
                      {renderFeatureIcons("outdoorSpace")} Outdoor Space
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedRoom.outdoorSpace.map((item, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedRoom.safetyFeatures.length > 0 && (
                  <div>
                    <h4 className="font-medium flex items-center mb-2">
                      {renderFeatureIcons("safetyFeatures")} Safety Features
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedRoom.safetyFeatures.map((item, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedRoom.familyFriendly.length > 0 && (
                  <div>
                    <h4 className="font-medium flex items-center mb-2">
                      {renderFeatureIcons("familyFriendly")} Family Friendly
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedRoom.familyFriendly.map((item, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedRoom.accessibilityFeatures.length > 0 && (
                  <div>
                    <h4 className="font-medium flex items-center mb-2">
                      {renderFeatureIcons("accessibilityFeatures")}{" "}
                      Accessibility
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedRoom.accessibilityFeatures.map((item, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Extra Fees */}
              {selectedRoom.extraFees.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">
                    Additional Fees
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b">
                          <th className="pb-2">Fee Type</th>
                          <th className="pb-2 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedRoom.extraFees.map((fee) => (
                          <tr key={fee.id} className="border-b">
                            <td className="py-2">{fee.name}</td>
                            <td className="py-2 text-right">
                              {formatPrice(fee.amount)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Other Information */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Bedroom Features
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedRoom.bedroomFeatures.length > 0 ? (
                      selectedRoom.bedroomFeatures.map((feature, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">
                        No bedroom features listed
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Freebies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedRoom.freebies.length > 0 ? (
                      selectedRoom.freebies.map((item, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                        >
                          {item}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">No freebies listed</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
