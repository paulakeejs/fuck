import { useState, useRef, ChangeEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import vendorApi from "../../../functions/vendorApi";

type JetFormData = {
  manufacturer: string;
  otherManufacturer?: string;
  model: string;
  year: number | string;
  serialNumber: string;
  totalTimeSinceNew: number | string;
  totalLandings: number | string;
  engineMakeModel: string;
  engineHours: number | string;
  avionicsSuite: string;
  interiorConfig: string;
  interiorImages: File[];
  exteriorImages: File[];
  interiorImageUrls: string[];
  exteriorImageUrls: string[];
  price: string;
  currentLocation: string;
  registrationNumber: string;
  contactDetails: string;
  previousOwners?: number | string;
  maintenanceProgram?: string;
  airframeEngineStatus?: string;
  refurbishmentDate?: string;
  wifiConnectivity?: string;
  lavatoryGalleyDetails?: string;
  cabinAmenities?: string;
  range?: number | string;
  cruiseSpeed?: number | string;
  maxAltitude?: number | string;
  runwayLength?: number | string;
  emptyWeight?: number | string;
  maxTakeoffWeight?: number | string;
  deliveryAvailability?: string;
  vendorId: string;
  biddingEndDate: string;
  minimumBidIncrement: string;
};

export default function JetBiddingForm() {
  const vendorId = useSelector((state: any) => state.vendor.vendor.id);
  const [formData, setFormData] = useState<JetFormData>({
    manufacturer: "",
    model: "",
    year: "",
    serialNumber: "",
    totalTimeSinceNew: "",
    totalLandings: "",
    engineMakeModel: "",
    engineHours: "",
    avionicsSuite: "",
    interiorConfig: "",
    interiorImages: [],
    exteriorImages: [],
    interiorImageUrls: [],
    exteriorImageUrls: [],
    price: "",
    currentLocation: "",
    registrationNumber: "",
    contactDetails: "",
    previousOwners: "",
    maintenanceProgram: "",
    airframeEngineStatus: "",
    refurbishmentDate: "",
    wifiConnectivity: "",
    lavatoryGalleyDetails: "",
    cabinAmenities: "",
    range: "",
    cruiseSpeed: "",
    maxAltitude: "",
    runwayLength: "",
    emptyWeight: "",
    maxTakeoffWeight: "",
    deliveryAvailability: "",
    vendorId: "",
    biddingEndDate: "",
    minimumBidIncrement: "",
  });

  const [interiorPreviews, setInteriorPreviews] = useState<string[]>([]);
  const [exteriorPreviews, setExteriorPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const interiorInputRef = useRef<HTMLInputElement>(null);
  const exteriorInputRef = useRef<HTMLInputElement>(null);

  // Sync vendorId from Redux to formData
  useEffect(() => {
    if (vendorId) {
      setFormData((prev) => ({ ...prev, vendorId }));
    }
  }, [vendorId]);

  useEffect(() => {
    const uploadImages = async () => {
      const uploadToCloudinary = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "images");

        try {
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/dnsgznjyo/image/upload`,
            { method: "POST", body: formData }
          );
          const data = await response.json();
          return data.secure_url;
        } catch (error) {
          console.error("Upload error:", error);
          throw error;
        }
      };

      const uploadFiles = async (
        files: File[],
        type: "interior" | "exterior"
      ) => {
        const uploadedUrls = await Promise.all(
          files.map((file) => uploadToCloudinary(file))
        );
        setFormData((prev) => ({
          ...prev,
          [`${type}ImageUrls`]: [
            ...(prev[`${type}ImageUrls` as keyof JetFormData] as string[]),
            ...uploadedUrls,
          ],
        }));
      };

      const newInterior = formData.interiorImages.slice(
        formData.interiorImageUrls.length
      );
      const newExterior = formData.exteriorImages.slice(
        formData.exteriorImageUrls.length
      );

      if (newInterior.length > 0 || newExterior.length > 0) {
        setIsUploading(true);
        try {
          if (newInterior.length > 0)
            await uploadFiles(newInterior, "interior");
          if (newExterior.length > 0)
            await uploadFiles(newExterior, "exterior");
        } catch (error) {
          toast.error("Failed to upload some images");
          console.error("Image upload error:", error);
        } finally {
          setIsUploading(false);
        }
      }
    };

    uploadImages();
  }, [formData.interiorImages, formData.exteriorImages]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "year" ||
        name === "totalTimeSinceNew" ||
        name === "totalLandings" ||
        name === "engineHours" ||
        name === "previousOwners" ||
        name === "range" ||
        name === "cruiseSpeed" ||
        name === "maxAltitude" ||
        name === "runwayLength" ||
        name === "emptyWeight" ||
        name === "maxTakeoffWeight"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const handleImageUpload = (
    e: ChangeEvent<HTMLInputElement>,
    type: "interior" | "exterior"
  ) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const previews: string[] = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          previews.push(reader.result as string);

          if (previews.length === files.length) {
            if (type === "interior") {
              setInteriorPreviews((prev) => [...prev, ...previews]);
              setFormData((prev) => ({
                ...prev,
                interiorImages: [...prev.interiorImages, ...files],
              }));
            } else {
              setExteriorPreviews((prev) => [...prev, ...previews]);
              setFormData((prev) => ({
                ...prev,
                exteriorImages: [...prev.exteriorImages, ...files],
              }));
            }
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number, type: "interior" | "exterior") => {
    if (type === "interior") {
      setInteriorPreviews((prev) => prev.filter((_, i) => i !== index));
      setFormData((prev) => ({
        ...prev,
        interiorImages: prev.interiorImages.filter((_, i) => i !== index),
        interiorImageUrls: prev.interiorImageUrls.filter((_, i) => i !== index),
      }));
    } else {
      setExteriorPreviews((prev) => prev.filter((_, i) => i !== index));
      setFormData((prev) => ({
        ...prev,
        exteriorImages: prev.exteriorImages.filter((_, i) => i !== index),
        exteriorImageUrls: prev.exteriorImageUrls.filter((_, i) => i !== index),
      }));
    }
  };

  const triggerFileInput = (type: "interior" | "exterior") => {
    if (type === "interior" && interiorInputRef.current) {
      interiorInputRef.current.click();
    } else if (type === "exterior" && exteriorInputRef.current) {
      exteriorInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.vendorId) {
      toast.error("Vendor ID is required");
      return;
    }

    if (
      formData.interiorImageUrls.length < 3 ||
      formData.exteriorImageUrls.length < 2
    ) {
      toast.error(
        `Please upload at least ${
          3 - formData.interiorImageUrls.length
        } more interior and ${
          2 - formData.exteriorImageUrls.length
        } more exterior images`
      );
      return;
    }

    if (!formData.biddingEndDate) {
      toast.error("Bidding end date is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        ...formData,
        manufacturer:
          formData.manufacturer === "Other"
            ? formData.otherManufacturer
            : formData.manufacturer,
      };

      const { interiorImages, exteriorImages, ...dataToSend } = submissionData;

      const response = await vendorApi.post(
        "/jets/add-for-bidding",
        dataToSend
      );
      if (response.data.success) {
        toast.success("Jet listing for bidding submitted successfully!");
        window.location.href = "/preview/jet/bidding/" + response.data.jet.id;
        setFormData({
          manufacturer: "",
          model: "",
          year: "",
          serialNumber: "",
          totalTimeSinceNew: "",
          totalLandings: "",
          engineMakeModel: "",
          engineHours: "",
          avionicsSuite: "",
          interiorConfig: "",
          interiorImages: [],
          exteriorImages: [],
          interiorImageUrls: [],
          exteriorImageUrls: [],
          price: "",
          currentLocation: "",
          registrationNumber: "",
          contactDetails: "",
          previousOwners: "",
          maintenanceProgram: "",
          airframeEngineStatus: "",
          refurbishmentDate: "",
          wifiConnectivity: "",
          lavatoryGalleyDetails: "",
          cabinAmenities: "",
          range: "",
          cruiseSpeed: "",
          maxAltitude: "",
          runwayLength: "",
          emptyWeight: "",
          maxTakeoffWeight: "",
          deliveryAvailability: "",
          vendorId: "",
          biddingEndDate: "",
          minimumBidIncrement: "",
        });
        setInteriorPreviews([]);
        setExteriorPreviews([]);
      } else {
        throw new Error(response.data.message || "Submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error instanceof Error ? error.message : "Error submitting form"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-[990px] bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-black p-6">
          <p className="text-3xl font-bold text-white text-center">
            List Your Private Jet for Bidding
          </p>
          <p className="text-blue-100 text-center mt-2">
            Create a bidding listing for your aircraft
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Required Information */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Required Information
            </h3>

            {/* Manufacturer & Model */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="manufacturer"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Aircraft Manufacturer
                </label>
                <select
                  id="manufacturer"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  required
                >
                  <option value="">Select Manufacturer</option>
                  <option value="Gulfstream">Gulfstream</option>
                  <option value="Bombardier">Bombardier</option>
                  <option value="Dassault">Dassault</option>
                  <option value="Embraer">Embraer</option>
                  <option value="Cessna">Cessna</option>
                  <option value="Airbus">Airbus</option>
                  <option value="Other">Other</option>
                </select>
                {formData.manufacturer === "Other" && (
                  <div className="mt-4">
                    <label
                      htmlFor="otherManufacturer"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Specify Manufacturer
                    </label>
                    <input
                      type="text"
                      id="otherManufacturer"
                      name="otherManufacturer"
                      value={formData.otherManufacturer || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter manufacturer name"
                      required
                    />
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="model"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Model Name
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. G650"
                  required
                />
              </div>
            </div>

            {/* Year & Serial Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Year of Manufacture
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="1950"
                  max="2025"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="serialNumber"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Serial Number
                </label>
                <input
                  type="text"
                  id="serialNumber"
                  name="serialNumber"
                  value={formData.serialNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. 6069"
                  required
                />
              </div>
            </div>

            {/* Total Time Since New & Landings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label
                  htmlFor="totalTimeSinceNew"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Total Time Since New (Hours)
                </label>
                <input
                  type="number"
                  id="totalTimeSinceNew"
                  name="totalTimeSinceNew"
                  value={formData.totalTimeSinceNew}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="totalLandings"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Total Landings / Cycles
                </label>
                <input
                  type="number"
                  id="totalLandings"
                  name="totalLandings"
                  value={formData.totalLandings}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  required
                />
              </div>
            </div>

            {/* Engine Make/Model & Hours */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label
                  htmlFor="engineMakeModel"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Engine Make & Model
                </label>
                <input
                  type="text"
                  id="engineMakeModel"
                  name="engineMakeModel"
                  value={formData.engineMakeModel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. CFM56-5B4/3"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="engineHours"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Engine Hours
                </label>
                <input
                  type="number"
                  id="engineHours"
                  name="engineHours"
                  value={formData.engineHours}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  required
                />
              </div>
            </div>

            {/* Avionics Suite & Interior Config */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label
                  htmlFor="avionicsSuite"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Avionics Suite
                </label>
                <input
                  type="text"
                  id="avionicsSuite"
                  name="avionicsSuite"
                  value={formData.avionicsSuite}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Honeywell Primus"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="interiorConfig"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Interior Configuration
                </label>
                <input
                  type="text"
                  id="interiorConfig"
                  name="interiorConfig"
                  value={formData.interiorConfig}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. 14 pax, club + divan"
                  required
                />
              </div>
            </div>
          </div>

          {/* Bidding Information */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Bidding Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="biddingEndDate"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Bidding End Date & Time
                </label>
                <input
                  type="datetime-local"
                  id="biddingEndDate"
                  name="biddingEndDate"
                  value={formData.biddingEndDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="minimumBidIncrement"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Minimum Bid Increment (USD)
                </label>
                <input
                  type="number"
                  id="minimumBidIncrement"
                  name="minimumBidIncrement"
                  value={formData.minimumBidIncrement}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="1000"
                  step="1000"
                  placeholder="e.g. 5000"
                  required
                />
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Aircraft Photos
            </h3>

            <div className="space-y-6">
              <div>
                <label className=" text-sm font-medium text-gray-700 mb-3 flex items-center">
                  Interior Photos (Minimum 3)
                  {isUploading && formData.interiorImages.length > 0 && (
                    <span className="ml-3 text-blue-500 text-xs flex items-center">
                      <svg
                        className="animate-spin h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Uploading {formData.interiorImages.length} images...
                    </span>
                  )}
                </label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 bg-white hover:bg-gray-50 transition duration-200">
                  <input
                    type="file"
                    id="interiorImages"
                    ref={interiorInputRef}
                    onChange={(e) => handleImageUpload(e, "interior")}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                  <div
                    onClick={() => triggerFileInput("interior")}
                    className="cursor-pointer text-center"
                  >
                    <div className="flex justify-center mb-4">
                      <svg
                        className="h-12 w-12 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-600">
                      Drag and drop or click to upload
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      High-resolution images recommended
                    </p>
                  </div>
                  {interiorPreviews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                      {interiorPreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            className="w-full h-48 object-cover rounded-lg shadow-sm"
                            alt={`Interior preview ${index + 1}`}
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index, "interior")}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className=" text-sm font-medium text-gray-700 mb-3 flex items-center">
                  Exterior Photos (Minimum 2)
                  {isUploading && formData.exteriorImages.length > 0 && (
                    <span className="ml-3 text-blue-500 text-xs flex items-center">
                      <svg
                        className="animate-spin h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Uploading {formData.exteriorImages.length} images...
                    </span>
                  )}
                </label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 bg-white hover:bg-gray-50 transition duration-200">
                  <input
                    type="file"
                    id="exteriorImages"
                    ref={exteriorInputRef}
                    onChange={(e) => handleImageUpload(e, "exterior")}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                  <div
                    onClick={() => triggerFileInput("exterior")}
                    className="cursor-pointer text-center"
                  >
                    <div className="flex justify-center mb-4">
                      <svg
                        className="h-12 w-12 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-600">
                      Drag and drop or click to upload
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      High-resolution images recommended
                    </p>
                  </div>
                  {exteriorPreviews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                      {exteriorPreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            className="w-full h-48 object-cover rounded-lg shadow-sm"
                            alt={`Exterior preview ${index + 1}`}
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index, "exterior")}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Location */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 9V7a5 5 0 00-10 0v2m-2 3h14a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm-1 3v2m4-2v2m4-2v2"
                />
              </svg>
              Pricing & Location
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Starting Bid Price (USD)
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. $25,000,000"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="currentLocation"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Current Location / Base Airport
                </label>
                <input
                  type="text"
                  id="currentLocation"
                  name="currentLocation"
                  value={formData.currentLocation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Teterboro, NJ, USA"
                  required
                />
              </div>
            </div>
          </div>

          {/* Registration & Contact */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Registration & Contact
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="registrationNumber"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Registration Number
                </label>
                <input
                  type="text"
                  id="registrationNumber"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. N123AB"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="contactDetails"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Contact Details (Vendor/Broker)
                </label>
                <input
                  type="text"
                  id="contactDetails"
                  name="contactDetails"
                  value={formData.contactDetails}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Name, Email, Phone"
                  required
                />
              </div>
            </div>
          </div>

          {/* Optional Information */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Optional Information
            </h3>

            {/* Previous Owners & Maintenance Program */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="previousOwners"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Number of Previous Owners
                </label>
                <input
                  type="number"
                  id="previousOwners"
                  name="previousOwners"
                  value={formData.previousOwners}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  placeholder="e.g. 1"
                />
              </div>
              <div>
                <label
                  htmlFor="maintenanceProgram"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Maintenance Program
                </label>
                <input
                  type="text"
                  id="maintenanceProgram"
                  name="maintenanceProgram"
                  value={formData.maintenanceProgram}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. CAMP, JSSI, MSP"
                />
              </div>
            </div>

            {/* Airframe/Engine Status & Refurbishment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label
                  htmlFor="airframeEngineStatus"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Airframe & Engine Status Reports
                </label>
                <input
                  type="text"
                  id="airframeEngineStatus"
                  name="airframeEngineStatus"
                  value={formData.airframeEngineStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Available upon request"
                />
              </div>
              <div>
                <label
                  htmlFor="refurbishmentDate"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Refurbishment Date
                </label>
                <input
                  type="text"
                  id="refurbishmentDate"
                  name="refurbishmentDate"
                  value={formData.refurbishmentDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. January 2023"
                />
              </div>
            </div>

            {/* Wi-Fi & Lavatory/Galley */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label
                  htmlFor="wifiConnectivity"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Wi-Fi / Connectivity
                </label>
                <input
                  type="text"
                  id="wifiConnectivity"
                  name="wifiConnectivity"
                  value={formData.wifiConnectivity}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. JetWave, GoGo"
                />
              </div>
              <div>
                <label
                  htmlFor="lavatoryGalleyDetails"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Lavatory & Galley Details
                </label>
                <input
                  type="text"
                  id="lavatoryGalleyDetails"
                  name="lavatoryGalleyDetails"
                  value={formData.lavatoryGalleyDetails}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Forward crew & VIP lav, forward galley"
                />
              </div>
            </div>

            {/* Cabin Amenities */}
            <div className="mt-6">
              <label
                htmlFor="cabinAmenities"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Cabin Amenities
              </label>
              <textarea
                id="cabinAmenities"
                name="cabinAmenities"
                value={formData.cabinAmenities}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="e.g. Entertainment systems, LED lighting"
              />
            </div>
          </div>

          {/* Performance Specs */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Performance Specifications
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="range"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Range (nm)
                </label>
                <input
                  type="number"
                  id="range"
                  name="range"
                  value={formData.range}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  placeholder="e.g. 4750"
                />
              </div>
              <div>
                <label
                  htmlFor="cruiseSpeed"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Cruise Speed (mph)
                </label>
                <input
                  type="number"
                  id="cruiseSpeed"
                  name="cruiseSpeed"
                  value={formData.cruiseSpeed}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  placeholder="e.g. 528"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label
                  htmlFor="maxAltitude"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Max Altitude (ft)
                </label>
                <input
                  type="number"
                  id="maxAltitude"
                  name="maxAltitude"
                  value={formData.maxAltitude}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  placeholder="e.g. 51000"
                />
              </div>
              <div>
                <label
                  htmlFor="runwayLength"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Runway Length (ft)
                </label>
                <input
                  type="number"
                  id="runwayLength"
                  name="runwayLength"
                  value={formData.runwayLength}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  placeholder="e.g. 6000"
                />
              </div>
            </div>
          </div>

          {/* Weights & Delivery */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
              Weights & Delivery
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="emptyWeight"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Empty Weight (lbs)
                </label>
                <input
                  type="number"
                  id="emptyWeight"
                  name="emptyWeight"
                  value={formData.emptyWeight}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  placeholder="e.g. 50000"
                />
              </div>
              <div>
                <label
                  htmlFor="maxTakeoffWeight"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Max Takeoff Weight (lbs)
                </label>
                <input
                  type="number"
                  id="maxTakeoffWeight"
                  name="maxTakeoffWeight"
                  value={formData.maxTakeoffWeight}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  placeholder="e.g. 99000"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="deliveryAvailability"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Delivery Availability Date
              </label>
              <input
                type="text"
                id="deliveryAvailability"
                name="deliveryAvailability"
                value={formData.deliveryAvailability}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Q1 2025"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-4 rounded-lg shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Jet for Bidding"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
