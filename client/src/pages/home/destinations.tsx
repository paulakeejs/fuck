import { motion } from "framer-motion";

const destinations = [
  {
    name: "Mykonos",
    country: "Greece",
    image:
      "https://images.pexels.com/photos/16027598/pexels-photo-16027598.jpeg",
    description: "Chic blend of sun, sea, and luxury villas",
  },
  {
    name: "Dubai",
    country: "UAE",
    image:
      "https://images.pexels.com/photos/13467903/pexels-photo-13467903.jpeg",
    description: "Skyscrapers, shopping, and desert dreams",
  },
  {
    name: "Maldives",
    country: "",
    image:
      "https://images.pexels.com/photos/27980191/pexels-photo-27980191.jpeg",
    description: "Turquoise waters and overwater serenity",
  },
  {
    name: "Aspen",
    country: "USA",
    image:
      "https://images.pexels.com/photos/15552227/pexels-photo-15552227.jpeg",
    description: "Elite skiing and exclusive winter retreats",
  },
  {
    name: "Paris",
    country: "France",
    image: "https://images.pexels.com/photos/1223650/pexels-photo-1223650.jpeg",
    description: "Luxury fashion, fine dining, timeless romance",
  },
  {
    name: "St. Barts",
    country: "",
    image:
      "https://images.pexels.com/photos/10611879/pexels-photo-10611879.jpeg",
    description: "Jet-set heaven with Caribbean charm",
  },
];

function Destinations() {
  return (
    <section className="bg-white py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-4">
            CURATED DESTINATIONS
          </h2>
          <div className="w-16 h-px bg-[#C6A300] mx-auto mb-6"></div>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm tracking-wider">
            The world's most exclusive locations, accessible only through
            Luxvana
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {destinations.map((dest, idx) => (
            <motion.div
              key={idx}
              className="group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="relative h-80 overflow-hidden mb-4">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
              </div>
              <div className="px-2">
                <h3 className="text-xl font-light tracking-wide">
                  {dest.name}
                  {dest.country && (
                    <span className="text-gray-500">, {dest.country}</span>
                  )}
                </h3>
                <p className="text-gray-500 text-sm tracking-wide mt-1">
                  {dest.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <button className="border border-[#C6A300] text-[#C6A300] px-8 py-3 text-xs tracking-widest hover:bg-[#C6A300] hover:text-white transition-colors duration-500">
            REQUEST ITINERARY
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default Destinations;
