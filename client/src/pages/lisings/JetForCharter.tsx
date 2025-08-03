import axiosInstance from "@/lib/api";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Jet {
  id: string;
  jetName: string;
  aircraftType: string;
  manufacturer: string;
  yearOfManufacture: string;
  seatingCapacity: string;
  maximumRange: string;
  cruisingSpeed: string;
  pricePerHour: string;
  minimumFlightTime: string;
  cabinFeatures: string[];
  exteriorImages: string[];
  interiorImages: string[];
  sponsored: boolean;
  sponsoredType: string;
  homeBase: string;
  availableRoutes: Array<{ departure: string; destination: string }>;
  petsAllowed: boolean;
  smokingAllowed: boolean;
  inFlightMeals: boolean;
  flightAttendant: boolean;
  videoLink?: string; // Added videoLink to the interface
}

function JetForCharter() {
  const [jets, setJets] = useState<Jet[]>([]);
  const [showingSponsoredOnly, setShowingSponsoredOnly] = useState(true);

  const alljets = async () => {
    try {
      const response = await axiosInstance.get("/jets/charter/index");
      console.log("API Response:", response.data); // Debug log

      if (response.data.success) {
        console.log("All jets from API:", response.data.data); // Debug log
        console.log("Number of jets returned:", response.data.data.length); // Debug log

        // Filter only sponsored jets and sort by sponsored type (Ultimate > Basic)
        const sponsoredJets = response.data.data
          .filter((jet: Jet) => {
            console.log(
              `Jet ${jet.jetName} - sponsored:`,
              jet.sponsored,
              "type:",
              jet.sponsoredType
            ); // Debug log
            return jet.sponsored;
          })
          .sort((a: Jet, b: Jet) => {
            const typeOrder = { Ultimate: 3, Elite: 2, Basic: 1 };
            return (
              (typeOrder[b.sponsoredType as keyof typeof typeOrder] || 0) -
              (typeOrder[a.sponsoredType as keyof typeof typeOrder] || 0)
            );
          });

        console.log("Sponsored jets after filtering:", sponsoredJets); // Debug log
        console.log("Number of sponsored jets:", sponsoredJets.length); // Debug log

        // If no sponsored jets, show all jets as fallback
        if (sponsoredJets.length === 0) {
          console.log("No sponsored jets found, showing all jets as fallback"); // Debug log
          setJets(response.data.data);
          setShowingSponsoredOnly(false);
        } else {
          setJets(sponsoredJets);
          setShowingSponsoredOnly(true);
        }
      } else throw Error(response.data.message);
    } catch (error: any) {
      console.error("Error fetching jets:", error); // Debug log
      toast(error.message);
    }
  };

  useEffect(() => {
    document.title = "Private Jet Charter | Luxvana International";
    alljets();
  }, []);

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseInt(price));
  };

  return (
    <div className="bg-white min-h-screen w-full">
      <div className="relative h-screen w-full overflow-hidden ">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full text-white px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-3xl sm:text-4xl lg:text-5xl uppercase xl:text-6xl font-sans font-semibold text-center leading-tight"
          >
            Private Jet Charter
          </motion.p>
        </div>
      </div>

      {/* Premium Content Section */}
      <div className="bg-white">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
          <div className="text-center">
            <h2 className="mx-auto max-w-4xl text-3xl font-light leading-tight tracking-normal text-gray-900 md:text-4xl lg:text-5xl xl:text-[3.5rem]">
              <span className="font-medium">First Class</span> Jets for{" "}
              <span className="font-medium">Discerning</span> Travelers
            </h2>
            <div className="mx-auto mt-8 max-w-3xl">
              <p className="text-lg leading-relaxed text-gray-600 md:text-xl md:leading-relaxed lg:text-[1.35rem]">
                Experience unparalleled freedom, absolute privacy, and
                white-glove service that redefines luxury travel. Your journey
                begins the moment you step aboard.
              </p>
            </div>

            {/* Decorative elements */}
            <div className="mt-12 flex justify-center">
              <div className="flex space-x-2">
                <span className="h-1 w-8 bg-blue-600 rounded-full"></span>
                <span className="h-1 w-8 bg-amber-400 rounded-full"></span>
                <span className="h-1 w-8 bg-gray-300 rounded-full"></span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Featured Jets Section */}
      <div className="bg-white">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-900 md:text-4xl lg:text-5xl mb-4">
              <span className="font-medium">
                {showingSponsoredOnly ? "Featured" : "Available"}
              </span>{" "}
              Jets
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {showingSponsoredOnly
                ? "Discover our premium selection of sponsored aircraft, handpicked for exceptional luxury and performance."
                : "Browse our complete selection of available aircraft for your next charter flight."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {jets.slice(0, 6).map((jet, index) => (
              <motion.div
                key={jet.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="yacht-tile flex h-auto grow flex-col content-stretch justify-items-stretch uppercase"
              >
                {/* Jet Image Container */}
                <div className="relative mb-2 grid aspect-16/10 w-full">
                  <a
                    href={`/jet/${jet.id}`}
                    className="bg-transparent text-sm"
                    role="button"
                    tabIndex={0}
                  >
                    <div className="animation-wrapper relative overflow-hidden">
                      <div className="labels-container flex">
                        <span className="base-button-icon-span-selector block w-full whitespace-nowrap py-1">
                          <div className="relative">
                            <img
                              className="absolute left-0 top-0 size-full object-cover transition-opacity aspect-16/10 object-cover"
                              src={jet.exteriorImages[0]}
                              alt={jet.jetName}
                            />
                            <picture className="aspect-16/10 object-cover">
                              <img
                                loading="lazy"
                                className="aspect-16/10 object-cover"
                                src={jet.exteriorImages[0]}
                                alt={`Aboard ${jet.jetName} a ${jet.aircraftType} luxury jet for Charter`}
                              />
                            </picture>
                          </div>
                        </span>
                      </div>
                    </div>
                  </a>

                  {/* Action Buttons */}
                  <div className="absolute bottom-2 right-1 z-2 flex flex-col gap-2">
                    {jet.videoLink && (
                      <button
                        className="roundIcon flex size-8 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white"
                        tabIndex={0}
                      >
                        <span className="icon w-5 h-5 inline-flex justify-center items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 23 22"
                            width="23"
                            height="22"
                          >
                            <path d="M11.088 0a1 1 0 010 22 1 1 0 010-22zm0 1.5a1 1 0 000 19 1 1 0 000-19zM6.868 7.054a1.8 1.8 0 012.704-1.561l6.834 3.946a1.8 1.8 0 010 3.122l-6.834 3.946A1.8 1.8 0 016.868 14.946zm1.954-.262a.3.3 0 00-.454.262v7.892a.3.3 0 00.454.262l6.835-3.946a.3.3 0 000-.524z"></path>
                          </svg>
                        </span>
                        <span className="sr-only">show videos</span>
                      </button>
                    )}
                  </div>

                  {/* Sponsored Badge */}
                  {!showingSponsoredOnly && jet.sponsored && (
                    <div className="absolute top-2 left-2 z-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                        {jet.sponsoredType} Sponsored
                      </span>
                    </div>
                  )}
                </div>

                {/* Jet Details */}
                <div className="flex h-full flex-col content-center justify-between">
                  <a
                    href={`/jet/${jet.id}`}
                    aria-label={`Navigate to ${jet.jetName}`}
                    tabIndex={0}
                  >
                    <h4 className="text-center text-lg font-semibold leading-snug tracking-wide text-blue 2xl:text-xxl">
                      {jet.jetName}
                    </h4>
                    <div className="mt-2 text-center text-sm leading-snug tracking-wide text-gray-white 2xl:text-md">
                      {jet.manufacturer} - {jet.yearOfManufacture} (
                      {jet.aircraftType})
                    </div>
                  </a>

                  <div className="flex flex-col">
                    {/* Jet Stats */}
                    <div className="yacht-tile-stats mb-4 mt-3 flex justify-center divide-x divide-gray whitespace-nowrap text-center text-gray-white">
                      <div className="px-2 sm:px-3 md:px-3.5 lg:px-6 3xl:px-8">
                        <div className="min-h-5 text-sm font-semibold lowercase tracking-wide 2xl:text-md">
                          {jet.maximumRange}hr{" "}
                          <span className="font-normal mr-2">Range</span>
                        </div>
                        <div className="text-sm tracking-wide 2xl:text-md">
                          Range
                        </div>
                      </div>
                      <div className="px-2 sm:px-3 md:px-3.5 lg:px-6 3xl:px-8">
                        <div className="min-h-5 text-sm font-semibold lowercase tracking-wide 2xl:text-md">
                          {jet.seatingCapacity}
                        </div>
                        <div className="text-sm tracking-wide 2xl:text-md">
                          Guests
                        </div>
                      </div>
                      <div className="px-2 sm:px-3 md:px-3.5 lg:px-6 3xl:px-8">
                        <div className="min-h-5 text-sm font-semibold lowercase tracking-wide 2xl:text-md">
                          {jet.cruisingSpeed}
                        </div>
                        <div className="text-sm tracking-wide 2xl:text-md">
                          Speed
                        </div>
                      </div>
                      <div className="px-2 sm:px-3 md:px-3.5 lg:px-6 3xl:px-8">
                        <div className="min-h-5 text-sm font-semibold lowercase tracking-wide 2xl:text-md">
                          {jet.homeBase}
                        </div>
                        <div className="text-sm tracking-wide 2xl:text-md">
                          Base
                        </div>
                      </div>
                    </div>

                    {/* Price Button */}
                    <div className="flex w-full  items-center justify-between self-end text-sm">
                      <a
                        href={`/charter/${jet.id}`}
                        target="_self"
                        className="group flex justify-center items-center transition-colors leading-close duration-200 ease-out relative uppercase tracking-wider focus-visible:border text-white bg-blue undefined h-11 px-4 text-sm base-button h-11 w-full py-4 text-sm uppercase !tracking-normal !text-blue 2xl:text-md bg-gray-500"
                        role="button"
                        tabIndex={0}
                      >
                        <div className="animation-wrapper relative overflow-hidden">
                          <div className="labels-container flex">
                            <span className="base-button-icon-span-selector block w-full whitespace-nowrap py-1">
                              <span className="text-sm font-light text-blue 2xl:text-md">
                                From{" "}
                                <span className="text-sm 2xl:text-md font-semibold">
                                  {formatPrice(jet.pricePerHour)}
                                </span>{" "}
                                p/hour
                              </span>
                            </span>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* More Jets Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center mt-16"
          >
            <button
              onClick={() => (window.location.href = "/charter/listings")}
              className="cursor-pointer group relative inline-flex items-center justify-center px-8 py-4 text-sm font-medium tracking-wide text-gray-700 uppercase transition-all duration-300 border border-gray-300 hover:border-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
            >
              <span className="relative z-10">More Jets for Charter</span>
              <div className="absolute inset-0 bg-gray-50 group-hover:bg-white transition-colors duration-300"></div>
            </button>
          </motion.div>
          {/* Refined Brand Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="py-16 md:py-24 bg-white"
          >
            <div className="mx-auto max-w-4xl px-4 text-center">
              {/* Subheading */}
              <p className="text-sm font-medium tracking-widest text-blue-600">
                Limitless horizons, effortless elegance
              </p>

              {/* Divider */}
              <div className="mt-4 flex justify-center space-x-2">
                <span className="block h-0.5 w-12 bg-blue-600"></span>
                <span className="block h-0.5 w-12 bg-orange-400"></span>
              </div>

              {/* Main Heading */}
              <h2 className="mt-6 text-3xl font-light text-gray-900 md:text-4xl lg:text-5xl">
                <span className="font-medium">Luxvana</span> — The Standard of
                Excellence
              </h2>
            </div>
          </motion.div>
          {/* Minimalist Two-Image Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white py-16"
          >
            <div className="mx-auto max-w-7xl px-4">
              {/* Image Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* First Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <img
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    src="https://www.naomiastleyclarke.com/wp-content/uploads/2023/05/Gulfstream-7.jpg"
                    alt="Private jet flying over mountains"
                  />
                </div>

                {/* Second Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <img
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    src="https://cdn.i-scmp.com/sites/default/files/images/methode/2018/02/20/73ba66be-113e-11e8-851b-21ca695cbae4_1280x720_104846.jpg"
                    alt="Luxury private jet interior"
                  />
                </div>
              </div>

              {/* Minimal Caption */}
              <div className="mt-8 text-center">
                <p className="text-sm font-normal tracking-wide text-gray-500">
                  From the sky to the exclusive islands
                </p>
              </div>

              {/* Simple CTA */}
              <div className="mt-12 text-center">
                <a
                  href="/why-choose-luxvana"
                  className="inline-block border-b border-blue-500 pb-1 text-sm font-medium text-gray-900 transition-colors hover:text-blue-600"
                >
                  Discover the Luxvana difference →
                </a>
              </div>
            </div>
          </motion.div>
          {/* Elegant Charter Destinations Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="py-20 md:py-28 bg-white"
          >
            <div className="mx-auto max-w-4xl px-6 text-center">
              {/* Subheading */}
              <p className="text-xs font-medium tracking-widest text-blue-600 uppercase">
                Your vision, our expertise
              </p>

              {/* Divider */}
              <div className="mt-5 flex justify-center space-x-1.5">
                <span className="block h-px w-10 bg-blue-600"></span>
                <span className="block h-px w-10 bg-orange-400"></span>
              </div>

              {/* Main Heading */}
              <h2 className="mt-6 text-3xl font-light text-gray-900 md:text-4xl lg:text-[2.75rem]">
                <span className="font-medium">Global Charter</span> Destinations
              </h2>

              {/* Optional Description */}
              <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                Access over 5,000 airports worldwide with our seamless private
                aviation solutions
              </p>
            </div>
          </motion.div>
          {/* Elegant Destination Gallery */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white"
          >
            <div className="relative">
              {/* Three-Column Image Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                {/* Mediterranean */}
                <div className="relative h-[50vh] md:h-[70vh] overflow-hidden group">
                  <img
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src="https://www.signatureluxurytravel.com.au/wp-content/uploads/2020/12/Kokomo.jpg"
                    alt="Mediterranean coastline"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Beach Setup (Center - Larger) */}
                <div className="relative h-[50vh] md:h-[80vh] overflow-hidden group md:-mt-10">
                  <img
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src="https://www.luxurylifestylemag.co.uk/wp-content/uploads/2020/06/bigstock-Luxury-hotel-vacation-resort-A-311445214.jpg"
                    alt="Caribbean beach"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Caribbean */}
                <div className="relative h-[50vh] md:h-[70vh] overflow-hidden group">
                  <img
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src="https://www.cuvee.com/wp-content/uploads/2024/07/Royal-Island.webp"
                    alt="Maldives islands"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </div>

              {/* Overlay Text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-3xl font-light text-white md:text-5xl lg:text-6xl">
                  <span className="font-medium">Discover</span> Your Next Escape
                </p>
              </div>
            </div>

            {/* Simple CTA */}
            <div className="py-12 text-center">
              <a
                href="/destinations"
                className="px-8 py-3 border border-gray-300 rounded-full bg-transparent text-gray-900 font-semibold uppercase tracking-widest text-sm transition-colors duration-200 hover:border-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
                style={{ letterSpacing: "0.15em" }}
              >
                Get Inspired
              </a>
            </div>
          </motion.div>

          {/* Jet Charter Brand Statement Section */}
          <div className="bg-white py-16 md:py-20 lg:py-24">
            <section className="mx-auto max-w-4xl px-6 text-center">
              {/* Subheading */}
              <p className="text-xs font-medium tracking-widest text-blue-600 uppercase mb-4">
                Live exceptionally
              </p>

              {/* Divider */}
              <div className="flex justify-center space-x-2 mb-8">
                <span className="block h-px w-10 bg-blue-600"></span>
                <span className="block h-px w-10 bg-orange-400"></span>
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl font-light text-gray-900 md:text-4xl lg:text-[2.75rem]">
                The <span className="font-medium">World's Finest</span> Private
                Aircraft
              </h2>
            </section>
          </div>

          {/* Luxvana Charter Portfolio Image Section */}
          <div className="bg-white w-full px-0 overflow-hidden page-container relative">
            <section className="mx-auto max-w-screen-3xl px-4 sm:px-8 lg:px-10 2xl:px-16 3xl:px-20">
              <div className="mx-auto lg:w-full lg:max-w-screen-lg 2xl:max-w-screen-2xl-container">
                <div className="relative">
                  <picture className="object-cover aspect-16/9">
                    <source
                      srcSet="https://webcdn.infiniteflight.com/blog/content/images/2025/02/Blog.jpg"
                      media="(min-width: 1600px)"
                    />
                    <source
                      srcSet="https://webcdn.infiniteflight.com/blog/content/images/2025/02/Blog.jpg"
                      media="(min-width: 1440px)"
                    />
                    <source
                      srcSet="https://webcdn.infiniteflight.com/blog/content/images/2025/02/Blog.jpg"
                      media="(min-width: 1280px)"
                    />
                    <source
                      srcSet="https://webcdn.infiniteflight.com/blog/content/images/2025/02/Blog.jpg"
                      media="(min-width: 1024px)"
                    />
                    <source
                      srcSet="https://webcdn.infiniteflight.com/blog/content/images/2025/02/Blog.jpg"
                      media="(min-width: 768px)"
                    />
                    <source
                      srcSet="https://webcdn.infiniteflight.com/blog/content/images/2025/02/Blog.jpg"
                      media="(min-width: 640px)"
                    />
                    <source
                      srcSet="https://webcdn.infiniteflight.com/blog/content/images/2025/02/Blog.jpg"
                      media="(min-width: 480px)"
                    />
                    <source
                      srcSet="https://webcdn.infiniteflight.com/blog/content/images/2025/02/Blog.jpgx"
                      media="(min-width: 375px)"
                    />
                    <source
                      srcSet="https://webcdn.infiniteflight.com/blog/content/images/2025/02/Blog.jpg"
                      media="(min-width: 99px)"
                    />
                    <img
                      loading="lazy"
                      fetchPriority="auto"
                      className="object-cover aspect-16/9 w-full rounded-xl"
                      src="https://webcdn.infiniteflight.com/blog/content/images/2025/02/Blog.jpg"
                      alt="Luxvana: The Finest Name in Private Jets – Request Your Exclusive 2025 Charter Book Today"
                      crossOrigin="anonymous"
                    />
                  </picture>
                </div>
              </div>
            </section>
          </div>

          {/* Minimalistic CTA below image section */}
          <div className="w-full flex justify-center py-8 bg-white">
            <a
              href="/contact"
              className="px-7 py-2 border border-gray-300 rounded-full bg-transparent text-gray-900 font-semibold uppercase tracking-widest text-xs transition-colors duration-200 hover:border-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
              style={{ letterSpacing: "0.13em" }}
            >
              Visit our blog
            </a>
          </div>

          {/* Premium CTA Section */}
          <section className="w-full bg-white py-16 flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-black mb-4">
              Your dream charter vacation starts here
            </h2>
            <p className="text-base md:text-lg text-gray-700 mb-8">
              Contact{" "}
              <span className="font-semibold text-black">
                Luxvana International
              </span>{" "}
              today
            </p>
            <a
              href="/contact"
              className="px-8 py-3 border border-black rounded-full bg-transparent text-black font-semibold uppercase tracking-widest text-sm transition-colors duration-200 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black/10"
              style={{ letterSpacing: "0.13em" }}
            >
              Contact Us
            </a>
          </section>
        </section>
      </div>
    </div>
  );
}

export default JetForCharter;
