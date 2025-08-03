function TrustSignals() {
  return (
    <div className="bg-[#f8f5f0] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
          </div>
          <h2 className="font-serif text-4xl font-light text-[#1a1a1a] mb-4 tracking-tight">
            <span className="font-medium">Trusted by</span> Elite Partners
          </h2>
          <p className="max-w-2xl mx-auto text-[#666] font-light">
            Working with the most discerning names in private aviation
          </p>
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center mb-20">
          {/* Placeholder for actual logos - use these until you have partnerships */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-black p-4 shadow-[0_5px_30px_rgba(0,0,0,0.05)] border border-[#f0f0f0] flex items-center justify-center">
              <span className="font-serif text-xl text-[#555]">
                <img
                  src="https://cdn.brandfetch.io/id0w8LiHvn/w/820/h/142/theme/light/logo.png?c=1dxbfHSJFAPEGdCLU4o5B"
                  alt=""
                />
              </span>
            </div>
            <p className="mt-4 text-xs text-[#777] tracking-widest">
              PRIVATE AVIATION
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-white shadow-[0_5px_30px_rgba(0,0,0,0.05)] border border-[#f0f0f0] flex items-center justify-center">
              <span className="font-serif text-xl text-[#555]">AeroLux</span>
            </div>
            <p className="mt-4 text-xs text-[#777] tracking-widest">
              CHARTER SERVICES
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-white shadow-[0_5px_30px_rgba(0,0,0,0.05)] border border-[#f0f0f0] flex items-center justify-center">
              <span className="font-serif text-xl text-[#555]">SkyChefs</span>
            </div>
            <p className="mt-4 text-xs text-[#777] tracking-widest">
              IN-FLIGHT CATERING
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-white shadow-[0_5px_30px_rgba(0,0,0,0.05)] border border-[#f0f0f0] flex items-center justify-center">
              <span className="font-serif text-xl text-[#555]">
                Azure Resorts
              </span>
            </div>
            <p className="mt-4 text-xs text-[#777] tracking-widest">
              LUXURY DESTINATIONS
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 border border-[#f0f0f0]">
              <div className="flex items-center mb-6">
                <div className="w-12 h-px bg-amber-500 mr-4"></div>
                <div className="text-xs text-[#777] tracking-widest">
                  AVIATION EXPERT
                </div>
              </div>
              <p className="font-serif text-xl font-light text-[#333] mb-6 leading-relaxed">
                "The Luxvana platform represents the future of luxury aviation
                partnerships. Their selection process ensures only the most
                exceptional providers gain access."
              </p>
              <div className="text-sm text-[#555]">
                <span className="font-medium">Marcus Whitmore</span>, Industry
                Analyst
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 border border-[#f0f0f0]">
              <div className="flex items-center mb-6">
                <div className="w-12 h-px bg-amber-500 mr-4"></div>
                <div className="text-xs text-[#777] tracking-widest">
                  FORMER PARTNER
                </div>
              </div>
              <p className="font-serif text-xl font-light text-[#333] mb-6 leading-relaxed">
                "Working with Luxvana elevated our clientele significantly.
                Their network attracts ultra-high-net-worth individuals who
                value discretion and excellence."
              </p>
              <div className="text-sm text-[#555]">
                <span className="font-medium">Sophie Laurent</span>, Charter
                Director
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <a href="#application">
            {" "}
            <button className="group relative px-8 py-4 bg-black text-white text-sm tracking-widest uppercase hover:bg-[#111] transition-colors duration-300 flex items-center justify-center mx-auto">
              <span className="relative z-10">Become a Partner</span>
              <span className="absolute inset-0 bg-amber-500 transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(.65,.05,.36,1)]"></span>
            </button>
          </a>
          <p className="mt-4 text-xs text-[#999]">
            Application review typically within 72 hours
          </p>
        </div>
      </div>
    </div>
  );
}

export default TrustSignals;
