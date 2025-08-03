import { motion } from "framer-motion";
import { ShieldCheck, Globe2, UserCheck, Gem } from "lucide-react";

const features = [
  {
    title: "Uncompromised Privacy",
    description:
      "Discreet bookings and private terminals ensure your peace of mind.",
    icon: <ShieldCheck className="w-6 h-6" />,
    image: "https://images.pexels.com/photos/236070/pexels-photo-236070.jpeg",
  },
  {
    title: "Global Reach",
    description:
      "Access 5,000+ destinations worldwide, from business hubs to secluded islands.",
    icon: <Globe2 className="w-6 h-6" />,
    image:
      "https://images.pexels.com/photos/10875890/pexels-photo-10875890.jpeg",
  },
  {
    title: "Bespoke Luxury",
    description: "Cabins tailored to your exact preferences and tastes.",
    icon: <Gem className="w-6 h-6" />,
    image: "https://images.pexels.com/photos/5778600/pexels-photo-5778600.jpeg",
  },
  {
    title: "Elite Safety",
    description: "Top-rated operators and certified pilots for your security.",
    icon: <UserCheck className="w-6 h-6" />,
    image:
      "https://images.pexels.com/photos/16691890/pexels-photo-16691890.jpeg",
  },
];

function WhyFlyWithUs() {
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
            WHY LUXVANA
          </h2>
          <div className="w-16 h-px bg-[#C6A300] mx-auto mb-6"></div>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm tracking-wider">
            The art of private aviation, perfected
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="relative h-[360px] overflow-hidden mb-8">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent"></div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 flex items-center justify-center rounded-full border border-[#C6A300] mr-6 text-[#C6A300]">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-light tracking-wide mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed tracking-wide">
                    {feature.description}
                  </p>
                </div>
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
            onClick={() => (window.location.href = "/blog")}
            className="border border-[#C6A300] text-[#C6A300] px-8 py-3 text-xs tracking-widest hover:bg-[#C6A300] hover:text-white transition-colors duration-500"
          >
            EXPERIENCE THE DIFFERENCE
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default WhyFlyWithUs;
