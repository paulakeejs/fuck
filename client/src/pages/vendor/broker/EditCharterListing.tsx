import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import axiosInstance from "@/lib/api";
import { useParams } from "react-router-dom";
import charterVendorApi from "../charter/api";

interface Fee {
  name: string;
  price: string;
}

interface Route {
  departure: string;
  destination: string;
}

interface Airport {
  id: string;
  name: string;
  city: string;
  country: string;
  iata_code: string;
  icao_code: string;
  lat: number;
  lng: number;
  type: string;
}

interface FormData {
  jetName: string;
  aircraftType: string;
  manufacturer: string;
  yearOfManufacture: string;
  registrationNumber: string;
  seatingCapacity: string;
  cabinConfiguration: string;
  maximumRange: string;
  cruisingSpeed: string;
  baggageCapacity: string;
  homeBase: string;
  availableRoutes: Route[];
  operatingDays: string;
  noticeRequired: string;
  pricePerHour: string;
  minimumFlightTime: string;
  tripOption: "round-trip" | "one-way" | "both";
  additionalFees: Fee[];
  discounts: string;
  cabinFeatures: string[];
  inFlightMeals: boolean;
  flightAttendant: boolean;
  petsAllowed: boolean;
  smokingAllowed: boolean;
  exteriorImages: string[] | null;
  interiorImages: string[] | null;
  videoLink: string;
  luxuryCarService: boolean;
}

interface FormErrors {
  [key: string]: string;
}

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
};

// Country Flag Component
const CountryFlag: React.FC<{ country: string }> = ({ country }) => {
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
};

// Airport Suggestion Item Component
const AirportSuggestionItem: React.FC<{
  airport: Airport;
  onClick: () => void;
  isSelected: boolean;
}> = ({ airport, onClick, isSelected }) => {
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
};

