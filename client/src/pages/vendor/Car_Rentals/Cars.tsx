import { useEffect, useState } from "react";
import axiosInstance from "@/lib/api";
import { toast } from "sonner";

// Updated with reliable image sources
const carBlogs = [
  {
    title: "Top 10 Luxury Cars of 2024",
    image:
      "https://www.goodwood.com/globalassets/.road--racing/road/news/2020/6-june/list-dan-trent-luxury-cars-2020/bmw-i7-2600.jpg?rxy=0.5,0.5",
    link: "https://advertise.dupontregistry.com/blog/top-10-best-luxury-and-exotic-cars-we-drove-in-2024",
    description: "The most exceptional luxury vehicles available this year",
  },
  {
    title: "The Future of Automotive Luxury",
    image:
      "https://news.dupontregistry.com/wp-content/uploads/2024/01/download-2024-01-25T133212.738.jpeg",
    description: "How technology is redefining premium driving experiences",
  },
  {
    title: "Exotic Car Ownership Guide",
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80",
    link: "https://resident.com/vehicles-and-transportation/2025/03/25/2025-key-trends-in-the-evolution-of-luxury-vehicles",
    description: "What you need to know before buying a high-end vehicle",
  },
];

const carEvents = [
  {
    name: "Pebble Beach Concours d'Elegance",
    date: "Aug 18, 2024",
    location: "Pebble Beach, CA",
    image:
      "https://www.goodcarbadcar.net/wp-content/uploads/2020/11/Large-1971-The2020GenesisG90PremiumLuxurySedan.-scaled.jpg",
    link: "https://pebblebeachconcours.net/",
  },
  {
    name: "Goodwood Festival of Speed",
    date: "Jul 11-14, 2024",
    location: "Chichester, UK",
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80",
    link: "https://www.goodwood.com/motorsport/festival-of-speed/",
  },
  {
    name: "Monaco Grand Prix",
    date: "May 23-26, 2024",
    location: "Monte Carlo, Monaco",
    image:
      "https://www.bocadolobo.com/en/inspiration-and-ideas/wp-content/uploads/2024/12/Aston-Martin-DB11.webp",
    link: "https://www.formula1.com/en/racing/2024/Monaco.html",
  },
];

