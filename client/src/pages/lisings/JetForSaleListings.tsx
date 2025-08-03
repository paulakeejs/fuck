import React, { useEffect, useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import debounce from "lodash/debounce";
import "leaflet/dist/leaflet.css";
import axiosInstance from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Route, Plane, X } from "lucide-react";

interface JetListing {
  id: string;
  manufacturer: string;
  model: string;
  year: number;
  price: string;
  totalTimeSinceNew: string;
  currentLocation: string;
  status: string;
  exteriorImageUrls?: string[];
  description?: string;
  range: number;
  cruiseSpeed: number;
  maxPassengers: number;
  latitude?: number;
  longitude?: number;
  sponsored?: boolean;
  sponsoredType?: "Elite Boost" | "Basic Boost";
  amenities?: string[];
  avionics?: string;
}

interface Filters {
  manufacturer: string;
  model: string;
  yearMin: string;
  yearMax: string;
  priceMin: string;
  priceMax: string;
  totalTimeMin: string;
  totalTimeMax: string;
  location: string;
  rangeMin: string;
  rangeMax: string;
  passengers: string;
  amenities: string[];
}

interface RouteInfo {
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  originLatLng?: [number, number];
  destLatLng?: [number, number];
}

interface NominatimResponse {
  lat: string;
  lon: string;
  display_name: string;
}

// Remove API key
// const API_NINJAS_KEY = "..."

const COUNTRY_NAME_TO_CODE: Record<string, string> = {
  Afghanistan: "AF",
  Albania: "AL",
  Algeria: "DZ",
  Andorra: "AD",
  Angola: "AO",
  "Antigua and Barbuda": "AG",
  Argentina: "AR",
  Armenia: "AM",
  Australia: "AU",
  Austria: "AT",
  Azerbaijan: "AZ",
  Bahamas: "BS",
  Bahrain: "BH",
  Bangladesh: "BD",
  Barbados: "BB",
  Belarus: "BY",
  Belgium: "BE",
  Belize: "BZ",
  Benin: "BJ",
  Bhutan: "BT",
  Bolivia: "BO",
  "Bosnia and Herzegovina": "BA",
  Botswana: "BW",
  Brazil: "BR",
  Brunei: "BN",
  Bulgaria: "BG",
  "Burkina Faso": "BF",
  Burundi: "BI",
  "Cabo Verde": "CV",
  Cambodia: "KH",
  Cameroon: "CM",
  Canada: "CA",
  "Central African Republic": "CF",
  Chad: "TD",
  Chile: "CL",
  China: "CN",
  Colombia: "CO",
  Comoros: "KM",
  Congo: "CG",
  "Costa Rica": "CR",
  Croatia: "HR",
  Cuba: "CU",
  Cyprus: "CY",
  "Czech Republic": "CZ",
  Denmark: "DK",
  Djibouti: "DJ",
  Dominica: "DM",
  "Dominican Republic": "DO",
  Ecuador: "EC",
  Egypt: "EG",
  "El Salvador": "SV",
  "Equatorial Guinea": "GQ",
  Eritrea: "ER",
  Estonia: "EE",
  Eswatini: "SZ",
  Ethiopia: "ET",
  Fiji: "FJ",
  Finland: "FI",
  France: "FR",
  Gabon: "GA",
  Gambia: "GM",
  Georgia: "GE",
  Germany: "DE",
  Ghana: "GH",
  Greece: "GR",
  Grenada: "GD",
  Guatemala: "GT",
  Guinea: "GN",
  "Guinea-Bissau": "GW",
  Guyana: "GY",
  Haiti: "HT",
  Honduras: "HN",
  Hungary: "HU",
  Iceland: "IS",
  India: "IN",
  Indonesia: "ID",
  Iran: "IR",
  Iraq: "IQ",
  Ireland: "IE",
  Israel: "IL",
  Italy: "IT",
  Jamaica: "JM",
  Japan: "JP",
  Jordan: "JO",
  Kazakhstan: "KZ",
  Kenya: "KE",
  Kiribati: "KI",
  Kuwait: "KW",
  Kyrgyzstan: "KG",
  Laos: "LA",
  Latvia: "LV",
  Lebanon: "LB",
  Lesotho: "LS",
  Liberia: "LR",
  Libya: "LY",
  Liechtenstein: "LI",
  Lithuania: "LT",
  Luxembourg: "LU",
  Madagascar: "MG",
  Malawi: "MW",
  Malaysia: "MY",
  Maldives: "MV",
  Mali: "ML",
  Malta: "MT",
  "Marshall Islands": "MH",
  Mauritania: "MR",
  Mauritius: "MU",
  Mexico: "MX",
  Micronesia: "FM",
  Moldova: "MD",
  Monaco: "MC",
  Mongolia: "MN",
  Montenegro: "ME",
  Morocco: "MA",
  Mozambique: "MZ",
  Myanmar: "MM",
  Namibia: "NA",
  Nauru: "NR",
  Nepal: "NP",
  Netherlands: "NL",
  "New Zealand": "NZ",
  Nicaragua: "NI",
  Niger: "NE",
  Nigeria: "NG",
  "North Korea": "KP",
  "North Macedonia": "MK",
  Norway: "NO",
  Oman: "OM",
  Pakistan: "PK",
  Palau: "PW",
  Palestine: "PS",
  Panama: "PA",
  "Papua New Guinea": "PG",
  Paraguay: "PY",
  Peru: "PE",
  Philippines: "PH",
  Poland: "PL",
  Portugal: "PT",
  Qatar: "QA",
  Romania: "RO",
  Russia: "RU",
  Rwanda: "RW",
  "Saint Kitts and Nevis": "KN",
  "Saint Lucia": "LC",
  "Saint Vincent and the Grenadines": "VC",
  Samoa: "WS",
  "San Marino": "SM",
  "Sao Tome and Principe": "ST",
  "Saudi Arabia": "SA",
  Senegal: "SN",
  Serbia: "RS",
  Seychelles: "SC",
  "Sierra Leone": "SL",
  Singapore: "SG",
  Slovakia: "SK",
  Slovenia: "SI",
  "Solomon Islands": "SB",
  Somalia: "SO",
  "South Africa": "ZA",
  "South Korea": "KR",
  "South Sudan": "SS",
  Spain: "ES",
  "Sri Lanka": "LK",
  Sudan: "SD",
  Suriname: "SR",
  Sweden: "SE",
  Switzerland: "CH",
  Syria: "SY",
  Taiwan: "TW",
  Tajikistan: "TJ",
  Tanzania: "TZ",
  Thailand: "TH",
  "Timor-Leste": "TL",
  Togo: "TG",
  Tonga: "TO",
  "Trinidad and Tobago": "TT",
  Tunisia: "TN",
  Turkey: "TR",
  Turkmenistan: "TM",
  Tuvalu: "TV",
  Uganda: "UG",
  Ukraine: "UA",
  "United Arab Emirates": "AE",
  "United Kingdom": "GB",
  "United States": "US",
  Uruguay: "UY",
  Uzbekistan: "UZ",
  Vanuatu: "VU",
  "Vatican City": "VA",
  Venezuela: "VE",
  Vietnam: "VN",
  Yemen: "YE",
  Zambia: "ZM",
  Zimbabwe: "ZW",
  // Add more as needed
};

