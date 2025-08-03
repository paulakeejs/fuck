import { Instagram, Twitter, Mail, Phone } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-[#f8f5f0] border-t border-gray-200 px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Luxury Brand Column */}
          <div className="md:col-span-2">
            <div className="flex flex-col items-start mb-6">
              <h3 className="text-2xl font-serif font-medium text-gray-900 tracking-wider mb-2">
                LUXVANA
              </h3>
              <div className="w-12 h-px bg-amber-500 mb-4"></div>
              <span className="text-xs tracking-[0.3em] text-gray-500">
                INTERNATIONAL
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed max-w-md font-light">
              The premier platform for private aviation connoisseurs, offering
              unparalleled access to the world's most exclusive aircraft and
              experiences.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs font-medium tracking-widest text-gray-500 uppercase mb-6">
              EXPLORE
            </h4>
            <ul className="space-y-4">
              {[
                "Jets for Sale",
                "Charter a Jet",
                "Global Destinations",
                "Aircraft Valuation",
                "Jet Management",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-amber-600 transition-colors duration-300 font-light flex items-center"
                  >
                    <span className="w-2 h-px bg-amber-500 mr-3 transition-all duration-300 group-hover:w-4"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-medium tracking-widest text-gray-500 uppercase mb-6">
              COMPANY
            </h4>
            <ul className="space-y-4">
              {[
                "Our Heritage",
                "Partnerships",
                "Press Center",
                "Executive Team",
                "Career Opportunities",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-amber-600 transition-colors duration-300 font-light flex items-center"
                  >
                    <span className="w-2 h-px bg-amber-500 mr-3 transition-all duration-300 group-hover:w-4"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-medium tracking-widest text-gray-500 uppercase mb-6">
              CONTACT
            </h4>
            <ul className="space-y-4 text-gray-600 font-light">
              <li className="flex items-start gap-3 hover:text-amber-600 transition-colors duration-300">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>contact@luxvana.com</span>
              </li>
              <li className="flex items-start gap-3 hover:text-amber-600 transition-colors duration-300">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>+1 (000) 000-0000</span>
              </li>
              <li className="pt-4">
                <div className="flex gap-5">
                  <a
                    href="#"
                    className="hover:text-amber-600 transition-colors duration-300"
                    aria-label="Instagram"
                  >
                    <Instagram size={18} />
                  </a>
                  <a
                    href="#"
                    className="hover:text-amber-600 transition-colors duration-300"
                    aria-label="Twitter"
                  >
                    <Twitter size={18} />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-12"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-xs text-gray-500 tracking-widest mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} LUXVANA INTERNATIONAL. ALL RIGHTS
            RESERVED.
          </div>
          <div className="flex gap-8">
            <a
              href="#"
              className="text-xs text-gray-500 hover:text-amber-600 transition-colors duration-300 tracking-widest"
            >
              PRIVACY POLICY
            </a>
            <a
              href="#"
              className="text-xs text-gray-500 hover:text-amber-600 transition-colors duration-300 tracking-widest"
            >
              TERMS OF SERVICE
            </a>
            <a
              href="#"
              className="text-xs text-gray-500 hover:text-amber-600 transition-colors duration-300 tracking-widest"
            >
              COOKIE POLICY
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
