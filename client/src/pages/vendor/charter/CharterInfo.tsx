import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import axiosInstance from "@/lib/api";

interface CharterData {
  id: string;
  createdAt: string;
  updatedAt: string;
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
  availableRoutes: string | Array<{ departure: string; destination: string }>;
  operatingDays: string;
  noticeRequired: string;
  pricePerHour: string;
  minimumFlightTime: string;
  tripOption: string;
  additionalFees: { name: string; price: string }[];
  discounts: string;
  cabinFeatures: string[];
  inFlightMeals: boolean;
  flightAttendant: boolean;
  petsAllowed: boolean;
  smokingAllowed: boolean;
  exteriorImages: string[];
  interiorImages: string[];
  videoLink: string | null;
  luxuryCarService: boolean;
  vendorId: string;
  sponsored: boolean;
  sponsoredType: string;
  endData: string;
  transactionSignature: string;
  transactionLink: string;
  status: string;
  views: number;
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
  customerName: string;
  customerEmail: string;
  departureLocation: string;
  arrivalLocation: string;
  departureDate: string;
  returnDate: string;
  passengerCount: string;
  specialRequests: string;
}

function CharterInfo() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<CharterData | null>(null);
  const [vendor, setVendor] = useState<VendorData | null>(null);
  const [loading, setLoading] = useState({ jet: true, vendor: false });
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [viewerImageIndex, setViewerImageIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    customerName: "",
    customerEmail: "",
    departureLocation: "",
    arrivalLocation: "",
    departureDate: "",
    returnDate: "",
    passengerCount: "",
    specialRequests: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  console.log(vendor, showStickyBar);

  // Helper function to format available routes
  const formatAvailableRoutes = (
    routes: string | Array<{ departure: string; destination: string }>
  ) => {
    if (typeof routes === "string") {
      return routes;
    }
    if (Array.isArray(routes)) {
      return routes
        .map((route) => `${route.departure} → ${route.destination}`)
        .join(", ");
    }
    return "Worldwide";
  };

  const allImages = data
    ? [...(data.interiorImages || []), ...(data.exteriorImages || [])]
    : [];

  // Debug logging
  useEffect(() => {
    if (data) {
      console.log("Charter data loaded:", data);
      console.log("Interior images:", data.interiorImages);
      console.log("Exterior images:", data.exteriorImages);
      console.log("All images:", allImages);
    }
  }, [data, allImages]);

  const getJetInfo = async () => {
    if (!id) {
      toast.error("Invalid jet ID");
      setLoading((prev) => ({ ...prev, jet: false }));
      return;
    }
    try {
      setLoading((prev) => ({ ...prev, jet: true }));
      const response = await axiosInstance.get(`/jets/charter/${id}`);
      if (response.data.success) {
        setData(response.data.data);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch jet details");
    } finally {
      setLoading((prev) => ({ ...prev, jet: false }));
    }
  };

  const getVendor = async () => {
    if (!data?.vendorId) return;
    try {
      setLoading((prev) => ({ ...prev, vendor: true }));
      const response = await axiosInstance.get(
        `/jets/sale/user/${data.vendorId}`
      );
      if (response.data.success) {
        setVendor(response.data.vendor);
      } else {
        throw new Error(response.data.message);
      }
    } catch (err: any) {
      toast.error("Failed to load vendor information");
    } finally {
      setLoading((prev) => ({ ...prev, vendor: false }));
    }
  };

  useEffect(() => {
    getJetInfo();
  }, [id]);

  useEffect(() => {
    if (data) getVendor();
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.title = data
      ? `${data.manufacturer} ${data.jetName} | SkyJets Charter`
      : "Charter Listing | SkyJets";
  }, [data]);

  const nextViewerImage = () =>
    setViewerImageIndex((prev) => (prev + 1) % allImages.length);
  const prevViewerImage = () =>
    setViewerImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );

  const openImageViewer = (index: number) => {
    setViewerImageIndex(index);
    setShowImageViewer(true);
  };

  const closeImageViewer = () => {
    setShowImageViewer(false);
    setViewerImageIndex(0);
  };

  const openModal = (requestType: string) => {
    setModalTitle(requestType);
    setShowModal(true);
    setFormErrors({});
  };

  const validateForm = (): Partial<FormData> => {
    const errors: Partial<FormData> = {};
    if (!formData.customerName.trim())
      errors.customerName = "Full name is required";
    if (!formData.customerEmail.trim())
      errors.customerEmail = "Email is required";
    else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        formData.customerEmail
      )
    )
      errors.customerEmail = "Invalid email format";
    if (!formData.departureLocation.trim())
      errors.departureLocation = "Departure location is required";
    if (!formData.arrivalLocation.trim())
      errors.arrivalLocation = "Arrival location is required";
    if (!formData.departureDate)
      errors.departureDate = "Departure date is required";
    else if (new Date(formData.departureDate) < new Date())
      errors.departureDate = "Departure date cannot be in the past";
    if (
      formData.returnDate &&
      new Date(formData.returnDate) < new Date(formData.departureDate)
    )
      errors.returnDate = "Return date must be after departure date";
    if (!formData.passengerCount)
      errors.passengerCount = "Number of passengers is required";
    else if (parseInt(formData.passengerCount) <= 0)
      errors.passengerCount = "Passenger count must be greater than 0";
    else if (
      data &&
      parseInt(formData.passengerCount) > parseInt(data.seatingCapacity)
    )
      errors.passengerCount = `Passenger count cannot exceed seating capacity (${data.seatingCapacity})`;
    return errors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormSubmitting(true);
    try {
      const response = await axiosInstance.post("/jets/charter/messages/new", {
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        departureLocation: formData.departureLocation,
        arrivalLocation: formData.arrivalLocation,
        departureDate: formData.departureDate,
        returnDate: formData.returnDate || undefined,
        passengerCount: formData.passengerCount,
        specialRequests: formData.specialRequests || undefined,
        listingId: id,
        vendorId: data!.vendorId,
      });
      if (response.data.success) {
        toast.success("Your charter request has been submitted successfully");
        setShowModal(false);
        setFormData({
          customerName: "",
          customerEmail: "",
          departureLocation: "",
          arrivalLocation: "",
          departureDate: "",
          returnDate: "",
          passengerCount: "",
          specialRequests: "",
        });
        setFormErrors({});
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
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof FormData]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
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

  async function updateViews() {
    if (!id) return;
    try {
      await axiosInstance.put(`/jets/charter/views/${id}`);
    } catch (error) {
      console.error("Failed to update views:", error);
    }
  }

  useEffect(() => {
    updateViews();
  }, [id]);

  if (loading.jet) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="h-[60vh] w-full bg-gray-100 animate-pulse rounded-2xl mb-12"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-32 bg-gray-100 animate-pulse rounded-2xl"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.status !== "APPROVED") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light text-gray-900 mb-4">404</h1>
          <p className="text-lg text-gray-600">Charter listing not found</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <picture
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <source
            srcSet={
              allImages.length > 0
                ? allImages[0]
                : "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
            }
            media="(min-width: 1600px)"
          />
          <source
            srcSet={
              allImages.length > 0
                ? allImages[0]
                : "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80"
            }
            media="(min-width: 1440px)"
          />
          <source
            srcSet={
              allImages.length > 0
                ? allImages[0]
                : "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1440&q=80"
            }
            media="(min-width: 1280px)"
          />
          <source
            srcSet={
              allImages.length > 0
                ? allImages[0]
                : "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
            }
            media="(min-width: 1024px)"
          />
          <source
            srcSet={
              allImages.length > 0
                ? allImages[0]
                : "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80"
            }
            media="(min-width: 768px)"
          />
          <source
            srcSet={
              allImages.length > 0
                ? allImages[0]
                : "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80"
            }
            media="(min-width: 640px)"
          />
          <source
            srcSet={
              allImages.length > 0
                ? allImages[0]
                : "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80"
            }
            media="(min-width: 480px)"
          />
          <source
            srcSet={
              allImages.length > 0
                ? allImages[0]
                : "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=480&q=80"
            }
            media="(min-width: 375px)"
          />
          <img
            loading="eager"
            fetchPriority="high"
            src={
              allImages.length > 0
                ? allImages[0]
                : "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=375&q=80"
            }
            alt={
              data
                ? `${data.manufacturer} ${data.jetName}`
                : "Private Jet Charter"
            }
            crossOrigin="anonymous"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              animation: "subtleZoom 20s ease-in-out infinite",
            }}
          />
        </picture>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
            padding: "60px 20px 40px",
            color: "white",
            textAlign: "center",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                marginBottom: "20px",
                animation: "fadeInUp 1s ease-out",
              }}
            >
              <span
                style={{
                  fontSize: "clamp(12px, 2.5vw, 14px)",
                  fontWeight: "500",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  opacity: "0.9",
                  borderBottom: "1px solid rgba(255,255,255,0.3)",
                  paddingBottom: "8px",
                }}
              >
                Private Charter
              </span>
            </div>

            <p
              style={{
                fontSize: "clamp(2rem, 8vw, 4rem)",
                fontWeight: "300",
                margin: "0 0 10px 0",
                lineHeight: "1.2",
                animation: "fadeInUp 1s ease-out 0.2s both",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
              className="text-white"
            >
              {data?.jetName || "PRIVATE JET"}
            </p>
            <p
              style={{
                fontSize: "clamp(16px, 3vw, 18px)",
                fontWeight: "400",
                margin: "0 0 30px 0",
                opacity: "0.9",
                animation: "fadeInUp 1s ease-out 0.4s both",
                letterSpacing: "1px",
              }}
            >
              Available for Charter
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "clamp(20px, 4vw, 40px)",
                flexWrap: "wrap",
                animation: "fadeInUp 1s ease-out 0.6s both",
              }}
            >
              <span
                style={{
                  fontSize: "clamp(12px, 2.5vw, 14px)",
                  opacity: "0.8",
                  padding: "8px 16px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "20px",
                  backdropFilter: "blur(10px)",
                }}
              >
                {data?.seatingCapacity} Guests
              </span>
              <span
                style={{
                  fontSize: "clamp(12px, 2.5vw, 14px)",
                  opacity: "0.8",
                  padding: "8px 16px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "20px",
                  backdropFilter: "blur(10px)",
                }}
              >
                {data?.aircraftType}
              </span>
              <span
                style={{
                  fontSize: "clamp(12px, 2.5vw, 14px)",
                  opacity: "0.8",
                  padding: "8px 16px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "20px",
                  backdropFilter: "blur(10px)",
                }}
              >
                {data?.maximumRange}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes subtleZoom {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes shimmer {
            0% { background-position: -200px 0; }
            100% { background-position: calc(200px + 100%) 0; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 clamp(16px, 4vw, 20px)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "clamp(30px, 6vw, 60px)",
            padding: "clamp(40px, 8vw, 80px) 0 clamp(30px, 6vw, 60px)",
            borderBottom: "1px solid #e5e7eb",
            position: "relative",
          }}
        >
          <div style={{ animation: "fadeInUp 1s ease-out 0.8s both" }}>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
                fontWeight: "300",
                margin: "0 0 20px 0",
                color: "#111827",
                position: "relative",
              }}
            >
              {data?.manufacturer}
              <div
                style={{
                  position: "absolute",
                  bottom: "-8px",
                  left: "0",
                  width: "60px",
                  height: "2px",
                  background: "linear-gradient(90deg, #111827, transparent)",
                }}
              />
            </h2>
            <p
              style={{
                fontSize: "clamp(14px, 3vw, 16px)",
                color: "#6b7280",
                margin: "0",
                lineHeight: "1.6",
              }}
            >
              {data?.aircraftType} • {data?.yearOfManufacture} •{" "}
              {data?.registrationNumber}
            </p>
          </div>
          <div style={{ animation: "fadeInUp 1s ease-out 1s both" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: "clamp(20px, 4vw, 30px)",
              }}
            >
              <div
                style={{
                  padding: "20px",
                  background:
                    "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0,0,0,0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(12px, 2.5vw, 14px)",
                    color: "#6b7280",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Range
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: "clamp(16px, 3.5vw, 18px)",
                    fontWeight: "500",
                    color: "#111827",
                    marginTop: "8px",
                  }}
                >
                  {data?.maximumRange}
                </span>
              </div>
              <div
                style={{
                  padding: "20px",
                  background:
                    "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0,0,0,0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(12px, 2.5vw, 14px)",
                    color: "#6b7280",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Guests
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: "clamp(16px, 3.5vw, 18px)",
                    fontWeight: "500",
                    color: "#111827",
                    marginTop: "8px",
                  }}
                >
                  {data?.seatingCapacity}
                </span>
              </div>
              <div
                style={{
                  padding: "20px",
                  background:
                    "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0,0,0,0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(12px, 2.5vw, 14px)",
                    color: "#6b7280",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Built
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: "clamp(16px, 3.5vw, 18px)",
                    fontWeight: "500",
                    color: "#111827",
                    marginTop: "8px",
                  }}
                >
                  {data?.yearOfManufacture}
                </span>
              </div>
              <div
                style={{
                  padding: "20px",
                  background:
                    "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0,0,0,0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(12px, 2.5vw, 14px)",
                    color: "#6b7280",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Crew
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: "clamp(16px, 3.5vw, 18px)",
                    fontWeight: "500",
                    color: "#111827",
                    marginTop: "8px",
                  }}
                >
                  2-4
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "clamp(30px, 6vw, 40px)",
            alignItems: "center",
            padding: "clamp(40px, 8vw, 60px) 0",
            borderBottom: "1px solid #e5e7eb",
            position: "relative",
          }}
        >
          <div style={{ animation: "fadeInUp 1s ease-out 1.2s both" }}>
            <h3
              style={{
                fontSize: "clamp(1.5rem, 4vw, 2rem)",
                fontWeight: "300",
                margin: "0 0 15px 0",
                color: "#111827",
              }}
            >
              Charter Rates
            </h3>
            <div
              style={{
                fontSize: "clamp(2rem, 5vw, 2.5rem)",
                fontWeight: "300",
                color: "#111827",
                marginBottom: "10px",
                background: "linear-gradient(135deg, #111827 0%, #374151 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              From ${data?.pricePerHour} per hour
            </div>
            <p
              style={{
                fontSize: "clamp(14px, 3vw, 16px)",
                color: "#6b7280",
                margin: "0",
              }}
            >
              Exclusive private charter experience
            </p>
          </div>
          <div
            style={{
              textAlign: "center",
              animation: "fadeInUp 1s ease-out 1.4s both",
            }}
          >
            <button
              onClick={() => openModal("Charter Request")}
              style={{
                background: "linear-gradient(135deg, #111827 0%, #374151 100%)",
                color: "white",
                border: "none",
                padding: "clamp(14px, 3vw, 16px) clamp(24px, 5vw, 32px)",
                fontSize: "clamp(14px, 3vw, 16px)",
                fontWeight: "500",
                cursor: "pointer",
                borderRadius: "8px",
                transition: "all 0.3s ease",
                width: "100%",
                maxWidth: "300px",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 25px rgba(17, 24, 39, 0.3)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span style={{ position: "relative", zIndex: 1 }}>
                Request Charter
              </span>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  transition: "left 0.5s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.left = "100%";
                }}
              />
            </button>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "clamp(40px, 8vw, 80px)",
            padding: "clamp(40px, 8vw, 80px) 0",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <div style={{ animation: "fadeInUp 1s ease-out 1.6s both" }}>
            <h3
              style={{
                fontSize: "clamp(1.5rem, 4vw, 2rem)",
                fontWeight: "300",
                margin: "0 0 30px 0",
                color: "#111827",
              }}
            >
              A little more about {data?.jetName}
            </h3>
            <div
              style={{
                fontSize: "clamp(14px, 3vw, 16px)",
                lineHeight: "1.8",
                color: "#374151",
              }}
            >
              <p style={{ margin: "0 0 20px 0" }}>
                Experience unparalleled luxury travel with this{" "}
                {data?.manufacturer} {data?.jetName}. This {data?.aircraftType}{" "}
                aircraft represents the pinnacle of private aviation, offering
                exceptional comfort and performance for the most discerning
                travelers.
              </p>
              <p style={{ margin: "0 0 20px 0" }}>
                Whether you have extensive experience with private aviation or
                are embarking on your first luxury charter, you will appreciate
                the unique atmosphere and sophisticated design of this aircraft,
                crafted to provide the ultimate in comfort and style for the
                world's most demanding clientele.
              </p>
              <p style={{ margin: "0" }}>
                Now available for exclusive charter, this aircraft remains the
                perfect choice for world-class travel, offering a unique
                opportunity to experience the pinnacle of luxury aviation. She
                accommodates {data?.seatingCapacity} guests in the most refined
                and comfortable seating configuration.
              </p>
            </div>
          </div>

          <div style={{ animation: "fadeInUp 1s ease-out 1.8s both" }}>
            <h4
              style={{
                fontSize: "clamp(12px, 2.5vw, 14px)",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "2px",
                color: "#6b7280",
                margin: "0 0 30px 0",
                position: "relative",
              }}
            >
              EXCLUSIVE FEATURES
              <div
                style={{
                  position: "absolute",
                  bottom: "-8px",
                  left: "0",
                  width: "40px",
                  height: "1px",
                  background: "#6b7280",
                }}
              />
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: "0",
                margin: "0",
              }}
            >
              <li
                style={{
                  padding: "16px 20px",
                  borderBottom: "1px solid #f3f4f6",
                  fontSize: "clamp(13px, 2.8vw, 15px)",
                  color: "#374151",
                  background:
                    "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                  marginBottom: "8px",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  position: "relative",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateX(10px)";
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateX(0)";
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)";
                }}
              >
                <span style={{ marginLeft: "20px" }}>
                  Premium cabin configuration with {data?.cabinConfiguration}
                </span>
              </li>
              <li
                style={{
                  padding: "16px 20px",
                  borderBottom: "1px solid #f3f4f6",
                  fontSize: "clamp(13px, 2.8vw, 15px)",
                  color: "#374151",
                  background:
                    "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                  marginBottom: "8px",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  position: "relative",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateX(10px)";
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateX(0)";
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)";
                }}
              >
                <span style={{ marginLeft: "20px" }}>
                  Maximum range of {data?.maximumRange}
                </span>
              </li>
              <li
                style={{
                  padding: "16px 20px",
                  borderBottom: "1px solid #f3f4f6",
                  fontSize: "clamp(13px, 2.8vw, 15px)",
                  color: "#374151",
                  background:
                    "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                  marginBottom: "8px",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  position: "relative",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateX(10px)";
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateX(0)";
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)";
                }}
              >
                <span style={{ marginLeft: "20px" }}>
                  Cruising speed of {data?.cruisingSpeed}
                </span>
              </li>
              <li
                style={{
                  padding: "16px 20px",
                  borderBottom: "1px solid #f3f4f6",
                  fontSize: "clamp(13px, 2.8vw, 15px)",
                  color: "#374151",
                  background:
                    "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                  marginBottom: "8px",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  position: "relative",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateX(10px)";
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateX(0)";
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)";
                }}
              >
                <span style={{ marginLeft: "20px" }}>
                  Home base at {data?.homeBase}
                </span>
              </li>
              {data?.inFlightMeals && (
                <li
                  style={{
                    padding: "16px 20px",
                    borderBottom: "1px solid #f3f4f6",
                    fontSize: "clamp(13px, 2.8vw, 15px)",
                    color: "#374151",
                    background:
                      "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                    marginBottom: "8px",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    position: "relative",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateX(10px)";
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateX(0)";
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)";
                  }}
                >
                  <span style={{ marginLeft: "20px" }}>
                    Gourmet in-flight catering service
                  </span>
                </li>
              )}
              {data?.flightAttendant && (
                <li
                  style={{
                    padding: "16px 20px",
                    borderBottom: "1px solid #f3f4f6",
                    fontSize: "clamp(13px, 2.8vw, 15px)",
                    color: "#374151",
                    background:
                      "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                    marginBottom: "8px",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    position: "relative",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateX(10px)";
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateX(0)";
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)";
                  }}
                >
                  <span style={{ marginLeft: "20px" }}>
                    Professional flight attendant
                  </span>
                </li>
              )}
              {data?.luxuryCarService && (
                <li
                  style={{
                    padding: "16px 20px",
                    borderBottom: "1px solid #f3f4f6",
                    fontSize: "clamp(13px, 2.8vw, 15px)",
                    color: "#374151",
                    background:
                      "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                    marginBottom: "8px",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    position: "relative",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateX(10px)";
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateX(0)";
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)";
                  }}
                >
                  <span style={{ marginLeft: "20px" }}>
                    Luxury ground transportation
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {allImages.length > 1 && (
          <div
            style={{
              padding: "clamp(40px, 8vw, 80px) 0",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <h3
              style={{
                fontSize: "clamp(1.5rem, 4vw, 2rem)",
                fontWeight: "300",
                margin: "0 0 40px 0",
                color: "#111827",
                textAlign: "center",
              }}
            >
              Image Gallery
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "clamp(15px, 3vw, 20px)",
                marginBottom: "40px",
              }}
            >
              {allImages.slice(1, 6).map((image, index) => (
                <div
                  key={index}
                  onClick={() => openImageViewer(index + 1)}
                  style={{
                    cursor: "pointer",
                    overflow: "hidden",
                    borderRadius: "12px",
                    transition: "all 0.4s ease",
                    position: "relative",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform =
                      "scale(1.05) translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 40px rgba(0,0,0,0.15)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1) translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 6px rgba(0,0,0,0.1)";
                  }}
                >
                  <img
                    src={image}
                    alt={`${data?.manufacturer} ${data?.jetName} - Image ${
                      index + 2
                    }`}
                    style={{
                      width: "100%",
                      height: "clamp(200px, 40vw, 250px)",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background:
                        "linear-gradient(transparent, rgba(0,0,0,0.3))",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.opacity = "1";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.opacity = "0";
                    }}
                  >
                    <div
                      style={{
                        background: "rgba(255,255,255,0.9)",
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <span style={{ fontSize: "20px", color: "#111827" }}>
                        👁
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center" }}>
              <button
                onClick={() => openImageViewer(1)}
                style={{
                  background:
                    "linear-gradient(135deg, #111827 0%, #374151 100%)",
                  color: "white",
                  border: "none",
                  padding: "clamp(12px, 2.5vw, 14px) clamp(24px, 4vw, 32px)",
                  fontSize: "clamp(12px, 2.5vw, 14px)",
                  fontWeight: "500",
                  cursor: "pointer",
                  borderRadius: "25px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(17, 24, 39, 0.2)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(17, 24, 39, 0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(17, 24, 39, 0.2)";
                }}
              >
                View All Photos
              </button>
            </div>
          </div>
        )}

        <div
          style={{
            padding: "clamp(40px, 8vw, 80px) 0",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <h3
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              fontWeight: "300",
              margin: "0 0 40px 0",
              color: "#111827",
            }}
          >
            Specification: {data?.jetName}
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "clamp(40px, 8vw, 60px)",
            }}
          >
            <div>
              <h4
                style={{
                  fontSize: "clamp(16px, 3.5vw, 18px)",
                  fontWeight: "500",
                  margin: "0 0 25px 0",
                  color: "#111827",
                }}
              >
                Accommodation
              </h4>
              <div
                style={{
                  display: "grid",
                  gap: "15px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "15px 0",
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  <span
                    style={{
                      color: "#6b7280",
                      fontSize: "clamp(13px, 2.8vw, 15px)",
                    }}
                  >
                    Guests
                  </span>
                  <span
                    style={{
                      fontWeight: "500",
                      color: "#111827",
                      fontSize: "clamp(13px, 2.8vw, 15px)",
                    }}
                  >
                    {data?.seatingCapacity}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "15px 0",
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  <span
                    style={{
                      color: "#6b7280",
                      fontSize: "clamp(13px, 2.8vw, 15px)",
                    }}
                  >
                    Cabin Configuration
                  </span>
                  <span
                    style={{
                      fontWeight: "500",
                      color: "#111827",
                      fontSize: "clamp(13px, 2.8vw, 15px)",
                    }}
                  >
                    {data?.cabinConfiguration}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "15px 0",
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  <span
                    style={{
                      color: "#6b7280",
                      fontSize: "clamp(13px, 2.8vw, 15px)",
                    }}
                  >
                    Crew
                  </span>
                  <span
                    style={{
                      fontWeight: "500",
                      color: "#111827",
                      fontSize: "clamp(13px, 2.8vw, 15px)",
                    }}
                  >
                    2-4
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h4
                style={{
                  fontSize: "clamp(16px, 3.5vw, 18px)",
                  fontWeight: "500",
                  margin: "0 0 25px 0",
                  color: "#111827",
                }}
              >
                Performance & Engines
              </h4>
              <div
                style={{
                  display: "grid",
                  gap: "15px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "15px 0",
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  <span
                    style={{
                      color: "#6b7280",
                      fontSize: "clamp(13px, 2.8vw, 15px)",
                    }}
                  >
                    Cruising Speed
                  </span>
                  <span
                    style={{
                      fontWeight: "500",
                      color: "#111827",
                      fontSize: "clamp(13px, 2.8vw, 15px)",
                    }}
                  >
                    {data?.cruisingSpeed}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "15px 0",
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  <span
                    style={{
                      color: "#6b7280",
                      fontSize: "clamp(13px, 2.8vw, 15px)",
                    }}
                  >
                    Maximum Range
                  </span>
                  <span
                    style={{
                      fontWeight: "500",
                      color: "#111827",
                      fontSize: "clamp(13px, 2.8vw, 15px)",
                    }}
                  >
                    {data?.maximumRange}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "15px 0",
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  <span
                    style={{
                      color: "#6b7280",
                      fontSize: "clamp(13px, 2.8vw, 15px)",
                    }}
                  >
                    Baggage Capacity
                  </span>
                  <span
                    style={{
                      fontWeight: "500",
                      color: "#111827",
                      fontSize: "clamp(13px, 2.8vw, 15px)",
                    }}
                  >
                    {data?.baggageCapacity}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "clamp(40px, 8vw, 80px) 0",
          }}
        >
          <h3
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              fontWeight: "300",
              margin: "0 0 40px 0",
              color: "#111827",
            }}
          >
            Location & Hourly Rate
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "clamp(40px, 8vw, 60px)",
            }}
          >
            <div>
              <h4
                style={{
                  fontSize: "clamp(16px, 3.5vw, 18px)",
                  fontWeight: "500",
                  margin: "0 0 20px 0",
                  color: "#111827",
                }}
              >
                Available Routes
              </h4>
              <p
                style={{
                  fontSize: "clamp(14px, 3vw, 16px)",
                  lineHeight: "1.6",
                  color: "#374151",
                  margin: "0 0 15px 0",
                }}
              >
                {data?.availableRoutes
                  ? formatAvailableRoutes(data.availableRoutes)
                  : "Worldwide"}
              </p>
              <p
                style={{
                  fontSize: "clamp(14px, 3vw, 16px)",
                  lineHeight: "1.6",
                  color: "#374151",
                  margin: "0",
                }}
              >
                Home Base: {data?.homeBase}
              </p>
            </div>
            <div>
              <h4
                style={{
                  fontSize: "clamp(16px, 3.5vw, 18px)",
                  fontWeight: "500",
                  margin: "0 0 20px 0",
                  color: "#111827",
                }}
              >
                Charter Rate
              </h4>
              <div
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 2rem)",
                  fontWeight: "300",
                  color: "#111827",
                  marginBottom: "15px",
                }}
              >
                From ${data?.pricePerHour} per hour
              </div>
              <p
                style={{
                  fontSize: "clamp(14px, 3vw, 16px)",
                  lineHeight: "1.6",
                  color: "#374151",
                  margin: "0 0 10px 0",
                }}
              >
                Minimum flight time: {data?.minimumFlightTime}
              </p>
              <p
                style={{
                  fontSize: "clamp(14px, 3vw, 16px)",
                  lineHeight: "1.6",
                  color: "#374151",
                  margin: "0",
                }}
              >
                Notice required: {data?.noticeRequired}
              </p>
            </div>
          </div>
        </div>
      </div>

      {showImageViewer && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.9)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "90vw",
              maxHeight: "90vh",
            }}
          >
            <button
              onClick={closeImageViewer}
              style={{
                position: "absolute",
                top: "-50px",
                right: "0",
                background: "none",
                border: "none",
                color: "white",
                fontSize: "24px",
                cursor: "pointer",
                padding: "10px",
              }}
            >
              ✕
            </button>
            <img
              src={allImages[viewerImageIndex]}
              alt={`${data?.manufacturer} ${data?.jetName} - Image ${
                viewerImageIndex + 1
              }`}
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                objectFit: "contain",
              }}
            />
            <button
              onClick={prevViewerImage}
              style={{
                position: "absolute",
                left: "-60px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "white",
                fontSize: "24px",
                cursor: "pointer",
                padding: "10px",
              }}
            >
              ‹
            </button>
            <button
              onClick={nextViewerImage}
              style={{
                position: "absolute",
                right: "-60px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "white",
                fontSize: "24px",
                cursor: "pointer",
                padding: "10px",
              }}
            >
              ›
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "8px",
              padding: "40px",
              maxWidth: "500px",
              width: "100%",
              maxHeight: "90vh",
              overflow: "auto",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "500",
                margin: "0 0 30px 0",
                color: "#111827",
              }}
            >
              {modalTitle}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                  }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    fontSize: "16px",
                  }}
                />
                {formErrors.customerName && (
                  <p
                    style={{
                      color: "#dc2626",
                      fontSize: "14px",
                      margin: "5px 0 0 0",
                    }}
                  >
                    {formErrors.customerName}
                  </p>
                )}
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    fontSize: "16px",
                  }}
                />
                {formErrors.customerEmail && (
                  <p
                    style={{
                      color: "#dc2626",
                      fontSize: "14px",
                      margin: "5px 0 0 0",
                    }}
                  >
                    {formErrors.customerEmail}
                  </p>
                )}
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                  }}
                >
                  Departure Location
                </label>
                <input
                  type="text"
                  name="departureLocation"
                  value={formData.departureLocation}
                  onChange={handleChange}
                  placeholder="Enter departure location"
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    fontSize: "16px",
                  }}
                />
                {formErrors.departureLocation && (
                  <p
                    style={{
                      color: "#dc2626",
                      fontSize: "14px",
                      margin: "5px 0 0 0",
                    }}
                  >
                    {formErrors.departureLocation}
                  </p>
                )}
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                  }}
                >
                  Arrival Location
                </label>
                <input
                  type="text"
                  name="arrivalLocation"
                  value={formData.arrivalLocation}
                  onChange={handleChange}
                  placeholder="Enter arrival location"
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    fontSize: "16px",
                  }}
                />
                {formErrors.arrivalLocation && (
                  <p
                    style={{
                      color: "#dc2626",
                      fontSize: "14px",
                      margin: "5px 0 0 0",
                    }}
                  >
                    {formErrors.arrivalLocation}
                  </p>
                )}
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                  }}
                >
                  Departure Date
                </label>
                <input
                  type="date"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    fontSize: "16px",
                  }}
                />
                {formErrors.departureDate && (
                  <p
                    style={{
                      color: "#dc2626",
                      fontSize: "14px",
                      margin: "5px 0 0 0",
                    }}
                  >
                    {formErrors.departureDate}
                  </p>
                )}
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                  }}
                >
                  Return Date (Optional)
                </label>
                <input
                  type="date"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    fontSize: "16px",
                  }}
                />
                {formErrors.returnDate && (
                  <p
                    style={{
                      color: "#dc2626",
                      fontSize: "14px",
                      margin: "5px 0 0 0",
                    }}
                  >
                    {formErrors.returnDate}
                  </p>
                )}
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                  }}
                >
                  Number of Passengers
                </label>
                <input
                  type="number"
                  name="passengerCount"
                  value={formData.passengerCount}
                  onChange={handleChange}
                  placeholder="Enter number of passengers"
                  min="1"
                  max={data?.seatingCapacity}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    fontSize: "16px",
                  }}
                />
                {formErrors.passengerCount && (
                  <p
                    style={{
                      color: "#dc2626",
                      fontSize: "14px",
                      margin: "5px 0 0 0",
                    }}
                  >
                    {formErrors.passengerCount}
                  </p>
                )}
              </div>
              <div style={{ marginBottom: "30px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                  }}
                >
                  Special Requests (Optional)
                </label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any special requests or requirements"
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    fontSize: "16px",
                    resize: "vertical",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    padding: "12px 24px",
                    border: "1px solid #d1d5db",
                    background: "white",
                    color: "#374151",
                    borderRadius: "4px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  style={{
                    padding: "12px 24px",
                    border: "none",
                    background: formSubmitting ? "#9ca3af" : "#111827",
                    color: "white",
                    borderRadius: "4px",
                    fontSize: "16px",
                    cursor: formSubmitting ? "not-allowed" : "pointer",
                  }}
                >
                  {formSubmitting ? "Sending..." : "Send Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CharterInfo;
