import axiosInstance from "@/lib/api";
import {
  Car,
  Fuel,
  Gauge,
  MapPin,
  Settings,
  Users,
  Wrench,
  ShieldCheck,
  Calendar,
  Clock,
  Heart,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JetCardSkeleton } from "@/components/LoadingSkeleton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

// Brand logos - high-quality transparent PNGs
const BRANDS = [
  {
    name: "BMW",
    logo: "https://www.carlogos.org/car-logos/bmw-logo-2020-gray.png",
  },
  {
    name: "Mercedes-Benz",
    logo: "https://www.carlogos.org/logo/Mercedes-Benz-logo-2011-1920x1080.png",
  },
  {
    name: "Toyota",
    logo: "https://www.carlogos.org/car-logos/toyota-logo-2020-europe-640.png",
  },
  {
    name: "Tesla",
    logo: "https://www.carlogos.org/logo/Tesla-logo-2003-2500x2500.png",
  },
  {
    name: "Rolls-Royce",
    logo: "https://www.carlogos.org/logo/Rolls-Royce-logo-2048x2048.png",
  },
  {
    name: "Bugatti",
    logo: "https://www.carlogos.org/logo/Bugatti-logo-1024x768.png",
  },
  {
    name: "Ferrari",
    logo: "https://www.carlogos.org/car-logos/ferrari-logo-2002-640.png",
  },
];

