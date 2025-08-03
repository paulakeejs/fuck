function VendorBenefits() {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="flex justify-center">
            <div className="w-16 h-px bg-amber-500 mb-4" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-black mb-4">
            Why <span className="font-medium">Elite Vendors</span> Choose
            Luxvana
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 font-light">
            Privileges reserved for our curated network of luxury providers
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Benefit 1 */}
          <div className="group border-b border-gray-100 pb-8 hover:border-amber-300 transition-colors duration-500">
            <div className="flex items-center mb-4">
              <div className="text-amber-500 text-3xl mr-3 font-serif">01</div>
              <svg
                className="w-8 h-8 text-gray-400 group-hover:text-amber-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="font-serif text-xl font-medium mb-3">
              Global Elite Clientele
            </h3>
            <p className="text-gray-600 font-light leading-relaxed">
              Access our private network of UHNWIs with minimum $10M+ net worth
            </p>
            <div className="mt-4 text-xs text-gray-400 tracking-widest">
              Vetted Members Only
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="group border-b border-gray-100 pb-8 hover:border-amber-300 transition-colors duration-500">
            <div className="flex items-center mb-4">
              <div className="text-amber-500 text-3xl mr-3 font-serif">02</div>
              <svg
                className="w-8 h-8 text-gray-400 group-hover:text-amber-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <h3 className="font-serif text-xl font-medium mb-3">
              Web3 Payments
            </h3>
            <p className="text-gray-600 font-light leading-relaxed">
              Receive instant crypto payments with minimal FX fees and
              blockchain security
            </p>
            <div className="mt-4 text-xs text-gray-400 tracking-widest">
              Solana Chain Supported
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="group border-b border-gray-100 pb-8 hover:border-amber-300 transition-colors duration-500">
            <div className="flex items-center mb-4">
              <div className="text-amber-500 text-3xl mr-3 font-serif">03</div>
              <svg
                className="w-8 h-8 text-gray-400 group-hover:text-amber-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            </div>
            <h3 className="font-serif text-xl font-medium mb-3">
              Premium Showcase
            </h3>
            <p className="text-gray-600 font-light leading-relaxed">
              Featured positioning in our members-only digital catalog and
              mobile app
            </p>
            <div className="mt-4 text-xs text-gray-400 tracking-widest">
              Curated Visibility
            </div>
          </div>

          {/* Benefit 4 */}
          <div className="group border-b border-gray-100 pb-8 hover:border-amber-300 transition-colors duration-500">
            <div className="flex items-center mb-4">
              <div className="text-amber-500 text-3xl mr-3 font-serif">04</div>
              <svg
                className="w-8 h-8 text-gray-400 group-hover:text-amber-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <h3 className="font-serif text-xl font-medium mb-3">
              Founder Perks
            </h3>
            <p className="text-gray-600 font-light leading-relaxed">
              Permanent preferred status, reduced commissions, and equity
              options
            </p>
            <div className="mt-4 text-xs text-gray-400 tracking-widest">
              Limited Availability
            </div>
          </div>

          {/* Benefit 5 */}
          <div className="group border-b border-gray-100 pb-8 hover:border-amber-300 transition-colors duration-500">
            <div className="flex items-center mb-4">
              <div className="text-amber-500 text-3xl mr-3 font-serif">05</div>
              <svg
                className="w-8 h-8 text-gray-400 group-hover:text-amber-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="font-serif text-xl font-medium mb-3">
              Exclusive Events
            </h3>
            <p className="text-gray-600 font-light leading-relaxed">
              Invitations to our annual gala, private viewings, and member
              retreats
            </p>
            <div className="mt-4 text-xs text-gray-400 tracking-widest">
              By Invitation Only
            </div>
          </div>
        </div>

        {/* Enhanced CTA */}
        <div className="mt-20 text-center">
          <div className="mb-6 text-sm text-gray-500 tracking-widest">
            LIMITED VENDOR POSITIONS AVAILABLE
          </div>
          <a href="#application">
            <button className="group relative px-8 py-4 bg-black text-white text-sm tracking-widest uppercase overflow-hidden">
              <span className="relative z-10">Begin Application Process</span>
              <span className="absolute inset-0 bg-amber-500 transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(.65,.05,.36,1)]"></span>
            </button>
          </a>
          <p className="mt-4 text-xs text-gray-400">
            Average approval time: 72 hours
          </p>
        </div>
      </div>
    </div>
  );
}

export default VendorBenefits;
