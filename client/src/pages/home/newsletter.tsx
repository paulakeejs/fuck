import { Mail } from "lucide-react";

function Newsletter() {
  return (
    <section className="bg-white py-20 px-6 border-t border-b border-gray-100">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <Mail className="w-8 h-8 text-[#C6A300]" />
        </div>

        <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
          Jet Watchlist
        </h2>

        <p className="text-gray-500 max-w-md mx-auto mb-8 text-sm">
          First access to new jets and exclusive charter destinations.
        </p>

        <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 px-5 py-2.5 text-sm border border-gray-300 focus:border-[#C6A300] focus:outline-none transition-colors"
          />
          <button
            type="submit"
            className="px-6 py-2.5 text-sm bg-[#C6A300] text-white hover:bg-[#b59400] transition-colors"
          >
            Notify Me
          </button>
        </form>

        <p className="text-xs text-gray-400 mt-4">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

export default Newsletter;
