import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://globaljet.aero/sites/default/files/2020-12/A318%20ELITE_LX-GJC_AFT%20Cabin_2_1.jpg"
        >
          <source
            src="https://globaljet.aero/sites/default/files/2020-12/Global%20Jet%20Film%201080.mov"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        {/* Hero Text */}
        <div className="max-w-5xl mt-32 mx-auto">
          <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto mb-12 font-light tracking-wide leading-relaxed">
            Experience the pinnacle of luxury travel with our bespoke private
            jet charter services. Where every journey becomes an extraordinary
            adventure.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/charter"
              className="group relative px-10 py-4 bg-white text-black uppercase tracking-widest text-sm font-medium hover:bg-gold-400 hover:text-white transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10">Book Your Flight</span>
              <div className="absolute inset-0 bg-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </Link>

            <Link
              to="/jets"
              className="px-10 py-4 border border-white/30 text-white uppercase tracking-widest text-sm font-medium hover:border-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              Explore Fleet
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-4">
          <div className="flex items-center space-x-8 text-white/70 text-sm">
            <span className="tracking-wider">24/7 AVAILABLE</span>
            <span className="tracking-wider">WORLDWIDE SERVICE</span>
            <span className="tracking-wider">LUXURY STANDARDS</span>
          </div>

          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a
              href="tel:+18005551234"
              className="text-white/70 hover:text-white text-sm tracking-wider transition-colors duration-300"
            >
              +1 800 555 1234
            </a>
            <a
              href="mailto:contact@luxvana.com"
              className="text-white/70 hover:text-white text-sm tracking-wider transition-colors duration-300"
            >
              contact@luxvana.com
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-pulse">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block">
        <div className="flex flex-col gap-6">
          {["Instagram", "LinkedIn", "Twitter"].map((social) => (
            <a
              key={social}
              href="#"
              className="text-white/50 hover:text-white text-xs tracking-widest uppercase transition-all duration-300 hover:translate-x-1"
            >
              {social}
            </a>
          ))}
        </div>
      </div>

      {/* Right Side Info */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block">
        <div className="text-right">
          <div className="text-white/50 text-xs tracking-widest uppercase mb-2">
            CERTIFIED
          </div>
          <div className="text-white text-sm tracking-wider">
            ARGUS PLATINUM
          </div>
          <div className="text-white text-sm tracking-wider">
            WYVERN WINGMAN
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
