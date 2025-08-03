import { motion } from "framer-motion";

const services = [
  {
    title: "Private Jet Charters",
    description:
      "Exclusive jet charters tailored to your schedule, privacy preferences, and lifestyle.",
    image: "https://images.pexels.com/photos/3647693/pexels-photo-3647693.jpeg",
  },
  {
    title: "Bespoke In-Flight Experience",
    description:
      "From hand-selected wines to spa-level comfort, every detail is curated for your pleasure.",
    image: "https://images.pexels.com/photos/3220253/pexels-photo-3220253.jpeg",
  },
  {
    title: "Elite Ground-to-Air Coordination",
    description:
      "Luxury ground transport to fast-tracked boarding — seamless from residence to skies.",
    image:
      "https://images.pexels.com/photos/12700024/pexels-photo-12700024.jpeg",
  },
  {
    title: "Global Access, Discreet Travel",
    description:
      "Access to remote runways, island paradises, and international hubs with absolute discretion.",
    image: "https://images.pexels.com/photos/347151/pexels-photo-347151.jpeg",
  },
];

function WhatWeDo() {
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
            OUR SERVICES
          </h2>
          <div className="w-16 h-px bg-[#C6A300] mx-auto mb-6"></div>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm tracking-wider">
            Discreet, tailored aviation experiences for the discerning traveler
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              className="group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="relative h-[360px] overflow-hidden mb-6">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent"></div>
              </div>
              <div className="px-2">
                <h3 className="text-xl font-light tracking-wide mb-3 group-hover:text-[#C6A300] transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed tracking-wide">
                  {service.description}
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
          <button
            onClick={() => (window.location.href = "/charter")}
            className="border border-[#C6A300] text-[#C6A300] px-8 py-3 text-xs tracking-widest hover:bg-[#C6A300] hover:text-white transition-colors duration-500"
          >
            CHARTER JETS NOW
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default WhatWeDo;
