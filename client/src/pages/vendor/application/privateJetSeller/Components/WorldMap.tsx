import React, { useState } from "react";

interface Airport {
  name: string;
  city: string;
  country: string;
  code: string;
  coordinates: { x: number; y: number };
}

const airports: Airport[] = [
  {
    name: "John F. Kennedy International",
    city: "New York",
    country: "USA",
    code: "JFK",
    coordinates: { x: 23, y: 35 },
  },
  {
    name: "London Heathrow",
    city: "London",
    country: "UK",
    code: "LHR",
    coordinates: { x: 47, y: 32 },
  },
  {
    name: "Dubai International",
    city: "Dubai",
    country: "UAE",
    code: "DXB",
    coordinates: { x: 60, y: 45 },
  },
  {
    name: "Hong Kong International",
    city: "Hong Kong",
    country: "China",
    code: "HKG",
    coordinates: { x: 78, y: 45 },
  },
  {
    name: "Narita International",
    city: "Tokyo",
    country: "Japan",
    code: "NRT",
    coordinates: { x: 85, y: 40 },
  },
  {
    name: "Charles de Gaulle",
    city: "Paris",
    country: "France",
    code: "CDG",
    coordinates: { x: 48, y: 35 },
  },
  {
    name: "Singapore Changi",
    city: "Singapore",
    country: "Singapore",
    code: "SIN",
    coordinates: { x: 75, y: 55 },
  },
  {
    name: "Los Angeles International",
    city: "Los Angeles",
    country: "USA",
    code: "LAX",
    coordinates: { x: 15, y: 40 },
  },
];

export const WorldMap: React.FC = () => {
  const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);

  return (
    <div className="relative w-full h-full">
      {/* High-end map background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589519160732-57fc498494f8?ixlib=rb-4.0.3')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Airport Markers */}
      {airports.map((airport) => (
        <div
          key={airport.code}
          className="absolute"
          style={{
            left: `${airport.coordinates.x}%`,
            top: `${airport.coordinates.y}%`,
          }}
          onMouseEnter={() => setSelectedAirport(airport)}
          onMouseLeave={() => setSelectedAirport(null)}
        >
          <div className="relative group">
            <div className="w-3 h-3 bg-orange-500 rounded-full shadow-lg shadow-orange-500/50 group-hover:scale-150 transition-transform duration-300" />
            {selectedAirport?.code === airport.code && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black text-white text-xs px-3 py-1.5 rounded whitespace-nowrap">
                <p className="font-medium">{airport.name}</p>
                <p className="text-white/70">{airport.code}</p>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Airport Info Panel */}
      <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur p-6 max-w-md shadow-lg">
        <p className="text-xl font-light mb-4">Global Network</p>
        <div className="grid grid-cols-2 gap-4">
          {airports.slice(0, 6).map((airport) => (
            <div
              key={airport.code}
              className={`flex items-center gap-3 p-3 transition-colors ${
                selectedAirport?.code === airport.code ? "bg-orange-50" : ""
              }`}
              onMouseEnter={() => setSelectedAirport(airport)}
              onMouseLeave={() => setSelectedAirport(null)}
            >
              <div className="h-8 w-8 bg-orange-500 text-white flex items-center justify-center text-xs rounded">
                {airport.code}
              </div>
              <div>
                <p className="font-medium text-sm">{airport.city}</p>
                <p className="text-xs text-black/60">{airport.country}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
