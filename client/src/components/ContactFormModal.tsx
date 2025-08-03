import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import hApi from "@/pages/vendor/Helicopter/HApi";
import { toast } from "sonner";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "buy" | "contact" | "source";
  helicopterName: string;
  vendorId: string;
  listingId: string;
}

const initialFormData = {
  name: "",
  email: "",
  country: "",
  message: "",
};

export default function ContactFormModal({
  isOpen,
  onClose,
  type,
  helicopterName,
  vendorId,
  listingId,
}: ContactFormModalProps) {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal is opened
  useEffect(() => {
    if (isOpen) {
      setFormData(initialFormData);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await hApi.post("/contact", {
        customerName: formData.name,
        customerEmail: formData.email,
        customerCountry: formData.country || null, // Handle optional field
        message: formData.message,
        type,
        helicopterName,
        vendorId,
        listingId,
        timestamp: new Date().toISOString(),
      });
      if (response.data.success) {
        toast("Message sent successfully");
      } else throw new Error("Failed to submit");

      setFormData(initialFormData);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden bg-white p-8 shadow-2xl transition-all border border-black/10">
                <div className="flex items-center justify-between mb-8">
                  <Dialog.Title className="text-3xl font-light text-black tracking-wide">
                    {type === "buy"
                      ? "Purchase Inquiry"
                      : type === "source"
                      ? "Source Similar Aircraft"
                      : "Contact"}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-black hover:text-orange-500 transition-colors"
                  >
                    <IoClose size={28} />
                  </button>
                </div>

                <p className="text-black/60 mb-8 font-light">
                  {type === "buy"
                    ? `Inquire about ${helicopterName}`
                    : type === "source"
                    ? `Find similar to ${helicopterName}`
                    : `Discuss ${helicopterName}`}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/5 border-b-2 border-transparent focus:border-orange-500 outline-none transition-all placeholder:text-black/40 text-black font-light"
                      placeholder="Full Name"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/5 border-b-2 border-transparent focus:border-orange-500 outline-none transition-all placeholder:text-black/40 text-black font-light"
                      placeholder="Email Address"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="country"
                      id="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/5 border-b-2 border-transparent focus:border-orange-500 outline-none transition-all placeholder:text-black/40 text-black font-light"
                      placeholder="Country (Optional)"
                    />
                  </div>

                  <div>
                    <textarea
                      name="message"
                      id="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-black/5 border-b-2 border-transparent focus:border-orange-500 outline-none transition-all placeholder:text-black/40 text-black font-light resize-none"
                      placeholder="Your Message"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white py-4 font-light text-lg hover:bg-orange-500 transition-all duration-300 disabled:opacity-50 disabled:hover:bg-black"
                  >
                    {isSubmitting
                      ? "Sending..."
                      : type === "buy"
                      ? "Submit Inquiry"
                      : type === "source"
                      ? "Submit Request"
                      : "Send Message"}
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
