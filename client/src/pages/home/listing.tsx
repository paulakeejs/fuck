import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/api";

interface JetListing {
  id: string;
  manufacturer: string;
  model: string;
  year: number;
  price: string;
  exteriorImageUrls: string[];
  sponsoredType: string;
  maxPassengers?: number;
  amenities?: string[];
  seatingCapacity?: number;
}

// Inline JetCard component matching the provided design
function HomeJetCard({ jet }: { jet: any }) {
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
        {jet.sponsoredType === "Elite Boost" && (
          <div className="absolute top-3 left-3 bg-black text-white px-2 py-1 text-xs font-medium tracking-wide rounded">
            ELITE
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

function JetCollection() {
  const [jets, setJets] = useState<JetListing[]>([]);
  const [loading, setLoading] = useState(true);

  // New: Store all jets for random selection
  const [allJets, setAllJets] = useState<JetListing[]>([]);

  const getListings = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/jets/sale/index");

      if (response.data.success) {
        // Map all jets to JetListing interface
        const all = response.data.data.map((jet: any) => ({
          id: jet.id,
          manufacturer: jet.manufacturer,
          model: jet.model,
          year: jet.year,
          price: jet.price,
          exteriorImageUrls: jet.exteriorImageUrls || [],
          sponsoredType: jet.sponsoredType || "",
          maxPassengers: jet.maxPassengers || jet.seatingCapacity || 0,
          amenities: jet.amenities || [],
        }));
        setAllJets(all);
        // Filter elite jets
        const eliteJets = all.filter(
          (jet: any) => jet.sponsoredType === "Elite Boost"
        );
        setJets(eliteJets);
      }
    } catch (e: any) {
      console.error("Failed to fetch jet listings:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListings();
  }, []);

  // Helper to get 4 jets: prefer elite, fill with random others
  const getDisplayJets = () => {
    const eliteJets = jets;
    const nonEliteJets = allJets.filter(
      (jet) => jet.sponsoredType !== "Elite Boost"
    );
    let displayJets: JetListing[] = [];
    if (eliteJets.length === 0) {
      // No elite: pick 4 random from all
      const shuffled = [...allJets].sort(() => 0.5 - Math.random());
      displayJets = shuffled.slice(0, 4);
    } else if (eliteJets.length < 4) {
      // Fewer than 4 elite: fill with random non-elite
      const needed = 4 - eliteJets.length;
      const shuffled = [...nonEliteJets].sort(() => 0.5 - Math.random());
      displayJets = [...eliteJets, ...shuffled.slice(0, needed)];
    } else {
      // 4 or more elite
      displayJets = eliteJets.slice(0, 4);
    }
    return displayJets;
  };

  const displayJets = getDisplayJets();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-100 h-12 w-12"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-2">
              <span className="font-medium text-gold-500">Elite</span> Jet
              Collection
            </h2>
            <p className="text-gray-500 font-light">
              Curated selection of the world's most exclusive private aircraft
            </p>
          </div>
          <Link
            to="/jets"
            className="group flex items-center gap-1 text-gold-600 hover:text-gold-700 transition-colors"
          >
            View all
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 2 big cards, 2 small cards, 2 per row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayJets.slice(0, 2).map((jet) => (
            <div key={jet.id} className="col-span-1">
              <HomeJetCard
                jet={{
                  ...jet,
                  maxPassengers: jet.maxPassengers ?? 0,
                  amenities: jet.amenities ?? [],
                }}
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {displayJets.slice(2, 4).map((jet) => (
            <div key={jet.id} className="col-span-1">
              <HomeJetCard
                jet={{
                  ...jet,
                  maxPassengers: jet.maxPassengers ?? 0,
                  amenities: jet.amenities ?? [],
                }}
              />
            </div>
          ))}
        </div>

        {displayJets.length === 0 && !loading && (
          <div className="text-center py-16 bg-white">
            <p className="text-gray-500">
              No elite jets available at the moment
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default JetCollection;
