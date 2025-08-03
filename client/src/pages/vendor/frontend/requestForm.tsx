import axiosInstance from "@/lib/api";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function VendorApplication() {
  const countries = [
    { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
    { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
    { code: "AE", name: "United Arab Emirates", dialCode: "+971", flag: "🇦🇪" },
    { code: "CH", name: "Switzerland", dialCode: "+41", flag: "🇨🇭" },
    { code: "MC", name: "Monaco", dialCode: "+377", flag: "🇲🇨" },
    { code: "LI", name: "Liechtenstein", dialCode: "+423", flag: "🇱🇮" },
    { code: "LU", name: "Luxembourg", dialCode: "+352", flag: "🇱🇺" },
    { code: "SG", name: "Singapore", dialCode: "+65", flag: "🇸🇬" },
    { code: "HK", name: "Hong Kong", dialCode: "+852", flag: "🇭🇰" },
    { code: "QA", name: "Qatar", dialCode: "+974", flag: "🇶🇦" },
    { code: "KW", name: "Kuwait", dialCode: "+965", flag: "🇰🇼" },
    { code: "SA", name: "Saudi Arabia", dialCode: "+966", flag: "🇸🇦" },
    { code: "BH", name: "Bahrain", dialCode: "+973", flag: "🇧🇭" },
    { code: "MT", name: "Malta", dialCode: "+356", flag: "🇲🇹" },
    { code: "NG", name: "Nigeria", dialCode: "+234", flag: "🇳🇬" },
    { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
    { code: "IT", name: "Italy", dialCode: "+39", flag: "🇮🇹" },
    { code: "ES", name: "Spain", dialCode: "+34", flag: "🇪🇸" },
    { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
    { code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵" },
    { code: "CN", name: "China", dialCode: "+86", flag: "🇨🇳" },
    { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
    { code: "BR", name: "Brazil", dialCode: "+55", flag: "🇧🇷" },
    { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
    { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺" },
    { code: "ZA", name: "South Africa", dialCode: "+27", flag: "🇿🇦" },
    { code: "RU", name: "Russia", dialCode: "+7", flag: "🇷🇺" },
    { code: "TR", name: "Turkey", dialCode: "+90", flag: "🇹🇷" },
    { code: "TH", name: "Thailand", dialCode: "+66", flag: "🇹🇭" },
    { code: "ID", name: "Indonesia", dialCode: "+62", flag: "🇮🇩" },
    { code: "MY", name: "Malaysia", dialCode: "+60", flag: "🇲🇾" },
    { code: "PH", name: "Philippines", dialCode: "+63", flag: "🇵🇭" },
    { code: "VN", name: "Vietnam", dialCode: "+84", flag: "🇻🇳" },
    { code: "IL", name: "Israel", dialCode: "+972", flag: "🇮🇱" },
    { code: "OM", name: "Oman", dialCode: "+968", flag: "🇴🇲" },
    { code: "BM", name: "Bermuda", dialCode: "+1", flag: "🇧🇲" },
    { code: "KY", name: "Cayman Islands", dialCode: "+1", flag: "🇰🇾" },
    { code: "JE", name: "Jersey", dialCode: "+44", flag: "🇯🇪" },
    { code: "GG", name: "Guernsey", dialCode: "+44", flag: "🇬🇬" },
    { code: "IM", name: "Isle of Man", dialCode: "+44", flag: "🇮🇲" },
  ];

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [legalName, setLegalName] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [argee, setArgee] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!legalName.trim()) errors.legalName = "Company name is required.";
    if (!vendorName.trim()) errors.vendorName = "Contact name is required.";
    if (!email.match(/^\S+@\S+\.\S+$/)) errors.email = "Invalid email address.";
    if (!phone.match(/^\d{7,}$/)) errors.phone = "Enter a valid phone number.";
    if (!category) errors.category = "Please select a service category.";
    if (description.trim().split(/\s+/).length < 30)
      errors.description = "Please write at least 30 words.";
    if (!argee) errors.argee = "You must agree to the terms.";
    return errors;
  };
  const formData = {
    companyName: legalName,
    name: vendorName,
    email,
    phone,
    website,
    serviceType: category,
    description,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      setLoading(true);
      const response = await axiosInstance.post("/vendor/new", formData);
      if (response.data.success) {
        setSuccessful(true);
      } else {
        toast(response.data.message);
      }
      setFormErrors({});
    } catch (error: any) {
      toast.error("Something Went Wrong", error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {successful ? (
        <div className="p-24">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto border border-gray-100">
            <div className="text-center">
              {/* Checkmark icon */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-50 mb-4">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              {/* Heading */}
              <h3 className="text-2xl font-medium text-gray-900 mb-2">
                Application Submitted
              </h3>

              {/* Message */}
              <p className="text-gray-600 mb-6">
                Thank you for applying. We'll review your submission and contact
                you within 2 business days.
              </p>

              {/* Additional info */}
              <div className="bg-gray-50 p-4 rounded-lg text-left">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Next steps:
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Check your email for confirmation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Our team will verify your details</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>You'll receive a status update soon</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <section id="application" className="bg-[#faf9f5] py-32">
          {/* Luxury texture overlay */}
          <div className="fixed inset-0 bg-[url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI1LTA0L3Jhd3BpeGVsb2ZmaWNlM19jcmVhdGVfYV9oaWdoLXJlc29sdXRpb25fc2VhbWxlc3Nfd2hpdGVfdGV4dHVyZV84ZDQzOTdlZi02NmJjLTQ4YjQtOGI5ZC01ZWFiMzdiM2UwYWEtam9iMjAxNi1tOWpndG5sbS5qcGc.jpg')] opacity-5 pointer-events-none"></div>

          <div className="max-w-4xl mx-auto px-6 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-20">
              <div className="flex justify-center mb-6">
                <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
              </div>
              <h2 className="font-serif text-5xl font-light text-[#1a1a1a] mb-4 tracking-tight">
                <span className="font-medium">Join Our</span> Exclusive Network
              </h2>
              <p className="max-w-2xl mx-auto text-[#666] font-light text-lg leading-relaxed">
                Apply for partnership with Luxvana International
              </p>
            </div>

            {/* Application Form */}
            <div className="bg-white p-12 shadow-[0_25px_100px_-20px_rgba(0,0,0,0.08)] border border-[#e8e8e8]">
              <div className="mb-10 text-center">
                <div className="inline-flex items-center px-4 py-2 bg-amber-50 rounded-full">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-xs font-medium text-amber-700 tracking-widest">
                    LIMITED VENDOR POSITIONS AVAILABLE
                  </span>
                </div>
              </div>

              <form className="space-y-10" onSubmit={handleSubmit}>
                {/* Company Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <label className="block text-xs font-medium text-[#555] mb-3 tracking-widest uppercase">
                      Company Legal Name{" "}
                      <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-0 py-3 border-b border-[#e0e0e0] focus:border-amber-500 outline-none transition-colors bg-transparent placeholder-[#999]"
                      placeholder="Enter registered business name"
                      onChange={(e: any) => setLegalName(e.target.value)}
                      required
                    />
                    {formErrors.legalName && (
                      <p className="text-red-500 text-xs mt-1">
                        {formErrors.legalName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#555] mb-3 tracking-widest uppercase">
                      Primary Contact <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-0 py-3 border-b border-[#e0e0e0] focus:border-amber-500 outline-none transition-colors bg-transparent placeholder-[#999]"
                      placeholder="Full name of authorized representative"
                      onChange={(e: any) => setVendorName(e.target.value)}
                      required
                    />
                    {formErrors.vendorName && (
                      <p className="text-red-500 text-xs mt-1">
                        {formErrors.vendorName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <label className="block text-xs font-medium text-[#555] mb-3 tracking-widest uppercase">
                      Business Email <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="email"
                      className="w-full px-0 py-3 border-b border-[#e0e0e0] focus:border-amber-500 outline-none transition-colors bg-transparent placeholder-[#999]"
                      placeholder="name@company.com"
                      onChange={(e: any) => setEmail(e.target.value)}
                      required
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#555] mb-3 tracking-widest uppercase">
                      Direct Phone <span className="text-amber-500">*</span>
                    </label>
                    <div className="flex border-b border-[#e0e0e0] focus-within:border-amber-500 transition-colors">
                      <div className="relative w-[180px]">
                        <button
                          type="button"
                          className="w-full px-0 py-3 pr-8 bg-transparent outline-none appearance-none border-r border-[#e0e0e0] text-sm flex items-center"
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          <span className="mr-2">{selectedCountry.flag}</span>
                          <span>{selectedCountry.dialCode}</span>
                        </button>

                        {isOpen && (
                          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                            {countries.map((country) => (
                              <div
                                key={country.code}
                                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-amber-50"
                                onClick={() => {
                                  setSelectedCountry(country);
                                  setIsOpen(false);
                                }}
                              >
                                <div className="flex items-center">
                                  <span className="mr-2">{country.flag}</span>
                                  <span className="block truncate">
                                    {country.name} {country.dialCode}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <input
                        type="tel"
                        className="flex-1 px-4 py-3 outline-none bg-transparent placeholder-[#999]"
                        placeholder="1234567890"
                        onChange={(e: any) => setPhone(e.target.value)}
                        required
                      />
                      {formErrors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {formErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Website & Service Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <label className="block text-xs font-medium text-[#555] mb-3 tracking-widest uppercase">
                      Company Website
                    </label>
                    <div className="flex items-center border-b border-[#e0e0e0] focus-within:border-amber-500 transition-colors">
                      <span className="text-[#999] pr-2">https://</span>
                      <input
                        type="text"
                        className="flex-1 px-0 py-3 outline-none bg-transparent placeholder-[#999]"
                        placeholder="yourcompany.com"
                        onChange={(e: any) => setWebsite(e.target.value)}
                      />
                      {formErrors.website && (
                        <p className="text-red-500 text-xs mt-1">
                          {formErrors.website}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#555] mb-3 tracking-widest uppercase">
                      Service Category <span className="text-amber-500">*</span>
                    </label>
                    <select
                      className="w-full px-0 py-3 border-b border-[#e0e0e0] focus:border-amber-500 outline-none transition-colors bg-transparent appearance-none"
                      onChange={(e: any) => setCategory(e.target.value)}
                      required
                    >
                      <option value="" disabled selected>
                        Select your service category
                      </option>
                      <option value="jet_sales">Jet Sales Vendor</option>
                      <option value="jet_charter">Jet Charter Vendor</option>
                      <option value="broker">Broker (Sales + Charter)</option>
                      <option value="car_rental">Luxury Car Rentals</option>
                      <option value="helicopter_broker">
                        Helicopter Broker (Sales + Charter)
                      </option>
                      <option value="luxury_hotels">
                        Luxury Hotels & Resorts
                      </option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-medium text-[#555] mb-3 tracking-widest uppercase">
                    Service Excellence Statement{" "}
                    <span className="text-amber-500">*</span>
                  </label>
                  <textarea
                    className="w-full px-0 py-3 border-b border-[#e0e0e0] focus:border-amber-500 outline-none transition-colors bg-transparent min-h-[150px] placeholder-[#999]"
                    placeholder="Describe what makes your services exceptional (minimum 100 words)
                • Client demographics served\n• Unique value proposition
                • Notable clientele or partnerships\n• Awards or recognitions"
                    onChange={(e: any) => setDescription(e.target.value)}
                    required
                  ></textarea>
                  {formErrors.description && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.description}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <div className="pt-10">
                  <div className="mb-6 flex items-center">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mr-3 w-5 h-5 border border-[#ddd] rounded-sm focus:ring-amber-500"
                      onChange={(e) => setArgee(e.target.checked)}
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-[#555]">
                      I understand this application is subject to Luxvana's
                      rigorous vetting process and agree to the{" "}
                      <a
                        href="/vendor/rules"
                        className="text-amber-500 hover:underline"
                      >
                        terms
                      </a>
                    </label>
                  </div>
                  <button
                    disabled={!argee}
                    type="submit"
                    className="group relative w-full py-5 bg-black text-white text-sm tracking-widest uppercase hover:bg-[#111] transition-colors duration-300 flex items-center justify-center overflow-hidden"
                  >
                    {loading ? (
                      <div className="text-center">
                        <Loader className="animate-spin" />
                      </div>
                    ) : (
                      <div>
                        <span className="relative z-10 flex items-center">
                          Submit for Review
                          <svg
                            className="w-4 h-4 ml-3 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            ></path>
                          </svg>
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </div>
                    )}
                  </button>
                  <p className="text-xs text-[#999] mt-4 text-center">
                    Our team will respond within 48 hours to qualified
                    applicants
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default VendorApplication;
