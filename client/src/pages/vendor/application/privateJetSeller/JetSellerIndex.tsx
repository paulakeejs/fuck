import { useEffect, useState } from "react";
import video from "/video.mp4";
import { toast } from "sonner";
import axiosInstance from "@/lib/api";

// Custom styles for Swiper
const swiperStyles = `
  .sponsored-jets-swiper .swiper-button-prev,
  .sponsored-jets-swiper .swiper-button-next {
    color: #9CA3AF;
    width: 40px;
    height: 40px;
    background: white;
    border-radius: 50%;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
  }
  
  .sponsored-jets-swiper .swiper-button-prev:hover,
  .sponsored-jets-swiper .swiper-button-next:hover {
    color: #4B5563;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
  
  .sponsored-jets-swiper .swiper-button-prev::after,
  .sponsored-jets-swiper .swiper-button-next::after {
    font-size: 16px;
    font-weight: bold;
  }
  
  .sponsored-jets-swiper .swiper-pagination {
    position: relative;
    margin-top: 32px;
  }
  
  .sponsored-jets-swiper .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    background: #D1D5DB;
    opacity: 1;
    transition: all 0.2s ease;
  }
  
  .sponsored-jets-swiper .swiper-pagination-bullet-active {
    background: #9CA3AF;
    transform: scale(1.2);
  }

  /* News Slider Styles */
  .news-swiper {
    overflow: visible;
  }

  .news-swiper .swiper-slide {
    height: auto;
  }

  .news-swiper-slide {
    position: relative;
    height: 100%;
    background: white;
    transition: all 0.3s ease;
  }

  .news-swiper-slide:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .damimage_animate {
    overflow: hidden;
  }

  .damimage_animate img {
    transition: transform 0.6s ease;
  }

  .news-swiper-slide:hover .damimage_animate img {
    transform: scale(1.05);
  }

  .textbox_animate {
    transition: all 0.3s ease;
  }

  .news-swiper-slide:hover .textbox_animate {
    transform: translateY(-2px);
  }

  .news-item__text {
    color: #1e40af;
    transition: color 0.2s ease;
  }

  .news-swiper-slide:hover .news-item__text {
    color: #1d4ed8;
  }

  .text-coral-white {
    color: #f97316;
  }

  .text-gray-dark {
    color: #6b7280;
  }

  .text-blue {
    color: #1e40af;
  }

  /* Animation classes */
  .animation-wrapper {
    overflow: hidden;
  }

  .labels-container {
    transition: transform 0.3s ease-in-out;
  }

  .elements-container {
    transform: translateY(100%);
    transition: transform 0.3s ease-in-out;
  }

  .group:hover .labels-container {
    transform: translateY(-100%);
  }

  .group:hover .elements-container {
    transform: translateY(0);
  }

  /* Pagination styles */
  .news-swiper-pagination {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin-top: 24px;
  }

  .news-swiper-pagination .swiper-pagination-bullet {
    width: 40px;
    height: 2px;
    background: #d1d5db;
    border-radius: 0;
    opacity: 1;
    transition: all 0.3s ease;
  }

  .news-swiper-pagination .swiper-pagination-bullet-active {
    background: #1e40af;
    transform: scaleX(1.2);
  }

  /* Navigation buttons */
  .news-swiper-button-prev,
  .news-swiper-button-next {
    color: #1e40af;
    width: 40px;
    height: 40px;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
  }

  .news-swiper-button-prev:hover,
  .news-swiper-button-next:hover {
    color: #1d4ed8;
    border-color: #1e40af;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  .news-swiper-button-prev::after,
  .news-swiper-button-next::after {
    font-size: 14px;
    font-weight: bold;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .news-swiper-pagination {
      margin-top: 16px;
    }
    
    .news-swiper-pagination .swiper-pagination-bullet {
      width: 30px;
    }
  }
`;

