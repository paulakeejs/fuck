function VendorHero() {
  return (
    <div className="relative h-screen min-h-[800px] flex items-center justify-center bg-white overflow-hidden">
      {/* Background pattern (subtle texture) */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] opacity-5" />

      {/* Content container */}
      <div className="relative z-10 max-w-4xl px-6 text-center">
        {/* Logo - Only color element */}
        <div className="mb-12">
          <p className="font-serif text-xl tracking-[0.3em] text-amber-500 mb-2">
            LUXVANA INTERNATIONAL
          </p>
          <div className="w-16 h-px bg-black mx-auto mb-4" />
        </div>

        {/* Headline */}
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light leading-tight mb-6 text-black">
          Partner with the Future of{" "}
          <span className="font-medium">Private Aviation</span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl mx-auto font-light text-lg md:text-xl text-gray-600 mb-12 leading-relaxed">
          Join Luxvana International and connect with elite clients worldwide
          through our exclusive Web3-powered luxury platform.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center">
          <a href="#application">
            <button className="px-8 py-4 bg-black hover:bg-gray-900 text-white font-medium tracking-wider uppercase transition duration-300 border border-black">
              Apply to Become a Vendor
            </button>
          </a>
        </div>

        {/* Minimalist indicators */}
        <div className="mt-20 flex justify-center gap-8 text-xs tracking-widest text-gray-500">
          <span>EXCLUSIVE NETWORK</span>
          <span>WEB3 INTEGRATION</span>
          <span>GLOBAL REACH</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-gray-400 rounded-full mt-2" />
        </div>
      </div>
    </div>
  );
}

export default VendorHero;
