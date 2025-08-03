import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import hApi from "../pages/vendor/Helicopter/HApi";

interface SourceHelicopterModalProps {
  isOpen: boolean;
  onClose: () => void;
  helicopterName: string;
  vendorId: string;
  listingId: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  budget: string;
  timeline: string;
  requirements: string;
}

function SourceHelicopterModal({
  isOpen,
  onClose,
  helicopterName,
  vendorId,
  listingId,
}: SourceHelicopterModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await hApi.post("/inquiries/source", {
        ...data,
        vendorId,
        listingId,
        type: "SOURCE_SIMILAR",
      });

      if (response.data.success) {
        toast.success("Request Submitted", {
          description:
            "We will contact you shortly with similar helicopter options.",
        });
        reset();
        onClose();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      toast.error("Failed to submit request", {
        description: error.message,
      });
    }
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
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold text-gray-900 mb-2"
                >
                  Source Similar Helicopter
                </Dialog.Title>
                <p className="text-gray-600 mb-6">
                  The {helicopterName} you're interested in has been sold. Fill
                  out this form and we'll help you find similar options that
                  match your requirements.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        {...register("phone")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Budget Range
                      </label>
                      <select
                        {...register("budget", {
                          required: "Budget range is required",
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select budget range</option>
                        <option value="Under $1M">Under $1M</option>
                        <option value="$1M - $3M">$1M - $3M</option>
                        <option value="$3M - $5M">$3M - $5M</option>
                        <option value="$5M - $10M">$5M - $10M</option>
                        <option value="Over $10M">Over $10M</option>
                      </select>
                      {errors.budget && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.budget.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Purchase Timeline
                    </label>
                    <select
                      {...register("timeline", {
                        required: "Timeline is required",
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select timeline</option>
                      <option value="Immediate">Immediate</option>
                      <option value="1-3 months">1-3 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="6-12 months">6-12 months</option>
                      <option value="Over 12 months">Over 12 months</option>
                    </select>
                    {errors.timeline && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.timeline.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Specific Requirements
                    </label>
                    <textarea
                      {...register("requirements", {
                        required: "Requirements are required",
                      })}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Please describe your specific requirements (e.g., seating capacity, range, features)"
                    />
                    {errors.requirements && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.requirements.message}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium rounded-lg text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 font-medium rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Request"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default SourceHelicopterModal;
