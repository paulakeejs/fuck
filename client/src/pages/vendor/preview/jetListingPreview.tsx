import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import vendorApi from "../functions/vendorApi";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  MapPin,
  Calendar,
  Layers,
  Navigation,
  Zap,
  Box,
  Feather,
  Image as ImageIcon,
  X,
  Mail,
  User,
  MessageSquare,
  Globe,
  FileText,
  Layout,
  Users,
  Briefcase,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import countries from "../application/privateJetSeller/countries";

interface JetData {
  id: string;
  createdAt: string;
  manufacturer: string;
  otherManufacturer: string | null;
  model: string;
  year: number;
  serialNumber: string;
  totalTimeSinceNew: number;
  totalLandings: number;
  engineMakeModel: string;
  engineHours: number;
  avionicsSuite: string;
  interiorConfig: string;
  interiorImageUrls: string[];
  exteriorImageUrls: string[];
  price: string;
  currentLocation: string;
  registrationNumber: string;
  contactDetails: string;
  previousOwners: number | null;
  maintenanceProgram: string | null;
  airframeEngineStatus: string | null;
  refurbishmentDate: string | null;
  wifiConnectivity: string | null;
  lavatoryGalleyDetails: string | null;
  cabinAmenities: string | null;
  range: number | null;
  cruiseSpeed: number | null;
  maxAltitude: number | null;
  runwayLength: number | null;
  emptyWeight: number | null;
  maxTakeoffWeight: number | null;
  deliveryAvailability: string | null;
  paymentTxSignature: string;
  transactionLink: string | null;
  vendorId: string;
  status: string;
}

interface VendorData {
  id: string;
  name: string;
  companyName: string;
  brandImage: string;
  status: string;
  serviceType: string;
  createdAt: string;
}

interface FormData {
  name: string;
  email: string;
  country: string;
  message: string;
  requestType: string;
}

