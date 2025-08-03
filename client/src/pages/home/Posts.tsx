import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const posts = [
  {
    title: "5 Destinations Best Experienced by Private Jet",
    slug: "private-jet-destinations",
    image: "https://images.pexels.com/photos/2245276/pexels-photo-2245276.jpeg",
  },
  {
    title: "What to Expect on Your First Luxvana Charter",
    slug: "first-luxvana-charter",
    image: "https://images.pexels.com/photos/6700121/pexels-photo-6700121.jpeg",
  },
  {
    title: "The Future of Private Aviation in 2025",
    slug: "future-of-private-aviation",
    image:
      "https://images.pexels.com/photos/30133549/pexels-photo-30133549.jpeg",
  },
];

function BlogSection() {
  return (
    <section className="bg-white py-32 px-6 md:px-12 text-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-light tracking-wider"
          >
            THE JOURNAL
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-gray-500 max-w-md mx-auto mt-4 text-sm tracking-widest"
          >
            Curated perspectives on the art of private travel
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative h-80 overflow-hidden mb-6">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>
              <h3 className="text-lg font-light tracking-wide mb-2 group-hover:text-[#C6A300] transition-colors duration-500">
                {post.title}
              </h3>
              <Link
                to={`/journal/${post.slug}`}
                className="text-xs text-gray-500 tracking-widest hover:text-[#C6A300] transition-colors duration-500 flex items-center"
              >
                READ ARTICLE
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            to="/journal"
            className="inline-block border-b border-[#C6A300] text-[#C6A300] text-xs tracking-widest pb-1 hover:opacity-80 transition-opacity duration-300"
          >
            VIEW ALL ARTICLES
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default BlogSection;
