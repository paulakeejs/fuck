import { FiChevronRight, FiStar, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

interface JetCardProps {
  jet: {
    id: string;
    manufacturer: string;
    model: string;
    year: number;
    price?: string;
    hourlyRate?: string;
    exteriorImageUrls: string[];
    maxPassengers: number;
    amenities: string[];
    sponsoredType?: string;
  };
  type: "for-sale" | "for-charter";
}

export default function JetCard({ jet, type }: JetCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-48 bg-gray-100">
        {jet.exteriorImageUrls?.length > 0 ? (
          <img
            src={jet.exteriorImageUrls[0]}
            alt={`${jet.manufacturer} ${jet.model}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Image not available
          </div>
        )}
        {jet.sponsoredType && (
          <div className="absolute top-3 left-3 bg-amber-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
            <FiStar className="mr-1" />
            {jet.sponsoredType}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-light text-gray-900">
              {jet.manufacturer}{" "}
              <span className="font-medium">{jet.model}</span>
            </h3>
            <p className="text-gray-500">{jet.year}</p>
          </div>
          <div className="flex items-center text-sm bg-gray-100 px-2 py-1 rounded">
            <FiUser className="mr-1 text-gray-500" />
            <span>{jet.maxPassengers}</span>
          </div>
        </div>

        {/* Price */}
        <div className="my-4">
          {type === "for-sale" ? (
            <p className="text-2xl font-light text-amber-600">
              {jet.price
                ? new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(parseInt(jet.price))
                : "Price on request"}
            </p>
          ) : (
            <p className="text-2xl font-light text-amber-600">
              {jet.hourlyRate
                ? `${new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(parseInt(jet.hourlyRate))}/hour`
                : "Rate on request"}
            </p>
          )}
        </div>

        {/* Amenities */}
        <div className="mb-5">
          <div className="flex flex-wrap gap-2">
            {jet.amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
              >
                {amenity}
              </span>
            ))}
            {jet.amenities.length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                +{jet.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Button */}
        <Link
          to={`/jets/${type === "for-sale" ? "sale" : "charter"}/${jet.id}`}
          className="w-full flex items-center justify-between px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <span>View details</span>
          <FiChevronRight />
        </Link>
      </div>
    </div>
  );
}
