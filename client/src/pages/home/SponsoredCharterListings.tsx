import { FiSearch, FiMapPin, FiCalendar, FiUsers } from "react-icons/fi";

export default function SponsoredCharterListings() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-light text-gray-900 mb-3">
          Private Jet Charter
        </h2>
        <div className="w-16 h-px bg-gray-200 mx-auto mb-6"></div>
        <p className="text-gray-500 max-w-md mx-auto">
          Search for available aircraft in our premium fleet
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Departure */}
          <div className="space-y-1">
            <label className="text-xs text-gray-500 uppercase tracking-wider">
              From
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="City or airport"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300"
              />
              <FiMapPin className="absolute right-3 top-3.5 text-gray-400" />
            </div>
          </div>

          {/* Destination */}
          <div className="space-y-1">
            <label className="text-xs text-gray-500 uppercase tracking-wider">
              To
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="City or airport"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300"
              />
              <FiMapPin className="absolute right-3 top-3.5 text-gray-400" />
            </div>
          </div>

          {/* Date */}
          <div className="space-y-1">
            <label className="text-xs text-gray-500 uppercase tracking-wider">
              Date
            </label>
            <div className="relative">
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 text-gray-700"
              />
              <FiCalendar className="absolute right-3 top-3.5 text-gray-400" />
            </div>
          </div>

          {/* Passengers */}
          <div className="space-y-1">
            <label className="text-xs text-gray-500 uppercase tracking-wider">
              Passengers
            </label>
            <div className="relative">
              <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 appearance-none text-gray-700">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "person" : "people"}
                  </option>
                ))}
              </select>
              <FiUsers className="absolute right-3 top-3.5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Search Button */}
        <button className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
          <FiSearch />
          <span>Search flights</span>
        </button>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-6">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCalendar className="text-gray-600" />
          </div>
          <h3 className="font-medium mb-2">Flexible scheduling</h3>
          <p className="text-gray-500 text-sm">Fly on your schedule</p>
        </div>

        <div className="p-6">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiUsers className="text-gray-600" />
          </div>
          <h3 className="font-medium mb-2">Private experience</h3>
          <p className="text-gray-500 text-sm">Just you and your guests</p>
        </div>

        <div className="p-6">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiMapPin className="text-gray-600" />
          </div>
          <h3 className="font-medium mb-2">Global access</h3>
          <p className="text-gray-500 text-sm">5,000+ airports worldwide</p>
        </div>
      </div>
    </section>
  );
}
