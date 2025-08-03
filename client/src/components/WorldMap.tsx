import React from "react";

// Since we're having issues with react-simple-maps, let's create a simpler placeholder
export const WorldMap: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-gray-900">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-2xl font-light mb-4">Global Network</p>
          <p className="text-sm opacity-70">Interactive map coming soon</p>
        </div>
      </div>
      {/* Add static markers for key locations */}
      <div className="absolute bottom-8 left-8 bg-white p-6 max-w-md">
        <p className="text-xl font-light mb-4">Key Locations</p>
        <div className="grid gap-4">
          {[
            { city: "New York", country: "USA", code: "JFK" },
            { city: "London", country: "UK", code: "LHR" },
            { city: "Dubai", country: "UAE", code: "DXB" },
            { city: "Hong Kong", country: "China", code: "HKG" },
          ].map((location) => (
            <div key={location.code} className="flex items-center gap-4">
              <div className="h-8 w-8 bg-orange-500 text-white flex items-center justify-center text-xs">
                {location.code}
              </div>
              <div>
                <p className="font-medium">{location.city}</p>
                <p className="text-sm text-black/60">{location.country}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
