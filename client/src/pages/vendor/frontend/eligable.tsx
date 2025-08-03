function VendorEligibility() {
  return (
    <div className="bg-[#f8f5f0] py-32">
      {/* Luxury texture overlay */}
      <div className="absolute inset-0 bg-[url('/images/luxury-paper-texture.jpg')] opacity-10 mix-blend-multiply"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[#1a1a1a] mb-4 tracking-tight">
            <span className="font-medium">Our Exclusive</span> Partner Criteria
          </h2>
          <p className="max-w-2xl mx-auto text-[#666] font-light text-lg leading-relaxed">
            Only the top 2% of luxury providers qualify for our network
          </p>
        </div>

        {/* Categories Grid - Now in gold-accented panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Category 1 - Private Jet Brokers */}
          <div className="bg-white p-10 border-t-4 border-amber-500 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.05)] transition-all duration-500 group">
            <div className="flex items-start mb-6">
              <span className="text-amber-500 text-2xl font-serif font-medium mr-4">
                01
              </span>
              <h3 className="font-serif text-xl font-medium pt-1 text-[#1a1a1a]">
                Private Jet Brokers
              </h3>
            </div>
            <ul className="pl-10 space-y-4 text-[#555] font-light border-l border-amber-100">
              <li className="relative before:absolute before:left-[-16px] before:top-[11px] before:w-2 before:h-2 before:bg-amber-500 before:rounded-full">
                <span className="font-medium text-[#333]">Minimum $50M</span>{" "}
                annual transaction volume
              </li>
              <li className="relative before:absolute before:left-[-16px] before:top-[11px] before:w-2 before:h-2 before:bg-amber-500 before:rounded-full">
                Access to{" "}
                <span className="font-medium text-[#333]">
                  global ultra-fleet
                </span>{" "}
                inventory
              </li>
              <li className="relative before:absolute before:left-[-16px] before:top-[11px] before:w-2 before:h-2 before:bg-amber-500 before:rounded-full">
                <span className="font-medium text-[#333]">
                  Discretion-first
                </span>{" "}
                service protocol
              </li>
            </ul>
            <div className="mt-6 text-xs text-amber-600 tracking-widest">
              BY INVITATION ONLY
            </div>
          </div>

          {/* Category 2 - Jet Charter Companies */}
          <div className="bg-white p-10 border-t-4 border-amber-500 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.05)] transition-all duration-500 group">
            <div className="flex items-start mb-6">
              <span className="text-amber-500 text-2xl font-serif font-medium mr-4">
                02
              </span>
              <h3 className="font-serif text-xl font-medium pt-1 text-[#1a1a1a]">
                Jet Charter Companies
              </h3>
            </div>
            <ul className="pl-10 space-y-4 text-[#555] font-light border-l border-amber-100">
              <li className="relative before:absolute before:left-[-16px] before:top-[11px] before:w-2 before:h-2 before:bg-amber-500 before:rounded-full">
                <span className="font-medium text-[#333]">Fleet minimum:</span>{" "}
                15+ aircraft
              </li>
              <li className="relative before:absolute before:left-[-16px] before:top-[11px] before:w-2 before:h-2 before:bg-amber-500 before:rounded-full">
                <span className="font-medium text-[#333]">Global 24/7</span>{" "}
                concierge dispatch
              </li>
              <li className="relative before:absolute before:left-[-16px] before:top-[11px] before:w-2 before:h-2 before:bg-amber-500 before:rounded-full">
                <span className="font-medium text-[#333]">Five-star</span> crew
                certification
              </li>
            </ul>
            <div className="mt-6 text-xs text-amber-600 tracking-widest">
              VETTED AIRCRAFT ONLY
            </div>
          </div>

          {/* Category 3 - Maintenance Providers */}
          <div className="bg-white p-10 border-t-4 border-amber-500 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.05)] transition-all duration-500 group">
            <div className="flex items-start mb-6">
              <span className="text-amber-500 text-2xl font-serif font-medium mr-4">
                03
              </span>
              <h3 className="font-serif text-xl font-medium pt-1 text-[#1a1a1a]">
                Maintenance Providers
              </h3>
            </div>
            <ul className="pl-10 space-y-4 text-[#555] font-light border-l border-amber-100">
              <li className="relative before:absolute before:left-[-16px] before:top-[11px] before:w-2 before:h-2 before:bg-amber-500 before:rounded-full">
                <span className="font-medium text-[#333]">FAA/EASA</span>{" "}
                certified master technicians
              </li>
              <li className="relative before:absolute before:left-[-16px] before:top-[11px] before:w-2 before:h-2 before:bg-amber-500 before:rounded-full">
                <span className="font-medium text-[#333]">Private hangars</span>{" "}
                for discreet service
              </li>
              <li className="relative before:absolute before:left-[-16px] before:top-[11px] before:w-2 before:h-2 before:bg-amber-500 before:rounded-full">
                <span className="font-medium text-[#333]">Same-day</span>{" "}
                emergency response
              </li>
            </ul>
            <div className="mt-6 text-xs text-amber-600 tracking-widest">
              AUTHORIZED SERVICE CENTERS
            </div>
          </div>

          {/* Category 4 - Catering & Concierge */}
          <div className="bg-white p-10 border-t-4 border-amber-500 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.05)] transition-all duration-500 group">
            <div className="flex items-start mb-6">
              <span className="text-amber-500 text-2xl font-serif font-medium mr-4">
                04
              </span>
              <h3 className="font-serif text-xl font-medium pt-1 text-[#1a1a1a]">
                Catering & Concierge
              </h3>
            </div>
            <ul className="pl-10 space-y-4 text-[#555] font-light border-l border-amber-100">
              <li className="relative before:absolute before:left-[-16px] before:top-[11px] before:w-2 before:h-2 before:bg-amber-500 before:rounded-full">
                <span className="font-medium text-[#333]">Michelin-star</span>{" "}
                executive chefs
              </li>
              <li className="relative before:absolute before:left-[-16px] before:top-[11px] before:w-2 before:h-2 before:bg-amber-500 before:rounded-full">
                <span className="font-medium text-[#333]">Global sourcing</span>{" "}
                network
              </li>
              <li className="relative before:absolute before:left-[-16px] before:top-[11px] before:w-2 before:h-2 before:bg-amber-500 before:rounded-full">
                <span className="font-medium text-[#333]">NDA-protected</span>{" "}
                service
              </li>
            </ul>
            <div className="mt-6 text-xs text-amber-600 tracking-widest">
              WHITE GLOVE STANDARDS
            </div>
          </div>

          {/* Category 5 - Luxury Destinations */}
          <div className="bg-white p-10 border-t-4 border-amber-500 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.05)] transition-all duration-500 group">
            <div className="flex items-start mb-6">
              <span className="text-amber-500 text-2xl font-serif font-medium mr-4">
                05
              </span>
              <h3 className="font-serif text-xl font-medium pt-1 text-[#1a1a1a]">
                Luxury Destinations
              </h3>
            </div>
            <ul className="pl-10 space-y-4 text-[#555] font-light border-l border-amber-100">
              <li className="relative before:absolute before:left-[-16px] before:top-[11px] before:w-2 before:h-2 before:bg-amber-500 before:rounded-full">
                <span className="font-medium text-[#333]">
                  Forbes Five-Star
                </span>{" "}
                rated properties
              </li>
              <li className="relative before:absolute before:left-[-16px] before:top-[11px] before:w-2 before:h-2 before:bg-amber-500 before:rounded-full">
                <span className="font-medium text-[#333]">Private jet</span>{" "}
                terminal access
              </li>
              <li className="relative before:absolute before:left-[-16px] before:top-[11px] before:w-2 before:h-2 before:bg-amber-500 before:rounded-full">
                <span className="font-medium text-[#333]">VIP experience</span>{" "}
                directors
              </li>
            </ul>
            <div className="mt-6 text-xs text-amber-600 tracking-widest">
              CURATED PROPERTIES ONLY
            </div>
          </div>

          {/* Special Consideration Card */}
          <div className="bg-gradient-to-br from-[#f8f5f0] to-white p-10 border border-amber-100 flex flex-col justify-center items-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
            <div className="text-amber-600 mb-6 text-sm tracking-widest font-medium">
              EXCEPTIONAL PROVIDERS ONLY
            </div>
            <h3 className="font-serif text-xl font-medium text-[#1a1a1a] mb-4">
              Special Consideration
            </h3>
            <p className="text-[#555] font-light mb-6 max-w-xs">
              For elite services beyond our standard categories
            </p>
            <button className="px-6 py-3 bg-amber-500 text-white text-xs tracking-widest uppercase hover:bg-amber-600 transition-all duration-300 flex items-center">
              Request Evaluation
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorEligibility;
