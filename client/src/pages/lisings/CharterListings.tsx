import axiosInstance from "@/lib/api";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Airport interface
interface Airport {
  id: string;
  name: string;
  city: string;
  country: string;
  iata: string;
  icao: string;
  latitude: number;
  longitude: number;
}

// Airport Autocomplete Component
function AirportAutocomplete({
  value,
  onChange,
  placeholder,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
}) {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [filteredAirports, setFilteredAirports] = useState<Airport[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load airports data
  useEffect(() => {
    const loadAirports = async () => {
      setLoading(true);
      try {
        const response = await fetch("/airports.dat.txt");
        const text = await response.text();
        const lines = text.split("\n").filter((line) => line.trim());

        const airportData: Airport[] = lines
          .map((line) => {
            const parts = line.split(",").map((part) => part.replace(/"/g, ""));
            return {
              id: parts[0],
              name: parts[1],
              city: parts[2],
              country: parts[3],
              iata: parts[4] === "\\N" ? "" : parts[4],
              icao: parts[5] === "\\N" ? "" : parts[5],
              latitude: parseFloat(parts[6]) || 0,
              longitude: parseFloat(parts[7]) || 0,
            };
          })
          .filter((airport) => airport.iata || airport.icao); // Only airports with codes

        setAirports(airportData);
      } catch (error) {
        console.error("Error loading airports:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAirports();
  }, []);

  // Filter airports based on input
  useEffect(() => {
    if (!value.trim()) {
      setFilteredAirports([]);
      return;
    }

    const filtered = airports
      .filter((airport) => {
        const searchTerm = value.toLowerCase();
        return (
          airport.name.toLowerCase().includes(searchTerm) ||
          airport.city.toLowerCase().includes(searchTerm) ||
          airport.country.toLowerCase().includes(searchTerm) ||
          airport.iata.toLowerCase().includes(searchTerm) ||
          airport.icao.toLowerCase().includes(searchTerm)
        );
      })
      .slice(0, 10); // Limit to 10 results

    setFilteredAirports(filtered);
  }, [value, airports]);

  const handleSelect = (airport: Airport) => {
    const displayValue = `${airport.name} (${airport.iata || airport.icao}) - ${
      airport.city
    }, ${airport.country}`;
    onChange(displayValue);
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm"
      />

      {showDropdown && filteredAirports.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredAirports.map((airport) => (
            <button
              key={airport.id}
              type="button"
              onClick={() => handleSelect(airport)}
              className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none text-sm"
            >
              <div className="font-medium">
                {airport.name} ({airport.iata || airport.icao})
              </div>
              <div className="text-gray-500 text-xs">
                {airport.city}, {airport.country}
              </div>
            </button>
          ))}
        </div>
      )}

      {loading && (
        <div className="absolute right-3 top-8 text-gray-400">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

// JetCard Component
function JetCard({ jet }: { jet: any }) {
  const mainImage = jet.exteriorImages?.[0] || "/placeholder-jet.jpg";
  return (
    <div className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-sm transition-all duration-150">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={mainImage}
          alt={jet.jetName}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {jet.sponsored && (
          <div className="absolute top-3 left-3 bg-black text-white px-2 py-1 text-xs font-medium tracking-wide rounded">
            SPONSORED
          </div>
        )}
        {/* Favorite button */}
        <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors duration-200">
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
      {/* Content */}
      <div className="p-4">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-0.5">
            {jet.jetName}
          </h3>
          <p className="text-xs text-gray-500">
            {jet.yearOfManufacture} • {jet.aircraftType}
          </p>
        </div>
        {/* Stats */}
        <div className="flex justify-between mb-4 pb-4 border-b border-gray-100">
          {jet.seatingCapacity && (
            <div>
              <div className="text-sm font-medium text-gray-900">
                {jet.seatingCapacity}
              </div>
              <div className="text-xs text-gray-400">Seats</div>
            </div>
          )}
          {jet.cruisingSpeed && (
            <div>
              <div className="text-sm font-medium text-gray-900">
                {jet.cruisingSpeed}kts
              </div>
              <div className="text-xs text-gray-400">Speed</div>
            </div>
          )}
          {jet.maximumRange && (
            <div>
              <div className="text-sm font-medium text-gray-900">
                {jet.maximumRange}hrs
              </div>
              <div className="text-xs text-gray-400">Range</div>
            </div>
          )}
        </div>
        {/* Price and Button */}
        <div className="flex items-center justify-between">
          {jet.pricePerHour && (
            <div>
              <div className="text-base font-semibold text-gray-900">
                ${Number(jet.pricePerHour).toLocaleString()}/hr
              </div>
            </div>
          )}
          <a
            href={`/charter/${jet.id}`}
            className="text-xs font-medium text-gray-700 hover:text-black transition-colors duration-200"
          >
            View details →
          </a>
        </div>
      </div>
    </div>
  );
}

function CharterListings() {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAircraftType, setSelectedAircraftType] = useState("");
  const [selectedDeparture, setSelectedDeparture] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("");
  // Restore missing filter states
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSeats, setSelectedSeats] = useState("");
  const [selectedSpeed, setSelectedSpeed] = useState("");
  const [selectedRange, setSelectedRange] = useState("");
  // Restore showRouteModal state
  const [showRouteModal, setShowRouteModal] = useState(false);

  const allJets = async () => {
    try {
      const response = await axiosInstance.get("/jets/charter/index");
      if (response.data.success) {
        setData(response.data.data);
        setFilteredData(response.data.data);
      } else throw new Error(response.data.message);
    } catch (error: any) {
      toast(error.message);
    }
  };

  // Get unique values for filters
  const aircraftTypes = [
    ...new Set(data.map((jet: any) => jet.aircraftType)),
  ].filter(Boolean);

  const seatingOptions = [
    ...new Set(data.map((jet: any) => jet.seatingCapacity)),
  ]
    .filter(Boolean)
    .sort((a, b) => a - b);
  console.log(seatingOptions);
  // Apply filters
  const applyFilters = () => {
    let filtered = [...data];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (jet: any) =>
          jet.jetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          jet.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Aircraft type filter
    if (selectedAircraftType) {
      filtered = filtered.filter(
        (jet: any) => jet.aircraftType === selectedAircraftType
      );
    }

    // Manufacturer filter
    if (selectedManufacturer) {
      filtered = filtered.filter(
        (jet: any) => jet.manufacturer === selectedManufacturer
      );
    }

    // Year filter
    if (selectedYear) {
      filtered = filtered.filter(
        (jet: any) => jet.yearOfManufacture === parseInt(selectedYear)
      );
    }

    // Seating capacity filter
    if (selectedSeats) {
      const [min, max] = selectedSeats.split("-").map(Number);
      filtered = filtered.filter((jet: any) => {
        const seats = Number(jet.seatingCapacity);
        if (max) {
          return seats >= min && seats <= max;
        }
        return seats >= min;
      });
    }

    // Speed filter
    if (selectedSpeed) {
      const [min, max] = selectedSpeed.split("-").map(Number);
      filtered = filtered.filter((jet: any) => {
        const speed = Number(jet.cruisingSpeed);
        if (max) {
          return speed >= min && speed <= max;
        }
        return speed >= min;
      });
    }

    // Range filter
    if (selectedRange) {
      const [min, max] = selectedRange.split("-").map(Number);
      filtered = filtered.filter((jet: any) => {
        const range = Number(jet.maximumRange);
        if (max) {
          return range >= min && range <= max;
        }
        return range >= min;
      });
    }

    // Route filter - departure and destination
    if (selectedDeparture || selectedDestination) {
      filtered = filtered.filter((jet: any) =>
        jet.availableRoutes?.some((route: any) => {
          // Extract IATA/ICAO codes from the selected values
          const departureCode =
            selectedDeparture.match(/\(([A-Z]{3,4})\)/)?.[1];
          const destinationCode =
            selectedDestination.match(/\(([A-Z]{3,4})\)/)?.[1];

          const departureMatch =
            !selectedDeparture ||
            (departureCode && route.departure === departureCode) ||
            (!departureCode && route.departure === selectedDeparture);
          const destinationMatch =
            !selectedDestination ||
            (destinationCode && route.destination === destinationCode) ||
            (!destinationCode && route.destination === selectedDestination);
          return departureMatch && destinationMatch;
        })
      );
    }

    // Price range filter
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      filtered = filtered.filter((jet: any) => {
        const price = Number(jet.pricePerHour);
        if (max) {
          return price >= min && price <= max;
        }
        return price >= min;
      });
    }

    // Sort results
    if (sortBy) {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return Number(a.pricePerHour) - Number(b.pricePerHour);
          case "price-high":
            return Number(b.pricePerHour) - Number(a.pricePerHour);
          case "year-new":
            return Number(b.yearOfManufacture) - Number(a.yearOfManufacture);
          case "year-old":
            return Number(a.yearOfManufacture) - Number(b.yearOfManufacture);
          case "seats":
            return Number(a.seatingCapacity) - Number(b.seatingCapacity);
          case "speed":
            return Number(b.cruisingSpeed) - Number(a.cruisingSpeed);
          case "range":
            return Number(b.maximumRange) - Number(a.maximumRange);
          default:
            return 0;
        }
      });
    }

    setFilteredData(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedAircraftType("");
    setSelectedDeparture("");
    setSelectedDestination("");
    setPriceRange("");
    setSelectedManufacturer("");
    setSelectedYear("");
    setSelectedSeats("");
    setSelectedSpeed("");
    setSelectedRange("");
    setSortBy("");
    setFilteredData(data);
  };

  useEffect(() => {
    allJets();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [
    searchTerm,
    selectedAircraftType,
    selectedDeparture,
    selectedDestination,
    priceRange,
    selectedManufacturer,
    selectedYear,
    selectedSeats,
    selectedSpeed,
    selectedRange,
    sortBy,
    data,
  ]);

  return (
    <div className="bg-white font-sans">
      {/* Hero Section - Full Bleed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://cdn-62f78522c1ac18fe3c623dbe.closte.com/wp-content/uploads/2024/09/Private-Jet-Charter-The-Ultimate-Guide-PVJets.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-black/30" />

        <motion.div
          className="relative z-10 text-center px-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white mb-6">
            Private Jet <span className="font-medium">Charter</span>
          </p>
          <p className="text-white/90 font-light text-lg sm:text-xl max-w-2xl mx-auto mb-10">
            Where time becomes your most valuable asset
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-transparent border border-white text-white px-10 py-3 text-sm tracking-wider hover:bg-white/10 transition-all duration-300"
          >
            EXPLORE FLEET
          </motion.button>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <svg
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Intro Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
            Unrivaled <span className="font-medium">Private Aviation</span>
          </h2>
          <div className="w-20 h-0.5 bg-gray-300 mx-auto my-6" />
          <p className="text-gray-600 font-light text-lg max-w-3xl mx-auto leading-relaxed">
            Our discreet service delivers impeccable aircraft, flawless
            execution, and absolute privacy—the hallmark of true luxury travel.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Global Reach",
              desc: "Access to 5,000+ airports worldwide",
            },
            {
              title: "Total Privacy",
              desc: "Discreet travel with complete confidentiality",
            },
            {
              title: "Bespoke Service",
              desc: "Tailored experiences for every journey",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div className="text-4xl font-light text-gray-400 mb-4">
                0{i + 1}
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-500 font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Fleet Section */}
      <section className="py-20 px-6 bg-gray-100">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl sm:text-4xl font-light text-gray-900 mb-4"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our <span className="font-medium">Fleet</span>
            </motion.h2>
            <motion.p
              className="text-gray-500 font-light text-base max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Curated selection of private jets for your luxury travel needs.
            </motion.p>
          </div>

          {/* Filter and Search Section */}
          <motion.div
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Search jets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm"
                />
              </div>

              {/* Aircraft Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aircraft Type
                </label>
                <select
                  value={selectedAircraftType}
                  onChange={(e) => setSelectedAircraftType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm bg-white"
                >
                  <option value="">Choose Type</option>
                  {aircraftTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Route Button */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Route
                </label>
                <button
                  onClick={() => setShowRouteModal(true)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm bg-white hover:bg-gray-50 transition-colors duration-200 text-left"
                >
                  {selectedDeparture || selectedDestination ? (
                    <span className="text-gray-900">
                      {selectedDeparture && selectedDestination
                        ? `${
                            selectedDeparture.split("(")[1]?.split(")")[0]
                          } → ${
                            selectedDestination.split("(")[1]?.split(")")[0]
                          }`
                        : selectedDeparture
                        ? `From ${
                            selectedDeparture.split("(")[1]?.split(")")[0]
                          }`
                        : `To ${
                            selectedDestination.split("(")[1]?.split(")")[0]
                          }`}
                    </span>
                  ) : (
                    <span className="text-gray-500">Select route...</span>
                  )}
                </button>
              </div>

              {/* Advanced Filters Button */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filters
                </label>
                <button
                  onClick={() => {
                    setSelectedManufacturer("");
                    setSelectedYear("");
                    setPriceRange("");
                    setSelectedSeats("");
                    setSelectedSpeed("");
                    setSelectedRange("");
                    setSortBy("");
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm bg-white hover:bg-gray-50 transition-colors duration-200 text-left"
                >
                  <span className="text-gray-500">Advanced filters...</span>
                </button>
              </div>
            </div>

            {/* Reset Button */}
            <div className="mt-4 text-right">
              <button
                onClick={resetFilters}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Clear all filters
              </button>
            </div>
          </motion.div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Showing {filteredData.length} of {data.length} jets
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredData.length > 0 ? (
              filteredData
                .sort((a, b) => {
                  // Ultimate sponsored first
                  if (
                    a.sponsored &&
                    a.sponsoredType === "Ultimate" &&
                    (!b.sponsored || b.sponsoredType !== "Ultimate")
                  )
                    return -1;
                  if (
                    b.sponsored &&
                    b.sponsoredType === "Ultimate" &&
                    (!a.sponsored || a.sponsoredType !== "Ultimate")
                  )
                    return 1;

                  // Basic sponsored second
                  if (
                    a.sponsored &&
                    a.sponsoredType === "Basic" &&
                    (!b.sponsored || b.sponsoredType !== "Basic")
                  )
                    return -1;
                  if (
                    b.sponsored &&
                    b.sponsoredType === "Basic" &&
                    (!a.sponsored || a.sponsoredType !== "Basic")
                  )
                    return 1;

                  // Other sponsored third
                  if (a.sponsored && !b.sponsored) return -1;
                  if (b.sponsored && !a.sponsored) return 1;

                  // Non-sponsored last
                  return 0;
                })
                .map((jet: any) => (
                  <motion.div
                    key={jet.id}
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <JetCard jet={jet} />
                  </motion.div>
                ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-10">
                {data.length > 0
                  ? "No jets match your filters."
                  : "No jets available at the moment."}
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Route Selection Modal */}
      {showRouteModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Select Route
                </h3>
                <button
                  onClick={() => setShowRouteModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Departure */}
                <AirportAutocomplete
                  value={selectedDeparture}
                  onChange={setSelectedDeparture}
                  placeholder="Type departure airport..."
                  label="Departure Airport"
                />

                {/* Destination */}
                <AirportAutocomplete
                  value={selectedDestination}
                  onChange={setSelectedDestination}
                  placeholder="Type destination airport..."
                  label="Destination Airport"
                />
              </div>

              {/* Selected Route Display */}
              {(selectedDeparture || selectedDestination) && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Selected Route:
                  </h4>
                  <div className="text-sm text-gray-900">
                    {selectedDeparture && (
                      <div className="mb-1">
                        <span className="font-medium">From:</span>{" "}
                        {selectedDeparture}
                      </div>
                    )}
                    {selectedDestination && (
                      <div>
                        <span className="font-medium">To:</span>{" "}
                        {selectedDestination}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setSelectedDeparture("");
                    setSelectedDestination("");
                  }}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Clear Route
                </button>
                <button
                  onClick={() => setShowRouteModal(false)}
                  className="px-4 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800 transition-colors duration-200"
                >
                  Apply Route
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Advanced Filters Modal */}
      {/* This modal is no longer needed as location filtering is removed */}
    </div>
  );
}

export default CharterListings;
