import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";

function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "404 - Page Not Found | Luxvana";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating abstract shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-indigo-100 opacity-15 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-96 h-96 rounded-full bg-purple-100 opacity-10 blur-3xl"></div>
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10 bg-white rounded-2xl shadow-sm p-8 sm:p-12 border border-gray-100">
        {/* Minimalist compass icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center shadow-inner">
            <Compass
              size={48}
              className="text-blue-500 animate-spin-slow"
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* 404 Heading */}
        <h1 className="text-7xl sm:text-8xl font-light text-gray-800 mb-4 tracking-tight">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-normal text-gray-600 mb-6">
          Navigation Error
        </h2>
        <p className="text-gray-500 mb-10 max-w-md mx-auto text-base leading-relaxed">
          The coordinates you've entered don't match any known destination.
          Please recalibrate your navigation system or return to base.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Go back"
          >
            <ArrowLeft size={18} className="mr-2" />
            Go Back
          </button>
          <Link
            to="/jets"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Return to listings"
          >
            Return to Listings
          </Link>
        </div>

        {/* Subtle decorative elements */}
        <div className="mt-12 flex justify-center space-x-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-gray-300 opacity-40"
              style={{ animation: `pulse 2s ease-in-out infinite ${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.3); opacity: 0.8; }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default NotFoundPage;