function JetListingPreview() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<JetData | null>(null);
  const [vendor, setVendor] = useState<VendorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [vendorLoading, setVendorLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [viewerImageIndex, setViewerImageIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    country: "",
    message: "",
    requestType: "",
  });
  const [formSubmitting, setFormSubmitting] = useState(false);

  const allImages = data
    ? [...data.interiorImageUrls, ...data.exteriorImageUrls]
    : [];

  const getJet = async () => {
    if (!id) {
      toast.error("Invalid jet ID");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await vendorApi.get(`/jets/preview/${id}`);
      if (response.data.success) {
        setData(response.data.data);
      } else {
        throw new Error(response.data.message);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch jet details");
    } finally {
      setLoading(false);
    }
  };

  const getVendor = async () => {
    if (!data?.vendorId) return;
    try {
      setVendorLoading(true);
      const response = await vendorApi.get(`/user/${data.vendorId}`);
      if (response.data.success) {
        setVendor(response.data.vendor);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      console.error("Failed to fetch vendor details:", error);
    } finally {
      setVendorLoading(false);
    }
  };

  useEffect(() => {
    getJet();
  }, [id]);

  useEffect(() => {
    if (data) {
      getVendor();
    }
  }, [data]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );
  };

  const nextViewerImage = () => {
    setViewerImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevViewerImage = () => {
    setViewerImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );
  };

  const openImageViewer = (index: number) => {
    setViewerImageIndex(index);
    setShowImageViewer(true);
  };

  const closeImageViewer = () => {
    setShowImageViewer(false);
  };

  const openModal = (requestType: string) => {
    setFormData({
      ...formData,
      requestType,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);

    try {
      const response = await vendorApi.post("/requests/submit", {
        ...formData,
        jetId: id,
      });
      if (response.data.success) {
        toast.success(
          `Your ${formData.requestType} request has been submitted`
        );
        setShowModal(false);
        setFormData({
          name: "",
          email: "",
          country: "",
          message: "",
          requestType: "",
        });
      } else {
        throw new Error(response.data.message || "Failed to submit request");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to submit request");
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showImageViewer) return;
      if (e.key === "ArrowRight") nextViewerImage();
      if (e.key === "ArrowLeft") prevViewerImage();
      if (e.key === "Escape") closeImageViewer();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showImageViewer]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-900 text-xl font-serif tracking-tight animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-900 text-xl font-serif tracking-tight">
          No Jet Available
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <div className="preview-hd p-4 bg-orange-400 text-center text-white">
        This Is A Preview Only None Of The Functions Work Here
      </div>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[70vh] w-full overflow-hidden"
      >
        {allImages.length > 0 ? (
          <>
            <motion.img
              key={currentImageIndex}
              src={allImages[currentImageIndex]}
              alt={`Jet ${
                currentImageIndex < data.interiorImageUrls.length
                  ? "Interior"
                  : "Exterior"
              }`}
              className="w-full h-full object-contain object-center cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              onClick={() => openImageViewer(currentImageIndex)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-center justify-between px-8">
              <button
                onClick={prevImage}
                className="text-white p-3 rounded-full bg-black/30 hover:bg-black/50 transition-all duration-300"
                aria-label="Previous image"
              >
                <ArrowLeft size={28} />
              </button>
              <button
                onClick={nextImage}
                className="text-white p-3 rounded-full bg-black/30 hover:bg-black/50 transition-all duration-300"
                aria-label="Next image"
              >
                <ArrowRight size={28} />
              </button>
            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/30 px-4 py-2 rounded-lg">
              {currentImageIndex + 1} / {allImages.length}
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <ImageIcon size={64} className="text-gray-300" />
          </div>
        )}
      </motion.section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12 p-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-gray-900">
              {data.manufacturer} {data.model}
            </h1>
            <div className="flex flex-wrap gap-6 mt-6 text-gray-600 text-base">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-500" />
                {data.year}
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-500" />
                {data.currentLocation}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-500" />
                {data.totalTimeSinceNew.toLocaleString()} hrs
              </div>
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-gray-500" />
                {data.totalLandings.toLocaleString()} landings
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 tracking-tight">
              Asking Price
            </div>
            <div className="text-3xl font-serif font-light text-gray-900">
              {data.price === "Price on Request"
                ? data.price
                : `$${parseFloat(data.price).toLocaleString()}`}
            </div>
          </div>
        </div>

        {/* Vendor Info */}
        <div className="mb-12 p-8 border-b border-gray-200">
          <h3 className="text-xl font-serif font-light tracking-tight text-gray-900 mb-4">
            Listed by
          </h3>
          {vendorLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-gray-400"></div>
            </div>
          ) : vendor ? (
            <div className="flex items-center gap-4">
              {vendor.brandImage && (
                <img
                  src={vendor.brandImage}
                  alt={`${vendor.companyName} logo`}
                  className="h-12 w-12 object-contain rounded-full"
                />
              )}
              <div className="text-gray-600">
                <p className="font-medium text-lg">{vendor.companyName}</p>
                <p className="text-sm">Posted by {vendor.name}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 text-sm">
              Vendor information unavailable
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-12">
          <button
            onClick={() => openModal("Full Specifications")}
            className="px-8 py-3 bg-white text-gray-900 hover:bg-gray-50 transition-all duration-300 font-sans text-sm tracking-tight rounded border border-gray-300"
          >
            <FileText size={18} className="inline mr-2" />
            Specifications
          </button>
          <button
            onClick={() => openModal("Interior Plans")}
            className="px-8 py-3 bg-white text-gray-900 hover:bg-gray-50 transition-all duration-300 font-sans text-sm tracking-tight rounded border border-gray-300"
          >
            <Layout size={18} className="inline mr-2" />
            Interior Plans
          </button>
          <button
            onClick={() => openModal("Broker Contact")}
            className="px-8 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 font-sans text-sm tracking-tight rounded"
          >
            <Mail size={18} className="inline mr-2" />
            Contact
          </button>
        </div>

        {/* Key Specifications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="border border-gray-200 p-6 text-center rounded">
            <Navigation size={24} className="mx-auto mb-2 text-gray-700" />
            <div className="text-2xl font-serif font-light">
              {data.range ? `${data.range.toLocaleString()} nm` : "N/A"}
            </div>
            <div className="text-sm text-gray-500 tracking-tight">Range</div>
          </div>
          <div className="border border-gray-200 p-6 text-center rounded">
            <Zap size={24} className="mx-auto mb-2 text-gray-700" />
            <div className="text-2xl font-serif font-light">
              {data.cruiseSpeed ? `${data.cruiseSpeed} mph` : "N/A"}
            </div>
            <div className="text-sm text-gray-500 tracking-tight">Speed</div>
          </div>
          <div className="border border-gray-200 p-6 text-center rounded">
            <Feather size={24} className="mx-auto mb-2 text-gray-700" />
            <div className="text-2xl font-serif font-light">
              {data.maxAltitude
                ? `${data.maxAltitude.toLocaleString()} ft`
                : "N/A"}
            </div>
            <div className="text-sm text-gray-500 tracking-tight">Altitude</div>
          </div>
          <div className="border border-gray-200 p-6 text-center rounded">
            <Layers size={24} className="mx-auto mb-2 text-gray-700" />
            <div className="text-2xl font-serif font-light">
              {data.maxTakeoffWeight
                ? `${data.maxTakeoffWeight.toLocaleString()} lbs`
                : "N/A"}
            </div>
            <div className="text-sm text-gray-500 tracking-tight">Weight</div>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          <div className="lg:col-span-2">
            {/* Interior Details */}
            <div className="mb-12">
              <h2 className="text-2xl font-serif font-light tracking-tight text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Interior Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-600">
                <div>
                  <h3 className="flex items-center gap-2 mb-2 font-sans text-lg text-gray-900">
                    <Box size={18} className="text-gray-500" />
                    Configuration
                  </h3>
                  <p>{data.interiorConfig || "N/A"}</p>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 mb-2 font-sans text-lg text-gray-900">
                    <Briefcase size={18} className="text-gray-500" />
                    Lavatory & Galley
                  </h3>
                  <p>{data.lavatoryGalleyDetails || "N/A"}</p>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 mb-2 font-sans text-lg text-gray-900">
                    <Users size={18} className="text-gray-500" />
                    Amenities
                  </h3>
                  <p>{data.cabinAmenities || "N/A"}</p>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 mb-2 font-sans text-lg text-gray-900">
                    <Globe size={18} className="text-gray-500" />
                    Connectivity
                  </h3>
                  <p>{data.wifiConnectivity || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="mb-12">
              <h2 className="text-2xl font-serif font-light tracking-tight text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Additional Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-600">
                <div>
                  <h3 className="flex items-center gap-2 mb-2 font-sans text-lg text-gray-900">
                    <Users size={18} className="text-gray-500" />
                    Previous Owners
                  </h3>
                  <p>
                    {data.previousOwners
                      ? data.previousOwners.toLocaleString()
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 mb-2 font-sans text-lg text-gray-900">
                    <Calendar size={18} className="text-gray-500" />
                    Refurbishment Date
                  </h3>
                  <p>{data.refurbishmentDate || "N/A"}</p>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 mb-2 font-sans text-lg text-gray-900">
                    <FileText size={18} className="text-gray-500" />
                    Airframe/Engine Status
                  </h3>
                  <p>{data.airframeEngineStatus || "N/A"}</p>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 mb-2 font-sans text-lg text-gray-900">
                    <Calendar size={18} className="text-gray-500" />
                    Delivery Availability
                  </h3>
                  <p>{data.deliveryAvailability || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div>
            <h2 className="text-2xl font-serif font-light tracking-tight text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Technical Specifications
            </h2>
            <div className="space-y-6 text-gray-600">
              <div>
                <h3 className="font-sans text-lg text-gray-900 mb-2">
                  Engines
                </h3>
                <p>{data.engineMakeModel || "N/A"}</p>
              </div>
              <div>
                <h3 className="font-sans text-lg text-gray-900 mb-2">
                  Engine Hours
                </h3>
                <p>
                  {data.engineHours
                    ? `${data.engineHours.toLocaleString()} hrs`
                    : "N/A"}
                </p>
              </div>
              <div>
                <h3 className="font-sans text-lg text-gray-900 mb-2">
                  Avionics Suite
                </h3>
                <p>{data.avionicsSuite || "N/A"}</p>
              </div>
              <div>
                <h3 className="font-sans text-lg text-gray-900 mb-2">
                  Maintenance Program
                </h3>
                <p>{data.maintenanceProgram || "N/A"}</p>
              </div>
              <div>
                <h3 className="font-sans text-lg text-gray-900 mb-2">
                  Registration
                </h3>
                <p>{data.registrationNumber || "N/A"}</p>
              </div>
              <div>
                <h3 className="font-sans text-lg text-gray-900 mb-2">
                  Runway Length
                </h3>
                <p>
                  {data.runwayLength
                    ? `${data.runwayLength.toLocaleString()} ft`
                    : "N/A"}
                </p>
              </div>
              <div>
                <h3 className="font-sans text-lg text-gray-900 mb-2">
                  Empty Weight
                </h3>
                <p>
                  {data.emptyWeight
                    ? `${data.emptyWeight.toLocaleString()} lbs`
                    : "N/A"}
                </p>
              </div>
              <div>
                <h3 className="font-sans text-lg text-gray-900 mb-2">Status</h3>
                <p className="capitalize">{data.status.toLowerCase()}</p>
              </div>
              {data.transactionLink && (
                <div>
                  <h3 className="font-sans text-lg text-gray-900 mb-2">
                    Transaction
                  </h3>
                  <a
                    href={data.transactionLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View on Solscan
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Gallery */}
        {allImages.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-serif font-light tracking-tight text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {allImages.map((url, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  className="relative group overflow-hidden rounded cursor-pointer"
                  onClick={() => openImageViewer(index)}
                >
                  <img
                    src={url}
                    alt={`Jet ${
                      index < data.interiorImageUrls.length
                        ? "Interior"
                        : "Exterior"
                    } ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <ImageIcon
                      className="text-white/0 group-hover:text-white/70"
                      size={40}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="py-12 text-center text-gray-500 text-sm border-t border-gray-200">
        <p>
          Listed on{" "}
          {new Date(data.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-lg w-full max-w-md relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              <div className="p-8">
                <h3 className="text-2xl font-serif font-light tracking-tight text-gray-900 mb-6">
                  {formData.requestType}
                </h3>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-600 mb-2 flex items-center gap-2 text-sm tracking-tight">
                        <User size={16} className="text-gray-500" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-500 rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-600 mb-2 flex items-center gap-2 text-sm tracking-tight">
                        <Mail size={16} className="text-gray-500" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-500 rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-600 mb-2 flex items-center gap-2 text-sm tracking-tight">
                        <Globe size={16} className="text-gray-500" />
                        Country
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-500 rounded"
                      >
                        <option value="">Select Country</option>
                        {countries.map((country: any) => (
                          <option key={country.code} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-600 mb-2 flex items-center gap-2 text-sm tracking-tight">
                        <MessageSquare size={16} className="text-gray-500" />
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-500 rounded"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="w-full bg-gray-900 text-white py-3 text-sm font-sans tracking-tight hover:bg-gray-800 transition-all duration-300 rounded disabled:bg-gray-400"
                    >
                      {formSubmitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          <Mail size={16} className="inline mr-2" />
                          Submit
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-Screen Image Viewer */}
      <AnimatePresence>
        {showImageViewer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-8"
          >
            <button
              onClick={closeImageViewer}
              className="absolute top-6 right-6 text-white/70 hover:text-white"
              aria-label="Close image viewer"
            >
              <X size={32} />
            </button>

            <div className="flex-1 w-full max-w-7xl flex items-center justify-center relative">
              <button
                onClick={prevViewerImage}
                className="absolute left-4 text-white p-4 bg-black/50 hover:bg-black/70 transition-all duration-300 rounded"
                aria-label="Previous image"
              >
                <ArrowLeft size={36} />
              </button>
              <motion.img
                key={viewerImageIndex}
                src={allImages[viewerImageIndex]}
                alt={`Jet ${
                  viewerImageIndex < data.interiorImageUrls.length
                    ? "Interior"
                    : "Exterior"
                } ${viewerImageIndex + 1}`}
                className="max-h-[75vh] w-auto object-contain rounded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <button
                onClick={nextViewerImage}
                className="absolute right-4 text-white p-4 bg-black/50 hover:bg-black/70 transition-all duration-300 rounded"
                aria-label="Next image"
              >
                <ArrowRight size={36} />
              </button>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full max-w-7xl px-4 py-4 overflow-x-auto bg-black/50 rounded"
            >
              <div className="flex space-x-2">
                {allImages.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => setViewerImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 overflow-hidden rounded border-2 ${
                      index === viewerImageIndex
                        ? "border-white"
                        : "border-white/20"
                    }`}
                  >
                    <img
                      src={url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default JetListingPreview;
