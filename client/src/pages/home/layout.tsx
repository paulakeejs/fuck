import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

function HomeLayout() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("acceptedTerms");
    if (!hasAccepted) {
      setShowPopup(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("acceptedTerms", "true");
    setShowPopup(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {showPopup && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 border border-gray-100 shadow-xl">
            {/* Luxvana International Logo */}
            <div className="flex flex-col items-center mb-6">
              <h1 className="text-2xl font-serif font-medium tracking-wider text-gray-900">
                LUXVANA
              </h1>
              <div className="h-px w-12 bg-amber-500 my-2"></div>
              <p className="text-xs tracking-widest text-gray-500">
                INTERNATIONAL
              </p>
            </div>

            <h2 className="text-xl font-serif font-normal mb-4 text-gray-800">
              Welcome to Our Platform
            </h2>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed">
              By continuing, you agree to our Terms of Service and Privacy
              Policy.
            </p>
            <button
              onClick={handleAccept}
              className="w-full bg-gray-900 text-white px-6 py-3 rounded-md text-xs uppercase tracking-widest
               hover:bg-gray-800 transition-colors duration-300"
            >
              Accept & Continue
            </button>
          </div>
        </div>
      )}
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default HomeLayout;
