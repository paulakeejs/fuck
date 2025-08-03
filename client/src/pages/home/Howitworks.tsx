import { motion } from "framer-motion";
import { Plane, ShieldCheck, Crown } from "lucide-react";

function HowItWorks() {
  const steps = [
    {
      title: "Select Your Jet",
      desc: "Browse our curated fleet of elite aircraft listed by trusted aviation companies around the world.",
      icon: <Plane size={28} />,
      image:
        "https://images.pexels.com/photos/2446570/pexels-photo-2446570.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Book With Confidence",
      desc: "Reserve your private flight using secure crypto payments or traditional options—all encrypted, all seamless.",
      icon: <ShieldCheck size={28} />,
      image:
        "https://images.pexels.com/photos/5778550/pexels-photo-5778550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Fly Luxvana Style",
      desc: "Experience luxury from takeoff to landing. Red-carpet service, tailored for the golden few.",
      icon: <Crown size={28} />,
      image:
        "https://images.pexels.com/photos/5778703/pexels-photo-5778703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  return (
    <section className="bg-white py-28 px-6 md:px-16 text-[#1a1a1a]">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white"
        >
          How It Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl mb-16"
        >
          From discovery to destination, we've redefined private air travel for
          the modern elite.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative h-[500px] rounded-2xl overflow-hidden group shadow-xl"
            >
              <img
                src={step.image}
                alt={step.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading={index === 0 ? "eager" : "lazy"}
              />

              {/* Enhanced overlay with stronger gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.4 }}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-[#C6A300]/20 border border-[#C6A300] mb-4 mx-auto"
                >
                  <div className="text-[#C6A300]">{step.icon}</div>
                </motion.div>

                <motion.p
                  className="text-2xl font-bold text-gray-100 mb-3 drop-shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                >
                  {step.title}
                </motion.p>

                <motion.p
                  className="text-gray-100 text-base leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 + 0.6 }}
                >
                  {step.desc}
                </motion.p>
              </div>

              {/* Hover border accent */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#C6A300] transition-all duration-300 rounded-2xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
