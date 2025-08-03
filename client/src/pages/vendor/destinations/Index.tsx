import axiosInstance from "@/lib/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiStar,
  FiChevronRight,
  FiMapPin,
  FiHeart,
  FiAward,
  FiShield,
} from "react-icons/fi";

interface RoomType {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  amenities: string[];
}

interface Destination {
  id: string;
  propertyName: string;
  city: string;
  country: string;
  description: string;
  starRating: number;
  amenities: string[];
  roomTypes: RoomType[];
  mainImageUrl: string;
}

interface PropertyCategory {
  id: string;
  name: string;
  imageUrl: string;
  subtitle: string;
}

interface LuxuryLocation {
  id: number;
  name: string;
  imageUrl: string;
  properties: string;
  highlight: string;
  rating: number;
}

// Property Categories with enhanced luxury branding
const propertyCategories: PropertyCategory[] = [
  {
    id: "hotels",
    name: "Luxury Hotels",
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    subtitle: "Urban Sanctuaries",
  },
  {
    id: "apartments",
    name: "Penthouse Suites",
    imageUrl:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    subtitle: "Sky-High Living",
  },
  {
    id: "resorts",
    name: "Private Resorts",
    imageUrl:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    subtitle: "Tropical Paradise",
  },
  {
    id: "villas",
    name: "Executive Villas",
    imageUrl:
      "https://images.unsplash.com/photo-1582719471387-9c060e17d652?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    subtitle: "Private Estates",
  },
  {
    id: "cabins",
    name: "Alpine Retreats",
    imageUrl:
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    subtitle: "Mountain Escapes",
  },
];

// Luxury Locations Data
const luxuryLocations: LuxuryLocation[] = [
  {
    id: 1,
    name: "Santorini, Greece",
    imageUrl:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    properties: "120+ Luxury Villas",
    highlight: "Sunset Views",
    rating: 9.8,
  },
  {
    id: 2,
    name: "Maldives",
    imageUrl:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    properties: "80+ Overwater Bungalows",
    highlight: "Private Beaches",
    rating: 9.9,
  },
  {
    id: 3,
    name: "St. Moritz, Switzerland",
    imageUrl:
      "https://images.unsplash.com/photo-1605540436563-5bca919ae766?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    properties: "45+ Alpine Retreats",
    highlight: "Ski-in/Ski-out",
    rating: 9.7,
  },
  {
    id: 4,
    name: "Kyoto, Japan",
    imageUrl:
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1453&q=80",
    properties: "60+ Ryokan Inns",
    highlight: "Cultural Heritage",
    rating: 9.6,
  },
  {
    id: 5,
    name: "Amalfi Coast, Italy",
    imageUrl:
      "https://images.unsplash.com/photo-1519683109079-d5f539e1542f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    properties: "90+ Cliffside Villas",
    highlight: "Mediterranean Charm",
    rating: 9.8,
  },
  {
    id: 6,
    name: "Bora Bora, French Polynesia",
    imageUrl:
      "https://images.unsplash.com/photo-1579199311669-35a89b5d5af0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    properties: "50+ Luxury Resorts",
    highlight: "Turquoise Lagoons",
    rating: 9.9,
  },
  {
    id: 7,
    name: "Dubai, UAE",
    imageUrl:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    properties: "100+ Skyline Hotels",
    highlight: "Ultra-Modern Luxury",
    rating: 9.5,
  },
  {
    id: 8,
    name: "Seychelles",
    imageUrl:
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1368&q=80",
    properties: "40+ Private Islands",
    highlight: "Granite Rock Formations",
    rating: 9.8,
  },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 80 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1,
    },
  },
};

const luxurySlideUp = {
  hidden: { y: 100, opacity: 0, scale: 0.95 },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { y: 60, opacity: 0, scale: 0.9 },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const shimmerVariants = {
  hidden: { x: "-100%" },
  show: {
    x: "100%",
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: "linear",
    },
  },
};

