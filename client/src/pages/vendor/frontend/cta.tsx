function FinalCTA() {
  return (
    <div className="relative bg-white py-24 overflow-hidden">
      {/* Luxury gold accent elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>

      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-5 bg-[url('/images/luxury-paper-texture.jpg')]"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center">
          {/* Gold divider */}
          <div className="flex justify-center mb-10">
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
          </div>

          <h2 className="font-serif text-4xl md:text-5xl text-gray-900 mb-6 leading-tight">
            <span className="font-light">Elevate Your Business with</span>
            <br />
            <span className="font-medium text-amber-600">
              Luxvana's Exclusive Network
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-12 font-light">
            Join the premier platform for luxury aviation partners and connect
            with elite clientele worldwide.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href="#application">
              <button className="group relative px-14 py-5 bg-gray-900 text-white font-medium tracking-wider uppercase hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl">
                <span className="relative z-10 flex items-center justify-center">
                  Apply Now
                  <svg
                    className="w-5 h-5 ml-3 transform group-hover:translate-x-2 transition-transform"
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
                <span className="absolute inset-0 bg-amber-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              </button>
            </a>

            <button className="group relative px-14 py-5 border-2 border-gray-900 text-gray-900 font-medium tracking-wider uppercase hover:border-amber-500 hover:text-amber-600 transition-all duration-300">
              <span className="relative z-10 flex items-center justify-center">
                Speak to Our Team
                <svg
                  className="w-5 h-5 ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
              </span>
              <span className="absolute inset-0 bg-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-col items-center">
            <div className="flex items-center text-xs text-gray-500 mb-4 tracking-widest">
              <svg
                className="w-4 h-4 mr-2 text-amber-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span>VENDOR SCREENING IN PROGRESS</span>
            </div>
            <p className="text-sm text-gray-500 max-w-md">
              Applications are reviewed within 48 hours. Limited positions
              remaining for Q3 onboarding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinalCTA;