// Airport Selector Component
const AirportSelector: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  airports: Airport[];
}> = ({
  label,
  value,
  onChange,
  error,
  placeholder,
  required,
  disabled,
  airports,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const [filteredAirports, setFilteredAirports] = useState<Airport[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update search term when value changes
  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  // Filter airports based on search term
  useEffect(() => {
    console.log(
      "Filtering airports, total:",
      airports.length,
      "search term:",
      searchTerm,
      "airports array:",
      airports.slice(0, 3) // Show first 3 airports for debugging
    );
    if (!searchTerm.trim()) {
      const initialAirports = airports.slice(0, 10);
      console.log(
        "Initial airports:",
        initialAirports.length,
        "sample:",
        initialAirports[0]
      );
      setFilteredAirports(initialAirports);
    } else {
      const filtered = airports
        .filter(
          (airport) =>
            (airport.name &&
              airport.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (airport.city &&
              airport.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (airport.country &&
              airport.country
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (airport.iata_code &&
              airport.iata_code
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (airport.icao_code &&
              airport.icao_code
                .toLowerCase()
                .includes(searchTerm.toLowerCase()))
        )
        .slice(0, 10);
      console.log(
        "Filtered airports:",
        filtered.length,
        "sample:",
        filtered[0]
      );
      setFilteredAirports(filtered);
    }
    setSelectedIndex(-1);
  }, [searchTerm, airports]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredAirports.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && filteredAirports[selectedIndex]) {
        handleSelectAirport(filteredAirports[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setSearchTerm(value);
    }
  };

  const handleSelectAirport = (airport: Airport) => {
    const airportCode = airport.iata_code || airport.icao_code;
    onChange(airportCode);
    setSearchTerm(airportCode);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    onChange(newValue);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    // Delay closing to allow for clicks on dropdown items
    setTimeout(() => {
      setIsOpen(false);
      setSelectedIndex(-1);
    }, 200);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debug dropdown rendering
  useEffect(() => {
    if (isOpen) {
      console.log(
        "Dropdown is open, filtered airports:",
        filteredAirports.length
      );
    }
  }, [isOpen, filteredAirports]);

  return (
    <div className="relative">
      <label
        htmlFor={`airport-${label}`}
        className="block text-sm font-medium text-gray-700"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative mt-1">
        <input
          ref={inputRef}
          type="text"
          id={`airport-${label}`}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className={`block w-full rounded-md border ${
            error ? "border-red-500" : "border-gray-300"
          } shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed`}
          placeholder={placeholder || "Search airports..."}
          aria-invalid={!!error}
          aria-describedby={error ? `airport-${label}-error` : undefined}
          required={required}
          disabled={disabled}
        />
        {isOpen && filteredAirports.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
          >
            {filteredAirports.map((airport, index) => (
              <AirportSuggestionItem
                key={airport.id}
                airport={airport}
                onClick={() => handleSelectAirport(airport)}
                isSelected={index === selectedIndex}
              />
            ))}
          </div>
        )}
      </div>
      {error && (
        <p id={`airport-${label}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

const aircraftTypes = [
  "Light Jet",
  "Midsize Jet",
  "Heavy Jet",
  "Ultra-Long Range Jet",
  "Regional Jet",
  "Turboprop",
];

const cabinFeaturesOptions = [
  "WiFi",
  "Entertainment System",
  "Reclining Seats",
  "Flat Beds",
  "Standing Cabin",
  "Private Suite",
  "Shower",
  "Conference Table",
  "Galley Kitchen",
  "Lavatory",
  "Pet Friendly",
  "Smoking Allowed",
  "Crew Rest Area",
  "Baggage Compartment",
  "Mood Lighting",
];

interface Step {
  id: number;
  title: string;
}

const steps: Step[] = [
  { id: 1, title: "Jet Details" },
  { id: 2, title: "Performance & Capacity" },
  { id: 3, title: "Availability" },
  { id: 4, title: "Pricing" },
  { id: 5, title: "Amenities" },
  { id: 6, title: "Images & Media" },
  { id: 7, title: "Extra Services" },
  { id: 8, title: "Review" },
];

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  min?: string | number;
  max?: string | number;
  step?: string | number;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  required,
  disabled,
  min,
  max,
  step,
}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className={`mt-1 block w-full rounded-md border ${
        error ? "border-red-500" : "border-gray-300"
      } shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed`}
      placeholder={placeholder}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
      required={required}
      disabled={disabled}
      min={min}
      max={max}
      step={step}
    />
    {error && (
      <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
        {error}
      </p>
    )}
  </div>
);

interface FileUploadProps {
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  images: string[] | null;
  uploading: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  name,
  onChange,
  error,
  images,
  uploading,
}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} <span className="text-red-500">*</span>
    </label>
    <div
      className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
        error ? "border-red-500" : "border-gray-300"
      } border-dashed rounded-md`}
    >
      <div className="space-y-1 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="flex text-sm text-gray-600">
          <label
            htmlFor={name}
            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
          >
            <span>{uploading ? "Uploading..." : "Upload files"}</span>
            <input
              id={name}
              name={name}
              type="file"
              className="sr-only"
              onChange={onChange}
              multiple
              accept="image/png,image/jpeg"
              disabled={uploading}
              aria-describedby={error ? `${name}-error` : undefined}
            />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
      </div>
    </div>
    {error && (
      <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
        {error}
      </p>
    )}
    {images && images.length > 0 && (
      <div className="mt-4 grid grid-cols-3 gap-2">
        {images.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`${label} ${index + 1}`}
            className="h-24 w-full object-cover rounded-md"
          />
        ))}
      </div>
    )}
  </div>
);

const BEL: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<FormData>({
    jetName: "",
    aircraftType: "",
    manufacturer: "",
    yearOfManufacture: "",
    registrationNumber: "",
    seatingCapacity: "",
    cabinConfiguration: "",
    maximumRange: "",
    cruisingSpeed: "",
    baggageCapacity: "",
    homeBase: "",
    availableRoutes: [{ departure: "", destination: "" }],
    operatingDays: "",
    noticeRequired: "",
    pricePerHour: "",
    minimumFlightTime: "",
    tripOption: "round-trip",
    additionalFees: [],
    discounts: "",
    cabinFeatures: [],
    inFlightMeals: false,
    flightAttendant: false,
    petsAllowed: false,
    smokingAllowed: false,
    exteriorImages: null,
    interiorImages: null,
    videoLink: "",
    luxuryCarService: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);

  // Airport data state
  const [allAirports, setAllAirports] = useState<Airport[]>([]);
  const [airportsLoaded, setAirportsLoaded] = useState(false);

  // Load airports data
  const loadAirports = useCallback(async () => {
    if (airportsLoaded) return;
    try {
      console.log("Loading airports data...");
      const resp = await fetch("/airports.dat.txt");
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }
      const text = await resp.text();
      console.log("Airport file loaded, length:", text.length);
      const lines = text.split("\n");
      console.log("Number of lines:", lines.length);
      const airports: Airport[] = lines
        .map((line): Airport | null => {
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
        .filter(
          (a): a is Airport =>
            a !== null &&
            a.type === "airport" &&
            Boolean(a.iata_code || a.icao_code)
        );
      console.log("Loaded airports:", airports.length);
      setAllAirports(airports);
      setAirportsLoaded(true);
    } catch (error) {
      console.error("Failed to load airports:", error);
      toast.error("Failed to load airport data");
    }
  }, [airportsLoaded]);

  // Load airports on mount
  useEffect(() => {
    loadAirports();
  }, [loadAirports]);

  // Debug airport loading
  useEffect(() => {
    console.log(
      "Airports loaded:",
      allAirports.length,
      "Airports loaded flag:",
      airportsLoaded
    );
  }, [allAirports, airportsLoaded]);

  // Debug rendering of availability section
  useEffect(() => {
    if (currentStep === 3) {
      console.log(
        "Rendering availability section - allAirports length:",
        allAirports.length,
        "airportsLoaded:",
        airportsLoaded,
        "availableRoutes:",
        formData.availableRoutes
      );
    }
  }, [currentStep, allAirports, airportsLoaded, formData.availableRoutes]);

  const getJetInfo = useCallback(async () => {
    if (!id) {
      toast.error("Invalid jet ID");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get(`/jets/charter/${id}`);
      if (response.data.success) {
        const data = response.data.data;

        // Parse availableRoutes from JSON if it's a string
        let parsedRoutes: Route[] = [];
        if (typeof data.availableRoutes === "string") {
          try {
            parsedRoutes = JSON.parse(data.availableRoutes);
          } catch (e) {
            // If parsing fails, create a single route with the string value
            parsedRoutes = [
              { departure: data.availableRoutes, destination: "" },
            ];
          }
        } else if (Array.isArray(data.availableRoutes)) {
          parsedRoutes = data.availableRoutes;
        } else {
          parsedRoutes = [{ departure: "", destination: "" }];
        }

        setFormData({
          jetName: data.jetName || "",
          aircraftType: data.aircraftType || "",
          manufacturer: data.manufacturer || "",
          yearOfManufacture: data.yearOfManufacture || "",
          registrationNumber: data.registrationNumber || "",
          seatingCapacity: data.seatingCapacity || "",
          cabinConfiguration: data.cabinConfiguration || "",
          maximumRange: data.maximumRange || "",
          cruisingSpeed: data.cruisingSpeed || "",
          baggageCapacity: data.baggageCapacity || "",
          homeBase: data.homeBase || "",
          availableRoutes: parsedRoutes,
          operatingDays: data.operatingDays || "",
          noticeRequired: data.noticeRequired || "",
          pricePerHour: data.pricePerHour || "",
          minimumFlightTime: data.minimumFlightTime || "",
          tripOption: data.tripOption
            ? (data.tripOption.toLowerCase().replace("_", "-") as
                | "round-trip"
                | "one-way"
                | "both")
            : "round-trip",
          additionalFees: data.additionalFees || [],
          discounts: data.discounts || "",
          cabinFeatures: data.cabinFeatures || [],
          inFlightMeals: data.inFlightMeals || false,
          flightAttendant: data.flightAttendant || false,
          petsAllowed: data.petsAllowed || false,
          smokingAllowed: data.smokingAllowed || false,
          exteriorImages: data.exteriorImages || null,
          interiorImages: data.interiorImages || null,
          videoLink: data.videoLink || "",
          luxuryCarService: data.luxuryCarService || false,
        });
      } else {
        throw new Error(response.data.message || "Failed to fetch jet details");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch jet details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    document.title = "Edit Jet Listing | Luxvana International";
    getJetInfo();
  }, [getJetInfo]);

  const validateStep = useCallback(
    (step: number): boolean => {
      const newErrors: FormErrors = {};
      switch (step) {
        case 1:
          if (!formData.jetName.trim())
            newErrors.jetName = "Jet name is required";
          if (!formData.aircraftType)
            newErrors.aircraftType = "Aircraft type is required";
          if (!formData.manufacturer.trim())
            newErrors.manufacturer = "Manufacturer is required";
          if (
            !formData.yearOfManufacture ||
            isNaN(Number(formData.yearOfManufacture)) ||
            Number(formData.yearOfManufacture) < 1900 ||
            Number(formData.yearOfManufacture) > new Date().getFullYear()
          ) {
            newErrors.yearOfManufacture =
              "Valid year (1900-current) is required";
          }
          if (!formData.registrationNumber.trim()) {
            newErrors.registrationNumber = "Registration number is required";
          }
          break;
        case 2:
          if (
            !formData.seatingCapacity ||
            isNaN(Number(formData.seatingCapacity)) ||
            Number(formData.seatingCapacity) < 1
          ) {
            newErrors.seatingCapacity =
              "Valid seating capacity (minimum 1) is required";
          }
          if (!formData.cabinConfiguration.trim()) {
            newErrors.cabinConfiguration = "Cabin configuration is required";
          }
          if (
            !formData.maximumRange ||
            isNaN(Number(formData.maximumRange)) ||
            Number(formData.maximumRange) < 0
          ) {
            newErrors.maximumRange =
              "Valid maximum range (non-negative) is required";
          }
          if (
            !formData.cruisingSpeed ||
            isNaN(Number(formData.cruisingSpeed)) ||
            Number(formData.cruisingSpeed) < 0
          ) {
            newErrors.cruisingSpeed =
              "Valid cruising speed (non-negative) is required";
          }
          if (!formData.baggageCapacity.trim()) {
            newErrors.baggageCapacity = "Baggage capacity is required";
          }
          break;
        case 3:
          if (!formData.homeBase.trim())
            newErrors.homeBase = "Home base is required";
          if (formData.availableRoutes.length === 0) {
            newErrors.availableRoutes =
              "At least one available route is required";
          }
          formData.availableRoutes.forEach((route, index) => {
            if (!route.departure.trim()) {
              newErrors[`availableRoutes[${index}].departure`] =
                "Departure airport is required";
            }
            if (!route.destination.trim()) {
              newErrors[`availableRoutes[${index}].destination`] =
                "Destination airport is required";
            }
          });
          if (!formData.operatingDays.trim())
            newErrors.operatingDays = "Operating days are required";
          if (!formData.noticeRequired.trim())
            newErrors.noticeRequired = "Notice period is required";
          break;
        case 4:
          if (
            !formData.pricePerHour ||
            isNaN(Number(formData.pricePerHour)) ||
            Number(formData.pricePerHour) < 0
          ) {
            newErrors.pricePerHour =
              "Valid price per hour (non-negative) is required";
          }
          if (
            !formData.minimumFlightTime ||
            isNaN(Number(formData.minimumFlightTime)) ||
            Number(formData.minimumFlightTime) < 0
          ) {
            newErrors.minimumFlightTime =
              "Valid minimum flight time (non-negative) is required";
          }
          formData.additionalFees.forEach((fee, index) => {
            if (!fee.name.trim()) {
              newErrors[`additionalFees[${index}].name`] =
                "Fee name is required";
            }
            if (
              !fee.price ||
              isNaN(Number(fee.price)) ||
              Number(fee.price) < 0
            ) {
              newErrors[`additionalFees[${index}].price`] =
                "Valid fee price (non-negative) is required";
            }
          });
          break;
        case 6:
          if (
            !formData.exteriorImages ||
            formData.exteriorImages.length === 0
          ) {
            newErrors.exteriorImages =
              "At least one exterior image is required";
          }
          if (
            !formData.interiorImages ||
            formData.interiorImages.length === 0
          ) {
            newErrors.interiorImages =
              "At least one interior image is required";
          }
          if (
            formData.videoLink &&
            !/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(
              formData.videoLink
            )
          ) {
            newErrors.videoLink = "Valid YouTube URL is required";
          }
          break;
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [formData]
  );

  const uploadToCloudinary = useCallback(
    async (files: FileList): Promise<string[]> => {
      const uploadPreset =
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || "images";
      const cloudName =
        process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || "dnsgznjyo";
      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      const urls: string[] = [];
      setUploading(true);

      try {
        const uploadPromises = Array.from(files).map(async (file) => {
          if (file.size > 10 * 1024 * 1024) {
            throw new Error(`File ${file.name} exceeds 10MB`);
          }
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", uploadPreset);

          const response = await axios.post(uploadUrl, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          return response.data.secure_url;
        });

        urls.push(...(await Promise.all(uploadPromises)));
        return urls;
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to upload images"
        );
        throw error;
      } finally {
        setUploading(false);
      }
    },
    []
  );

  const handleChange = useCallback(
    async (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
      index?: number
    ) => {
      console.log(index);
      const { name, value, type } = e.target;
      const checked = (e.target as HTMLInputElement).checked;
      const files = (e.target as HTMLInputElement).files;

      setFormData((prev) => {
        if (type === "checkbox" && name === "cabinFeatures") {
          return {
            ...prev,
            cabinFeatures: checked
              ? [...prev.cabinFeatures, value]
              : prev.cabinFeatures.filter((f) => f !== value),
          };
        } else if (type === "checkbox") {
          return { ...prev, [name]: checked };
        } else if (type === "file" && files) {
          uploadToCloudinary(files)
            .then((urls) => {
              setFormData((p) => ({ ...p, [name]: urls }));
              setErrors((p) => ({ ...p, [name]: "" }));
            })
            .catch(() => {});
          return prev;
        } else if (name.includes("additionalFees")) {
          const matches = name.match(/additionalFees\[(\d+)\]\.(.+)/);
          if (matches && matches.length >= 3) {
            const idx = parseInt(matches[1]);
            const field = matches[2];
            const updatedFees = [...prev.additionalFees];
            updatedFees[idx] = { ...updatedFees[idx], [field]: value };
            return { ...prev, additionalFees: updatedFees };
          }
        }
        return { ...prev, [name]: value };
      });

      setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    [uploadToCloudinary]
  );

  const addFee = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      additionalFees: [...prev.additionalFees, { name: "", price: "" }],
    }));
  }, []);

  const removeFee = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      additionalFees: prev.additionalFees.filter((_, i) => i !== index),
    }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      Object.keys(newErrors).forEach((key) => {
        if (key.startsWith(`additionalFees[${index}]`)) {
          delete newErrors[key];
        }
      });
      return newErrors;
    });
  }, []);

  const handleNextStep = useCallback(() => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentStep, validateStep]);

  const handlePrevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!id) {
        toast.error("Invalid jet ID");
        return;
      }
      if (validateStep(currentStep)) {
        if (currentStep === steps.length) {
          try {
            const payload = {
              ...formData,
              tripOption: formData.tripOption.toUpperCase().replace("-", "_"),
              exteriorImages: formData.exteriorImages || [],
              interiorImages: formData.interiorImages || [],
              additionalFees: formData.additionalFees || [],
              cabinFeatures: formData.cabinFeatures || [],
            };

            const response = await charterVendorApi.put(`/${id}`, payload);

            if (response.data.success) {
              toast.success("Jet listing updated successfully!");
              window.location.href = `/broker/charter/listings`;
            } else {
              throw new Error(
                response.data.message || "Failed to update jet listing"
              );
            }
          } catch (error) {
            toast.error(
              error instanceof Error
                ? error.message
                : "Failed to update jet listing. Please try again."
            );
          }
        } else {
          handleNextStep();
        }
      }
    },
    [currentStep, validateStep, handleNextStep, id]
  );

  const renderStepContent = useCallback(() => {
    if (loading) {
      return <div className="text-center text-gray-600">Loading...</div>;
    }
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              1. Jet Details
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Edit basic information about the aircraft.
            </p>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <InputField
                label="Jet Name / Model"
                name="jetName"
                value={formData.jetName}
                onChange={handleChange}
                error={errors.jetName}
                placeholder="Gulfstream G650"
                required
              />
              <div>
                <label
                  htmlFor="aircraftType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Aircraft Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="aircraftType"
                  name="aircraftType"
                  value={formData.aircraftType}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.aircraftType ? "border-red-500" : "border-gray-300"
                  } shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed`}
                  aria-invalid={!!errors.aircraftType}
                  aria-describedby={
                    errors.aircraftType ? "aircraftType-error" : undefined
                  }
                  required
                >
                  <option value="">Select type</option>
                  {aircraftTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.aircraftType && (
                  <p
                    id="aircraftType-error"
                    className="mt-1 text-sm text-red-600"
                  >
                    {errors.aircraftType}
                  </p>
                )}
              </div>
              <InputField
                label="Manufacturer"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
                error={errors.manufacturer}
                placeholder="Gulfstream, Bombardier, etc."
                required
              />
              <InputField
                label="Year of Manufacture"
                name="yearOfManufacture"
                type="number"
                value={formData.yearOfManufacture}
                onChange={handleChange}
                error={errors.yearOfManufacture}
                placeholder="2020"
                required
                min="1900"
                max={new Date().getFullYear()}
              />
              <div className="sm:col-span-2">
                <InputField
                  label="Registration Number"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  error={errors.registrationNumber}
                  placeholder="N12345"
                  required
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              2. Performance & Capacity
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Edit technical specifications and passenger capacity.
            </p>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <InputField
                label="Seating Capacity"
                name="seatingCapacity"
                type="number"
                value={formData.seatingCapacity}
                onChange={handleChange}
                error={errors.seatingCapacity}
                placeholder="8"
                required
                min="1"
              />
              <InputField
                label="Cabin Configuration"
                name="cabinConfiguration"
                value={formData.cabinConfiguration}
                onChange={handleChange}
                error={errors.cabinConfiguration}
                placeholder="Club + Divan, Beds available"
                required
              />
              <InputField
                label="Maximum Range (NM)"
                name="maximumRange"
                type="number"
                value={formData.maximumRange}
                onChange={handleChange}
                error={errors.maximumRange}
                placeholder="7500"
                required
                min="0"
              />
              <InputField
                label="Cruising Speed (knots)"
                name="cruisingSpeed"
                type="number"
                value={formData.cruisingSpeed}
                onChange={handleChange}
                error={errors.cruisingSpeed}
                placeholder="488"
                required
                min="0"
              />
              <div className="sm:col-span-2">
                <InputField
                  label="Baggage Capacity"
                  name="baggageCapacity"
                  value={formData.baggageCapacity}
                  onChange={handleChange}
                  error={errors.baggageCapacity}
                  placeholder="150 cubic feet"
                  required
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              3. Availability
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Edit when and where the jet is available for charter.
            </p>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <AirportSelector
                label="Home Base / Origin Airport"
                value={formData.homeBase}
                onChange={(code) => {
                  setFormData((prev) => ({ ...prev, homeBase: code }));
                  if (errors.homeBase) {
                    setErrors((prev) => ({ ...prev, homeBase: "" }));
                  }
                }}
                error={errors.homeBase}
                placeholder="Search for airport..."
                required
                airports={allAirports}
              />
              <InputField
                label="Operating Days"
                name="operatingDays"
                value={formData.operatingDays}
                onChange={handleChange}
                error={errors.operatingDays}
                placeholder="Monday-Friday, Weekends"
                required
              />
            </div>
            <div className="mt-6">
              <label
                htmlFor="availableRoutes"
                className="block text-sm font-medium text-gray-700"
              >
                Available Routes / Regions{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 space-y-4">
                {formData.availableRoutes.map((route, index) => (
                  <div key={index} className="flex items-end space-x-2">
                    <div className="flex-1">
                      <AirportSelector
                        label="departure"
                        value={route.departure}
                        onChange={(code) => {
                          const updatedRoutes = [...formData.availableRoutes];
                          updatedRoutes[index] = {
                            ...updatedRoutes[index],
                            departure: code,
                          };
                          setFormData((prev) => ({
                            ...prev,
                            availableRoutes: updatedRoutes,
                          }));
                          setErrors((prev) => ({
                            ...prev,
                            [`availableRoutes[${index}].departure`]: "",
                          }));
                        }}
                        error={errors[`availableRoutes[${index}].departure`]}
                        required
                        airports={allAirports}
                      />
                    </div>
                    <div className="flex-1">
                      <AirportSelector
                        label="destination"
                        value={route.destination}
                        onChange={(code) => {
                          const updatedRoutes = [...formData.availableRoutes];
                          updatedRoutes[index] = {
                            ...updatedRoutes[index],
                            destination: code,
                          };
                          setFormData((prev) => ({
                            ...prev,
                            availableRoutes: updatedRoutes,
                          }));
                          setErrors((prev) => ({
                            ...prev,
                            [`availableRoutes[${index}].destination`]: "",
                          }));
                        }}
                        error={errors[`availableRoutes[${index}].destination`]}
                        required
                        airports={allAirports}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          availableRoutes: prev.availableRoutes.filter(
                            (_, i) => i !== index
                          ),
                        }));
                        setErrors((prev) => {
                          const newErrors = { ...prev };
                          Object.keys(newErrors).forEach((key) => {
                            if (key.startsWith(`availableRoutes[${index}]`)) {
                              delete newErrors[key];
                            }
                          });
                          return newErrors;
                        });
                      }}
                      className="py-2 px-3 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={uploading}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      availableRoutes: [
                        ...prev.availableRoutes,
                        { departure: "", destination: "" },
                      ],
                    }));
                  }}
                  className="mt-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={uploading}
                >
                  Add Route
                </button>
              </div>
              {errors.availableRoutes && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.availableRoutes}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <InputField
                label="Notice Required Before Booking"
                name="noticeRequired"
                value={formData.noticeRequired}
                onChange={handleChange}
                error={errors.noticeRequired}
                placeholder="24 hours, 72 hours"
                required
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">4. Pricing</h2>
            <p className="mt-1 text-sm text-gray-500">
              Edit charter pricing information.
            </p>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="pricePerHour"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price per Hour (USD) <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="pricePerHour"
                    id="pricePerHour"
                    min="0"
                    step="100"
                    value={formData.pricePerHour}
                    onChange={handleChange}
                    className={`block w-full rounded-md border ${
                      errors.pricePerHour ? "border-red-500" : "border-gray-300"
                    } shadow-sm py-2 pl-7 pr-12 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed`}
                    placeholder="5000"
                    aria-invalid={!!errors.pricePerHour}
                    aria-describedby={
                      errors.pricePerHour ? "pricePerHour-error" : undefined
                    }
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">USD</span>
                  </div>
                </div>
                {errors.pricePerHour && (
                  <p
                    id="pricePerHour-error"
                    className="mt-1 text-sm text-red-600"
                  >
                    {errors.pricePerHour}
                  </p>
                )}
              </div>
              <InputField
                label="Minimum Flight Time (hours)"
                name="minimumFlightTime"
                type="number"
                value={formData.minimumFlightTime}
                onChange={handleChange}
                error={errors.minimumFlightTime}
                placeholder="2"
                required
                min="0"
                step="0.5"
              />
              <div>
                <label
                  htmlFor="tripOption"
                  className="block text-sm font-medium text-gray-700"
                >
                  Trip Option <span className="text-red-500">*</span>
                </label>
                <select
                  id="tripOption"
                  name="tripOption"
                  value={formData.tripOption}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="round-trip">Round-trip</option>
                  <option value="one-way">One-way</option>
                  <option value="both">Both options available</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Additional Fees
                </label>
                <div className="mt-2 space-y-4">
                  {formData.additionalFees.map((fee, index) => (
                    <div key={index} className="flex items-end space-x-2">
                      <div className="flex-1">
                        <InputField
                          label="Fee Name"
                          name={`additionalFees[${index}].name`}
                          value={fee.name}
                          onChange={(e) => handleChange(e, index)}
                          error={errors[`additionalFees[${index}].name`]}
                          placeholder="e.g., Standard Landing Fee"
                        />
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor={`additionalFees[${index}].price`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          Price (USD)
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="number"
                            id={`additionalFees[${index}].price`}
                            name={`additionalFees[${index}].price`}
                            min="0"
                            step="10"
                            value={fee.price}
                            onChange={(e) => handleChange(e, index)}
                            className={`block w-full rounded-md border ${
                              errors[`additionalFees[${index}].price`]
                                ? "border-red-500"
                                : "border-gray-300"
                            } shadow-sm py-2 pl-7 pr-12 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed`}
                            placeholder="100"
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">
                              USD
                            </span>
                          </div>
                        </div>
                        {errors[`additionalFees[${index}].price`] && (
                          <p
                            id={`additionalFees[${index}].price-error`}
                            className="mt-1 text-sm text-red-600"
                          >
                            {errors[`additionalFees[${index}].price`]}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFee(index)}
                        className="py-2 px-3 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={uploading}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFee}
                    className="mt-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={uploading}
                  >
                    Add Fee
                  </button>
                </div>
              </div>
              <div className="sm:col-span-2">
                <InputField
                  label="Discounts for Multi-Day Charters (optional)"
                  name="discounts"
                  value={formData.discounts}
                  onChange={handleChange}
                  placeholder="e.g., 10% off for 3+ days"
                />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              5. Amenities
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Edit onboard features and services.
            </p>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Cabin Features
                </label>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {cabinFeaturesOptions.map((feature) => (
                    <div key={feature} className="flex items-center">
                      <input
                        id={`feature-${feature}`}
                        name="cabinFeatures"
                        type="checkbox"
                        value={feature}
                        checked={formData.cabinFeatures.includes(feature)}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={uploading}
                      />
                      <label
                        htmlFor={`feature-${feature}`}
                        className="ml-2 block text-sm text-gray-700"
                      >
                        {feature}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {[
                {
                  name: "inFlightMeals",
                  label: "In-flight Meals / Catering Provided",
                },
                { name: "flightAttendant", label: "Flight Attendant Included" },
                { name: "petsAllowed", label: "Pets Allowed" },
                { name: "smokingAllowed", label: "Smoking Allowed" },
              ].map(({ name, label }) => (
                <div key={name}>
                  <label
                    htmlFor={name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {label}
                  </label>
                  <div className="mt-1">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name={name}
                        checked={formData[name as keyof FormData] as boolean}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={uploading}
                      />
                      <span className="ml-2 text-sm text-gray-700">Yes</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              6. Images & Media
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Edit visual assets to showcase your jet.
            </p>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <FileUpload
                label="Jet Exterior Images"
                name="exteriorImages"
                onChange={handleChange}
                error={errors.exteriorImages}
                images={formData.exteriorImages}
                uploading={uploading}
              />
              <FileUpload
                label="Jet Interior Images"
                name="interiorImages"
                onChange={handleChange}
                error={errors.interiorImages}
                images={formData.interiorImages}
                uploading={uploading}
              />
              <div className="sm:col-span-2">
                <InputField
                  label="Optional Video Tour (YouTube Link)"
                  name="videoLink"
                  type="url"
                  value={formData.videoLink}
                  onChange={handleChange}
                  error={errors.videoLink}
                  placeholder="https://www.youtube.com/watch?v=..."
                  disabled={uploading}
                />
              </div>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              7. Extra Services
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Edit additional luxury services.
            </p>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="luxuryCarService"
                  className="block text-sm font-medium text-gray-700"
                >
                  Luxury Car Pickup/Drop-off
                </label>
                <div className="mt-1">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="luxuryCarService"
                      checked={formData.luxuryCarService}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={uploading}
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Available (specify make/model in notes)
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      case 8:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">8. Review</h2>
            <p className="mt-1 text-sm text-gray-500">
              Review all details before updating.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Jet Details
                </h3>
                <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Jet Name
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.jetName || "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Aircraft Type
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.aircraftType || "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Manufacturer
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.manufacturer || "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Year of Manufacture
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.yearOfManufacture || "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Registration Number
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.registrationNumber || "Not provided"}
                    </dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Performance & Capacity
                </h3>
                <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Seating Capacity
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.seatingCapacity || "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Cabin Configuration
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.cabinConfiguration || "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Maximum Range
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.maximumRange || "Not provided"} NM
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Cruising Speed
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.cruisingSpeed || "Not provided"} knots
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Baggage Capacity
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.baggageCapacity || "Not provided"}
                    </dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Availability
                </h3>
                <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Home Base
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.homeBase || "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Available Routes
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.availableRoutes.length > 0
                        ? formData.availableRoutes
                            .map(
                              (route) =>
                                `${route.departure} to ${route.destination}`
                            )
                            .join(", ")
                        : "None"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Operating Days
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.operatingDays || "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Notice Required
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.noticeRequired || "Not provided"}
                    </dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Pricing</h3>
                <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Price per Hour
                    </dt>
                    <dd className="text-sm text-gray-900">
                      ${formData.pricePerHour || "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Minimum Flight Time
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.minimumFlightTime || "Not provided"} hours
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Trip Option
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.tripOption || "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Additional Fees
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.additionalFees.length > 0
                        ? formData.additionalFees
                            .map((fee) => `${fee.name}: $${fee.price}`)
                            .join(", ")
                        : "None"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Discounts
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.discounts || "None"}
                    </dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Amenities</h3>
                <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Cabin Features
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.cabinFeatures.length > 0
                        ? formData.cabinFeatures.join(", ")
                        : "None"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      In-flight Meals
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.inFlightMeals ? "Yes" : "No"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Flight Attendant
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.flightAttendant ? "Yes" : "No"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Pets Allowed
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.petsAllowed ? "Yes" : "No"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Smoking Allowed
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.smokingAllowed ? "Yes" : "No"}
                    </dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Images & Media
                </h3>
                <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Exterior Images
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.exteriorImages?.length || "None"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Interior Images
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.interiorImages?.length || "None"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Video Link
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.videoLink || "None"}
                    </dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Extra Services
                </h3>
                <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Luxury Car Service
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formData.luxuryCarService ? "Yes" : "No"}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  }, [
    currentStep,
    formData,
    errors,
    handleChange,
    uploading,
    addFee,
    removeFee,
    loading,
    allAirports, // Add allAirports to dependencies
  ]);

  return (
    <div className="min-h-screen w-[900px] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Edit Charter Jet Listing
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Update your private jet listing for charter services
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex-1 text-center text-sm font-medium ${
                  step.id <= currentStep ? "text-gray-800" : "text-gray-400"
                }`}
              >
                {step.title}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-gray-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
          {renderStepContent()}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={handlePrevStep}
              disabled={currentStep === 1 || uploading || loading}
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              type={currentStep === steps.length ? "submit" : "button"}
              onClick={currentStep < steps.length ? handleNextStep : undefined}
              disabled={uploading || loading}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading || loading
                ? "Processing..."
                : currentStep === steps.length
                ? "Update Listing"
                : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BEL;
