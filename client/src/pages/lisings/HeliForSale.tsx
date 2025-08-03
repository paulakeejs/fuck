import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import axiosInstance from "@/lib/api";

interface Helicopter {
  id: string;
  helicopterName: string;
  helicopterType: string;
  manufacturer: string;
  yearOfManufacture: number;
  seatingCapacity: number;
  maximumRange: number;
  cruisingSpeed: number;
  condition: string;
  salePrice: number;
  exteriorImageUrls: string[];
  interiorImageUrls: string[];
  cabinFeatures: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  }[];
  baggageCapacity: string;
  totalFlightHours: number;
  avionics: string;
  status?: string;
  sponsored?: boolean;
  sponsoredType?: string;
}

function HeliCopterForSale() {
  const [listings, setListings] = useState<Helicopter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "price-asc" | "price-desc" | "year-desc" | "hours-asc"
  >("price-desc");
  const [activeFilters, setActiveFilters] = useState<{
    manufacturer: string[];
    condition: string[];
    type: string[];
  }>({
    manufacturer: [],
    condition: [],
    type: [],
  });
  const [gridView, setGridView] = useState<"grid" | "list">("grid");

  const helicopters = async () => {
    try {
      const response = await axiosInstance.get("/h-client/main/listings");
      if (response.data.success) {
        setListings(response.data.listings);
      } else {
        toast("Something went Wrong", {
          description: response.data.message,
        });
      }
    } catch (error: any) {
      toast("Something went Wrong", {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    helicopters();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const filteredListings = listings
    .filter((heli) => {
      const matchesSearch =
        heli.helicopterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        heli.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        heli.helicopterType.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesManufacturer =
        activeFilters.manufacturer.length === 0 ||
        activeFilters.manufacturer.includes(heli.manufacturer);

      const matchesCondition =
        activeFilters.condition.length === 0 ||
        activeFilters.condition.includes(heli.condition);

      const matchesType =
        activeFilters.type.length === 0 ||
        activeFilters.type.includes(heli.helicopterType);

      return (
        matchesSearch && matchesManufacturer && matchesCondition && matchesType
      );
    })
    .sort((a, b) => {
      // Prioritize sponsored listings
      if (a.sponsored && !b.sponsored) return -1;
      if (!a.sponsored && b.sponsored) return 1;
      // Within sponsored, prioritize Elite Boost
      if (a.sponsored && b.sponsored) {
        if (
          a.sponsoredType === "Elite Boost" &&
          b.sponsoredType !== "Elite Boost"
        )
          return -1;
        if (
          a.sponsoredType !== "Elite Boost" &&
          b.sponsoredType === "Elite Boost"
        )
          return 1;
      }
      // Apply sortBy criteria
      switch (sortBy) {
        case "price-asc":
          return a.salePrice - b.salePrice;
        case "price-desc":
          return b.salePrice - a.salePrice;
        case "year-desc":
          return b.yearOfManufacture - a.yearOfManufacture;
        case "hours-asc":
          return a.totalFlightHours - b.totalFlightHours;
        default:
          return 0;
      }
    });

  const uniqueManufacturers = Array.from(
    new Set(listings.map((h) => h.manufacturer))
  );
  const uniqueTypes = Array.from(
    new Set(listings.map((h) => h.helicopterType))
  );
  const uniqueConditions = Array.from(
    new Set(listings.map((h) => h.condition))
  );

  // Separate listings into sponsored and regular
  const sponsoredListings = filteredListings.filter((h) => h.sponsored);
  const regularListings = filteredListings.filter((h) => !h.sponsored);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-orange-500/20 rounded-full border-4 border-orange-500/50"></div>
          <p className="text-gray-600 text-lg font-medium tracking-wide">
            Loading Luxury Helicopters...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt- bg-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[100vh] sm:h-[100vh] bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden"
      >
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full filter blur-[128px] -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full filter blur-[128px] translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gray-200 rounded-full filter blur-[128px] -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          ></div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative z-20 h-full flex flex-col items-center justify-center px-6 md:px-12"
        >
          <div className="text-center max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-center mb-6 sm:mb-8">
              <div className="w-8 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
              <span className="mx-2 sm:mx-4 text-orange-500 tracking-[0.25em] sm:tracking-[0.5em] uppercase text-xs sm:text-sm font-light">
                Luxvana International Helicopters
              </span>
              <div className="w-8 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
            </div>
            <p className="text-3xl sm:text-5xl md:text-7xl font-extralight text-white mb-6 sm:mb-8 font-serif tracking-wider">
              Exceptional Aircraft
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light tracking-wider sm:tracking-widest leading-relaxed px-4">
              Experience unparalleled luxury and performance with our curated
              collection of premium helicopters
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-light text-white mb-2">
                  {listings.length}
                </span>
                <span className="text-sm text-gray-400 uppercase tracking-wider">
                  Available Aircraft
                </span>
              </div>
              <div className="hidden sm:block w-[1px] h-12 bg-gray-800"></div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-light text-white mb-2">
                  {uniqueManufacturers.length}
                </span>
                <span className="text-sm text-gray-400 uppercase tracking-wider">
                  Manufacturers
                </span>
              </div>
              <div className="hidden sm:block w-[1px] h-12 bg-gray-800"></div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-light text-white mb-2">
                  {uniqueTypes.length}
                </span>
                <span className="text-sm text-gray-400 uppercase tracking-wider">
                  Models
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="text-gray-500 text-sm tracking-widest uppercase mb-4">
            Scroll to Explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 border-2 border-gray-500 rounded-full flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 bg-orange-500 rounded-full"></div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-20">
        {/* Search and Filters Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-8 sm:mb-16"
        >
          {/* Search */}
          <div className="relative max-w-2xl mx-auto mb-8 sm:mb-12">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search collection..."
              className="w-full pl-12 pr-4 py-3 sm:py-4 bg-transparent border-b border-gray-200 focus:outline-none focus:border-orange-500 transition-all text-base sm:text-lg font-light tracking-wider"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Filters and Controls */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-8">
            <div className="flex items-center gap-4 w-full sm:w-auto justify-center">
              {/* Grid/List Toggle */}
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setGridView("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    gridView === "grid"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setGridView("list")}
                  className={`p-2 rounded-md transition-colors ${
                    gridView === "list"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-4 py-2 bg-gray-100 rounded-lg text-sm tracking-wider text-gray-700 focus:outline-none appearance-none cursor-pointer"
              >
                <option value="price-desc">Price: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="year-desc">Newest First</option>
                <option value="hours-asc">Lowest Hours First</option>
              </select>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {/* Manufacturer Filter */}
              <div className="relative group w-full sm:w-auto">
                <button className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-transparent border border-gray-200 text-sm tracking-widest uppercase hover:border-orange-500 transition-all flex items-center justify-between sm:justify-start gap-2">
                  <span>Manufacturer</span>
                  {activeFilters.manufacturer.length > 0 && (
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  )}
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-xl border border-gray-100 p-6 hidden group-hover:block z-10">
                  <div className="space-y-3">
                    {uniqueManufacturers.map((mfr) => (
                      <label
                        key={mfr}
                        className="flex items-center gap-3 group/item cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={activeFilters.manufacturer.includes(mfr)}
                          onChange={(e) => {
                            setActiveFilters((prev) => ({
                              ...prev,
                              manufacturer: e.target.checked
                                ? [...prev.manufacturer, mfr]
                                : prev.manufacturer.filter((m) => m !== mfr),
                            }));
                          }}
                          className="hidden"
                        />
                        <span className="w-4 h-4 border border-gray-200 group-hover/item:border-orange-500 transition-colors flex items-center justify-center">
                          {activeFilters.manufacturer.includes(mfr) && (
                            <span className="w-2 h-2 bg-orange-500"></span>
                          )}
                        </span>
                        <span className="text-sm tracking-wide group-hover/item:text-orange-500 transition-colors">
                          {mfr}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Condition Filter */}
              <div className="relative group w-full sm:w-auto">
                <button className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-transparent border border-gray-200 text-sm tracking-widest uppercase hover:border-orange-500 transition-all flex items-center justify-between sm:justify-start gap-2">
                  <span>Condition</span>
                  {activeFilters.condition.length > 0 && (
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  )}
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-xl border border-gray-100 p-6 hidden group-hover:block z-10">
                  <div className="space-y-3">
                    {uniqueConditions.map((condition) => (
                      <label
                        key={condition}
                        className="flex items-center gap-3 group/item cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={activeFilters.condition.includes(condition)}
                          onChange={(e) => {
                            setActiveFilters((prev) => ({
                              ...prev,
                              condition: e.target.checked
                                ? [...prev.condition, condition]
                                : prev.condition.filter((c) => c !== condition),
                            }));
                          }}
                          className="hidden"
                        />
                        <span className="w-4 h-4 border border-gray-200 group-hover/item:border-orange-500 transition-colors flex items-center justify-center">
                          {activeFilters.condition.includes(condition) && (
                            <span className="w-2 h-2 bg-orange-500"></span>
                          )}
                        </span>
                        <span className="text-sm tracking-wide group-hover/item:text-orange-500 transition-colors">
                          {condition}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Type Filter */}
              <div className="relative group w-full sm:w-auto">
                <button className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-transparent border border-gray-200 text-sm tracking-widest uppercase hover:border-orange-500 transition-all flex items-center justify-between sm:justify-start gap-2">
                  <span>Type</span>
                  {activeFilters.type.length > 0 && (
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  )}
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-xl border border-gray-100 p-6 hidden group-hover:block z-10">
                  <div className="space-y-3">
                    {uniqueTypes.map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-3 group/item cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={activeFilters.type.includes(type)}
                          onChange={(e) => {
                            setActiveFilters((prev) => ({
                              ...prev,
                              type: e.target.checked
                                ? [...prev.type, type]
                                : prev.type.filter((t) => t !== type),
                            }));
                          }}
                          className="hidden"
                        />
                        <span className="w-4 h-4 border border-gray-200 group-hover/item:border-orange-500 transition-colors flex items-center justify-center">
                          {activeFilters.type.includes(type) && (
                            <span className="w-2 h-2 bg-orange-500"></span>
                          )}
                        </span>
                        <span className="text-sm tracking-wide group-hover/item:text-orange-500 transition-colors">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              {(activeFilters.manufacturer.length > 0 ||
                activeFilters.condition.length > 0 ||
                activeFilters.type.length > 0 ||
                searchQuery) && (
                <button
                  onClick={() => {
                    setActiveFilters({
                      manufacturer: [],
                      condition: [],
                      type: [],
                    });
                    setSearchQuery("");
                  }}
                  className="text-sm tracking-widest uppercase text-orange-500 hover:text-orange-600 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="text-sm tracking-widest uppercase text-gray-500">
            {filteredListings.length === listings.length
              ? `Showing all ${listings.length} aircraft`
              : `Showing ${filteredListings.length} of ${listings.length} aircraft`}
          </p>
        </motion.div>

        {/* Sponsored Listings Section */}
        {sponsoredListings.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mb-12 sm:mb-24"
          >
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-block">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="w-12 h-[1px] bg-orange-500"></span>
                  <h2 className="text-3xl font-light text-gray-900 font-serif tracking-wide">
                    Featured Listings
                  </h2>
                  <span className="w-12 h-[1px] bg-orange-500"></span>
                </div>
                <p className="text-gray-500 tracking-wide">
                  Premium Featured Helicopters
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12">
              {sponsoredListings.map((helicopter, index) => (
                <motion.div
                  key={helicopter.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 1.2, duration: 0.5 }}
                  className="group relative"
                >
                  {/* Featured Ribbon - Elite Boost gets a special badge */}
                  {helicopter.sponsoredType === "Elite Boost" && (
                    <div className="absolute -top-3 -right-3 z-20 w-32 h-32 overflow-hidden">
                      <div className="absolute top-0 right-0 w-48 h-8 bg-gradient-to-r from-orange-500 to-amber-600 shadow-lg transform rotate-45 translate-x-12 translate-y-4 flex items-center justify-center">
                        <span className="text-xs font-bold text-white tracking-wider">
                          ELITE FEATURED
                        </span>
                      </div>
                    </div>
                  )}

                  <a
                    href={`/helicopter/${helicopter.id}`}
                    className="block bg-white rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 relative"
                  >
                    {/* Sponsored Tag */}
                    <div className="absolute top-4 left-4 z-10">
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${
                          helicopter.sponsoredType === "Elite Boost"
                            ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg"
                            : "bg-white text-orange-500 border border-orange-300"
                        }`}
                      >
                        {helicopter.sponsoredType === "Elite Boost"
                          ? "Elite Featured"
                          : "Featured"}
                      </div>
                    </div>

                    <div className="relative">
                      {/* Sold Overlay */}
                      {helicopter.status === "SOLD" && (
                        <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
                          <div className="bg-red-600 text-white px-8 py-3 rounded-lg shadow-xl">
                            <span className="text-xl font-bold tracking-wider uppercase">
                              Sold
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Main Image */}
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={helicopter.exteriorImageUrls[0]}
                          alt={helicopter.helicopterName}
                          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                            helicopter.status === "SOLD" ? "opacity-70" : ""
                          }`}
                        />
                      </div>

                      {/* Quick Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        <div className="flex items-center gap-4 text-white">
                          <div>
                            <p className="text-xs opacity-80 uppercase tracking-wider">
                              Hours
                            </p>
                            <p className="font-medium text-sm">
                              {helicopter.totalFlightHours.toLocaleString()}
                            </p>
                          </div>
                          <div className="w-[1px] h-8 bg-white/20"></div>
                          <div>
                            <p className="text-xs opacity-80 uppercase tracking-wider">
                              Seats
                            </p>
                            <p className="font-medium text-sm">
                              {helicopter.seatingCapacity}
                            </p>
                          </div>
                          <div className="w-[1px] h-8 bg-white/20"></div>
                          <div>
                            <p className="text-xs opacity-80 uppercase tracking-wider">
                              Year
                            </p>
                            <p className="font-medium text-sm">
                              {helicopter.yearOfManufacture}
                            </p>
                          </div>
                          <div className="w-[1px] h-8 bg-white/20"></div>
                          <div>
                            <p className="text-xs opacity-80 uppercase tracking-wider">
                              Speed
                            </p>
                            <p className="font-medium text-sm">
                              {helicopter.cruisingSpeed} kts
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-2xl font-light text-gray-900 font-serif">
                            {helicopter.helicopterName}
                          </h3>
                          <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">
                            {helicopter.manufacturer} •{" "}
                            {helicopter.helicopterType}
                          </p>
                        </div>
                        <p
                          className={`text-xl font-light whitespace-nowrap ${
                            helicopter.status === "SOLD"
                              ? "text-gray-400 line-through"
                              : "text-orange-500"
                          }`}
                        >
                          {formatPrice(helicopter.salePrice)}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-xs uppercase tracking-wider">
                          {helicopter.condition}
                        </span>
                        {helicopter.sponsoredType === "Elite Boost" && (
                          <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs uppercase tracking-wider">
                            Elite Listing
                          </span>
                        )}
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Regular Listings Header */}
        {regularListings.length > 0 && (
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-4">
              <div className="w-16 h-[1px] bg-gray-300"></div>
              <h2 className="text-2xl font-light text-gray-900 font-serif tracking-wide">
                Available Aircraft
              </h2>
              <div className="w-16 h-[1px] bg-gray-300"></div>
            </div>
          </div>
        )}

        {/* Regular Listings Grid/List */}
        {regularListings.length > 0 ? (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className={
              gridView === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-8"
                : "space-y-6 sm:space-y-8"
            }
          >
            {regularListings.map((helicopter, index) => (
              <motion.div
                key={helicopter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 1.2, duration: 0.5 }}
                className="group relative"
              >
                <a
                  href={`/helicopter/${helicopter.id}`}
                  className={
                    gridView === "grid"
                      ? "block bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-300 relative"
                      : "flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-300"
                  }
                >
                  {/* New Listing Badge */}
                  {helicopter.yearOfManufacture >=
                    new Date().getFullYear() - 2 && (
                    <div className="absolute top-4 left-4 z-10 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                      New
                    </div>
                  )}

                  <div className="relative">
                    {/* Sold Overlay */}
                    {helicopter.status === "SOLD" && (
                      <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
                        <div className="bg-red-600 text-white px-8 py-3 rounded-lg shadow-xl">
                          <span className="text-xl font-bold tracking-wider uppercase">
                            Sold
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Main Image */}
                    <div
                      className={`overflow-hidden ${
                        gridView === "grid"
                          ? "aspect-[16/9]"
                          : "w-full sm:w-96 aspect-[16/9]"
                      }`}
                    >
                      <img
                        src={helicopter.exteriorImageUrls[0]}
                        alt={helicopter.helicopterName}
                        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                          helicopter.status === "SOLD" ? "opacity-70" : ""
                        }`}
                      />
                    </div>

                    {/* Quick Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <div className="flex items-center gap-4 text-white">
                        <div>
                          <p className="text-xs opacity-80 uppercase tracking-wider">
                            Hours
                          </p>
                          <p className="font-medium text-xs">
                            {helicopter.totalFlightHours.toLocaleString()}
                          </p>
                        </div>
                        <div className="w-[1px] h-6 bg-white/20"></div>
                        <div>
                          <p className="text-xs opacity-80 uppercase tracking-wider">
                            Seats
                          </p>
                          <p className="font-medium text-xs">
                            {helicopter.seatingCapacity}
                          </p>
                        </div>
                        <div className="w-[1px] h-6 bg-white/20"></div>
                        <div>
                          <p className="text-xs opacity-80 uppercase tracking-wider">
                            Year
                          </p>
                          <p className="font-medium text-xs">
                            {helicopter.yearOfManufacture}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={
                      gridView === "grid" ? "p-4" : "p-4 sm:p-6 flex-1"
                    }
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 mb-2">
                      <div>
                        <h3 className="text-lg sm:text-xl font-light text-gray-900 font-serif">
                          {helicopter.helicopterName}
                        </h3>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                          {helicopter.manufacturer} •{" "}
                          {helicopter.helicopterType}
                        </p>
                      </div>
                      <p
                        className={`text-base sm:text-lg font-light whitespace-nowrap ${
                          helicopter.status === "SOLD"
                            ? "text-gray-400 line-through"
                            : "text-orange-500"
                        }`}
                      >
                        {formatPrice(helicopter.salePrice)}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs uppercase tracking-wider ${
                          helicopter.condition === "New"
                            ? "bg-green-100 text-green-800"
                            : helicopter.condition === "Used"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {helicopter.condition}
                      </span>
                      {gridView === "list" && (
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs uppercase tracking-wider">
                          {helicopter.helicopterType}
                        </span>
                      )}
                      {helicopter.cruisingSpeed > 150 && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs uppercase tracking-wider">
                          High Speed
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No matching aircraft found. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeliCopterForSale;
