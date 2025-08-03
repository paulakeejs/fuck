import { Check, X } from "lucide-react";

function VendorRulesPage() {
  return (
    <div className="bg-[#faf9f5] min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-sm border border-gray-100">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4">
            <span className="font-light">Luxvana</span>{" "}
            <span className="font-medium">Vendor Standards</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Excellence guidelines for our luxury aviation partners
          </p>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-20 text-gray-700 border-b border-gray-100 pb-12">
          <p className="font-light">
            Welcome to{" "}
            <span className="font-medium">Luxvana International</span> — the
            global platform for luxury private aviation. To maintain the highest
            level of excellence for our clientele, all vendors must adhere to
            the following standards.
          </p>
        </div>

        {/* Rules List */}
        <div className="space-y-16">
          {/* Rule 1 */}
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                <span className="text-amber-600 font-serif text-xl font-medium">
                  1
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-medium text-gray-900 mb-4">
                Service Specialization
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    Vendors must select one service category per application:{" "}
                    <span className="font-medium">Jet Sales</span>,{" "}
                    <span className="font-medium">Jet Charter</span>,{" "}
                    <span className="font-medium">Maintenance</span>,{" "}
                    <span className="font-medium">Concierge Services</span>, or{" "}
                    <span className="font-medium">Luxury Destinations</span>
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    Vendors offering multiple services must submit separate
                    applications for each service category
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    Each service must have a dedicated profile and contact flow
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Rule 2 */}
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                <span className="text-amber-600 font-serif text-xl font-medium">
                  2
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-medium text-gray-900 mb-4">
                Quality Standards
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    All vendors must operate at the highest standards of luxury
                    service, professionalism, and discretion
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    Vendors must have a proven track record of delivering
                    premium services
                  </span>
                </li>
                <li className="flex items-start">
                  <X className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    Luxvana reserves the right to reject or remove any vendor
                    that does not meet quality expectations
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Rule 3 */}
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                <span className="text-amber-600 font-serif text-xl font-medium">
                  3
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-medium text-gray-900 mb-4">
                Verification and Approval
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    Vendors must provide accurate business information,
                    including ownership structure, certifications, and relevant
                    licenses
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    Luxvana may conduct background checks or request additional
                    verification documents
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Rule 4 */}
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                <span className="text-amber-600 font-serif text-xl font-medium">
                  4
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-medium text-gray-900 mb-4">
                Service Listings
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    All listings must be accurate, up-to-date, and honest
                  </span>
                </li>
                <li className="flex items-start">
                  <X className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    Misleading information, hidden fees, or bait-and-switch
                    tactics are strictly prohibited
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    Jet listings must include real aircraft photos, full
                    specifications, and availability information
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Rule 5 */}
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                <span className="text-amber-600 font-serif text-xl font-medium">
                  5
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-medium text-gray-900 mb-4">
                Compliance and Legal Responsibility
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    Vendors are responsible for complying with all local,
                    national, and international regulations
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    Must ensure all operations comply with legal requirements of
                    served territories
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    Strict adherence to aviation, maintenance, and client
                    privacy laws required
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Rule 6 */}
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                <span className="text-amber-600 font-serif text-xl font-medium">
                  6
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-medium text-gray-900 mb-4">
                Payment and Transactions
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    All transactions must accept Solana-based Web3 payments
                    where applicable
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    Vendors must honor payment terms in client agreements
                  </span>
                </li>
                <li className="flex items-start">
                  <X className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    No off-platform transactions without Luxvana approval
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Rule 7 */}
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                <span className="text-amber-600 font-serif text-xl font-medium">
                  7
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-medium text-gray-900 mb-4">
                Client Interaction
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    Maintain professional, courteous communication at all times
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    Uphold standards of discretion, reliability, and
                    luxury-level service
                  </span>
                </li>
                <li className="flex items-start">
                  <X className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    No unprofessional conduct or breach of confidentiality
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Rule 8 */}
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                <span className="text-amber-600 font-serif text-xl font-medium">
                  8
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-medium text-gray-900 mb-4">
                Brand Integrity
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <X className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    No use of Luxvana branding without written permission
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    Present services in alignment with Luxvana's luxury
                    positioning
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Rule 9 */}
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                <span className="text-amber-600 font-serif text-xl font-medium">
                  9
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-medium text-gray-900 mb-4">
                Removal and Suspension
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <X className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    Luxvana reserves the right to suspend or remove vendors for
                    violations
                  </span>
                </li>
                <li className="flex items-start">
                  <X className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    Includes fraudulent activity, poor reviews, or
                    misrepresentation
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Rule 10 */}
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                <span className="text-amber-600 font-serif text-xl font-medium">
                  10
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-medium text-gray-900 mb-4">
                Continuous Updates
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    Vendors must keep profiles, listings, and documents updated
                  </span>
                </li>
                <li className="flex items-start">
                  <X className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    Failure to maintain current information may result in
                    deactivation
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Prohibited Items Section */}
          <div className="bg-amber-50 p-6 border-l-4 border-amber-500">
            <h4 className="font-medium text-gray-900 mb-3">
              Grounds for Immediate Removal:
            </h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <X className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Fraudulent activity</span>
              </li>
              <li className="flex items-start">
                <X className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Consistently poor client reviews</span>
              </li>
              <li className="flex items-start">
                <X className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Misrepresentation of services</span>
              </li>
              <li className="flex items-start">
                <X className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  Non-compliance with Solana/web3 payment requirements
                </span>
              </li>
              <li className="flex items-start">
                <X className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Breach of confidentiality agreements</span>
              </li>
              <li className="flex items-start">
                <X className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Unauthorized off-platform transactions</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Agreement Section */}
        <div className="mt-20 pt-12 border-t border-gray-200">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-gray-700 mb-8">
              By applying to become a vendor on Luxvana International, you agree
              to abide by these standards and represent the luxury aviation
              industry with excellence.
            </p>
            <button className="px-10 py-4 bg-black text-white text-sm tracking-widest uppercase hover:bg-gray-900 transition-colors duration-300">
              Proceed to Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorRulesPage;