export default function LuxuryDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 1000], [0, -300]);
  const textParallax = useTransform(scrollY, [0, 500], [0, 150]);
  const overlayOpacity = useTransform(scrollY, [0, 400], [0.3, 0.6]);

  const fetchRecommended = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        "/destinations/client/recommended"
      );
      if (response.data.success) {
        setDestinations(response.data.data);
      } else {
        throw new Error(response.data.message || "Failed to fetch data");
      }
    } catch (error: any) {
      console.error("Error fetching destinations:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch recommended stays"
      );
    } finally {
      setLoading(false);
    }
  };

  const getStartingPrice = (roomTypes: RoomType[]): number => {
    if (!roomTypes?.length) return 0;
    return Math.min(...roomTypes.map((room) => room.basePrice));
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
        toast.success("Removed from favorites");
      } else {
        newFavorites.add(id);
        toast.success("Added to favorites");
      }
      return newFavorites;
    });
  };

  useEffect(() => {
    fetchRecommended();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Styled like VendorHero */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            className="absolute inset-0 min-w-full min-h-full object-cover w-full h-full"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/dubai.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-opacity-60" />
        </div>

        {/* Content container */}
        <div className="relative z-10 max-w-4xl px-6 text-center flex items-center justify-center h-full">
          {/* Single centered sentence */}
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-tight">
            <span className="font-medium">Extraordinary</span> Destinations
          </h1>
        </div>
      </section>

      {/* Property Categories */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header - Styled like VendorBenefits */}
          <div className="text-center mb-20">
            <div className="flex justify-center">
              <div className="w-16 h-px bg-amber-500 mb-4" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-black mb-4">
              Discover Your <span className="font-medium">Perfect Stay</span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 font-light">
              Curated collection of the world's most exquisite accommodations
            </p>
          </div>

          {/* Property Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {propertyCategories.map((category) => (
              <div
                key={category.id}
                className="group border-b border-gray-100 pb-8 hover:border-amber-300 transition-colors duration-500"
              >
                <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-6">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-gray-900 text-xs font-medium">
                      PREMIUM
                    </span>
                  </div>
                </div>
                <h3 className="font-serif text-xl font-medium mb-3 group-hover:text-amber-500 transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  {category.subtitle}
                </p>
                <div className="mt-4 text-xs text-gray-400 tracking-widest">
                  EXCLUSIVE SELECTION
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Properties */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header - Styled like VendorBenefits */}
          <div className="text-center mb-20">
            <div className="flex justify-center">
              <div className="w-16 h-px bg-amber-500 mb-4" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-black mb-4">
              Our <span className="font-medium">Signature</span> Properties
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 font-light">
              Carefully selected for their exceptional quality, service
              excellence, and unique character that defines luxury hospitality.
            </p>
          </div>
          {loading ? (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden"
                >
                  <div className="aspect-video bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 relative overflow-hidden">
                    <motion.div
                      variants={shimmerVariants}
                      initial="hidden"
                      animate="show"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-3/4" />
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-1/2" />
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-1/4" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {destinations.map((destination) => (
                <motion.div
                  key={destination.id}
                  variants={cardVariants}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3 },
                  }}
                  onHoverStart={() => setHoveredCard(destination.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="group border-b border-gray-100 pb-8 hover:border-amber-300 transition-colors duration-500 bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-6">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(destination.id);
                      }}
                      className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors duration-300"
                    >
                      <FiHeart
                        className={`w-5 h-5 ${
                          favorites.has(destination.id)
                            ? "text-red-500 fill-current"
                            : "text-gray-600"
                        }`}
                      />
                    </button>
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-gray-900 text-xs font-medium">
                        PREMIUM
                      </span>
                    </div>
                    <img
                      src={destination.mainImageUrl || "/placeholder-hotel.jpg"}
                      alt={destination.propertyName}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <motion.h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                        {destination.propertyName}
                      </motion.h3>
                      <p className="text-gray-500 flex items-center">
                        <FiMapPin className="mr-2 text-amber-500" size={14} />
                        {destination.city}, {destination.country}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-bold px-3 py-1 rounded-lg flex items-center shadow-md">
                        <FiAward className="mr-1" size={12} />
                        9.{Math.floor(Math.random() * 4) + 6}
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        Exceptional
                      </div>
                      <div className="text-sm text-gray-500">
                        ({Math.floor(Math.random() * 500) + 200} reviews)
                      </div>
                    </div>
                    {destination.amenities &&
                      destination.amenities.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {destination.amenities
                              .slice(0, 3)
                              .map((amenity, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                                >
                                  {amenity}
                                </span>
                              ))}
                            {destination.amenities.length > 3 && (
                              <span className="px-2 py-1 bg-amber-100 text-amber-600 text-xs rounded-full">
                                +{destination.amenities.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex justify-between items-end">
                        <div className="text-sm text-gray-500">
                          <div className="flex items-center gap-1 mb-1">
                            <FiShield size={12} />
                            Includes taxes & fees
                          </div>
                          <div>Aug 16 - Aug 17</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500 mb-1">From</div>
                          <motion.div
                            className="text-2xl font-bold text-gray-900"
                            whileHover={{ scale: 1.05 }}
                          >
                            $
                            {getStartingPrice(
                              destination.roomTypes
                            ).toLocaleString()}
                          </motion.div>
                          <div className="text-xs text-gray-500">
                            $
                            {(
                              getStartingPrice(destination.roomTypes) * 1.2
                            ).toLocaleString()}{" "}
                            total
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link
                      to={`/property/${destination.id}`}
                      className="block w-full mt-4 py-3 text-center border border-amber-500 text-amber-500 font-medium tracking-wide hover:bg-amber-500 hover:text-white transition-colors duration-300"
                      aria-label={`View details for ${destination.propertyName}`}
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Luxury Locations */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header - Styled like VendorBenefits */}
          <div className="text-center mb-20">
            <div className="flex justify-center">
              <div className="w-16 h-px bg-amber-500 mb-4" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-black mb-4">
              Luxury <span className="font-medium">Locations</span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 font-light">
              Discover the world's most exclusive destinations, where luxury and
              natural beauty create unforgettable experiences.
            </p>
          </div>

          {/* Luxury Locations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {luxuryLocations.map((location) => (
              <div
                key={location.id}
                className="group border-b border-gray-100 pb-8 hover:border-amber-300 transition-colors duration-500"
              >
                <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-6">
                  <img
                    src={location.imageUrl}
                    alt={location.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-full px-3 py-2 flex items-center text-sm font-bold shadow-lg">
                    <FiStar className="text-amber-400 mr-1 fill-current" />
                    {location.rating.toFixed(1)}
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-gray-900 text-xs font-medium">
                      FEATURED
                    </span>
                  </div>
                </div>
                <h3 className="font-serif text-xl font-medium mb-3 group-hover:text-amber-500 transition-colors duration-300">
                  {location.name}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  {location.properties}
                </p>
                <div className="flex items-center text-amber-300 text-sm font-medium mt-2">
                  <FiStar className="mr-2 fill-current" />
                  {location.highlight}
                </div>
                <div className="mt-4 text-xs text-gray-400 tracking-widest">
                  EXCLUSIVE DESTINATION
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a
              href="#"
              className="inline-block border border-amber-500 text-amber-500 px-8 py-2.5 text-sm tracking-wide hover:bg-amber-500 hover:text-white transition-colors duration-300"
            >
              Explore All Destinations
            </a>
          </div>
        </div>
      </section>

      {/* Luxury Experience Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header - Styled like VendorBenefits */}
          <div className="text-center mb-20">
            <div className="flex justify-center">
              <div className="w-16 h-px bg-amber-500 mb-4" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-black mb-4">
              The <span className="font-medium">Luxvana</span> Experience
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 font-light">
              Indulge in unparalleled luxury with our bespoke services designed
              to elevate your travel experience to extraordinary heights.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ul className="space-y-6">
                {[
                  "24/7 dedicated concierge service",
                  "VIP access to exclusive events and venues",
                  "Personalized itineraries tailored to your preferences",
                  "Luxury spa and wellness facilities",
                  "Private chef and catering services",
                  "Premium transportation and private transfers",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-amber-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-lg text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <a
                  href="#"
                  className="inline-block border border-amber-500 text-amber-500 px-8 py-2.5 text-sm tracking-wide hover:bg-amber-500 hover:text-white transition-colors duration-300"
                >
                  Learn More About Our Services
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Luxury Experience"
                  className="w-full h-auto"
                />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-amber-600 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-medium text-gray-900">
                      Award-winning Service
                    </span>
                  </div>
                  <div className="mt-2 flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-amber-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <div className="font-medium text-gray-900 mb-2">
                    Trusted by 100K+ guests
                  </div>
                  <div className="flex -space-x-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <img
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white"
                        src={`https://randomuser.me/api/portraits/${
                          i % 2 === 0 ? "women" : "men"
                        }/${i + 20}.jpg`}
                        alt="User"
                      />
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-amber-500 flex items-center justify-center text-white text-xs font-bold">
                      +99k
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