// Airport Suggestion Component
function AirportSuggestionItem({
  airport,
  onClick,
  isSelected,
}: {
  airport: any;
  onClick: () => void;
  isSelected: boolean;
}) {
  return (
    <div
      className={`flex items-center px-4 py-3 cursor-pointer transition-colors ${
        isSelected ? "bg-blue-50" : "hover:bg-gray-50"
      }`}
      onClick={onClick}
    >
      <div className="flex-shrink-0 mr-3">
        <CountryFlag country={airport.country} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline">
          <p
            className={`text-sm font-medium truncate ${
              isSelected ? "text-blue-600" : "text-gray-900"
            }`}
          >
            {airport.name}
          </p>
          <span className="ml-2 text-xs font-semibold text-blue-600">
            {airport.iata_code}
          </span>
        </div>
        <p className="text-xs text-gray-500 truncate">
          {airport.city}, {airport.country}
          {airport.icao_code && ` • ${airport.icao_code}`}
        </p>
      </div>
    </div>
  );
}

// Country Flag Component
function CountryFlag({ country }: { country: string }) {
  return (
    <div className="w-8 h-6 flex items-center justify-center bg-gray-100 rounded shadow border border-gray-200 overflow-hidden">
      {COUNTRY_NAME_TO_CODE[country] ? (
        <img
          src={`https://flagcdn.com/24x18/${COUNTRY_NAME_TO_CODE[
            country
          ].toLowerCase()}.png`}
          alt={country}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-xs text-gray-400">?</span>
      )}
    </div>
  );
}

