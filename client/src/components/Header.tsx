import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const navLinks = [
  { name: "Jets", path: "/jets" },
  { name: "Charter", path: "/charter" },
  { name: "Blog", path: "/blog" },
  { name: "Helicopters", path: "/helicopters" },
  { name: "Cars", path: "/cars" },
  { name: "Destinations", path: "/destinations" },
  { name: "Events", path: "/events" },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const walletButtonRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const triggerWalletConnect = () => {
    if (walletButtonRef.current) {
      const walletButton = walletButtonRef.current.querySelector("button");
      if (walletButton) {
        walletButton.click();
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  // Determine if we should show transparent background
  const { id } = useParams();
  const isHomeRoute =
    location.pathname === "/" ||
    "/jets" ||
    "/jets/listings" ||
    "/jets/listings/" + id;
  const shouldBeWhite = !isHomeRoute || isScrolled;

  return (
    <>
      {/* Minimal Header Bar */}
      <header
        className={`fixed top-0 left-0 w-full z-[9999999] transition-all duration-300 ${
          shouldBeWhite ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          {/* Hamburger Menu Icon */}
          <button
            className={`z-50 focus:outline-none transition-colors duration-300 ${
              shouldBeWhite ? "text-gray-800" : "text-white"
            }`}
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Centered Logo (background element) */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div
              onClick={() => navigate("/")}
              className="flex flex-col leading-tight cursor-pointer z-30"
            >
              <p
                className={`font-bold tracking-widest transition-colors duration-300 text-lg sm:text-2xl md:text-3xl lg:text-4xl ${
                  shouldBeWhite
                    ? "text-gray-800 text-opacity-80"
                    : "text-white text-opacity-20"
                }`}
              >
                LUXVANA
              </p>
              <span
                className={`tracking-widest text-center transition-colors duration-300 text-xs sm:text-sm ${
                  shouldBeWhite
                    ? "text-gray-800 text-opacity-80"
                    : "text-white text-opacity-20"
                }`}
              >
                INTERNATIONAL
              </span>
            </div>
          </div>

          {/* Wallet Connect - Hidden on mobile, visible on desktop */}
          <div className="z-50">
            {/* Mobile Wallet Icon */}
            <button
              onClick={triggerWalletConnect}
              className={`sm:hidden focus:outline-none transition-colors duration-300 ${
                shouldBeWhite ? "text-gray-800" : "text-white"
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>

            {/* Desktop Wallet Button */}
            <div ref={walletButtonRef} className="hidden sm:block">
              <WalletMultiButton
                className={`
                  wallet-multi-button 
                  px-3 py-1.5 sm:px-4 sm:py-2 md:px-5
                  text-xs sm:text-sm tracking-widest uppercase 
                  rounded-none
                  border transition-all duration-300
                  backdrop-blur-sm
                  ${
                    shouldBeWhite
                      ? "bg-gray-800 text-white border-gray-800 hover:bg-gray-700"
                      : "bg-white bg-opacity-10 text-white border-white border-opacity-30 hover:bg-opacity-20"
                  }
                `}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-95 z-40 transition-all duration-500 ease-in-out ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="h-full w-full flex flex-col items-center justify-center px-4">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Menu Links */}
          <nav className="flex flex-col items-center gap-6 sm:gap-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                onClick={toggleMenu}
                className="relative text-xl sm:text-2xl md:text-3xl uppercase tracking-widest text-white hover:text-yellow-400 transition-colors duration-300 text-center"
              >
                {link.name}
                <span className="absolute left-0 -bottom-2 h-0.5 w-0 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Subtle Footer */}
          <div className="absolute bottom-4 sm:bottom-8 text-white text-opacity-50 text-xs sm:text-sm tracking-widest text-center px-4">
            LUXURY REDEFINED
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