function Cars() {
  const [sponsoredCars, setSponsoredCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSponsoredCars = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/cars/client/all");
        if (response.data.success) {
          const sponsored = response.data.cars
            .filter((car: any) => car.sponsored)
            .slice(0, 9);
          setSponsoredCars(sponsored);
        } else {
          throw new Error(response.data.message);
        }
      } catch (error: any) {
        toast(error.message || "Failed to fetch sponsored cars");
      } finally {
        setLoading(false);
      }
    };
    fetchSponsoredCars();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Redesigned Hero Section with Background Video */}
      <section
        className="relative w-full min-h-screen h-screen flex items-center justify-center overflow-hidden border-b border-gray-100"
        style={{ minHeight: "100vh" }}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
          src="/video5.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster="video5.mp4"
          style={{ filter: "brightness(0.55)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-10" />
        <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-2xl mx-auto">
          <p className="text-xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-lg">
            Drive the Most Exclusive Cars.
          </p>
        </div>
      </section>

      {/* Luxury Car Fleet Introduction */}
      <section className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-light text-black mb-6 tracking-tight">
          Discover the latest arrivals in our exclusive fleet of luxury cars,
          available for rent in destinations worldwide.
        </h2>
        <p className="text-lg md:text-xl text-gray-500 font-light mb-4">
          New vehicles from the world’s most prestigious brands are regularly
          added to our curated collection. Owners of the most sought-after
          automobiles trust our team to showcase and manage their vehicles for
          discerning clients.
        </p>
        <p className="text-lg md:text-xl text-gray-500 font-light mb-4">
          Browse the exceptional cars that have joined our fleet in the past 90
          days below.
        </p>
        <p className="text-base text-gray-400 font-light">
          To learn more about renting any of these world-class vehicles, connect
          with one of our dedicated Luxury Car Advisors.
        </p>
      </section>

      {/* Spacer before Our Top Brands */}
      <div className="py-8 md:py-14" />

      {/* Featured Vehicles Section */}
      <section id="featured-cars" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-light mb-2 text-black tracking-tight font-sans uppercase">
            Featured Vehicles
          </h2>
        </div>
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-96 bg-gray-100 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : sponsoredCars.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-xl font-light">
            No featured vehicles available at this time.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
            {sponsoredCars.map((car: any) => {
              const mainImage =
                car.images?.[0] || "/images/car-placeholder.jpg";
              return (
                <div
                  key={car.id}
                  className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-sm transition-all duration-150"
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={mainImage}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {car.sponsored && (
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
                        {car.brand} {car.model}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {car.year} • {car.carType || "Luxury Car"}
                      </p>
                    </div>
                    {/* Stats */}
                    <div className="flex justify-between mb-4 pb-4 border-b border-gray-100">
                      {car.seats && (
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {car.seats}
                          </div>
                          <div className="text-xs text-gray-400">Seats</div>
                        </div>
                      )}
                      {car.horsepower && (
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {car.horsepower}hp
                          </div>
                          <div className="text-xs text-gray-400">Power</div>
                        </div>
                      )}
                      {car.transmission && (
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {car.transmission}
                          </div>
                          <div className="text-xs text-gray-400">
                            Transmission
                          </div>
                        </div>
                      )}
                      {car.fuel && (
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {car.fuel}
                          </div>
                          <div className="text-xs text-gray-400">Fuel</div>
                        </div>
                      )}
                    </div>
                    {/* Price and Link */}
                    <div className="flex items-center justify-between">
                      {car.price && (
                        <div>
                          <div className="text-base font-semibold text-gray-900">
                            ${Number(car.price).toLocaleString()}
                          </div>
                        </div>
                      )}
                      <a
                        href={`/cars/rent/${car.id}`}
                        className="text-xs font-medium text-gray-700 hover:text-black transition-colors duration-200"
                      >
                        View details →
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* View All Cars Button */}
      <div className="flex justify-center mt-8 mb-4">
        <a
          href="/cars/listings"
          className="inline-block px-14 py-3 bg-transparent border border-black text-black text-base font-medium hover:bg-black hover:text-white transition-colors duration-200"
        >
          View All Cars
        </a>
      </div>

      {/* Blog Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-light uppercase tracking-wider mb-1 text-black">
                Luxury Auto Journal
              </h2>
              <p className="text-gray-500 text-base font-light">
                Insights and stories from the world of luxury cars
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {carBlogs.map((blog, i) => (
              <article
                key={i}
                className="flex flex-col h-full items-stretch justify-stretch"
              >
                <a
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-transparent"
                  aria-label={`Read more about ${blog.title}`}
                >
                  <div className="relative overflow-hidden aspect-[4/3] mb-4 rounded-xl">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="absolute left-0 top-0 w-full h-full object-cover transition-opacity aspect-4/3 object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = "/images/blog-placeholder.jpg";
                      }}
                    />
                  </div>
                </a>
                <div className="grow pt-2.5 flex flex-col">
                  <a
                    href={blog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Read more about ${blog.title}`}
                  >
                    <h3 className="mb-2 text-xl font-semibold uppercase leading-tight tracking-wide text-black font-sans whitespace-normal">
                      {blog.title}
                    </h3>
                  </a>
                  <p className="mb-2 text-base text-gray-500 font-light whitespace-pre-line">
                    {blog.description}
                  </p>
                  <a
                    href={blog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center text-base font-medium uppercase tracking-wider text-black hover:text-amber-600 transition-colors duration-200 mt-auto"
                    aria-label={`Explore ${blog.title}`}
                  >
                    <span className="block whitespace-nowrap py-1">
                      Explore
                    </span>
                    <span
                      className="inline-flex justify-center items-center ml-2"
                      aria-hidden="true"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 5 8"
                        width="6"
                        height="8"
                      >
                        <path d="M.3933 1.6831 1.454.6224 4.8316 4 1.454 7.3776.3933 6.3169 2.71 4z"></path>
                      </svg>
                    </span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-light uppercase tracking-wider mb-1 text-black">
                Upcoming Car Events
              </h2>
              <p className="text-gray-500 text-base font-light">
                Exclusive automotive gatherings worldwide
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {carEvents.map((event, i) => (
              <article
                key={i}
                className="flex flex-col h-full items-stretch justify-stretch"
              >
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-transparent"
                  aria-label={`Read more about ${event.name}`}
                >
                  <div className="relative overflow-hidden aspect-[4/3] mb-4 rounded-xl">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="absolute left-0 top-0 w-full h-full object-cover transition-opacity aspect-4/3 object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = "/images/event-placeholder.jpg";
                      }}
                    />
                  </div>
                </a>
                <div className="grow pt-2.5 flex flex-col">
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Read more about ${event.name}`}
                  >
                    <h3 className="mb-2 text-xl font-semibold uppercase leading-tight tracking-wide text-black font-sans whitespace-normal">
                      {event.name}
                    </h3>
                  </a>
                  <div className="mb-2 text-base text-gray-500 font-light whitespace-pre-line flex flex-col gap-1">
                    <span>{event.date}</span>
                    <span>{event.location}</span>
                  </div>
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center text-base font-medium uppercase tracking-wider text-black hover:text-amber-600 transition-colors duration-200 mt-auto"
                    aria-label={`Explore ${event.name}`}
                  >
                    <span className="block whitespace-nowrap py-1">
                      Explore
                    </span>
                    <span
                      className="inline-flex justify-center items-center ml-2"
                      aria-hidden="true"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 5 8"
                        width="6"
                        height="8"
                      >
                        <path d="M.3933 1.6831 1.454.6224 4.8316 4 1.454 7.3776.3933 6.3169 2.71 4z"></path>
                      </svg>
                    </span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cars;