const JetForSaleListings: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<JetListing[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
  const [routeInput, setRouteInput] = useState({ origin: "", destination: "" });
  const [calculatingRoute, setCalculatingRoute] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    manufacturer: "",
    model: "",
    yearMin: "",
    yearMax: "",
    priceMin: "",
    priceMax: "",
    totalTimeMin: "",
    totalTimeMax: "",
    location: "",
    rangeMin: "",
    rangeMax: "",
    passengers: "",
    amenities: [],
  });
  const [activeSort, setActiveSort] = useState("price-asc");
  const [applyingFilters, setApplyingFilters] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  console.log(isInitialLoad);
  // Add state for route modal and airport autocomplete
  const [airportSuggestions, setAirportSuggestions] = useState<{
    [key: string]: any[];
  }>({ origin: [], destination: [] });
  const [selectedAirports, setSelectedAirports] = useState<{
    origin: any | null;
    destination: any | null;
  }>({ origin: null, destination: null });
  const [routeError, setRouteError] = useState<string | null>(null);
  const [routeCalculating, setRouteCalculating] = useState(false);

  // Local airports cache
  const [allAirports, setAllAirports] = useState<any[]>([]);
  const [airportsLoaded, setAirportsLoaded] = useState(false);

  const amenitiesOptions = [
    "WiFi",
    "Entertainment System",
    "Full Galley",
    "Lavatory",
    "Standing Cabin",
    "Crew Quarters",
    "Advanced Avionics",
    "Inflight Phone",
  ];

  const findAllListings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get("/jets/sale/index");
      if (response.data.success) {
        const allListings = response.data.data.map((listing: any) => ({
          ...listing,
          latitude: listing.latitude || Math.random() * 180 - 90,
          longitude: listing.longitude || Math.random() * 360 - 180,
          maxPassengers: listing.seatingCapacity,
          amenities: listing.amenities || ["WiFi", "Entertainment System"],
          avionics: listing.avionics || "Garmin G5000",
        }));
        setListings(allListings);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch listings";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
    }
  }, []);

  useEffect(() => {
    document.title = "Jets Selection | Luxvana International";
    findAllListings();
  }, [findAllListings]);

  // Parse airports.dat.txt into array of airport objects
  const loadAirports = useCallback(async () => {
    if (airportsLoaded) return;
    const resp = await fetch("/airports.dat.txt");
    const text = await resp.text();
    const lines = text.split("\n");
    const airports = lines
      .map((line) => {
        // Split CSV, handle quoted commas
        const match = line.match(/(?:"([^"]*)")|([^,]+)/g);
        if (!match || match.length < 14) return null;
        return {
          id: match[0],
          name: match[1]?.replace(/(^"|"$)/g, ""),
          city: match[2]?.replace(/(^"|"$)/g, ""),
          country: match[3]?.replace(/(^"|"$)/g, ""),
          iata_code: match[4]?.replace(/(^"|"$)/g, ""),
          icao_code: match[5]?.replace(/(^"|"$)/g, ""),
          lat: Number(match[6]),
          lng: Number(match[7]),
          type: match[12]?.replace(/(^"|"$)/g, ""),
        };
      })
      .filter((a) => a && a.type === "airport" && (a.iata_code || a.icao_code));
    setAllAirports(airports);
    setAirportsLoaded(true);
  }, [airportsLoaded]);

  // On mount, load airports
  useEffect(() => {
    loadAirports();
  }, [loadAirports]);

  const sortListings = (
    listings: JetListing[],
    sortOption: string
  ): JetListing[] => {
    const order = ["Elite Boost", "Basic Boost"];
    const sortedBySponsor = [...listings].sort((a, b) => {
      const aIndex = a.sponsored
        ? order.indexOf(a.sponsoredType || "Basic Boost")
        : 999;
      const bIndex = b.sponsored
        ? order.indexOf(b.sponsoredType || "Basic Boost")
        : 999;
      return aIndex - bIndex;
    });

    const [key, orderDir] = sortOption.split("-");
    return sortedBySponsor.sort((a, b) => {
      let comparison = 0;
      if (key === "price") {
        comparison = Number(a.price) - Number(b.price);
      } else if (key === "year") {
        comparison = a.year - b.year;
      } else if (key === "hours") {
        comparison = Number(a.totalTimeSinceNew) - Number(b.totalTimeSinceNew);
      } else if (key === "manufacturer") {
        comparison = a.manufacturer.localeCompare(b.manufacturer);
      } else if (key === "range") {
        comparison = a.range - b.range;
      } else if (key === "passengers") {
        comparison = a.maxPassengers - b.maxPassengers;
      }
      return orderDir === "asc" ? comparison : -comparison;
    });
  };

  const processedListings = useMemo(() => {
    let filtered = listings.filter((jet) => {
      const searchText =
        `${jet.manufacturer} ${jet.model} ${jet.currentLocation}`.toLowerCase();
      const matchesSearch = searchText.includes(searchQuery.toLowerCase());

      const matchesFilters =
        (!filters.manufacturer ||
          jet.manufacturer
            .toLowerCase()
            .includes(filters.manufacturer.toLowerCase())) &&
        (!filters.model ||
          jet.model.toLowerCase().includes(filters.model.toLowerCase())) &&
        (!filters.yearMin || jet.year >= Number(filters.yearMin)) &&
        (!filters.yearMax || jet.year <= Number(filters.yearMax)) &&
        (!filters.priceMin || Number(jet.price) >= Number(filters.priceMin)) &&
        (!filters.priceMax || Number(jet.price) <= Number(filters.priceMax)) &&
        (!filters.totalTimeMin ||
          Number(jet.totalTimeSinceNew) >= Number(filters.totalTimeMin)) &&
        (!filters.totalTimeMax ||
          Number(jet.totalTimeSinceNew) <= Number(filters.totalTimeMax)) &&
        (!filters.location ||
          jet.currentLocation
            .toLowerCase()
            .includes(filters.location.toLowerCase())) &&
        (!filters.rangeMin || jet.range >= Number(filters.rangeMin)) &&
        (!filters.rangeMax || jet.range <= Number(filters.rangeMax)) &&
        (!filters.passengers ||
          jet.maxPassengers >= Number(filters.passengers)) &&
        (filters.amenities.length === 0 ||
          filters.amenities.every((amenity) =>
            jet.amenities?.includes(amenity)
          ));

      const matchesRoute = routeInfo
        ? jet.range >= routeInfo.distance * 1.2
        : true;

      return matchesSearch && matchesFilters && matchesRoute;
    });

    filtered = sortListings(filtered, activeSort);
    return filtered;
  }, [listings, searchQuery, filters, routeInfo, activeSort]);

  const debouncedFilterChange = useMemo(
    () =>
      debounce((name: string, value: string) => {
        setFilters((prev) => ({ ...prev, [name]: value }));
      }, 300),
    []
  );

  const handleFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      debouncedFilterChange(name, value);
    },
    [debouncedFilterChange]
  );

  const handleAmenityChange = (amenity: string) => {
    setFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };
  const resetFilters = () => {
    setFilters({
      manufacturer: "",
      model: "",
      yearMin: "",
      yearMax: "",
      priceMin: "",
      priceMax: "",
      totalTimeMin: "",
      totalTimeMax: "",
      location: "",
      rangeMin: "",
      rangeMax: "",
      passengers: "",
      amenities: [],
    });
    setRouteInfo(null);
    setSearchQuery("");
    setActiveSort("price-asc");
  };

  const handleApplyFilters = () => {
    setApplyingFilters(true);
    setTimeout(() => {
      setIsFilterModalOpen(false);
      setApplyingFilters(false);
    }, 300);
  };

  const geocodeAddress = async (
    address: string
  ): Promise<[number, number] | null> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );
      const data: NominatimResponse[] = await response.json();
      if (data && data.length > 0) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      }
      return null;
    } catch (error) {
      console.error("Geocoding error:", error);
      return null;
    }
  };

  const calculateGreatCircleDistance = (
    coord1: [number, number],
    coord2: [number, number]
  ) => {
    const [lat1, lon1] = coord1;
    const [lat2, lon2] = coord2;
    const R = 3440.065; // Earth radius in nautical miles
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const calculateRoute = async () => {
    if (!routeInput.origin || !routeInput.destination) {
      toast.error("Please enter both origin and destination");
      return;
    }
    setCalculatingRoute(true);
    try {
      const [originCoords, destCoords] = await Promise.all([
        geocodeAddress(routeInput.origin),
        geocodeAddress(routeInput.destination),
      ]);
      if (!originCoords || !destCoords) {
        throw new Error("Could not geocode one or both locations");
      }
      const distanceNm = calculateGreatCircleDistance(originCoords, destCoords);
      const durationHours = Math.floor(distanceNm / 450);
      setRouteInfo({
        origin: routeInput.origin,
        destination: routeInput.destination,
        distance: Math.round(distanceNm),
        duration: `${durationHours}h ${Math.floor((distanceNm % 450) / 7.5)}m`,
        originLatLng: originCoords,
        destLatLng: destCoords,
      });
      toast.success(
        `Route calculated: ${Math.round(distanceNm).toLocaleString()} nm`
      );
    } catch (error) {
      toast.error(
        "Failed to calculate route. Please try different location names."
      );
      console.error(error);
    } finally {
      setCalculatingRoute(false);
      setIsRouteModalOpen(false);
    }
  };

  const clearRoute = () => {
    setRouteInfo(null);
    setRouteInput({ origin: "", destination: "" });
  };

  // Utility: check if any filters are active
  const hasActiveFilters = () => {
    return (
      filters.manufacturer ||
      filters.model ||
      filters.yearMin ||
      filters.yearMax ||
      filters.priceMin ||
      filters.priceMax ||
      filters.location ||
      filters.amenities.length > 0 ||
      routeInfo // route filter
    );
  };

  // Utility: render active filters as chips
  const renderActiveFilters = () => {
    const chips: JSX.Element[] = [];
    if (filters.manufacturer)
      chips.push(
        <span
          key="manufacturer"
          className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
        >
          {filters.manufacturer}
        </span>
      );
    if (filters.model)
      chips.push(
        <span
          key="model"
          className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
        >
          {filters.model}
        </span>
      );
    if (filters.yearMin || filters.yearMax)
      chips.push(
        <span
          key="year"
          className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
        >
          Year: {filters.yearMin || "Any"} - {filters.yearMax || "Any"}
        </span>
      );
    if (filters.priceMin || filters.priceMax)
      chips.push(
        <span
          key="price"
          className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
        >
          Price:{" "}
          {filters.priceMin ? `$${Number(filters.priceMin) / 1e6}M` : "Any"} -{" "}
          {filters.priceMax ? `$${Number(filters.priceMax) / 1e6}M` : "Any"}
        </span>
      );
    if (filters.location)
      chips.push(
        <span
          key="location"
          className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
        >
          {filters.location}
        </span>
      );
    if (filters.amenities.length > 0)
      filters.amenities.forEach((a) =>
        chips.push(
          <span
            key={a}
            className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium"
          >
            {a}
          </span>
        )
      );
    if (routeInfo) {
      chips.push(
        <span
          key="route"
          className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium flex items-center gap-1"
        >
          Route: {routeInfo.origin} → {routeInfo.destination} (
          {routeInfo.distance} nm)
          <button
            type="button"
            className="ml-1 text-green-700 hover:text-red-500"
            onClick={clearRoute}
            title="Clear route filter"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      );
    }
    return chips;
  };

  // Update fetchAirportSuggestions to use local data
  const fetchAirportSuggestions = useCallback(
    debounce((query: string, field: "origin" | "destination") => {
      if (!query || !allAirports.length) {
        setAirportSuggestions((prev) => ({ ...prev, [field]: [] }));
        return;
      }
      const q = query.toLowerCase();
      const matches = allAirports
        .filter(
          (a) =>
            (a.name && a.name.toLowerCase().includes(q)) ||
            (a.city && a.city.toLowerCase().includes(q)) ||
            (a.iata_code && a.iata_code.toLowerCase().includes(q)) ||
            (a.icao_code && a.icao_code.toLowerCase().includes(q))
        )
        .filter(
          (a) =>
            typeof a.lat === "number" &&
            typeof a.lng === "number" &&
            !isNaN(a.lat) &&
            !isNaN(a.lng)
        )
        .slice(0, 10);
      setAirportSuggestions((prev) => ({ ...prev, [field]: matches }));
    }, 200),
    [allAirports]
  );

  // Handlers for autocomplete
  const handleAirportInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "origin" | "destination"
  ) => {
    const value = e.target.value;
    setSelectedAirports((prev) => ({
      ...prev,
      [field]: { ...prev[field], name: value },
    }));
    fetchAirportSuggestions(value, field);
  };
  const handleSelectAirport = (
    airport: any,
    field: "origin" | "destination"
  ) => {
    if (
      typeof airport.lat !== "number" ||
      typeof airport.lng !== "number" ||
      isNaN(airport.lat) ||
      isNaN(airport.lng)
    ) {
      toast.error("Selected airport has invalid coordinates.");
      return;
    }
    setSelectedAirports((prev) => ({ ...prev, [field]: airport }));
    setAirportSuggestions((prev) => ({ ...prev, [field]: [] }));
  };

  // Calculate route and set routeInfo
  const handleApplyRoute = async () => {
    setRouteError(null);
    if (!selectedAirports.origin || !selectedAirports.destination) {
      setRouteError("Please select both origin and destination airports.");
      return;
    }
    setRouteCalculating(true);
    try {
      const originLat = Number(selectedAirports.origin.lat);
      const originLng = Number(selectedAirports.origin.lng);
      const destLat = Number(selectedAirports.destination.lat);
      const destLng = Number(selectedAirports.destination.lng);
      const originCoords: [number, number] = [
        isNaN(originLat) ? 0 : originLat,
        isNaN(originLng) ? 0 : originLng,
      ];
      const destCoords: [number, number] = [
        isNaN(destLat) ? 0 : destLat,
        isNaN(destLng) ? 0 : destLng,
      ];
      const distanceNm = calculateGreatCircleDistance(originCoords, destCoords);
      setRouteInfo({
        origin: `${selectedAirports.origin.name} (${
          selectedAirports.origin.iata_code || selectedAirports.origin.icao_code
        })`,
        destination: `${selectedAirports.destination.name} (${
          selectedAirports.destination.iata_code ||
          selectedAirports.destination.icao_code
        })`,
        distance: Math.round(distanceNm),
        duration: "",
        originLatLng: originCoords,
        destLatLng: destCoords,
      });
      setIsRouteModalOpen(false);
    } catch (e) {
      setRouteError("Failed to calculate route.");
    } finally {
      setRouteCalculating(false);
    }
  };
  const handleClearRoute = () => {
    setSelectedAirports({ origin: null, destination: null });
    setRouteInfo(null);
    setAirportSuggestions({ origin: [], destination: [] });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-4xl font-light text-orange-500 mb-4">Error</div>
          <div className="text-xl text-gray-600 mb-8">{error}</div>
          <button
            onClick={() => findAllListings()}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Hero section with video background and smaller multi-line title, full screen height
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
          poster="https://globaljet.aero/sites/default/files/2020-12/A318%20ELITE_LX-GJC_AFT%20Cabin_2_1.jpg"
        >
          <source src="/video2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
      </div>
      {/* Centered Multi-line Title (smaller) */}
      <div className="absolute z-10 flex flex-col items-center justify-center w-full h-full uppercase text-white">
        <h1 className="font-semibold leading-snug tracking-wider text-xl sm:text-2xl md:text-3xl xl:text-5xl flex flex-wrap justify-center gap-x-2 sm:gap-x-4 lg:gap-x-6 2xl:gap-x-8 3xl:gap-x-12 whitespace-pre-line align-baseline text-center">
          <div className="overflow-hidden">
            <p className="text-white">Private</p>
          </div>
          <div className="overflow-hidden">
            <p className="text-white">Jets</p>
          </div>
          <div className="overflow-hidden">
            <div className="text-white">For</div>
          </div>
          <div className="overflow-hidden">
            <div className="text-white">Sale</div>
          </div>
        </h1>
      </div>
    </section>
  );
  // JetCard component (inline, adapted for JetListing)
  function JetCard({ jet }: { jet: any }) {
    const mainImage = jet.exteriorImageUrls?.[0] || "/placeholder-jet.jpg";
    return (
      <div className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-sm transition-all duration-150">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={mainImage}
            alt={`${jet.manufacturer} ${jet.model}`}
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
              {jet.manufacturer} {jet.model}
            </h3>
            <p className="text-xs text-gray-500">
              {jet.year} • {jet.aircraftType || "Private Jet"}
            </p>
          </div>
          {/* Stats */}
          <div className="flex justify-between mb-4 pb-4 border-b border-gray-100">
            {jet.maxPassengers && (
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {jet.maxPassengers}
                </div>
                <div className="text-xs text-gray-400">Seats</div>
              </div>
            )}
            {jet.cruiseSpeed && (
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {jet.cruiseSpeed}kts
                </div>
                <div className="text-xs text-gray-400">Speed</div>
              </div>
            )}
            {jet.range && (
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {jet.range}nm
                </div>
                <div className="text-xs text-gray-400">Range</div>
              </div>
            )}
            {jet.maxAltitude && (
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {jet.maxAltitude}ft
                </div>
                <div className="text-xs text-gray-400">Altitude</div>
              </div>
            )}
            {jet.numberOfEngines && (
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {jet.numberOfEngines}
                </div>
                <div className="text-xs text-gray-400">Engines</div>
              </div>
            )}
          </div>
          {/* Price and Button */}
          <div className="flex items-center justify-between">
            {jet.price && (
              <div>
                <div className="text-base font-semibold text-gray-900">
                  {!isNaN(Number(jet.price))
                    ? `$${Number(jet.price).toLocaleString()}`
                    : jet.price}
                </div>
              </div>
            )}
            <a
              href={`/jets/${jet.id}`}
              className="text-xs font-medium text-gray-700 hover:text-black transition-colors duration-200"
            >
              View details →
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Update JetCardSkeleton to match JetCard design
  function JetCardSkeleton() {
    return (
      <div className="bg-white border border-gray-100 rounded-lg overflow-hidden animate-pulse">
        {/* Image skeleton */}
        <div className="relative aspect-video bg-gray-200" />
        {/* Content skeleton */}
        <div className="p-4">
          <div className="mb-3">
            <div className="h-5 w-2/3 bg-gray-200 rounded mb-1" />
            <div className="h-3 w-1/3 bg-gray-100 rounded" />
          </div>
          {/* Stats skeleton */}
          <div className="flex justify-between mb-4 pb-4 border-b border-gray-100">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-4 w-8 bg-gray-200 rounded mb-1" />
                <div className="h-2 w-6 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
          {/* Price and Button skeleton */}
          <div className="flex items-center justify-between">
            <div className="h-5 w-16 bg-gray-200 rounded" />
            <div className="h-4 w-20 bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    );
  }

  // Calculate routeDistance for summary
  const routeDistance = routeInfo?.distance;

  return (
    <div>
      {hero}
      {/* Investment Section - exact style as provided */}
      <section className="bg-white mx-auto max-w-screen-3xl px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 overflow-hidden page-container relative py-12 md:py-16 lg:py-20">
        <div className="text-center max-w-7xl mx-auto">
          <p className="mx-auto w-full text-xl font-bold uppercase leading-tight tracking-tight text-black/90 md:text-3xl lg:text-4xl xl:text-4xl mb-6 lg:mb-8 px-4">
            The Best Purchase You'll Ever Make
          </p>
          <div className="mx-auto max-w-4xl px-4">
            <p className="text-base leading-relaxed text-gray-600 md:text-lg md:leading-relaxed lg:text-lg lg:leading-relaxed">
              Luxvana offers the world's largest fleet of private jets for sale
              today, in all sizes and ranges. Browse our full fleet of
              world-class jets below, or use our concierge search to view a
              personalized selection curated for your needs.
            </p>
            <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg md:leading-relaxed lg:text-lg lg:leading-relaxed">
              Can't find what you're looking for? Your dedicated Luxvana advisor
              can match you with any jet in the worldwide fleet, including
              exclusive off-market opportunities.
            </p>
          </div>
        </div>
      </section>
      {/* Find Your Perfect Jet Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center">
            <span className="text-xs font-semibold tracking-widest text-blue-600 uppercase">
              Find your perfect jet
            </span>
            <div className="heading-seperator mt-3 flex justify-center mb-6 lg:mb-8">
              <span className="h-[3px] w-12 bg-blue-600"></span>
              <span className="h-[3px] w-12 bg-orange-400 ml-1"></span>
            </div>
            <h2 className="text-2xl font-light tracking-tight text-gray-900 md:text-4xl lg:text-[2.5rem]">
              Explore The World's Finest{" "}
              <span className="font-medium">Private Jets</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Discover our curated selection of exceptional aircraft, each
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
                  placeholder="Search by manufacturer, model, or location..."
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
                className="flex items-center gap-2 px-5 py-3 bg-white border border-blue-400 text-blue-700 rounded-lg hover:bg-blue-50 transition-all focus:ring-2 focus:ring-blue-500"
                onClick={() => setIsRouteModalOpen(true)}
              >
                <Route className="w-5 h-5" />
                <span className="font-medium">Route</span>
              </button>
              <button
                className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all focus:ring-2 focus:ring-blue-500"
                onClick={() => setIsFilterModalOpen(true)}
              >
                <Filter className="w-5 h-5" />
                <span className="font-medium">Filters</span>
              </button>
            </div>
          </div>

          {/* Active Filters Display (if any filters are applied) */}
          {hasActiveFilters() && (
            <div className="mt-4 flex flex-wrap gap-2">
              {renderActiveFilters()}
            </div>
          )}
        </div>

        {/* Enhanced Filter Modal */}
        <AnimatePresence>
          {isFilterModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
              onClick={() => setIsFilterModalOpen(false)}
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
                    onClick={() => setIsFilterModalOpen(false)}
                    aria-label="Close filter modal"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleApplyFilters} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Manufacturer */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Manufacturer
                      </label>
                      <input
                        type="text"
                        name="manufacturer"
                        value={filters.manufacturer}
                        onChange={handleFilterChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="All manufacturers"
                      />
                    </div>

                    {/* Model */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Model
                      </label>
                      <input
                        type="text"
                        name="model"
                        value={filters.model}
                        onChange={handleFilterChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="All models"
                      />
                    </div>

                    {/* Year Range */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Year Range
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <select
                            name="yearMin"
                            value={filters.yearMin}
                            onChange={handleFilterChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Min Year</option>
                            {Array.from(
                              { length: 30 },
                              (_, i) => new Date().getFullYear() - i
                            ).map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <select
                            name="yearMax"
                            value={filters.yearMax}
                            onChange={handleFilterChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Max Year</option>
                            {Array.from(
                              { length: 30 },
                              (_, i) => new Date().getFullYear() - i
                            ).map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Price Range */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price Range (USD)
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <select
                            name="priceMin"
                            value={filters.priceMin}
                            onChange={handleFilterChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Min Price</option>
                            {[1, 5, 10, 20, 30, 50, 75].map((amount) => (
                              <option key={amount} value={amount * 1000000}>
                                ${amount}M
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <select
                            name="priceMax"
                            value={filters.priceMax}
                            onChange={handleFilterChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Max Price</option>
                            {[5, 10, 20, 30, 50, 75, 100].map((amount) => (
                              <option key={amount} value={amount * 1000000}>
                                ${amount}M
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={filters.location}
                        onChange={handleFilterChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Any location"
                      />
                    </div>

                    {/* Amenities */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Amenities
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2">
                        {amenitiesOptions.map((amenity) => (
                          <label
                            key={amenity}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              checked={filters.amenities.includes(amenity)}
                              onChange={() => handleAmenityChange(amenity)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="text-sm text-gray-700">
                              {amenity}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Route Filter */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Route (Show jets that can fly this route)
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          name="origin"
                          value={routeInput.origin}
                          onChange={(e) =>
                            setRouteInput((prev) => ({
                              ...prev,
                              origin: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Origin city/airport"
                          disabled={calculatingRoute}
                        />
                        <input
                          type="text"
                          name="destination"
                          value={routeInput.destination}
                          onChange={(e) =>
                            setRouteInput((prev) => ({
                              ...prev,
                              destination: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Destination city/airport"
                          disabled={calculatingRoute}
                        />
                        <button
                          type="button"
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
                          onClick={calculateRoute}
                          disabled={
                            calculatingRoute ||
                            !routeInput.origin ||
                            !routeInput.destination
                          }
                        >
                          {calculatingRoute ? (
                            <span className="flex items-center">
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Calculating...
                            </span>
                          ) : (
                            "Calculate Route"
                          )}
                        </button>
                      </div>
                      {routeInfo && (
                        <div className="mt-2 text-sm text-green-700 flex items-center gap-2">
                          <span>
                            {routeInfo.origin} → {routeInfo.destination}:{" "}
                            <b>{routeInfo.distance.toLocaleString()} nm</b>
                          </span>
                          <button
                            type="button"
                            className="ml-2 text-green-700 hover:text-red-500"
                            onClick={clearRoute}
                            title="Clear route filter"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onClick={resetFilters}
                    >
                      Reset All
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      disabled={applyingFilters}
                    >
                      {applyingFilters ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Applying...
                        </span>
                      ) : (
                        "Apply Filters"
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Route Modal */}
      {/* Enhanced Route Modal */}
      <AnimatePresence>
        {isRouteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
            onClick={() => setIsRouteModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.96, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 10, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden mx-4 border border-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-light text-gray-900">
                      Flight{" "}
                      <span className="font-medium">Route Calculator</span>
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Find jets capable of your desired route
                    </p>
                  </div>
                  <button
                    className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                    onClick={() => setIsRouteModalOpen(false)}
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="px-6 py-5">
                <div className="space-y-6">
                  {/* Origin/Destination Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Origin Card */}
                    <div className="relative">
                      <div className="absolute -top-3 left-3 px-2 py-0.5 bg-blue-600 text-white text-xs font-semibold rounded-full shadow-md">
                        Departure
                      </div>
                      <div className="border border-gray-200 rounded-xl p-4 pt-6 shadow-sm hover:shadow-md transition-shadow">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Origin Airport
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={selectedAirports.origin?.name || ""}
                            onChange={(e) => handleAirportInput(e, "origin")}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400 transition-all"
                            placeholder="City or airport code"
                            autoComplete="off"
                          />
                          {airportSuggestions.origin.length > 0 && (
                            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                              {airportSuggestions.origin.map((airport) => (
                                <AirportSuggestionItem
                                  key={airport.id}
                                  airport={airport}
                                  onClick={() =>
                                    handleSelectAirport(airport, "origin")
                                  }
                                  isSelected={
                                    selectedAirports.origin?.id === airport.id
                                  }
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        {selectedAirports.origin && (
                          <div className="mt-3 flex items-start">
                            <div className="flex-shrink-0 mr-3">
                              <CountryFlag
                                country={selectedAirports.origin.country}
                              />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {selectedAirports.origin.name}
                                <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                  {selectedAirports.origin.iata_code}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500">
                                {selectedAirports.origin.city},{" "}
                                {selectedAirports.origin.country}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Destination Card */}
                    <div className="relative">
                      <div className="absolute -top-3 left-3 px-2 py-0.5 bg-orange-500 text-white text-xs font-semibold rounded-full shadow-md">
                        Arrival
                      </div>
                      <div className="border border-gray-200 rounded-xl p-4 pt-6 shadow-sm hover:shadow-md transition-shadow">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Destination Airport
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={selectedAirports.destination?.name || ""}
                            onChange={(e) =>
                              handleAirportInput(e, "destination")
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400 transition-all"
                            placeholder="City or airport code"
                            autoComplete="off"
                          />
                          {airportSuggestions.destination.length > 0 && (
                            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                              {airportSuggestions.destination.map((airport) => (
                                <AirportSuggestionItem
                                  key={airport.id}
                                  airport={airport}
                                  onClick={() =>
                                    handleSelectAirport(airport, "destination")
                                  }
                                  isSelected={
                                    selectedAirports.destination?.id ===
                                    airport.id
                                  }
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        {selectedAirports.destination && (
                          <div className="mt-3 flex items-start">
                            <div className="flex-shrink-0 mr-3">
                              <CountryFlag
                                country={selectedAirports.destination.country}
                              />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {selectedAirports.destination.name}
                                <span className="ml-2 text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
                                  {selectedAirports.destination.iata_code}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500">
                                {selectedAirports.destination.city},{" "}
                                {selectedAirports.destination.country}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Route Summary (when both selected) */}
                  {selectedAirports.origin && selectedAirports.destination && (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center">
                            <span className="bg-blue-600 text-white p-1.5 rounded-full">
                              <Plane className="w-4 h-4" />
                            </span>
                            <span className="ml-2 font-medium text-gray-900">
                              {selectedAirports.origin.iata_code}
                            </span>
                          </div>
                          <div className="flex-1 border-t-2 border-dashed border-gray-300 mx-2"></div>
                          <div className="flex items-center">
                            <span className="bg-orange-500 text-white p-1.5 rounded-full">
                              <Plane className="w-4 h-4" />
                            </span>
                            <span className="ml-2 font-medium text-gray-900">
                              {selectedAirports.destination.iata_code}
                            </span>
                          </div>
                        </div>
                        {routeDistance && (
                          <div className="text-sm font-medium text-gray-700">
                            {routeDistance} nm
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {routeError && (
                    <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-lg text-sm">
                      {routeError}
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    onClick={handleClearRoute}
                  >
                    Clear Selection
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    onClick={handleApplyRoute}
                    disabled={
                      routeCalculating ||
                      !selectedAirports.origin ||
                      !selectedAirports.destination
                    }
                  >
                    {routeCalculating ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Calculating Route...
                      </span>
                    ) : (
                      "Apply Route Filter"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Jet Listings Section */}
      <div className="mt-12 px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <JetCardSkeleton key={i} />
            ))}
          </div>
        ) : processedListings.length === 0 ? (
          <div className="text-center text-gray-500 py-16 text-lg font-medium">
            No jets found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 p-4 lg:grid-cols-3 gap-8">
            {processedListings.map((jet) => (
              <JetCard key={jet.id} jet={jet} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JetForSaleListings;

