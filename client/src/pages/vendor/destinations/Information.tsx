import React, { useEffect, useState } from "react";
import destinationApi from "./api";
import {
  FaGlobe,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaStar,
  FaCheckCircle,
  FaTimesCircle,
  FaAward,
  FaBed,
  FaCalendarAlt,
  FaUsers,
  FaChild,
  FaDog,
  FaSmoking,
  FaWheelchair,
  FaSpa,
  FaLeaf,
  FaCrown,
  FaKey,
  FaLanguage,
  FaLock,
  FaGift,
  FaChevronLeft,
  FaChevronRight,
  FaImage,
} from "react-icons/fa";

// Luxury font import (Playfair Display)
const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

// Styling constants
const sectionClass =
  "bg-white rounded-xl shadow-sm p-8 mb-10 border border-slate-100";
const labelClass =
  "text-slate-500 font-semibold text-xs uppercase tracking-wider mb-1";
const valueClass = "text-slate-800 text-lg font-medium mb-2";
const iconLabel = (icon: React.ReactNode, label: React.ReactNode) => (
  <span className="inline-flex items-center gap-2 text-slate-700 font-semibold">
    {icon} {label}
  </span>
);

// Fallback image for when no images are available

function Information() {
  const [destination, setDestination] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [activeImageSection, setActiveImageSection] = useState<string>("");

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const res = await destinationApi.get("/me");
        setDestination(res.data.destination);
        // Set the first image section as active if available
        if (res.data.destination.imageSections?.length > 0) {
          setActiveImageSection(res.data.destination.imageSections[0]);
        }
      } catch (err) {
        setError("Failed to load destination information.");
      } finally {
        setLoading(false);
      }
    };
    fetchDestination();
  }, []);

  const fallbackImage =
    destination?.mainImageUrl ||
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80";

  // Prepare gallery images: mainImageUrl + sectionImages
  const allImages = destination?.mainImageUrl
    ? [
        {
          url: destination.mainImageUrl,
          section: "Main",
          description: "Main property image",
        },
        ...(destination.sectionImages
          ? Object.entries(destination.sectionImages).flatMap(
              //@ts-ignore
              ([section, urls]: [string, string[]]) =>
                urls.map((url: string, idx: number) => ({
                  url,
                  section,
                  description:
                    destination.imageDescriptions?.[section]?.[idx] || "",
                }))
            )
          : []),
      ]
    : [
        {
          url: fallbackImage,
          section: "Fallback",
          description: "Default image",
        },
      ];

  // Handle image section change
  const handleSectionChange = (section: string) => {
    setActiveImageSection(section);
    setGalleryIdx(
      allImages.findIndex((img: any) => img.section === section && img.url) || 0
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="text-2xl font-bold text-blue-700 animate-pulse">
          Loading...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-red-500 text-lg">
        {error}
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-slate-500 text-lg">
        No destination found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-0 md:py-10 px-4 md:px-6 relative overflow-x-hidden">
      {/* Hero Banner with Gallery */}
      <div className="relative w-full h-[320px] md:h-[420px] flex items-center justify-center mb-10 overflow-hidden rounded-b-2xl border-b border-slate-100 shadow-sm">
        <img
          src={allImages[galleryIdx]?.url || fallbackImage}
          alt={allImages[galleryIdx]?.description || "Hotel Hero"}
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 brightness-90 z-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/95 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full">
          <h1
            className="text-4xl md:text-6xl font-extrabold text-slate-900 drop-shadow mb-2 tracking-tight"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {destination.propertyName}
          </h1>
          <div className="flex flex-wrap gap-4 items-center mb-2">
            <span className="inline-flex items-center gap-1 text-2xl text-yellow-500 font-bold">
              <FaStar className="mb-0.5" /> {destination.starRating || "-"} Star
            </span>
            <span className="inline-flex items-center gap-2 text-slate-700 font-semibold text-lg">
              <FaCrown /> {destination.propertyType}
            </span>
            <span className="inline-flex items-center gap-2 text-slate-500">
              <FaMapMarkerAlt /> {destination.city}, {destination.country}
            </span>
          </div>
          {allImages[galleryIdx]?.description && (
            <p className="text-sm text-slate-600 mt-2 italic bg-white/80 px-4 py-1 rounded-full">
              {allImages[galleryIdx].description}
            </p>
          )}
        </div>
        {/* Gallery Controls */}
        {allImages.length > 1 && (
          <>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white rounded-full p-2 shadow border border-slate-200"
              onClick={() =>
                setGalleryIdx(
                  (galleryIdx - 1 + allImages.length) % allImages.length
                )
              }
              aria-label="Previous image"
            >
              <FaChevronLeft className="text-slate-400 w-6 h-6" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white rounded-full p-2 shadow border border-slate-200"
              onClick={() => setGalleryIdx((galleryIdx + 1) % allImages.length)}
              aria-label="Next image"
            >
              <FaChevronRight className="text-slate-400 w-6 h-6" />
            </button>
            {/* Gallery Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
              {allImages.map((_: any, idx: number) => (
                <span
                  key={idx}
                  className={`w-3 h-3 rounded-full border-2 ${
                    galleryIdx === idx
                      ? "bg-yellow-500 border-yellow-500"
                      : "bg-white border-slate-200"
                  } transition-all`}
                  onClick={() => setGalleryIdx(idx)}
                  style={{ cursor: "pointer" }}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Image Sections Tabs */}
      {destination.imageSections?.length > 0 && (
        <div className="max-w-5xl mx-auto mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {destination.imageSections.map((section: string) => (
              <button
                key={section}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${
                  activeImageSection === section
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
                onClick={() => handleSectionChange(section)}
                aria-label={`View ${section} images`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-5xl mx-auto z-10 relative">
        {/* Contact/Meta Row */}
        <div className="flex flex-wrap gap-4 text-slate-700 text-base justify-center mb-8">
          {destination.website && (
            <span>
              {iconLabel(
                <FaGlobe />,
                <a href={destination.website} className="hover:underline">
                  {destination.website}
                </a>
              )}
            </span>
          )}
          <span>{iconLabel(<FaPhone />, destination.phone)}</span>
          <span>
            {iconLabel(
              <FaEnvelope />,
              <a
                href={`mailto:${destination.email}`}
                className="hover:underline"
              >
                {destination.email}
              </a>
            )}
          </span>
          <span>
            {iconLabel(
              <FaMapMarkerAlt />,
              `${destination.address}, ${destination.city}, ${
                destination.country
              }${destination.postalCode ? `, ${destination.postalCode}` : ""}`
            )}
          </span>
        </div>

        {/* Overview & About */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Overview Section */}
          <div className={sectionClass}>
            <div className="mb-4 flex flex-wrap gap-6">
              <div>
                <div className={labelClass}>Check-In</div>
                <div className={valueClass}>
                  <FaKey className="inline mr-1 text-blue-700" />{" "}
                  {destination.checkInTime || "-"}
                </div>
              </div>
              <div>
                <div className={labelClass}>Check-Out</div>
                <div className={valueClass}>
                  <FaLock className="inline mr-1 text-indigo-700" />{" "}
                  {destination.checkOutTime || "-"}
                </div>
              </div>
              <div>
                <div className={labelClass}>Total Rooms</div>
                <div className={valueClass}>
                  <FaBed className="inline mr-1 text-amber-700" />{" "}
                  {destination.totalRooms || "-"}
                </div>
              </div>
              <div>
                <div className={labelClass}>Year Built</div>
                <div className={valueClass}>
                  <FaCalendarAlt className="inline mr-1 text-green-700" />{" "}
                  {destination.yearBuilt || "-"}
                </div>
              </div>
              <div>
                <div className={labelClass}>Last Renovated</div>
                <div className={valueClass}>
                  <FaCalendarAlt className="inline mr-1 text-pink-700" />{" "}
                  {destination.lastRenovated || "-"}
                </div>
              </div>
            </div>
            <div>
              <div className={labelClass}>Languages Spoken</div>
              <div className="flex flex-wrap gap-2">
                {destination.languagesSpoken?.length > 0 ? (
                  destination.languagesSpoken.map((lang: string) => (
                    <span
                      key={lang}
                      className="bg-slate-100 text-slate-700 rounded-full px-3 py-1 text-xs font-semibold shadow-sm"
                    >
                      <FaLanguage className="inline mr-1" /> {lang}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-700">-</span>
                )}
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className={sectionClass}>
            <div className="mb-4">
              <div className={labelClass}>Description</div>
              <div className="text-slate-700 text-base mb-2 leading-relaxed">
                {destination.description || "-"}
              </div>
            </div>
            <div className="mb-4">
              <div className={labelClass}>Highlights</div>
              <div className="text-slate-700 text-base mb-2">
                {destination.highlights ? (
                  <ul className="list-disc list-inside">
                    {destination.highlights
                      .split("\n")
                      .map((highlight: string, idx: number) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                  </ul>
                ) : (
                  "-"
                )}
              </div>
            </div>
            <div className="mb-4">
              <div className={labelClass}>Awards & Recognitions</div>
              <div className="flex items-center gap-2 text-amber-700 font-semibold">
                <FaAward /> {destination.awards || "-"}
              </div>
            </div>
            <div className="mb-4">
              <div className={labelClass}>Room Types</div>
              <div className="flex flex-wrap gap-2">
                {destination.roomTypes
                  ? destination.roomTypes
                      .split(",")
                      .map((type: string, idx: number) => (
                        <span
                          key={idx}
                          className="bg-slate-100 text-slate-700 rounded-full px-3 py-1 text-xs font-semibold shadow-sm"
                        >
                          <FaBed className="inline mr-1" /> {type.trim()}
                        </span>
                      ))
                  : "-"}
              </div>
            </div>
          </div>
        </div>

        {/* Amenities & Sustainability */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Amenities Section */}
          <div className={sectionClass}>
            <div className={labelClass}>Amenities & Services</div>
            <div className="flex flex-wrap gap-3 mt-2">
              {destination.amenities?.length > 0 ? (
                destination.amenities.map((a: string) => (
                  <span
                    key={a}
                    className="bg-slate-100 text-slate-700 rounded-full px-4 py-1 text-sm font-semibold shadow"
                  >
                    <FaSpa className="inline mr-1 text-pink-400" /> {a}
                  </span>
                ))
              ) : (
                <span className="text-slate-700">-</span>
              )}
            </div>
          </div>

          {/* Sustainability Section */}
          <div className={sectionClass}>
            <div className={labelClass}>Sustainability Practices</div>
            <div className="flex flex-wrap gap-2 mt-2">
              {destination.sustainabilityPractices?.length > 0 ? (
                destination.sustainabilityPractices.map((s: string) => (
                  <span
                    key={s}
                    className="bg-green-50 text-green-800 rounded-full px-3 py-1 text-xs font-semibold shadow-sm"
                  >
                    <FaLeaf className="inline mr-1" /> {s}
                  </span>
                ))
              ) : (
                <span className="text-slate-700">-</span>
              )}
            </div>
          </div>
        </div>

        {/* Accessibility & Policies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Accessibility Section */}
          <div className={sectionClass}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className={labelClass}>Wheelchair Accessible</div>
                <div className="flex items-center gap-2">
                  {destination.wheelchairAccessible ? (
                    <FaCheckCircle className="text-green-600" />
                  ) : (
                    <FaTimesCircle className="text-red-400" />
                  )}
                  <span>{destination.wheelchairAccessible ? "Yes" : "No"}</span>
                </div>
              </div>
              <div>
                <div className={labelClass}>Accessible Rooms</div>
                <div className={valueClass}>
                  <FaWheelchair className="inline mr-1 text-blue-700" />{" "}
                  {destination.accessibleRooms || "-"}
                </div>
              </div>
              <div>
                <div className={labelClass}>Accessible Bathrooms</div>
                <div className="flex items-center gap-2">
                  {destination.accessibleBathrooms ? (
                    <FaCheckCircle className="text-green-600" />
                  ) : (
                    <FaTimesCircle className="text-red-400" />
                  )}
                  <span>{destination.accessibleBathrooms ? "Yes" : "No"}</span>
                </div>
              </div>
              <div>
                <div className={labelClass}>Accessible Parking</div>
                <div className="flex items-center gap-2">
                  {destination.accessibleParking ? (
                    <FaCheckCircle className="text-green-600" />
                  ) : (
                    <FaTimesCircle className="text-red-400" />
                  )}
                  <span>{destination.accessibleParking ? "Yes" : "No"}</span>
                </div>
              </div>
              <div>
                <div className={labelClass}>Accessible Restaurants</div>
                <div className="flex items-center gap-2">
                  {destination.accessibleRestaurants ? (
                    <FaCheckCircle className="text-green-600" />
                  ) : (
                    <FaTimesCircle className="text-red-400" />
                  )}
                  <span>
                    {destination.accessibleRestaurants ? "Yes" : "No"}
                  </span>
                </div>
              </div>
              <div>
                <div className={labelClass}>Accessible Pools</div>
                <div className="flex items-center gap-2">
                  {destination.accessiblePools ? (
                    <FaCheckCircle className="text-green-600" />
                  ) : (
                    <FaTimesCircle className="text-red-400" />
                  )}
                  <span>{destination.accessiblePools ? "Yes" : "No"}</span>
                </div>
              </div>
              <div>
                <div className={labelClass}>Braille Signage</div>
                <div className="flex items-center gap-2">
                  {destination.brailleSignage ? (
                    <FaCheckCircle className="text-green-600" />
                  ) : (
                    <FaTimesCircle className="text-red-400" />
                  )}
                  <span>{destination.brailleSignage ? "Yes" : "No"}</span>
                </div>
              </div>
              <div>
                <div className={labelClass}>Hearing Impaired Services</div>
                <div className="flex items-center gap-2">
                  {destination.hearingImpairedServices ? (
                    <FaCheckCircle className="text-green-600" />
                  ) : (
                    <FaTimesCircle className="text-red-400" />
                  )}
                  <span>
                    {destination.hearingImpairedServices ? "Yes" : "No"}
                  </span>
                </div>
              </div>
              <div>
                <div className={labelClass}>Visual Impaired Services</div>
                <div className="flex items-center gap-2">
                  {destination.visualImpairedServices ? (
                    <FaCheckCircle className="text-green-600" />
                  ) : (
                    <FaTimesCircle className="text-red-400" />
                  )}
                  <span>
                    {destination.visualImpairedServices ? "Yes" : "No"}
                  </span>
                </div>
              </div>
              <div>
                <div className={labelClass}>Service Animals Allowed</div>
                <div className="flex items-center gap-2">
                  {destination.serviceAnimalsAllowed ? (
                    <FaCheckCircle className="text-green-600" />
                  ) : (
                    <FaTimesCircle className="text-red-400" />
                  )}
                  <span>
                    {destination.serviceAnimalsAllowed ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Policies Section */}
          <div className={sectionClass}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className={labelClass}>Cancellation Policy</div>
                <div className="text-slate-700 text-base mb-2">
                  {destination.cancellationPolicy || "-"}
                </div>
              </div>
              <div>
                <div className={labelClass}>Pet Policy</div>
                <div className="flex items-center gap-2">
                  <FaDog className="text-amber-700" />{" "}
                  {destination.petPolicy || "-"}
                </div>
              </div>
              <div>
                <div className={labelClass}>Smoking Policy</div>
                <div className="flex items-center gap-2">
                  <FaSmoking className="text-slate-700" />{" "}
                  {destination.smokingPolicy || "-"}
                </div>
              </div>
              <div>
                <div className={labelClass}>Children Policy</div>
                <div className="flex items-center gap-2">
                  <FaChild className="text-blue-700" />{" "}
                  {destination.childrenPolicy || "-"}
                </div>
              </div>
              <div>
                <div className={labelClass}>Group Policy</div>
                <div className="flex items-center gap-2">
                  <FaUsers className="text-indigo-700" />{" "}
                  {destination.groupPolicy || "-"}
                </div>
              </div>
              <div>
                <div className={labelClass}>Payment Methods</div>
                <div className="flex flex-wrap gap-2">
                  {destination.paymentMethods?.length > 0 ? (
                    destination.paymentMethods.map((method: string) => (
                      <span
                        key={method}
                        className="bg-slate-100 text-slate-700 rounded-full px-3 py-1 text-xs font-semibold shadow-sm"
                      >
                        {method}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-700">-</span>
                  )}
                </div>
              </div>
              <div>
                <div className={labelClass}>Deposit Required</div>
                <div className="flex items-center gap-2">
                  {destination.depositRequired ? (
                    <FaCheckCircle className="text-green-600" />
                  ) : (
                    <FaTimesCircle className="text-red-400" />
                  )}
                  <span>{destination.depositRequired ? "Yes" : "No"}</span>
                </div>
              </div>
              <div>
                <div className={labelClass}>Deposit Amount</div>
                <div className="text-slate-700 text-base mb-2">
                  {destination.depositAmount || "-"}
                </div>
              </div>
              <div>
                <div className={labelClass}>Minimum Stay</div>
                <div className="text-slate-700 text-base mb-2">
                  {destination.minimumStay || "-"}
                </div>
              </div>
              <div>
                <div className={labelClass}>Age Restriction</div>
                <div className="text-slate-700 text-base mb-2">
                  {destination.ageRestriction || "-"}
                </div>
              </div>
              <div>
                <div className={labelClass}>Quiet Hours</div>
                <div className="text-slate-700 text-base mb-2">
                  {destination.quietHours || "-"}
                </div>
              </div>
              <div>
                <div className={labelClass}>Special Offers</div>
                <div className="flex items-center gap-2">
                  <FaGift className="text-pink-700" />{" "}
                  {destination.specialOffers || "-"}
                </div>
              </div>
              <div>
                <div className={labelClass}>Loyalty Program</div>
                <div className="flex items-center gap-2">
                  {destination.loyaltyProgram ? (
                    <FaCheckCircle className="text-green-600" />
                  ) : (
                    <FaTimesCircle className="text-red-400" />
                  )}
                  <span>{destination.loyaltyProgram ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery Section */}
        {destination.sectionImages &&
          Object.keys(destination.sectionImages).length > 0 && (
            <div className={sectionClass}>
              <div className={labelClass}>Photo Gallery</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                {allImages
                  .filter(
                    (img: any) =>
                      img.section === activeImageSection ||
                      img.section === "Main"
                  )
                  .map((img: any, idx: number) => (
                    <div key={idx} className="relative group">
                      <img
                        src={img.url}
                        alt={
                          img.description || `${img.section} image ${idx + 1}`
                        }
                        className="w-full h-32 object-cover rounded-lg shadow-md transition-transform group-hover:scale-105"
                        onClick={() =>
                          setGalleryIdx(
                            allImages.findIndex((i: any) => i.url === img.url)
                          )
                        }
                        style={{ cursor: "pointer" }}
                      />
                      {img.description && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
                          {img.description}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
              {allImages.filter(
                (img: any) =>
                  img.section === activeImageSection || img.section === "Main"
              ).length === 0 && (
                <div className="text-slate-700 text-base flex items-center gap-2">
                  <FaImage /> No images available for {activeImageSection}
                </div>
              )}
            </div>
          )}

        {/* Footer/Meta */}
        <div className="text-center text-xs text-slate-400 mt-8">
          <span>
            Registered on: {new Date(destination.createdAt).toLocaleString()} |
            Last updated: {new Date(destination.updatedAt).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Information;
