function VendorProcess() {
  return (
    <div className="bg-white py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[#1a1a1a] mb-4 tracking-tight">
            <span className="font-medium">Effortless</span> Partnership
          </h2>
          <p className="max-w-2xl mx-auto text-[#666] font-light text-lg">
            Join our network in three simple steps
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Step 1 */}
          <div className="text-center">
            <div className="relative mb-8 mx-auto w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 border border-amber-100 rounded-full"></div>
              <div className="text-amber-500 text-3xl font-serif font-medium z-10">
                1
              </div>
            </div>
            <h3 className="font-serif text-2xl font-medium text-[#1a1a1a] mb-4">
              Apply Online
            </h3>
            <p className="text-[#555] font-light max-w-xs mx-auto">
              5-minute application with no upfront fees
            </p>
            <div className="mt-6 text-xs text-amber-600 tracking-widest">
              START NOW
            </div>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="relative mb-8 mx-auto w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 border border-amber-100 rounded-full"></div>
              <div className="absolute inset-0 border border-amber-100 rounded-full animate-ping opacity-20"></div>
              <div className="text-amber-500 text-3xl font-serif font-medium z-10">
                2
              </div>
            </div>
            <h3 className="font-serif text-2xl font-medium text-[#1a1a1a] mb-4">
              Get Verified
            </h3>
            <p className="text-[#555] font-light max-w-xs mx-auto">
              48-hour expedited review for qualified applicants
            </p>
            <div className="mt-6 text-xs text-amber-600 tracking-widest">
              VIP PROCESSING
            </div>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="relative mb-8 mx-auto w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 border border-amber-100 rounded-full"></div>
              <div className="text-amber-500 text-3xl font-serif font-medium z-10">
                3
              </div>
              <div className="absolute -right-4 -top-4 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                GOAL
              </div>
            </div>
            <h3 className="font-serif text-2xl font-medium text-[#1a1a1a] mb-4">
              Start Earning
            </h3>
            <p className="text-[#555] font-light max-w-xs mx-auto">
              Immediate access to premium client requests
            </p>
            <div className="mt-6 text-xs text-amber-600 tracking-widest">
              $50K+ AVERAGE DEAL SIZE
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <a href="#application">
            <button className="group relative px-8 py-4 bg-black text-white text-sm tracking-widest uppercase overflow-hidden">
              <span className="relative z-10">Begin Application</span>
              <span className="absolute inset-0 bg-amber-500 transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(.65,.05,.36,1)]"></span>
            </button>
          </a>
          <p className="mt-4 text-xs text-[#999]">
            Typical approval within 72 hours
          </p>
        </div>
      </div>
    </div>
  );
}

export default VendorProcess;
