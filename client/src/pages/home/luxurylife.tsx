import { motion } from "framer-motion";

const lifestyleItems = [
  {
    title: "Gourmet Dining Above the Clouds",
    description:
      "Five-star meals curated by renowned chefs, personalized to your taste.",
    image: "https://images.pexels.com/photos/8105060/pexels-photo-8105060.jpeg",
  },
  {
    title: "Elite Ground Transfers",
    description: "Chauffeur-driven luxury cars await at every terminal.",
    image:
      "https://images.pexels.com/photos/31511543/pexels-photo-31511543.jpeg",
  },
  {
    title: "Private Island Escapes",
    description:
      "Touch down where the world can't reach — exclusive islands, serene waters.",
    image: "https://images.pexels.com/photos/1020016/pexels-photo-1020016.jpeg",
  },
  {
    title: "Tailored In-Flight Experience",
    description:
      "From scent to lighting, every detail is tuned to your preferences.",
    image:
      "https://images.pexels.com/photos/17377677/pexels-photo-17377677.jpeg",
  },
];

function LuxuryLifestyle() {
  return (
    <section className="bg-white py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-4">
            THE LUXVANA LIFESTYLE
          </h2>
          <div className="w-16 h-px bg-[#C6A300] mx-auto mb-6"></div>
          <p className="text-gray-500 max-w-md mx-auto text-sm tracking-wider">
            Beyond travel — a curated existence for the discerning few
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {lifestyleItems.map((item, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="relative h-[400px] overflow-hidden mb-6">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent"></div>
              </div>
              <div className="px-2">
                <h3 className="text-xl font-light tracking-wide mb-3 group-hover:text-[#C6A300] transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed tracking-wide">
                  {item.description}
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
            EXPLORE FURTHER
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default LuxuryLifestyle;
