import React, { useState } from "react";
import {
  FaBed,
  FaRulerCombined,
  FaUsers,
  FaTimesCircle,
  FaUpload,
  FaPlus,
  FaDollarSign,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaChevronDown,
  FaChevronUp,
  FaInfoCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import destinationApi from "./api";
import { toast } from "sonner";
import { MdRoom } from "react-icons/md";

// Enhanced font imports
const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Montserrat:wght@300;400;500;600;700&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

// Styling constants with enhanced color palette
const colors = {
  navy: "#0a1a2f",
  gold: "#d4af37",
  lightGold: "#f0e6d2",
  cream: "#f8f4e9",
  darkCream: "#e8e0d0",
  slate: "#4a5a6a",
  lightSlate: "#e1e6eb",
  errorRed: "#e57373",
  successGreen: "#81c784",
};

const sectionClass = `bg-${colors.cream} rounded-xl shadow-soft p-8 mb-8 border border-${colors.gold}/10`;
const labelClass = `text-${colors.slate} font-medium text-xs uppercase tracking-wider mb-2 font-montserrat`;
const inputClass = `w-full p-3 border border-${colors.gold}/20 rounded-lg text-${colors.navy} bg-white focus:outline-none focus:ring-2 focus:ring-${colors.gold}/50 transition-all duration-200 placeholder-${colors.slate}/50`;
const textareaClass = `${inputClass} h-36 resize-y`;
const buttonClass = `bg-gradient-to-r from-${colors.gold} to-${colors.gold}/80 text-white font-medium px-6 py-3 rounded-lg hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 shadow-sm`;
const errorClass = `text-${colors.errorRed} text-xs mt-1 font-montserrat flex items-center gap-1`;
const checkboxClass = `rounded h-4 w-4 text-${colors.gold} focus:ring-${colors.gold}/50 border-${colors.gold}/30`;

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

// Cloudinary configuration
const CLOUDINARY_CLOUD_NAME = "dnsgznjyo";
const CLOUDINARY_UPLOAD_PRESET = "images";
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

// Type definitions
interface ExtraFee {
  name: string;
  amount: string;
}

interface FormData {
  roomType: string;
  description: string;
  size: string;
  occupancy: string;
  bedConfiguration: string;
  price: string;
  minimumStay: string;
  depositRequired: boolean;
  depositAmount: string;
  totalRooms: string;
  amenities: string[];
  accessibilityFeatures: string[];
  bathroomFeatures: string[];
  bedroomFeatures: string[];
  entertainment: string[];
  familyFriendly: string[];
  foodAndDrink: string[];
  moreFeatures: string[];
  outdoorSpace: string[];
  safetyFeatures: string[];
  freebies: string[];
  extraFees: ExtraFee[];
}

interface Errors {
  roomType?: string;
  description?: string;
  size?: string;
  occupancy?: string;
  bedConfiguration?: string;
  price?: string;
  minimumStay?: string;
  depositAmount?: string;
  images?: string;
  extraFees?: string;
  submit?: string;
  totalRooms?: string;
}

const FeatureSection = ({
  title,
  children,
  isOpen,
  toggleOpen,
}: {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  toggleOpen: () => void;
}) => (
  <div className="mb-6 border-b border-gold/10 pb-4">
    <button
      type="button"
      onClick={toggleOpen}
      className="flex items-center justify-between w-full group"
    >
      <h3 className="text-lg font-semibold text-navy font-playfair group-hover:text-gold transition-colors">
        {title}
      </h3>
      {isOpen ? (
        <FaChevronUp className="text-gold/60 group-hover:text-gold" />
      ) : (
        <FaChevronDown className="text-gold/60 group-hover:text-gold" />
      )}
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={fadeIn}
          className="mt-4"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function NewRoom() {
  const [formData, setFormData] = useState<FormData>({
    roomType: "",
    description: "",
    size: "",
    occupancy: "",
    bedConfiguration: "",
    price: "",
    minimumStay: "",
    depositRequired: false,
    depositAmount: "",
    totalRooms: "",
    amenities: [],
    accessibilityFeatures: [],
    bathroomFeatures: [],
    bedroomFeatures: [],
    entertainment: [],
    familyFriendly: [],
    foodAndDrink: [],
    moreFeatures: [],
    outdoorSpace: [],
    safetyFeatures: [],
    freebies: [],
    extraFees: [],
  });

  const [roomImages, setRoomImages] = useState<string[]>([]);
  const [imageDescriptions, setImageDescriptions] = useState<{
    [key: string]: string;
  }>({});
  const [errors, setErrors] = useState<Errors>({});
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newFee, setNewFee] = useState<ExtraFee>({ name: "", amount: "" });
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    amenities: true,
    accessibility: false,
    bathroom: false,
    bedroom: false,
    entertainment: false,
    family: false,
    dining: false,
    more: false,
    outdoor: false,
    safety: false,
    freebies: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const predefinedOptions = {
    amenities: [
      "Premium Bedding",
      "Minibar",
      "In-room Safe",
      "Desk",
      "Air Conditioning",
      "Free WiFi",
      "Free Breakfast",
      "Free Valet Parking",
      "Free Water Park Passes",
    ],
    accessibilityFeatures: ["Doorbell and Phone Notification"],
    bathroomFeatures: [
      "Bathrobes",
      "Bidet",
      "Children's Slippers",
      "Free Toiletries",
      "Hair Dryer",
      "Separate Bathtub and Shower",
      "Shampoo",
      "Slippers",
      "Soap",
      "Toilet Paper",
      "Toothbrush and Toothpaste (on request)",
      "Towels (changed on request)",
    ],
    bedroomFeatures: [
      "Air Conditioning",
      "Bed Sheets (changed on request)",
      "Blackout Drapes",
      "Hypo-allergenic Bedding",
      "Pillow Menu",
      "Premium Bedding",
      "Turndown Service",
    ],
    entertainment: ["65-inch TV with Premium Channels"],
    familyFriendly: ["Free Crib", "Connecting/Adjoining Rooms Available"],
    foodAndDrink: [
      "Champagne Service",
      "Coffee/Tea Maker",
      "Electric Kettle",
      "Free Bottled Water",
      "Minibar",
      "Room Service (24 hours)",
    ],
    moreFeatures: [
      "Connecting Rooms Available",
      "Desk",
      "Desk Chair",
      "Electrical Adapters",
      "Guidebooks",
      "Housekeeping (daily)",
      "In-room Massage Available",
      "Laptop Workspace",
      "Local Maps",
      "Restaurant Dining Guides",
      "Safe",
      "Wardrobe or Closet",
    ],
    outdoorSpace: ["Balcony", "Ocean View"],
    safetyFeatures: [
      "Carbon Monoxide Detector",
      "Smoke Detector",
      "Fire Extinguisher",
      "First Aid Kit",
      "Security System",
    ],
    freebies: [
      "Free Breakfast",
      "Free Valet Parking",
      "Free Water Park Passes",
      "Free WiFi",
    ],
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleArrayChange = (
    field: keyof FormData,
    value: string,
    checked: boolean
  ) => {
    setFormData((prev) => {
      const current = prev[field] as string[];
      return {
        ...prev,
        [field]: checked
          ? [...current, value]
          : current.filter((item) => item !== value),
      };
    });
  };

  const handleFeeChange = (field: keyof ExtraFee, value: string) => {
    setNewFee((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, extraFees: "" }));
  };

  const addFee = () => {
    if (
      !newFee.name ||
      !newFee.amount ||
      isNaN(Number(newFee.amount)) ||
      Number(newFee.amount) <= 0
    ) {
      setErrors((prev) => ({
        ...prev,
        extraFees: "Fee name and valid amount are required",
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      extraFees: [
        ...prev.extraFees,
        { name: newFee.name, amount: newFee.amount },
      ],
    }));
    setNewFee({ name: "", amount: "" });
  };

  const removeFee = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      extraFees: prev.extraFees.filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (roomImages.length + files.length > 10) {
      setErrors((prev) => ({ ...prev, images: "Maximum 10 images allowed" }));
      return;
    }

    setUploading(true);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`File ${file.name} exceeds 10MB limit`);
        }
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        const response = await fetch(CLOUDINARY_UPLOAD_URL, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        const data = await response.json();
        urls.push(data.secure_url);
      }

      setRoomImages((prev) => [...prev, ...urls]);
      setImageDescriptions((prev) => {
        const newDescriptions: { [key: string]: string } = {};
        urls.forEach((_, idx) => {
          newDescriptions[roomImages.length + idx] = "";
        });
        return { ...prev, ...newDescriptions };
      });
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        images: (err as Error).message || "Failed to upload images",
      }));
    } finally {
      setUploading(false);
    }
  };

  const handleImageDescriptionChange = (idx: number, value: string) => {
    setImageDescriptions((prev) => ({ ...prev, [idx]: value }));
  };

  const validateForm = () => {
    const newErrors: Errors = {};
    if (!formData.roomType) newErrors.roomType = "Room type is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (
      !formData.size ||
      isNaN(Number(formData.size)) ||
      Number(formData.size) <= 0
    )
      newErrors.size = "Valid room size (sq m) is required";
    if (
      !formData.occupancy ||
      isNaN(Number(formData.occupancy)) ||
      Number(formData.occupancy) <= 0
    )
      newErrors.occupancy = "Valid occupancy is required";
    if (!formData.bedConfiguration)
      newErrors.bedConfiguration = "Bed configuration is required";
    if (
      !formData.price ||
      isNaN(Number(formData.price)) ||
      Number(formData.price) <= 0
    )
      newErrors.price = "Valid price is required";
    if (
      formData.minimumStay &&
      (isNaN(Number(formData.minimumStay)) || Number(formData.minimumStay) <= 0)
    )
      newErrors.minimumStay = "Valid minimum stay is required";
    if (
      formData.depositRequired &&
      (!formData.depositAmount ||
        isNaN(Number(formData.depositAmount)) ||
        Number(formData.depositAmount) <= 0)
    )
      newErrors.depositAmount = "Valid deposit amount is required";
    if (roomImages.length === 0)
      newErrors.images = "At least one image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const roomData = {
        name: formData.roomType,
        description: formData.description,
        size: Number(formData.size),
        occupancy: Number(formData.occupancy),
        bedConfiguration: formData.bedConfiguration,
        basePrice: Number(formData.price),
        minimumStay: formData.minimumStay ? Number(formData.minimumStay) : null,
        depositRequired: formData.depositRequired,
        depositAmount: formData.depositRequired
          ? Number(formData.depositAmount)
          : null,
        totalRooms: Number(formData.totalRooms),
        amenities: formData.amenities,
        accessibilityFeatures: formData.accessibilityFeatures,
        bathroomFeatures: formData.bathroomFeatures,
        bedroomFeatures: formData.bedroomFeatures,
        entertainment: formData.entertainment,
        familyFriendly: formData.familyFriendly,
        foodAndDrink: formData.foodAndDrink,
        moreFeatures: formData.moreFeatures,
        outdoorSpace: formData.outdoorSpace,
        safetyFeatures: formData.safetyFeatures,
        freebies: formData.freebies,
        extraFees: formData.extraFees.map((fee) => ({
          name: fee.name,
          amount: Number(fee.amount),
        })),
        images: roomImages.map((url, idx) => ({
          url,
          description: imageDescriptions[idx] || undefined,
        })),
      };

      const response = await destinationApi.post("/new", roomData);

      if (!response.data.success) {
        throw new Error(response.data.error || "Failed to create room");
      }
      toast.success("Room created successfully!");
      window.location.href = "/l-h/rooms";
    } catch (err) {
      setErrors({
        submit:
          err instanceof Error
            ? err.message
            : "Failed to add room. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };
  const renderCheckboxGroup = (
    field: keyof FormData,
    options: string[],
    label: string
  ) => (
    <FeatureSection
      title={label}
      isOpen={openSections[field]}
      toggleOpen={() => toggleSection(field)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {options.map((option) => (
          <motion.label
            key={option}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gold/5 transition-colors"
            variants={fadeIn}
          >
            <input
              type="checkbox"
              checked={(formData[field] as string[]).includes(option)}
              onChange={(e) =>
                handleArrayChange(field, option, e.target.checked)
              }
              className={checkboxClass}
            />
            <span className="text-sm text-slate font-montserrat">{option}</span>
          </motion.label>
        ))}
      </div>
    </FeatureSection>
  );

  return (
    <div className="min-h-screen bg-navy/95 py-8 px-4 w-[900px]">
      <title>New Room | Luxvana International</title>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white font-playfair mb-2">
            Create a New Room
          </h1>
          <p className="text-gold/80 font-montserrat">
            Design the perfect luxury experience for your guests
          </p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          {/* Basic Information Section */}
          <motion.section
            className={sectionClass}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-navy font-playfair mb-6 pb-2 border-b border-gold/10">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Room Type */}
              <div>
                <label className={labelClass}>Room Type</label>
                <input
                  type="text"
                  value={formData.roomType}
                  onChange={(e) =>
                    handleInputChange("roomType", e.target.value)
                  }
                  className={inputClass}
                  placeholder="e.g., Oceanview Suite"
                  aria-required="true"
                />
                {errors.roomType && (
                  <motion.span className={errorClass} variants={fadeIn}>
                    <FaInfoCircle /> {errors.roomType}
                  </motion.span>
                )}
              </div>

              {/* Room Size */}
              <div>
                <label className={labelClass}>Size (sq m)</label>
                <div className="relative">
                  <FaRulerCombined className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/50" />
                  <input
                    type="number"
                    value={formData.size}
                    onChange={(e) => handleInputChange("size", e.target.value)}
                    className={`${inputClass} pl-10`}
                    placeholder="e.g., 55"
                    min="0"
                    step="0.1"
                    aria-required="true"
                  />
                </div>
                {errors.size && (
                  <motion.span className={errorClass} variants={fadeIn}>
                    <FaInfoCircle /> {errors.size}
                  </motion.span>
                )}
              </div>

              {/* Occupancy */}
              <div>
                <label className={labelClass}>Occupancy (Sleeps)</label>
                <div className="relative">
                  <FaUsers className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/50" />
                  <input
                    type="number"
                    value={formData.occupancy}
                    onChange={(e) =>
                      handleInputChange("occupancy", e.target.value)
                    }
                    className={`${inputClass} pl-10`}
                    placeholder="e.g., 4"
                    min="1"
                    aria-required="true"
                  />
                </div>
                {errors.occupancy && (
                  <motion.span className={errorClass} variants={fadeIn}>
                    <FaInfoCircle /> {errors.occupancy}
                  </motion.span>
                )}
              </div>

              {/* Bed Configuration */}
              <div>
                <label className={labelClass}>Bed Configuration</label>
                <div className="relative">
                  <FaBed className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/50" />
                  <input
                    type="text"
                    value={formData.bedConfiguration}
                    onChange={(e) =>
                      handleInputChange("bedConfiguration", e.target.value)
                    }
                    className={`${inputClass} pl-10`}
                    placeholder="e.g., 1 King Bed"
                    aria-required="true"
                  />
                </div>
                {errors.bedConfiguration && (
                  <motion.span className={errorClass} variants={fadeIn}>
                    <FaInfoCircle /> {errors.bedConfiguration}
                  </motion.span>
                )}
              </div>

              {/* Price */}
              <div>
                <label className={labelClass}>Price per Night (USD)</label>
                <div className="relative">
                  <FaDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/50" />
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    className={`${inputClass} pl-10`}
                    placeholder="e.g., 350"
                    min="0"
                    step="0.01"
                    aria-required="true"
                  />
                </div>
                {errors.price && (
                  <motion.span className={errorClass} variants={fadeIn}>
                    <FaInfoCircle /> {errors.price}
                  </motion.span>
                )}
              </div>

              {/* Total Rooms */}
              <div>
                <label className={labelClass}>Total Rooms</label>
                <div className="relative">
                  <MdRoom className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/50" />
                  <input
                    type="number"
                    value={formData.totalRooms}
                    onChange={(e) =>
                      handleInputChange("totalRooms", e.target.value)
                    }
                    className={`${inputClass} pl-10`}
                    placeholder="e.g., 10"
                    min="0"
                    aria-required="true"
                  />
                </div>
                {errors.totalRooms && (
                  <motion.span className={errorClass} variants={fadeIn}>
                    <FaInfoCircle /> {errors.totalRooms}
                  </motion.span>
                )}
              </div>

              {/* Minimum Stay */}
              <div>
                <label className={labelClass}>Minimum Stay (Nights)</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/50" />
                  <input
                    type="number"
                    value={formData.minimumStay}
                    onChange={(e) =>
                      handleInputChange("minimumStay", e.target.value)
                    }
                    className={`${inputClass} pl-10`}
                    placeholder="e.g., 2"
                    min="1"
                  />
                </div>
                {errors.minimumStay && (
                  <motion.span className={errorClass} variants={fadeIn}>
                    <FaInfoCircle /> {errors.minimumStay}
                  </motion.span>
                )}
              </div>
            </div>
          </motion.section>

          {/* Description Section */}
          <motion.section
            className={sectionClass}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-navy font-playfair mb-6 pb-2 border-b border-gold/10">
              Room Description
            </h2>
            <div>
              <label className={labelClass}>
                Describe the room's features and ambiance
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className={textareaClass}
                placeholder="Describe the room's layout, views, and special features..."
                aria-required="true"
              />
              {errors.description && (
                <motion.span className={errorClass} variants={fadeIn}>
                  <FaInfoCircle /> {errors.description}
                </motion.span>
              )}
            </div>
          </motion.section>

          {/* Images Section */}
          <motion.section
            className={sectionClass}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-navy font-playfair mb-6 pb-2 border-b border-gold/10">
              Room Images
            </h2>
            <div>
              <label className={labelClass}>
                Upload high-quality images (Max 10)
              </label>

              <motion.label
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`border-2 border-dashed border-gold/30 rounded-lg p-6 bg-white hover:bg-gold/5 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 ${
                  uploading ? "opacity-70" : ""
                }`}
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <FaUpload className="h-6 w-6 text-gold" />
                  <span className="text-navy font-medium text-sm font-montserrat">
                    {uploading ? "Uploading..." : "Click to Upload Images"}
                  </span>
                  <p className="text-xs text-slate/60 font-montserrat">
                    JPEG or PNG, max 10MB each
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="sr-only"
                  disabled={uploading}
                  aria-label="Upload room images"
                />
              </motion.label>

              {errors.images && (
                <motion.span className={errorClass} variants={fadeIn}>
                  <FaInfoCircle /> {errors.images}
                </motion.span>
              )}

              <AnimatePresence>
                {roomImages.length > 0 && (
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 0.2,
                        },
                      },
                    }}
                  >
                    {roomImages.map((url, idx) => (
                      <motion.div
                        key={idx}
                        className="relative group"
                        variants={scaleIn}
                        layout
                      >
                        <div className="aspect-video overflow-hidden rounded-lg bg-slate/10">
                          <img
                            src={url}
                            alt={`Room image ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <input
                          type="text"
                          value={imageDescriptions[idx] || ""}
                          onChange={(e) =>
                            handleImageDescriptionChange(idx, e.target.value)
                          }
                          className={`${inputClass} mt-2 text-sm`}
                          placeholder="Image description"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setRoomImages((prev) =>
                              prev.filter((_, i) => i !== idx)
                            )
                          }
                          className="absolute top-2 right-2 bg-white/90 text-red-500 rounded-full p-1 hover:bg-white transition-all shadow-sm"
                          aria-label="Remove image"
                        >
                          <FaTimesCircle size={14} />
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>

          {/* Fees Section */}
          <motion.section
            className={sectionClass}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-navy font-playfair mb-6 pb-2 border-b border-gold/10">
              Additional Fees & Policies
            </h2>

            <div className="space-y-6">
              {/* Deposit */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="depositRequired"
                    checked={formData.depositRequired}
                    onChange={(e) =>
                      handleInputChange("depositRequired", e.target.checked)
                    }
                    className={checkboxClass}
                  />
                  <label
                    htmlFor="depositRequired"
                    className="text-navy font-medium font-montserrat"
                  >
                    Requires Deposit
                  </label>
                </div>

                <AnimatePresence>
                  {formData.depositRequired && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={fadeIn}
                      className="pl-8"
                    >
                      <label className={labelClass}>Deposit Amount (USD)</label>
                      <div className="relative">
                        <FaDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/50" />
                        <input
                          type="number"
                          value={formData.depositAmount}
                          onChange={(e) =>
                            handleInputChange("depositAmount", e.target.value)
                          }
                          className={`${inputClass} pl-10`}
                          placeholder="e.g., 100"
                          min="0"
                          step="0.01"
                          aria-required="true"
                        />
                      </div>
                      {errors.depositAmount && (
                        <motion.span className={errorClass} variants={fadeIn}>
                          <FaInfoCircle /> {errors.depositAmount}
                        </motion.span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Extra Fees */}
              <div>
                <h3 className="text-lg font-semibold text-navy font-playfair mb-3">
                  Extra Fees
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={labelClass}>Fee Name</label>
                    <input
                      type="text"
                      value={newFee.name}
                      onChange={(e) => handleFeeChange("name", e.target.value)}
                      className={inputClass}
                      placeholder="e.g., Resort Fee"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Amount (USD)</label>
                    <div className="relative">
                      <FaDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/50" />
                      <input
                        type="number"
                        value={newFee.amount}
                        onChange={(e) =>
                          handleFeeChange("amount", e.target.value)
                        }
                        className={`${inputClass} pl-10`}
                        placeholder="e.g., 25"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>

                <motion.button
                  type="button"
                  onClick={addFee}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${buttonClass} bg-black
                   text-sm px-4 py-2`}
                >
                  <FaPlus size={12} /> Add Fee
                </motion.button>

                {errors.extraFees && (
                  <motion.span className={errorClass} variants={fadeIn}>
                    <FaInfoCircle /> {errors.extraFees}
                  </motion.span>
                )}

                <AnimatePresence>
                  {formData.extraFees.length > 0 && (
                    <motion.div
                      className="mt-4 space-y-2"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.05,
                          },
                        },
                      }}
                    >
                      {formData.extraFees.map((fee, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center justify-between bg-gold/5 p-3 rounded-lg"
                          variants={fadeIn}
                          layout
                        >
                          <div className="flex items-center gap-2">
                            <FaMoneyBillWave className="text-gold" size={14} />
                            <span className="text-sm text-navy font-montserrat">
                              {fee.name}: ${Number(fee.amount).toFixed(2)}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFee(index)}
                            className="text-red-500 hover:text-red-600 transition-colors"
                            aria-label={`Remove ${fee.name} fee`}
                          >
                            <FaTimesCircle size={14} />
                          </button>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.section>

          {/* Features Sections */}
          <motion.section
            className={sectionClass}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-navy font-playfair mb-6 pb-2 border-b border-gold/10">
              Room Features & Amenities
            </h2>

            {renderCheckboxGroup(
              "amenities",
              predefinedOptions.amenities,
              "Amenities"
            )}

            {renderCheckboxGroup(
              "accessibilityFeatures",
              predefinedOptions.accessibilityFeatures,
              "Accessibility Features"
            )}

            {renderCheckboxGroup(
              "bathroomFeatures",
              predefinedOptions.bathroomFeatures,
              "Bathroom Features"
            )}

            {renderCheckboxGroup(
              "bedroomFeatures",
              predefinedOptions.bedroomFeatures,
              "Bedroom Features"
            )}

            {renderCheckboxGroup(
              "entertainment",
              predefinedOptions.entertainment,
              "Entertainment"
            )}

            {renderCheckboxGroup(
              "familyFriendly",
              predefinedOptions.familyFriendly,
              "Family Friendly"
            )}

            {renderCheckboxGroup(
              "foodAndDrink",
              predefinedOptions.foodAndDrink,
              "Food & Drink"
            )}

            {renderCheckboxGroup(
              "moreFeatures",
              predefinedOptions.moreFeatures,
              "Additional Features"
            )}

            {renderCheckboxGroup(
              "outdoorSpace",
              predefinedOptions.outdoorSpace,
              "Outdoor Space"
            )}

            {renderCheckboxGroup(
              "safetyFeatures",
              predefinedOptions.safetyFeatures,
              "Safety Features"
            )}

            {renderCheckboxGroup(
              "freebies",
              predefinedOptions.freebies,
              "Complimentary Items"
            )}
          </motion.section>

          {/* Submit Section */}
          <motion.section
            className="mt-8"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.6 }}
          >
            <div className="flex flex-col sm:flex-row justify-end gap-4">
              {errors.submit && (
                <motion.span
                  className={`${errorClass} flex-1 self-center`}
                  variants={fadeIn}
                >
                  <FaInfoCircle /> {errors.submit}
                </motion.span>
              )}

              <motion.button
                type="submit"
                className={`${buttonClass} bg-black w-full sm:w-auto`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={submitting}
              >
                {submitting ? (
                  "Creating Room..."
                ) : (
                  <>
                    <FaPlus /> Create Room
                  </>
                )}
              </motion.button>
            </div>
          </motion.section>
        </form>
      </div>
    </div>
  );
}
