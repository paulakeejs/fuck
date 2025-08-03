import { motion } from "framer-motion";
import { Plane, Building2, Handshake } from "lucide-react";

const vendors = [
  {
    icon: <Plane className="text-[#C6A300] w-6 h-6" />,
    title: "Verified Jet Providers",
    description:
      "Premium charter and sales listings from verified aviation companies worldwide.",
  },
  {
    icon: <Building2 className="text-[#C6A300] w-6 h-6" />,
    title: "Global Charter Partners",
    description:
      "Reputable operators offering elite charter experiences across continents.",
  },
  {
    icon: <Handshake className="text-[#C6A300] w-6 h-6" />,
    title: "Private Deal Access",
    description:
      "Exclusive jets for discreet sales or private auctions through Luxvana.",
  },
];

function VendorsPartners() {
  return (
    <section className="bg-white py-20 px-6 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Trusted Vendors & Partners
          </h2>
          <div className="w-24 h-0.5 bg-[#C6A300] mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A curated network of licensed operators, jet owners, and luxury
            aviation companies.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {vendors.map((item, idx) => (
            <motion.div
              key={idx}
              className="group p-8 border border-gray-100 hover:border-gray-200 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-6 group-hover:text-[#C6A300] transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="/vendor"
            className="inline-block border border-[#C6A300] text-[#C6A300] px-8 py-2.5 text-sm tracking-wide hover:bg-[#C6A300] hover:text-white transition-colors duration-300"
          >
            Become a Vendor
          </a>
        </div>
      </div>
    </section>
  );
}

export default VendorsPartners;
