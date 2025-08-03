import axiosInstance from "@/lib/api";
import { useEffect, useState, useMemo } from "react";
import "@fontsource/playfair-display/700.css";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X } from "lucide-react";

interface Helicopter {
  id: string;
  model: string;
  description: string;
  pricePerHour: number;
  imageUrls: string[];
  capacity: number;
  range: number;
  engineType: string;
  flightHours: number;
  safetyFeatures: string[];
  hasWifi: boolean;
  hasRefreshments: boolean;
  hasEntertainmentSystem: boolean;
  sponsored?: boolean;
  sponsoredType?: string;
  location?: string; // Added location field
}

type SortOption = "price-asc" | "price-desc" | "capacity-asc" | "capacity-desc";
type FilterCategory = "all" | "amenities" | "price" | "capacity";

function HeliForCharter() {
  const [helicopters, setHelicopters] = useState<Helicopter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("price-asc");
  console.log(setSortBy);

  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [capacityRange, setCapacityRange] = useState({ min: "", max: "" });
  const [locationFilter, setLocationFilter] = useState("");

  // Get unique locations for dropdown
  const uniqueLocations = useMemo(() => {
    const locations = helicopters
      .map((heli) => heli.location)
      .filter((loc): loc is string => !!loc && loc.trim() !== "");
    return Array.from(new Set(locations)).sort((a, b) => a.localeCompare(b));
  }, [helicopters]);

  useEffect(() => {
    const fetchHelicopters = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get<{
          success: boolean;
          listings: Helicopter[];
        }>("/h-client/main/charter/all");
        if (response.data.success) {
          setHelicopters(response.data.listings);
        } else {
          throw new Error("Failed to fetch helicopters");
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "An error occurred while fetching data";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchHelicopters();
  }, []);

  const getSponsoredPriority = (type?: string): number => {
    switch (type) {
      case "Elite Boost":
        return 3;
      case "Pro Boost":
        return 2;
      case "Basic Boost":
        return 1;
      default:
        return 0;
    }
  };

  const { sponsoredHelicopters, nonSponsoredHelicopters } = useMemo(() => {
    let filtered = [...helicopters];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (heli) =>
          heli.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
          heli.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply location filter
    if (locationFilter) {
      filtered = filtered.filter((heli) =>
        heli.location?.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Apply filters based on active category
    filtered = filtered.filter((heli) => {
      // Amenities filter
      if (activeCategory === "amenities" && selectedAmenities.length > 0) {
        if (selectedAmenities.includes("wifi") && !heli.hasWifi) return false;
        if (selectedAmenities.includes("refreshments") && !heli.hasRefreshments)
          return false;
        if (
          selectedAmenities.includes("entertainment") &&
          !heli.hasEntertainmentSystem
        )
          return false;
      }

      // Price filter
      if (activeCategory === "price") {
        const min = Number(priceRange.min);
        const max = Number(priceRange.max);
        if (min && heli.pricePerHour < min) return false;
        if (max && heli.pricePerHour > max) return false;
      }

      // Capacity filter
      if (activeCategory === "capacity") {
        const min = Number(capacityRange.min);
        const max = Number(capacityRange.max);
        if (min && heli.capacity < min) return false;
        if (max && heli.capacity > max) return false;
      }

      return true;
    });

    // Separate sponsored and non-sponsored
    const sponsored = filtered
      .filter((heli) => heli.sponsored)
      .sort((a, b) => {
        const aPriority = getSponsoredPriority(a.sponsoredType);
        const bPriority = getSponsoredPriority(b.sponsoredType);
        if (aPriority !== bPriority) {
          return bPriority - aPriority;
        }
        switch (sortBy) {
          case "price-asc":
            return a.pricePerHour - b.pricePerHour;
          case "price-desc":
            return b.pricePerHour - a.pricePerHour;
          case "capacity-asc":
            return a.capacity - b.capacity;
          case "capacity-desc":
            return b.capacity - a.capacity;
          default:
            return 0;
        }
      });

    const nonSponsored = filtered
      .filter((heli) => !heli.sponsored)
      .sort((a, b) => {
        switch (sortBy) {
          case "price-asc":
            return a.pricePerHour - b.pricePerHour;
          case "price-desc":
            return b.pricePerHour - a.pricePerHour;
          case "capacity-asc":
            return a.capacity - b.capacity;
          case "capacity-desc":
            return b.capacity - a.capacity;
          default:
            return 0;
        }
      });

    return {
      sponsoredHelicopters: sponsored,
      nonSponsoredHelicopters: nonSponsored,
    };
  }, [
    helicopters,
    searchQuery,
    sortBy,
    activeCategory,
    selectedAmenities,
    priceRange,
    capacityRange,
    locationFilter,
  ]);

  const resetFilters = () => {
    setActiveCategory("all");
    setSelectedAmenities([]);
    setPriceRange({ min: "", max: "" });
    setCapacityRange({ min: "", max: "" });
    setLocationFilter("");
  };
  console.log(resetFilters);

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-black mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-6 rounded-full transition duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Hero section with video background and multi-line title
  const hero = (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-white px-0">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="/video4.mp4"
        >
          <source src="/video4.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
      </div>
      {/* Centered Multi-line Title */}
      <div className="absolute z-10 flex flex-col items-center justify-center w-full h-full uppercase text-white">
        <h1 className="font-semibold leading-snug tracking-wider text-xl sm:text-2xl md:text-3xl xl:text-5xl flex flex-wrap justify-center gap-x-2 sm:gap-x-4 lg:gap-x-6 2xl:gap-x-8 3xl:gap-x-12 whitespace-pre-line align-baseline text-center">
          <div className="overflow-hidden">
            <p className="text-white">Helicopter</p>
          </div>
          <div className="overflow-hidden">
            <p className="text-white">Charter</p>
          </div>
        </h1>
      </div>
    </section>
  );

  // Card for helicopter listing
  function HeliCard({ heli }: { heli: Helicopter }) {
    const mainImage = heli.imageUrls?.[0] || "/placeholder-heli.jpg";
    return (
      <div className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-sm transition-all duration-150">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={mainImage}
            alt={heli.model}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {heli.sponsored && (
            <div className="absolute top-3 left-3 bg-black text-white px-2 py-1 text-xs font-medium tracking-wide rounded">
              SPONSORED
            </div>
          )}
        </div>
        {/* Content */}
        <div className="p-4">
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-0.5">
              {heli.model}
            </h3>
            <p className="text-xs text-gray-500">{heli.engineType}</p>
          </div>
          {/* Stats */}
          <div className="flex justify-between mb-4 pb-4 border-b border-gray-100">
            <div>
              <div className="text-sm font-medium text-gray-900">
                {heli.capacity}
              </div>
              <div className="text-xs text-gray-400">Seats</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">
                {heli.range}nm
              </div>
              <div className="text-xs text-gray-400">Range</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">
                ${heli.pricePerHour.toLocaleString()}
              </div>
              <div className="text-xs text-gray-400">/hr</div>
            </div>
          </div>
          {/* Amenities as icons */}
          <div className="flex gap-3 mt-2">
            {heli.hasWifi && (
              <span title="WiFi" className="inline-block text-blue-500 text-lg">
                📶
              </span>
            )}
            {heli.hasRefreshments && (
              <span
                title="Refreshments"
                className="inline-block text-blue-500 text-lg"
              >
                🥤
              </span>
            )}
            {heli.hasEntertainmentSystem && (
              <span
                title="Entertainment"
                className="inline-block text-blue-500 text-lg"
              >
                🎬
              </span>
            )}
          </div>
          <a
            href={`/helicopters/charter/${heli.id}`}
            className="mt-4 inline-block text-xs font-medium text-blue-700 hover:text-black transition-colors duration-200"
          >
            View details →
          </a>
        </div>
      </div>
    );
  }

  // Card skeleton for loading
  function HeliCardSkeleton() {
    return (
      <div className="bg-white border border-gray-100 rounded-lg overflow-hidden animate-pulse">
        <div className="relative aspect-video bg-gray-200" />
        <div className="p-4">
          <div className="mb-3">
            <div className="h-5 w-2/3 bg-gray-200 rounded mb-1" />
            <div className="h-3 w-1/3 bg-gray-100 rounded" />
          </div>
          <div className="flex justify-between mb-4 pb-4 border-b border-gray-100">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <div className="h-4 w-8 bg-gray-200 rounded mb-1" />
                <div className="h-2 w-6 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="h-5 w-16 bg-gray-200 rounded" />
            <div className="h-4 w-20 bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {hero}
      {/* Section Header */}
      <section className="bg-white mx-auto max-w-screen-3xl px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 overflow-hidden page-container relative py-12 md:py-16 lg:py-20">
        <div className="text-center max-w-7xl mx-auto">
          <p className="mx-auto w-full text-xl font-bold uppercase leading-tight tracking-tight text-black/90 md:text-3xl lg:text-4xl xl:text-4xl mb-6 lg:mb-8 px-4">
            The Best Charter Experience
          </p>
          <div className="mx-auto max-w-4xl px-4">
            <p className="text-base leading-relaxed text-gray-600 md:text-lg md:leading-relaxed lg:text-lg lg:leading-relaxed">
              Luxvana offers the world's largest fleet of helicopters for
              charter today, in all sizes and ranges. Browse our full fleet of
              world-class helicopters below, or use our concierge search to view
              a personalized selection curated for your needs.
            </p>
            <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg md:leading-relaxed lg:text-lg lg:leading-relaxed">
              Can't find what you're looking for? Your dedicated Luxvana advisor
              can match you with any helicopter in the worldwide fleet,
              including exclusive off-market opportunities.
            </p>
          </div>
        </div>
      </section>
      {/* Find Your Perfect Helicopter Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center">
            <span className="text-xs font-semibold tracking-widest text-blue-600 uppercase">
              Find your perfect helicopter
            </span>
            <div className="heading-seperator mt-3 flex justify-center mb-6 lg:mb-8">
              <span className="h-[3px] w-12 bg-blue-600"></span>
              <span className="h-[3px] w-12 bg-orange-400 ml-1"></span>
            </div>
            <h2 className="text-2xl font-light tracking-tight text-gray-900 md:text-4xl lg:text-[2.5rem]">
              Explore The World's Finest{" "}
              <span className="font-medium">Helicopters</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Discover our curated selection of exceptional helicopters, each
              meticulously vetted for quality and performance.
            </p>
          </div>

          {/* Search and Filter Controls */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Search Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="flex-1 w-full max-w-2xl"
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by model, engine type, or location..."
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Filter Button */}
            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all focus:ring-2 focus:ring-blue-500"
                onClick={() => setShowFilters(true)}
              >
                <Filter className="w-5 h-5" />
                <span className="font-medium">Filters</span>
              </button>
            </div>
          </div>

          {/* Filter Modal */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
                onClick={() => setShowFilters(false)}
              >
                <motion.div
                  initial={{ scale: 0.95, y: 20, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.95, y: 20, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-6 overflow-y-auto max-h-[90vh] relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-light text-gray-900">
                      Refine Your <span className="font-medium">Search</span>
                    </h3>
                    <button
                      className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                      onClick={() => setShowFilters(false)}
                      aria-label="Close filter modal"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Model */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Model
                        </label>
                        <input
                          type="text"
                          name="model"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          placeholder="All models"
                        />
                      </div>
                      {/* Engine Type */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Engine Type
                        </label>
                        <input
                          type="text"
                          name="engineType"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          placeholder="All engine types"
                        />
                      </div>
                      {/* Location */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Location (Home Base)
                        </label>
                        <select
                          name="location"
                          value={locationFilter}
                          onChange={(e) => setLocationFilter(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Any location</option>
                          {uniqueLocations.map((loc) => (
                            <option key={loc} value={loc}>
                              {loc}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* Price Range */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price Range (USD/hr)
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="number"
                            value={priceRange.min}
                            onChange={(e) =>
                              setPriceRange({
                                ...priceRange,
                                min: e.target.value,
                              })
                            }
                            placeholder="Min"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          />
                          <input
                            type="number"
                            value={priceRange.max}
                            onChange={(e) =>
                              setPriceRange({
                                ...priceRange,
                                max: e.target.value,
                              })
                            }
                            placeholder="Max"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      {/* Capacity */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Capacity
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="number"
                            value={capacityRange.min}
                            onChange={(e) =>
                              setCapacityRange({
                                ...capacityRange,
                                min: e.target.value,
                              })
                            }
                            placeholder="Min"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          />
                          <input
                            type="number"
                            value={capacityRange.max}
                            onChange={(e) =>
                              setCapacityRange({
                                ...capacityRange,
                                max: e.target.value,
                              })
                            }
                            placeholder="Max"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      {/* Amenities */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Amenities
                        </label>
                        <div className="flex gap-4 mt-2">
                          {[
                            { key: "wifi", label: "WiFi", icon: "📶" },
                            {
                              key: "refreshments",
                              label: "Refreshments",
                              icon: "🥤",
                            },
                            {
                              key: "entertainment",
                              label: "Entertainment",
                              icon: "🎬",
                            },
                          ].map((amenity) => (
                            <label
                              key={amenity.key}
                              className="flex flex-col items-center cursor-pointer gap-1"
                            >
                              <input
                                type="checkbox"
                                checked={selectedAmenities.includes(
                                  amenity.key
                                )}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedAmenities([
                                      ...selectedAmenities,
                                      amenity.key,
                                    ]);
                                  } else {
                                    setSelectedAmenities(
                                      selectedAmenities.filter(
                                        (a) => a !== amenity.key
                                      )
                                    );
                                  }
                                }}
                                className="accent-blue-500 w-5 h-5 mb-1"
                              />
                              <span className="text-2xl">{amenity.icon}</span>
                              <span className="text-xs text-gray-500">
                                {amenity.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Helicopter Listings Section */}
          <div className="mt-12 px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <HeliCardSkeleton key={i} />
                ))}
              </div>
            ) : sponsoredHelicopters.length === 0 &&
              nonSponsoredHelicopters.length === 0 ? (
              <div className="text-center text-gray-500 py-16 text-lg font-medium">
                No helicopters found matching your criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 p-4 lg:grid-cols-3 gap-8">
                {[...sponsoredHelicopters, ...nonSponsoredHelicopters].map(
                  (heli) => (
                    <HeliCard key={heli.id} heli={heli} />
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeliForCharter;
