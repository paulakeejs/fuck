import axiosInstance from "@/lib/api";
import { useEffect, useState } from "react";

interface HelicopterForSale {
  id: string;
  helicopterName: string;
  manufacturer: string;
  yearOfManufacture: number;
  salePrice: number;
  seatingCapacity: number;
  maximumRange: number;
  exteriorImageUrls: string[];
  sponsoredType: string;
}

interface HelicopterForCharter {
  id: string;
  model: string;
  year: number;
  pricePerHour: number;
  capacity: number;
  location: string;
  imageUrls: string[];
  sponsoredType: string;
}

function HelicopterIndex() {
  const [helicoptersForSale, setHelicoptersForSale] = useState<
    HelicopterForSale[]
  >([]);
  const [helicoptersForCharter, setHelicoptersForCharter] = useState<
    HelicopterForCharter[]
  >([]);
  const [helicoptersForSaleLoading, setHelicoptersForSaleLoading] =
    useState(true);
  const [helicoptersForCharterLoading, setHelicoptersForCharterLoading] =
    useState(true);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    type: "inquiry",
  });

  const fetchHelicoptersForSale = async () => {
    try {
      const response = await axiosInstance.get("/h-client/main/listings");
      const eliteHelicopters = response.data.listings.filter(
        (helicopter: HelicopterForSale) =>
          helicopter.sponsoredType === "Elite Boost"
      );
      setHelicoptersForSale(eliteHelicopters);
    } catch (error) {
      console.error("Error fetching helicopters for sale:", error);
    } finally {
      setHelicoptersForSaleLoading(false);
    }
  };

  const fetchHelicoptersForCharter = async () => {
    try {
      const response = await axiosInstance.get("/h-client/main/charter/all");
      const eliteHelicopters = response.data.listings.filter(
        (helicopter: HelicopterForCharter) =>
          helicopter.sponsoredType === "Elite Boost"
      );
      setHelicoptersForCharter(eliteHelicopters);
    } catch (error) {
      console.error("Error fetching helicopters for charter:", error);
    } finally {
      setHelicoptersForCharterLoading(false);
    }
  };

  useEffect(() => {
    fetchHelicoptersForSale();
    fetchHelicoptersForCharter();
  }, []);

  // Sample data with better images
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Luxury Air Travel",
      excerpt:
        "Explore how helicopter travel is redefining luxury transportation and creating new possibilities for discerning travelers. From urban commutes to exclusive getaways, discover the next evolution in premium air travel.",
      image:
        "https://www.digitaltrends.com/wp-content/uploads/2015/07/Airbus-H155-49.jpg?p=1",
      date: "June 10, 2025",
    },
    {
      id: 2,
      title: "Maintaining Your Helicopter",
      excerpt:
        "Key tips for keeping your aircraft in pristine condition and ensuring optimal performance throughout its lifetime.",
      image:
        "https://media.cnn.com/api/v1/images/stellar/prod/180314104056-ach160.jpg?q=w_1600,h_900,x_0,y_0,c_fill",
      date: "June 5, 2025",
    },
    {
      id: 3,
      title: "Sustainable Aviation: The Future of Helicopter Travel",
      excerpt:
        "How the helicopter industry is embracing sustainable practices and pioneering eco-friendly aviation solutions.",
      image:
        "https://robbreport.com/wp-content/uploads/2025/01/airbus-ach160-exclusive.jpg.webp",
      date: "May 28, 2025",
    },
  ];

  const destinations = [
    {
      id: 1,
      name: "Monaco",
      description: "Experience the glamour of the French Riviera from above.",
      image:
        "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1365&q=80",
    },
    {
      id: 2,
      name: "New York City",
      description: "Soar above the iconic skyline of the Big Apple.",
      image:
        "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    },
  ];

  const events = [
    {
      id: 1,
      title: "Monaco Grand Prix Flyover",
      date: "May 25, 2026",
      location: "Monaco",
      image:
        "https://images.unsplash.com/photo-1564604761388-83eafc96f668?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 2,
      title: "Aspen Winter Escape",
      date: "December 15, 2025",
      location: "Aspen, CO",
      image:
        "https://images.unsplash.com/photo-1518604666860-9ed391f76460?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  // Fallback images for helicopters if none are provided
  const getHelicopterImage = (images: string[] | undefined) => {
    if (images && images.length > 0) return images[0];
    return "https://images.unsplash.com/photo-1581093196277-1e316dc14552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/contact", formData);
      setShowContactForm(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        type: "inquiry",
      });
      // You might want to show a success message here
    } catch (error) {
      console.error("Error submitting form:", error);
      // You might want to show an error message here
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://www.oceanindependence.com/wp-content/uploads/2024/02/top-5-helicopters-hero-min.jpg"
            alt="Luxury Helicopter"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
        </div>
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4 md:px-20">
            <div className="max-w-2xl">
              <p className="text-4xl md:text-6xl font-light mb-6 text-white leading-tight">
                Elevate Your <span className="font-normal">Experience</span>
              </p>
              <p className="text-lg md:text-xl mb-8 text-gray-200 font-light">
                Premium helicopters for sale and charter. Unmatched luxury,
                performance, and safety.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setShowContactForm(true)}
                  className="bg-black text-white px-6 py-3 rounded-none font-light hover:bg-gray-900 transition duration-300"
                >
                  Inquire Now
                </button>
                <a
                  href="/helicopters/charter/listings"
                  className="border border-white text-white px-6 py-3 rounded-none font-light hover:bg-white/10 transition duration-300"
                >
                  View Fleet
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Helicopters for Sale Section */}
      <section className="py-20 px-4 md:px-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <p className="text-2xl md:text-3xl font-light text-gray-900 mb-4 md:mb-0">
              Helicopters for Sale
            </p>
            <a
              href="/helicopters/listings"
              className="text-gray-600 hover:text-black font-light"
            >
              View All →
            </a>
          </div>

          {helicoptersForSaleLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {helicoptersForSale.map((helicopter) => (
                <div
                  key={helicopter.id}
                  className="group relative bg-white overflow-hidden"
                >
                  <div className="aspect-w-16 aspect-h-10 overflow-hidden relative">
                    <img
                      src={getHelicopterImage(helicopter.exteriorImageUrls)}
                      alt={helicopter.helicopterName}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 text-sm font-light">
                      Featured
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-lg font-light mb-2 text-gray-900">
                      {helicopter.helicopterName}
                    </p>
                    <p className="text-gray-600 mb-2 text-sm">
                      {helicopter.manufacturer} • {helicopter.yearOfManufacture}
                    </p>
                    <p className="text-black font-light text-lg mb-4">
                      ${helicopter.salePrice.toLocaleString()}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <p className="text-sm text-gray-600">
                        Seats: {helicopter.seatingCapacity} • Range:{" "}
                        {helicopter.maximumRange} mi
                      </p>
                      <a
                        href={`/helicopter/${helicopter.id}`}
                        className="text-gray-600 hover:text-black font-light text-sm sm:text-base"
                      >
                        View Details →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Helicopters for Charter Section */}
      <section className="py-20 px-4 md:px-10 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <p className="text-2xl md:text-3xl font-light text-gray-900 mb-4 md:mb-0">
              Helicopters for Charter
            </p>
            <a
              href="/helicopters/charter/listings"
              className="text-gray-600 hover:text-black font-light"
            >
              View All →
            </a>
          </div>

          {helicoptersForCharterLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {helicoptersForCharter.map((helicopter) => (
                <div
                  key={helicopter.id}
                  className="group relative bg-white overflow-hidden"
                >
                  <div className="aspect-w-16 aspect-h-10 overflow-hidden relative">
                    <img
                      src={getHelicopterImage(helicopter.imageUrls)}
                      alt={helicopter.model}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 text-sm font-light">
                      Featured
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-lg font-light mb-2 text-gray-900">
                      {helicopter.model}
                    </p>
                    <p className="text-gray-600 mb-2 text-sm">
                      Year: {helicopter.year}
                    </p>
                    <p className="text-black font-light text-lg mb-4">
                      ${helicopter.pricePerHour}/hour
                    </p>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <p className="text-sm text-gray-600">
                        Capacity: {helicopter.capacity} • {helicopter.location}
                      </p>
                      <a
                        href={`/helicopters/charter/${helicopter.id}`}
                        className="text-gray-600 hover:text-black font-light text-sm sm:text-base"
                      >
                        Book Now →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-20 px-4 md:px-10">
        <div className="container mx-auto">
          <p className="text-2xl md:text-3xl font-light text-center mb-12 text-gray-900">
            Exclusive Destinations
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className="group relative overflow-hidden h-96"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-8">
                  <div>
                    <p className="text-xl md:text-2xl font-light mb-2 text-white">
                      {destination.name}
                    </p>
                    <p className="text-gray-200 text-sm">
                      {destination.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 px-4 md:px-10 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <p className="text-2xl md:text-3xl font-light text-gray-900 mb-4 md:mb-0">
              Latest Insights
            </p>
            <a
              href="/blog"
              className="text-gray-600 hover:text-black font-light"
            >
              View All →
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
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
                    href={`/blog/${post.id}`}
                    className="text-gray-600 hover:text-black font-light"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 px-4 md:px-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <p className="text-2xl md:text-3xl font-light text-gray-900 mb-4 md:mb-0">
              Upcoming Events
            </p>
            <a
              href="/events"
              className="text-gray-600 hover:text-black font-light"
            >
              View All →
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event) => (
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
                  <p className="text-lg font-light mb-2 text-gray-900">
                    {event.title}
                  </p>
                  <p className="text-gray-600 mb-4 text-sm">
                    {event.date} • {event.location}
                  </p>
                  <a
                    href={`/event/${event.id}`}
                    className="text-gray-600 hover:text-black font-light"
                  >
                    Learn More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-10 bg-black text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <p className="text-2xl md:text-3xl font-light mb-6">
            Ready to Elevate Your Experience?
          </p>
          <p className="text-lg mb-8 opacity-90 font-light">
            Contact us today to discuss your helicopter needs. Our experts are
            standing by to assist you.
          </p>
          <button
            onClick={() => setShowContactForm(true)}
            className="inline-block bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-none font-light transition duration-300"
          >
            Get in Touch
          </button>
        </div>
      </section>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 backdrop-blur-md bg-white/30 z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-sm p-8 max-w-2xl w-full shadow-2xl border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="text-3xl font-light text-gray-900">Contact Us</p>
                <p className="text-gray-500 mt-1">
                  We'll get back to you within 24 hours
                </p>
              </div>
              <button
                onClick={() => setShowContactForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2"
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-light text-gray-700 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-light text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-light text-gray-700 mb-2"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-light text-gray-700 mb-2"
                  >
                    Inquiry Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
                  >
                    <option value="inquiry">General Inquiry</option>
                    <option value="sale">Helicopter Purchase</option>
                    <option value="charter">Charter Service</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-light text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white/50 border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
                  placeholder="Tell us about your requirements..."
                />
              </div>
              <div className="flex items-center justify-between pt-4">
                <p className="text-sm text-gray-500">
                  By submitting this form, you agree to our privacy policy
                </p>
                <button
                  type="submit"
                  className="bg-black text-white px-8 py-3 font-light hover:bg-gray-900 transition duration-300 min-w-[200px]"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default HelicopterIndex;
