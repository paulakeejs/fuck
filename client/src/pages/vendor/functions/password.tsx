import React, { useEffect, useState } from "react";
import { Lock, Eye, EyeOff, Check, X } from "lucide-react";
import { useParams } from "react-router-dom";
import axiosInstance from "@/lib/api";
import { toast } from "sonner";

const CreatePasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errMsg] = useState("");
  const { id } = useParams();

  const checkUser = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/vendor/user/${id}`);
      if (!response.data.success) {
        localStorage.removeItem("token");
        sessionStorage.removeItem("signedAuth");
        window.location.href = "/";
        return;
      }
      setLoading(false);
    } catch (error: any) {
      console.error("Authentication check failed:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        sessionStorage.removeItem("signedAuth");
        window.dispatchEvent(new CustomEvent("auth-required"));
      } else {
        window.location.href = "/";
      }
    }
  };

  useEffect(() => {
    if (id) checkUser();
    else window.location.href = "/";
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post(`/vendor/set/password/${id}`, {
        password,
      });
      if (response.data.success) {
        setSuccess(true);
        toast.success("Password set successfully");
        setTimeout(() => {
          window.location.href = "/vendor/login/" + id;
        }, 3000);
      }
      if (!response.data.success) {
        toast(response.data.message);
      }
    } catch (error: any) {
      setError(true);
      toast(error.data?.message || "Failed to set password");

      setTimeout(() => {
        setError(false);
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center p-8 rounded-xl shadow-lg border border-gray-100 bg-white/90">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-amber-400/70 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-amber-600/70 border-t-transparent rounded-full animate-spin animation-delay-200"></div>
          </div>
          <h3 className="text-xl font-serif text-gray-800 mb-2">
            Verifying Credentials
          </h3>
          <p className="text-gray-500 text-sm">
            Securely authenticating your details
          </p>
          <div className="mt-8 pt-6 border-t border-gray-100/50">
            <p className="text-xs text-gray-400/80 tracking-widest">
              LUXVANA INTERNATIONAL
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100 w-full max-w-md text-center">
          <div className="mx-auto mb-6">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-green-500" strokeWidth={2} />
            </div>
          </div>
          <h3 className="text-2xl font-serif text-gray-800 mb-3">
            Password Set
          </h3>
          <p className="text-gray-600 mb-6">
            Your new password has been successfully saved. Redirecting...
          </p>
          <div className="pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 tracking-widest">
              LUXVANA SECURE ACCESS
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100 w-full max-w-md text-center">
          <div className="mx-auto mb-6">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto">
              <X className="w-8 h-8 text-red-500" strokeWidth={2} />
            </div>
          </div>
          <h3 className="text-2xl font-serif text-gray-800 mb-3">
            Error Occurred
          </h3>
          <p className="text-gray-600 mb-6">
            {errMsg || "Failed to set password. Please try again."}
          </p>
          <button
            onClick={() => setError(false)}
            className="w-full py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
          >
            Try Again
          </button>
          <div className="pt-4 border-t border-gray-100 mt-6">
            <p className="text-xs text-gray-400 tracking-widest">
              LUXVANA SECURE ACCESS
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-100">
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-amber-50 mb-4">
              <Lock className="h-6 w-6 text-amber-600" strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl font-serif font-medium text-gray-900 mb-2">
              Create Secure Password
            </h1>
            <p className="text-gray-500">
              Protect your Luxvana account with a strong password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-b border-gray-300 focus:border-amber-500 outline-none bg-transparent transition-colors"
                  placeholder="At least 8 characters"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-amber-500 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border-b border-gray-300 focus:border-amber-500 outline-none bg-transparent transition-colors"
                placeholder="Re-enter your password"
                required
              />
            </div>

            <div className="pt-2">
              <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    password.length > 10
                      ? "bg-green-500"
                      : password.length > 6
                      ? "bg-amber-500"
                      : "bg-red-500"
                  }`}
                  style={{
                    width: `${Math.min((password.length / 12) * 100, 100)}%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {password.length > 10
                  ? "Strong password"
                  : password.length > 6
                  ? "Moderate strength"
                  : "Weak password"}
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || password !== confirmPassword}
              className={`w-full py-3.5 bg-amber-600 text-white text-sm tracking-wider uppercase rounded-md transition-colors ${
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-amber-700"
              } ${
                password !== confirmPassword
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {isSubmitting ? "Securing..." : "Set Password"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          By continuing, you agree to our{" "}
          <a href="#" className="text-amber-600 hover:underline">
            Security Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default CreatePasswordPage;
