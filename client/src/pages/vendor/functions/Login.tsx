import { useEffect, useState } from "react";
import { Lock, Mail, Eye, EyeOff, XCircle } from "lucide-react";
import axiosInstance from "@/lib/api";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

const LuxuryLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mainLoad, setMainLoad] = useState(true);
  const [serverMsg, setServerMsg] = useState("");
  const [checkSuccess, setCheckSuccess] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Mapping of service types to redirect URLs
  const serviceTypeRoutes: { [key: string]: string } = {
    jet_sales: "/app/",
    jet_charter: "/program",
    broker: "/broker",
    helicopter_broker: "/h-broker",
    luxury_hotels: "/l-h",
    car_rental: "/lux",
  };

  const checkUser = async () => {
    try {
      const response = await axiosInstance.get("/vendor/user/" + id);
      if (response.data.success) {
        setCheckSuccess(true);
      } else {
        setServerMsg(response.data.message || "User verification failed");
      }
    } catch (error: any) {
      setServerMsg(
        error.response?.data?.message ||
          error.message ||
          "An error occurred while verifying your account"
      );
    } finally {
      setMainLoad(false);
    }
  };

  useEffect(() => {
    if (id) {
      checkUser();
    } else {
      setServerMsg("No user ID provided");
      setMainLoad(false);
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axiosInstance.post(
        "/vendor/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        sessionStorage.setItem("isAuthenticated", "true");
        toast.success("Welcome back!");

        // Get the serviceType from the response
        const serviceType = response.data.data;

        // Determine the redirect URL based on serviceType
        const redirectUrl =
          serviceType && serviceTypeRoutes[serviceType]
            ? serviceTypeRoutes[serviceType]
            : "/";

        navigate(redirectUrl);
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Login failed. Please try again."
      );
      if (error.response?.status === 401) {
        setPassword("");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Rest of the component remains unchanged
  if (mainLoad) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center p-8 rounded-xl shadow-lg border border-gray-100 bg-white/90">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-amber-400/70 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-amber-600/70 border-t-transparent rounded-full animate-spin animation-delay-200"></div>
          </div>
          <h3 className="text-xl font-serif text-gray-800 mb-2">
            Verifying Your Account
          </h3>
          <p className="text-gray-500 text-sm">
            Please wait while we authenticate your details
          </p>
        </div>
      </div>
    );
  }

  if (!checkSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100 text-center">
            <div className="mx-auto mb-6">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto">
                <XCircle className="w-8 h-8 text-red-500" strokeWidth={1.8} />
              </div>
            </div>
            <h1 className="text-2xl font-serif font-light text-gray-800 mb-3">
              Verification Failed
            </h1>
            <p className="text-gray-600 mb-6">
              {serverMsg || "We couldn't verify your account details"}
            </p>
            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 tracking-widest">
                LUXURY AUTHENTICATION
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-14 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center">
                <Lock className="h-6 w-6 text-amber-600" strokeWidth={1.8} />
              </div>
            </div>
            <h1 className="text-3xl font-serif font-light text-gray-800 mb-2 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-gray-500 font-light">
              Please enter your credentials
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-b border-gray-300 focus:border-amber-500 outline-none bg-transparent transition-colors placeholder-gray-400"
                  placeholder="your@email.com"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border-b border-gray-300 focus:border-amber-500 outline-none bg-transparent transition-colors placeholder-gray-400"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-amber-500 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="/forgot-password"
                  className="font-medium text-amber-600 hover:text-amber-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all ${
                  isLoading ? "opacity-80 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <span className="inline-flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <a
                href="/register"
                className="font-medium text-amber-600 hover:text-amber-500"
              >
                Get started
              </a>
            </p>
            <p className="mt-4 text-xs text-gray-400 tracking-widest">
              LUXURY AUTHENTICATION
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuxuryLoginPage;
