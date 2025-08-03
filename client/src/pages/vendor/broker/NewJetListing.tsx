import { useState, useRef, ChangeEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import vendorApi from "../functions/vendorApi";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

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
  aircraftType: string;
  seatingCapacity: number | string;
  cabinHeight: number | string;
  cabinWidth: number | string;
  cabinLength: number | string;
  baggageCapacity: number | string;
  numberOfEngines: number | string;
  engineType: string;
  engineThrust: number | string;
  certification: string;
  noiseCompliance: string;
  lastInspectionDate: string;
  nextInspectionDue: string;
  maintenanceStatus: string;
  paymentTxSignature?: string;
  transactionLink?: string;
  vendorId: string;
};

export default function NewJetListing() {
  const vendorId = useSelector((state: any) => state.vendor.vendor.id);
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected } = useWallet();

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
    aircraftType: "",
    seatingCapacity: "",
    cabinHeight: "",
    cabinWidth: "",
    cabinLength: "",
    baggageCapacity: "",
    numberOfEngines: "",
    engineType: "",
    engineThrust: "",
    certification: "",
    noiseCompliance: "",
    lastInspectionDate: "",
    nextInspectionDue: "",
    maintenanceStatus: "",
    paymentTxSignature: "",
    transactionLink: "",
    vendorId: "",
  });

  const [interiorPreviews, setInteriorPreviews] = useState<string[]>([]);
  const [exteriorPreviews, setExteriorPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentTxSignature, setPaymentTxSignature] = useState("");
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState<PublicKey | null>(
    null
  );
  const interiorInputRef = useRef<HTMLInputElement>(null);
  const exteriorInputRef = useRef<HTMLInputElement>(null);

  // Sync vendorId from Redux to formData
  useEffect(() => {
    if (vendorId) {
      setFormData((prev) => ({ ...prev, vendorId }));
    }
  }, [vendorId]);

  useEffect(() => {
    const fetchRecipient = async () => {
      try {
        const response = await vendorApi.get("/payment/recipient");
        if (response.data.success) {
          setRecipientAddress(new PublicKey(response.data.data.wallet));
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.error("Failed to fetch recipient address:", error);
        toast.error("Failed to load payment information");
      }
    };

    fetchRecipient();
  }, []);

  useEffect(() => {
    if (paymentTxSignature) {
      const solscanLink = `https://solscan.io/tx/${paymentTxSignature}?cluster=devnet`;
      setFormData((prev) => ({
        ...prev,
        transactionLink: solscanLink,
        paymentTxSignature,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        transactionLink: "",
        paymentTxSignature: "",
      }));
    }
  }, [paymentTxSignature]);

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

  const handlePayment = async () => {
    if (!publicKey || !connected) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!recipientAddress) {
      toast.error("Payment recipient not configured");
      return;
    }

    setPaymentLoading(true);
    try {
      const feeAmount = 0.00001 * LAMPORTS_PER_SOL;
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientAddress,
          lamports: feeAmount,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "processed");

      setPaymentTxSignature(signature);
      setPaymentVerified(true);
      toast.success("Payment confirmed! You can now submit your listing.");
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setPaymentLoading(false);
    }
  };

  const viewOnSolscan = () => {
    if (!paymentTxSignature) return;
    window.open(
      `https://solscan.io/tx/${paymentTxSignature}?cluster=devnet`,
      "_blank"
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!paymentVerified) {
      toast.error("Please complete the payment first");
      return;
    }

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

      const response = await vendorApi.post("/jets/add", dataToSend);
      if (response.data.success) {
        toast.success("Jet listing submitted successfully!");
        window.location.href = "/preview/jet/sale/" + response.data.jet.id;
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
          aircraftType: "",
          seatingCapacity: "",
          cabinHeight: "",
          cabinWidth: "",
          cabinLength: "",
          baggageCapacity: "",
          numberOfEngines: "",
          engineType: "",
          engineThrust: "",
          certification: "",
          noiseCompliance: "",
          lastInspectionDate: "",
          nextInspectionDue: "",
          maintenanceStatus: "",
          paymentTxSignature: "",
          transactionLink: "",
          vendorId: "",
        });
        setInteriorPreviews([]);
        setExteriorPreviews([]);
        setPaymentTxSignature("");
        setPaymentVerified(false);
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-[990px] bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-900 to-blue-800 p-8">
          <p className="text-4xl font-extrabold text-white text-center">
            List Your Private Jet
          </p>
          <p className="text-indigo-100 text-center mt-3 text-lg">
            Create a premium listing to showcase your aircraft to buyers
            worldwide
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-10">
          {/* Required Information */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg
                className="w-7 h-7 mr-3 text-indigo-600"
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
              Aircraft Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
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
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. G650"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. 6069"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. 14 pax, club + divan"
                  required
                />
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg
                className="w-7 h-7 mr-3 text-indigo-600"
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

            <div className="space-y-8">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  Interior Photos (Minimum 3)
                  {isUploading && formData.interiorImages.length > 0 && (
                    <span className="ml-3 text-indigo-500 text-xs flex items-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2"
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
                <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-10 bg-gray-50 hover:bg-gray-100 transition-all duration-200">
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
                        className="h-12 w-12 text-indigo-500"
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
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                      {interiorPreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            className="w-full h-56 object-cover rounded-lg shadow-md"
                            alt={`Interior preview ${index + 1}`}
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index, "interior")}
                            className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
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
                <label className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  Exterior Photos (Minimum 2)
                  {isUploading && formData.exteriorImages.length > 0 && (
                    <span className="ml-3 text-indigo-500 text-xs flex items-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2"
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
                <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-10 bg-gray-50 hover:bg-gray-100 transition-all duration-200">
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
                        className="h-12 w-12 text-indigo-500"
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
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                      {exteriorPreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            className="w-full h-56 object-cover rounded-lg shadow-md"
                            alt={`Exterior preview ${index + 1}`}
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index, "exterior")}
                            className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
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
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg
                className="w-7 h-7 mr-3 text-indigo-600"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Asking Price (USD or "Price on Request")
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. $25,000,000 or Price on Request"
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. Teterboro, NJ, USA"
                  required
                />
              </div>
            </div>
          </div>

          {/* Registration & Contact */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg
                className="w-7 h-7 mr-3 text-indigo-600"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. Name, Email, Phone"
                  required
                />
              </div>
            </div>
          </div>

          {/* Optional Information */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg
                className="w-7 h-7 mr-3 text-indigo-600"
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
              Additional Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. CAMP, JSSI, MSP"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. January 2023"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. Forward crew & VIP lav, forward galley"
                />
              </div>
            </div>

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
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows={4}
                placeholder="e.g. Entertainment systems, LED lighting"
              />
            </div>
          </div>

          {/* Performance Specs */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg
                className="w-7 h-7 mr-3 text-indigo-600"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  min="0"
                  placeholder="e.g. 528"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  min="0"
                  placeholder="e.g. 6000"
                />
              </div>
            </div>
          </div>

          {/* Weights & Delivery */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg
                className="w-7 h-7 mr-3 text-indigo-600"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. Q1 2025"
              />
            </div>
          </div>

          <div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <svg
                  className="w-7 h-7 mr-3 text-indigo-600"
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
                Aircraft Specifications
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="aircraftType"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Aircraft Type
                  </label>
                  <select
                    id="aircraftType"
                    name="aircraftType"
                    value={formData.aircraftType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Business Jet">Business Jet</option>
                    <option value="Airliner">Airliner</option>
                    <option value="Turboprop">Turboprop</option>
                    <option value="Helicopter">Helicopter</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="seatingCapacity"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Seating Capacity
                  </label>
                  <input
                    type="number"
                    id="seatingCapacity"
                    name="seatingCapacity"
                    value={formData.seatingCapacity}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                <div>
                  <label
                    htmlFor="cabinHeight"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Cabin Height (ft)
                  </label>
                  <input
                    type="number"
                    id="cabinHeight"
                    name="cabinHeight"
                    value={formData.cabinHeight}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    step="0.1"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="cabinWidth"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Cabin Width (ft)
                  </label>
                  <input
                    type="number"
                    id="cabinWidth"
                    name="cabinWidth"
                    value={formData.cabinWidth}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    step="0.1"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="cabinLength"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Cabin Length (ft)
                  </label>
                  <input
                    type="number"
                    id="cabinLength"
                    name="cabinLength"
                    value={formData.cabinLength}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    step="0.1"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="baggageCapacity"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Baggage Capacity (cu ft)
                </label>
                <input
                  type="number"
                  id="baggageCapacity"
                  name="baggageCapacity"
                  value={formData.baggageCapacity}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            {/* Engine Details */}
            <div className="mt-10 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <svg
                  className="w-7 h-7 mr-3 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                </svg>
                Engine Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <label
                    htmlFor="numberOfEngines"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Number of Engines
                  </label>
                  <input
                    type="number"
                    id="numberOfEngines"
                    name="numberOfEngines"
                    value={formData.numberOfEngines}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    min="1"
                    max="4"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="engineType"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Engine Type
                  </label>
                  <select
                    id="engineType"
                    name="engineType"
                    value={formData.engineType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Turbofan">Turbofan</option>
                    <option value="Turboprop">Turboprop</option>
                    <option value="Piston">Piston</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="engineThrust"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Engine Thrust/HP (lbs/HP)
                  </label>
                  <input
                    type="number"
                    id="engineThrust"
                    name="engineThrust"
                    value={formData.engineThrust}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Certification & Compliance */}
            <div className="mt-10 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <svg
                  className="w-7 h-7 mr-3 text-indigo-600"
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
                Certification & Compliance
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="certification"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Certification
                  </label>
                  <select
                    id="certification"
                    name="certification"
                    value={formData.certification}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="">Select Certification</option>
                    <option value="FAA">FAA</option>
                    <option value="EASA">EASA</option>
                    <option value="Both">Both FAA & EASA</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="noiseCompliance"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Noise Compliance
                  </label>
                  <select
                    id="noiseCompliance"
                    name="noiseCompliance"
                    value={formData.noiseCompliance}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="">Select Compliance</option>
                    <option value="Stage 3">Stage 3</option>
                    <option value="Stage 4">Stage 4</option>
                    <option value="Stage 5">Stage 5</option>
                    <option value="Chapter 3">Chapter 3</option>
                    <option value="Chapter 4">Chapter 4</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Operational Status */}
            <div className="mt-10 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <svg
                  className="w-7 h-7 mr-3 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Operational Status
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <label
                    htmlFor="lastInspectionDate"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Last Inspection Date
                  </label>
                  <input
                    type="date"
                    id="lastInspectionDate"
                    name="lastInspectionDate"
                    value={formData.lastInspectionDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="nextInspectionDue"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Next Inspection Due
                  </label>
                  <input
                    type="date"
                    id="nextInspectionDue"
                    name="nextInspectionDue"
                    value={formData.nextInspectionDue}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="maintenanceStatus"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Maintenance Status
                  </label>
                  <select
                    id="maintenanceStatus"
                    name="maintenanceStatus"
                    value={formData.maintenanceStatus}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="Current">Current</option>
                    <option value="Due Soon">Due Soon</option>
                    <option value="Overdue">Overdue</option>
                    <option value="Fresh Inspection">Fresh Inspection</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg
                className="w-7 h-7 mr-3 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              Listing Fee
            </h3>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xl font-semibold text-gray-900">
                    Listing Fee
                  </p>
                  <p className="text-sm text-gray-600">
                    One-time payment to list your jet
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold text-gray-900">0.1 SOL</p>
                  {paymentVerified && (
                    <p className="text-sm text-green-600 font-medium mt-2">
                      Payment Confirmed
                    </p>
                  )}
                </div>
              </div>

              {!paymentVerified ? (
                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={paymentLoading || !connected || !recipientAddress}
                  className={`w-full mt-6 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    paymentLoading || !connected || !recipientAddress
                      ? "opacity-70 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {paymentLoading ? (
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
                      Processing Payment...
                    </span>
                  ) : connected ? (
                    "Pay with Solana"
                  ) : (
                    "Connect Wallet to Pay"
                  )}
                </button>
              ) : (
                <div className="mt-6 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={viewOnSolscan}
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
                  >
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    View Transaction on Solscan
                  </button>
                  <p className="text-sm text-green-600 font-medium">
                    Payment Confirmed
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-10">
            <button
              type="submit"
              disabled={isSubmitting || !paymentVerified}
              className={`w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-4 px-4 rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                isSubmitting || !paymentVerified
                  ? "opacity-70 cursor-not-allowed"
                  : ""
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
                "Submit Jet Listing"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