function CarForRent() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  // Search/filter state
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("all");
  const [carType, setCarType] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const allCars = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/cars/client/all");
      if (response.data.success) {
        setCars(response.data.cars);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      toast(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    allCars();
  }, []);

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  // Get unique brands and car types from cars
  const brandOptions = Array.from(new Set(cars.map((c) => c.brand))).filter(
    Boolean
  );
  const carTypeOptions = Array.from(new Set(cars.map((c) => c.carType))).filter(
    Boolean
  );

  // Filtered cars
  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      search.trim() === "" ||
      car.brand.toLowerCase().includes(search.toLowerCase()) ||
      car.model.toLowerCase().includes(search.toLowerCase()) ||
      car.location?.toLowerCase().includes(search.toLowerCase());
    const matchesBrand = brand === "all" || car.brand === brand;
    const matchesType = carType === "all" || car.carType === carType;
    const matchesMin = !minPrice || car.price >= Number(minPrice);
    const matchesMax = !maxPrice || car.price <= Number(maxPrice);
    return (
      matchesSearch && matchesBrand && matchesType && matchesMin && matchesMax
    );
  });
  const sponsoredCars = filteredCars
    .filter((car) => car.sponsored)
    .sort((a, b) => b.price - a.price);
  const otherCars = filteredCars
    .filter((car) => !car.sponsored)
    .sort((a, b) => b.price - a.price);

  const renderCar = (car: any, isSponsored: boolean) => (
    <div
      key={car.id}
      className={`relative group bg-white border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col ${
        isSponsored ? "border-yellow-400 shadow-lg" : "border-gray-200"
      }`}
    >
      <div className="relative">
        <Carousel className="w-full h-56 sm:h-64">
          <CarouselContent className="h-full">
            {car.images && car.images.length > 0 ? (
              car.images.map((img: string, idx: number) => (
                <CarouselItem key={idx} className="h-56 sm:h-64">
                  <img
                    src={img}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) =>
                      (e.currentTarget.src = "/images/car-placeholder.jpg")
                    }
                  />
                </CarouselItem>
              ))
            ) : (
              <CarouselItem className="h-56 sm:h-64 flex items-center justify-center bg-gray-100">
                <span className="text-gray-500 text-base">
                  No Image Available
                </span>
              </CarouselItem>
            )}
          </CarouselContent>
          <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="right-2 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {isSponsored && (
            <Badge className="bg-yellow-400 text-yellow-900 font-bold shadow">
              Sponsored
            </Badge>
          )}
          {car.condition === "BRAND_NEW" && (
            <Badge variant="secondary">Brand New</Badge>
          )}
          {!car.isAvailable && <Badge variant="destructive">Unavailable</Badge>}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(car.id);
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${
              favorites.has(car.id)
                ? "fill-red-500 text-red-500"
                : "text-gray-400"
            }`}
          />
        </button>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 truncate group-hover:text-primary transition-colors">
          {car.brand} {car.model}
        </h3>
        <div className="flex items-center text-gray-500 text-sm mt-1 mb-4">
          <MapPin className="w-4 h-4 mr-1.5" />
          <span>{car.year}</span>
          <span className="mx-2">•</span>
          <span>{car.location}</span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700 mb-4">
          <div className="flex items-center">
            <Car className="w-4 h-4 mr-2 text-gray-500" />
            <span>{car.carType}</span>
          </div>
          <div className="flex items-center">
            <Settings className="w-4 h-4 mr-2 text-gray-500" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2 text-gray-500" />
            <span>{car.seats} Seats</span>
          </div>
          <div className="flex items-center">
            <Fuel className="w-4 h-4 mr-2 text-gray-500" />
            <span>{car.fuel}</span>
          </div>
          <div className="flex items-center">
            <Wrench className="w-4 h-4 mr-2 text-gray-500" />
            <span>{car.engineSize}</span>
          </div>
          <div className="flex items-center">
            <Gauge className="w-4 h-4 mr-2 text-gray-500" />
            <span>{car.horsepower} hp</span>
          </div>
        </div>
        <div className="flex-grow" />
        <div className="flex flex-wrap gap-1">
          {car.features?.slice(0, 4).map((feature: string) => (
            <Badge key={feature} variant="secondary" className="font-normal">
              {feature}
            </Badge>
          ))}
          {car.features?.length > 4 && (
            <Badge variant="outline" className="font-normal">
              +{car.features.length - 4} more
            </Badge>
          )}
        </div>
      </div>
      <div className="px-6 pb-6 mt-auto">
        <div className="flex justify-between items-center border-t pt-4">
          <div>
            <span className="text-lg font-bold text-primary">
              ${car.price.toLocaleString()} / day
            </span>
            <p className="text-xs text-gray-500">+ taxes & fees</p>
          </div>
          <Button
            onClick={() => (window.location.href = "/cars/rent/" + car.id)}
            className="bg-primary text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-primary/90 transition-all"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-white font-sans">
      {/* Hero Section - Fullscreen Video */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden mb-0 p-0">
        <video
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
          src="/video6.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center">
          <p className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase text-white drop-shadow-xl px-4">
            cars for rent
          </p>
        </div>
      </section>

      {/* Our Top Brands - Minimalistic & Luxurious, moved above filters */}
      <section className="mb-20 mt-16 md:mt-24">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-black tracking-wider uppercase">
          Our Top Brands
        </h2>
        <div className="flex justify-center mb-8">
          <div className="w-24 h-1 rounded-full bg-gradient-to-r from-black/10 via-black/30 to-black/10 opacity-70" />
        </div>
        <div className="flex flex-wrap justify-center gap-x-16 gap-y-10 px-2">
          {BRANDS.map((brand) => (
            <div
              key={brand.name}
              className="flex flex-col items-center min-w-[100px] max-w-[140px]"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-16 w-auto object-contain mb-2 transition-transform duration-300 hover:scale-110 hover:drop-shadow-lg"
                style={{ filter: "grayscale(100%)", transition: "filter 0.3s" }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.filter = "grayscale(0%)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.filter = "grayscale(100%)")
                }
              />
              <span className="text-base font-medium text-gray-800 mt-1 tracking-wide">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="mb-24 flex justify-center">
        <form
          className="w-full max-w-5xl bg-white rounded-2xl shadow-lg border border-black/10 flex flex-col md:flex-row md:items-center gap-6 md:gap-4 px-6 py-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex items-center gap-2 flex-1">
            <svg
              className="w-5 h-5 text-black/40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <Input
              type="text"
              placeholder="Search brand, model, or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-[120px] bg-transparent border-0 rounded-xl px-2 py-3 text-base focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>
          <div className="flex items-center gap-2 min-w-[140px]">
            <svg
              className="w-5 h-5 text-black/40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="7" width="18" height="13" rx="2" />
              <path d="M16 3v4M8 3v4" />
            </svg>
            <Select value={brand} onValueChange={setBrand}>
              <SelectTrigger className="bg-transparent border-0 rounded-xl px-2 py-3 text-base focus:ring-2 focus:ring-black focus:border-black">
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {brandOptions.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 min-w-[140px]">
            <svg
              className="w-5 h-5 text-black/40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="7" width="18" height="13" rx="2" />
              <path d="M16 3v4M8 3v4" />
            </svg>
            <Select value={carType} onValueChange={setCarType}>
              <SelectTrigger className="bg-transparent border-0 rounded-xl px-2 py-3 text-base focus:ring-2 focus:ring-black focus:border-black">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {carTypeOptions.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 min-w-[110px]">
            <svg
              className="w-5 h-5 text-black/40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M4 17v-1a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <Input
              type="number"
              min={0}
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-20 bg-transparent border-0 rounded-xl px-2 py-3 text-base focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>
          <div className="flex items-center gap-2 min-w-[110px]">
            <svg
              className="w-5 h-5 text-black/40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M4 17v-1a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <Input
              type="number"
              min={0}
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-20 bg-transparent border-0 rounded-xl px-2 py-3 text-base focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>
          <Button
            type="submit"
            className="bg-black text-white px-8 py-3 rounded-xl font-semibold shadow hover:bg-gray-900 transition-all"
          >
            Filter
          </Button>
        </form>
      </section>

      {/* Why Choose Us Section */}
      <section className="mb-28">
        <h2 className="text-2xl font-bold mb-16 text-center text-black tracking-wider uppercase">
          Why Choose Us
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 px-2">
          <div className="flex flex-col items-center text-center gap-3">
            <ShieldCheck className="w-16 h-16 text-black mb-2" />
            <span className="text-lg font-semibold text-black tracking-wide">
              Premium Quality
            </span>
            <span className="text-gray-500 text-base max-w-xs">
              Meticulously maintained, flawless vehicles.
            </span>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <Calendar className="w-16 h-16 text-black mb-2" />
            <span className="text-lg font-semibold text-black tracking-wide">
              Flexible Rental
            </span>
            <span className="text-gray-500 text-base max-w-xs">
              Daily, weekly, or monthly plans.
            </span>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <Clock className="w-16 h-16 text-black mb-2" />
            <span className="text-lg font-semibold text-black tracking-wide">
              24/7 Support
            </span>
            <span className="text-gray-500 text-base max-w-xs">
              Always here for you, anytime.
            </span>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <Car className="w-16 h-16 text-black mb-2" />
            <span className="text-lg font-semibold text-black tracking-wide">
              Wide Selection
            </span>
            <span className="text-gray-500 text-base max-w-xs">
              Sports cars to luxury SUVs.
            </span>
          </div>
        </div>
      </section>

      {/* Car Listings */}
      <section className="bg-white py-24 mb-32">
        <div className="flex flex-col items-center mb-12">
          <div className="w-24 h-1 rounded-full bg-gradient-to-r from-black/10 via-black/30 to-black/10 mb-8" />
          <h1 className="text-4xl font-extrabold text-black tracking-tight uppercase mb-2 text-center">
            Available Cars
          </h1>
          <p className="text-lg text-gray-500 font-light text-center max-w-2xl">
            Browse our curated selection of luxury vehicles, meticulously
            maintained and ready for your next journey.
          </p>
        </div>
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
              {[...Array(6)].map((_, i) => (
                <JetCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              {sponsoredCars.length > 0 && (
                <section className="mb-16">
                  <h2 className="text-2xl font-bold mb-8 text-black tracking-tight uppercase text-center">
                    Featured Listings
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
                    {sponsoredCars.map((car) => renderCar(car, true))}
                  </div>
                </section>
              )}
              <section>
                <h2 className="text-2xl font-bold mb-8 text-black tracking-tight uppercase text-center">
                  All Vehicles
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
                  {otherCars.map((car) => renderCar(car, false))}
                </div>
              </section>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default CarForRent;