// Type for Jet
interface Jet {
  id: string | number;
  exteriorImageUrls: string[];
  model: string;
  manufacturer: string;
  year: string | number;
  refurbishmentDate?: string | number;
  cabinLength?: string | number;
  seatingCapacity?: number;
  sponsored?: boolean;
  price?: number | string;
  range?: number | string;
  cruiseSpeed?: number | string;
  aircraftType?: string;
  cabinHeight?: string | number;
  cabinWidth?: string | number;
  // Additional properties from backend
  totalTimeSinceNew?: number;
  totalLandings?: number;
  engineHours?: number;
  maxAltitude?: number;
  serviceCeiling?: number;
  takeoffDistance?: number;
  landingDistance?: number;
  emptyWeight?: number;
  maxTakeoffWeight?: number;
  fuelCapacity?: number;
  numberOfEngines?: number;
  engineType?: string;
  engineThrust?: number;
  runwayLength?: number;
  baggageCapacity?: number;
  certification?: string;
  noiseCompliance?: string;
  maintenanceStatus?: string;
  lastInspectionDate?: string;
  nextInspectionDue?: string;
  previousOwners?: number;
  views?: number;
  status?: string;
  sponsoredType?: string;
  end_date?: string;
}

// Jet Card Component
function JetCard({ jet }: { jet: Jet }) {
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
          {jet.seatingCapacity && (
            <div>
              <div className="text-sm font-medium text-gray-900">
                {jet.seatingCapacity}
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
export default function JetIndexPage() {
  const [jetsForSale, setJetsForSale] = useState<Jet[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  console.log(isMobile);

  useEffect(() => {
    document.title = "Jets | Luxvana International";
    function handleResize() {
      setIsMobile(window.innerWidth < 1024);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  async function findAllJetsForSale() {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/jets/sale/index");
      console.log("Jets data received:", response.data.data);
      setJetsForSale(response.data.data);
    } catch (error: any) {
      console.error("Error fetching jets:", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    findAllJetsForSale();
  }, []);

  return (
    <div className="bg-white">
      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{ __html: swiperStyles }} />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-85"
        >
          <source src={video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <p className="text-4xl md:text-5xl font-light text-white tracking-wider">
            BUYING A JET
          </p>
        </div>
      </section>
      {/* Luxvana International Section */}
      <section className="relative py-16 bg-white px-2 sm:px-6 max-w-3xl mx-auto overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-[#C6A300] to-transparent" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-10 pointer-events-none" />
        <div className="relative z-10 text-center mb-8">
          <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-[#1a1a1a] mb-2">
            <span className="font-bold">THE FINEST NAME IN PRIVATE JETS</span>
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#C6A300] to-transparent mx-auto my-3" />
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="max-w-xl">
            <p className="text-gray-700 font-light text-base md:text-lg leading-relaxed mb-4 tracking-wide">
              Luxvana International stands as the unparalleled leader in private
              aviation, curating the world's most exclusive fleet for discerning
              clientele.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-[#C6A300] to-transparent" />
      </section>
      {/* Jets for Sale Section */}
      <section className="py-16 bg-white px-4 sm:px-8 lg:px-10 2xl:px-16 3xl:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-[#1a1a1a] mb-4">
              <span className="font-bold">AVAILABLE JETS</span>
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#C6A300] to-transparent mx-auto mb-4" />
            <p className="text-gray-600 font-light text-lg max-w-2xl mx-auto">
              Discover our curated collection of premium private jets available
              for purchase
            </p>
          </div>

          {/* Swiper Slider for Jets */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">Loading jets...</p>
            </div>
          ) : jetsForSale.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">
                No jets available at the moment
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Please check back later for new listings
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {jetsForSale.slice(0, 2).map((jet) => (
                <JetCard key={jet.id} jet={jet} />
              ))}
            </div>
          )}

          {/* More Jets Button */}
          <div className="text-center mt-12">
            <a
              href="/jets/listings"
              className="inline-flex items-center px-6 py-2 border border-gray-300 text-gray-700 hover:text-black hover:border-gray-400 font-medium transition-colors duration-200"
            >
              View all jets →
            </a>
          </div>
        </div>
      </section>

      {/* Lifestyle Section */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-10 2xl:px-16">
          {/* Heading */}
          <div className="text-center mb-20">
            <div className="text-xs uppercase tracking-[0.2em] text-gray-500 font-medium mb-6">
              Your key to the exceptional
            </div>
            <div className="w-20 h-px bg-gray-300 mx-auto mb-8"></div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-12 leading-tight">
              <span className="font-normal">Luxvana</span> — first choice, every
              time
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
              Experience the pinnacle of private aviation with our curated
              collection of the world's most exclusive jets, backed by decades
              of expertise and unparalleled service.
            </p>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Left Image */}
            <div className="relative group">
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src="https://www.bluedotcharters.com/wp-content/uploads/2022/03/private-jet-scaled.jpg"
                  alt="Luxury private jet interior with premium seating"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500"></div>
              </div>
              <p className="absolute bottom-8 left-8 text-white">
                <p className="text-2xl font-light mb-3">Unparalleled Comfort</p>
                <p className="text-sm font-light opacity-80">
                  Experience luxury redefined in every detail
                </p>
              </p>
            </div>

            {/* Right Image */}
            <div className="relative group">
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src="https://www.thepinnaclelist.com/wp-content/uploads/2021/07/Bora-Bora-French-Polynesia-Top-10-Luxury-Travel-Destinations-Around-the-World.jpg"
                  alt="Private jet soaring over city skyline"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500"></div>
              </div>
              <p className="absolute bottom-8 left-8 text-white">
                <p className="text-2xl font-light mb-3">Global Reach</p>
                <p className="text-sm font-light opacity-80">
                  Access any destination with unmatched performance
                </p>
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="text-center mb-16">
            <div className="inline-block border border-gray-200 px-12 py-8">
              <p className="text-sm uppercase tracking-[0.15em] text-gray-600 font-medium">
                Access to more jets than any other broker
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <a
              href="/why-choose-us"
              className="inline-flex items-center px-10 py-4 border border-gray-900 text-gray-900 font-light hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              <span className="text-sm uppercase tracking-[0.1em]">
                Why choose Luxvana?
              </span>
              <svg
                className="ml-4 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Sponsored Jets Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 2xl:px-16 3xl:px-20">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="text-xs uppercase tracking-[0.2em] text-gray-500 font-medium mb-6">
              Featured Selection
            </div>
            <div className="w-20 h-px bg-gray-300 mx-auto mb-8"></div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-12 leading-tight">
              <span className="font-normal">Elite</span> Listings
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
              Discover our premium elite aircraft, featuring the most exclusive
              and sought-after private jets in the market.
            </p>
          </div>

          {/* Elite Listings Logic */}
          {(() => {
            // Separate elite (sponsored) and other jets
            const eliteJets = jetsForSale.filter(
              (jet) => jet.sponsored === true
            );
            const otherJets = jetsForSale.filter((jet) => !jet.sponsored);
            let displayJets = [];

            if (eliteJets.length === 0) {
              // No elite jets, pick 4 random from all
              const shuffled = [...jetsForSale].sort(() => 0.5 - Math.random());
              displayJets = shuffled.slice(0, 4);
            } else if (eliteJets.length < 4) {
              // Fewer than 4 elite, fill with random others
              const needed = 4 - eliteJets.length;
              // Exclude jets already in eliteJets
              const filteredOthers = otherJets.filter(
                (jet) => !eliteJets.some((ej) => ej.id === jet.id)
              );
              const shuffled = [...filteredOthers].sort(
                () => 0.5 - Math.random()
              );
              displayJets = [...eliteJets, ...shuffled.slice(0, needed)];
            } else {
              // 4 or more elite jets
              displayJets = eliteJets.slice(0, 4);
            }

            if (displayJets.length === 0) {
              return (
                <div className="text-center py-16">
                  <div className="text-gray-400 mb-4">
                    <svg
                      className="mx-auto h-12 w-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-lg">
                    No listings available at the moment
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Please check back later for featured listings
                  </p>
                </div>
              );
            }

            // 2x2 grid
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {displayJets.map((jet) => (
                  <JetCard key={jet.id} jet={jet} />
                ))}
              </div>
            );
          })()}

          {/* View All Jets Button */}
          <div className="text-center mt-16">
            <a
              href="/jets/listings"
              className="inline-flex items-center px-10 py-4 border border-gray-900 text-gray-900 font-light hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              <span className="text-sm uppercase tracking-[0.1em]">
                View All Jets
              </span>
              <svg
                className="ml-4 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Brokerage News Section */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-10 2xl:px-16">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
              Latest News
            </h2>
            <div className="w-16 h-px bg-gray-300 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Stay informed with the latest private jet market updates, new
              listings, recent sales, and industry insights from Luxvana
              International.
            </p>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* News Items - Only show 3 */}
            {[
              {
                id: "gulfstream-g700-listing",
                image:
                  "https://assets.gulfstream.aero/thedotcom/images/aircraft/g700/d_g700_a_print_00141_PROD.jpg",
                date: "July 2, 2025",
                title: "Gulfstream G700 Now Available",
                excerpt:
                  "Experience the pinnacle of luxury aviation with our latest Gulfstream G700 listing.",
                href: "/news/gulfstream-g700-listing",
              },
              {
                id: "global-7500-sold",
                image:
                  "https://images.aircharterservice.com/global/aircraft-guide/private-charter/bombardier-global-7500.jpg",
                date: "June 28, 2025",
                title: "Global 7500 Successfully Sold",
                excerpt:
                  "We're pleased to announce the successful sale of a pristine Bombardier Global 7500.",
                href: "/news/global-7500-sold",
              },
              {
                id: "falcon-10x-price-reduction",
                image:
                  "https://aeroaffaires.fr/wp-content/uploads/2021/05/01--falcon10x_ext_h_hd-scaled.jpg",
                date: "June 25, 2025",
                title: "Falcon 10X Price Update",
                excerpt:
                  "Significant price reduction on our Dassault Falcon 10X listing.",
                href: "/news/falcon-10x-price-reduction",
              },
            ].map((post) => (
              <div
                key={post.id}
                className="group relative bg-white overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <p className="text-gray-500 text-sm mb-2">{post.date}</p>
                  <p className="text-xl font-light mb-3 text-gray-900">
                    {post.title}
                  </p>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                  <a
                    href={post.href}
                    className="text-gray-600 hover:text-black font-light"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* View All News Button */}
          <div className="text-center">
            <a
              href="/blog/jets"
              className="inline-flex items-center text-sm text-gray-900 hover:text-gray-600 transition-colors duration-300"
            >
              View All News
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-10 2xl:px-16">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
              Upcoming Events
            </h2>
            <div className="w-16 h-px bg-gray-300 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Join us at exclusive aviation events, exhibitions, and private
              showcases around the world.
            </p>
          </div>
          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                id: "ebace-2025",
                image:
                  "https://ebace.aero/wp-content/uploads/2024/12/EBACE25-default-og-preview.png",
                date: "May 20-22, 2025",
                title: "EBACE 2025 - Geneva",
                description:
                  "Meet our team at the European Business Aviation Convention & Exhibition, the premier event for the business aviation community in Europe.",
                href: "/events/ebace-2025",
              },
              {
                id: "private-jet-show-miami",
                image:
                  "https://usasalute.com/wp-content/uploads/2025/04/2025-Theme-Art-1920x1080-1.jpg",
                date: "August 14, 2025",
                title: "Miami Private Jet Show",
                description:
                  "Experience the latest in private aviation at our exclusive Miami showcase, featuring luxury jets and networking opportunities.",
                href: "/events/private-jet-show-miami",
              },
              {
                id: "luxvana-gala-nyc",
                image:
                  "https://cloudfront-eu-central-1.images.arcpublishing.com/thenational/FD2VKHCMDNE7TBYZOD27ZPI2WY.jpg",
                date: "October 10, 2025",
                title: "Luxvana Gala Night - NYC",
                description:
                  "Join us for an unforgettable evening of luxury, networking, and celebration at the annual Luxvana Gala in New York City.",
                href: "/events/luxvana-gala-nyc",
              },
            ].map((event) => (
              <div
                key={event.id}
                className="group relative bg-white overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <p className="text-gray-500 text-sm mb-2">{event.date}</p>
                  <p className="text-xl font-light mb-3 text-gray-900">
                    {event.title}
                  </p>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                    {event.description}
                  </p>
                  <a
                    href={event.href}
                    className="text-gray-600 hover:text-black font-light"
                  >
                    Learn More →
                  </a>
                </div>
              </div>
            ))}
          </div>
          {/* View All Events Button */}
          <div className="text-center">
            <a
              href="/events"
              className="inline-flex items-center text-sm text-gray-900 hover:text-gray-600 transition-colors duration-300"
            >
              View All Events
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
