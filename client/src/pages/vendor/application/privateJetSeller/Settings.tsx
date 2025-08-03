import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import vendorApi from "../../functions/vendorApi";
import TimezoneSelect from "react-timezone-select";
import { FiEye, FiEyeOff, FiCopy, FiCheck } from "react-icons/fi";

function AppSettings() {
  const vendor = useSelector((state: any) => state.vendor.vendor);
  const [formData, setFormData] = useState({
    email: vendor?.email || "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    emailNotifications: true,
    statusNotifications: true,
    weeklySummary: false,
  });
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Membership and wallet data
  const [membership, setMembership] = useState({
    planName: "Premium Vendor",
    expiryDate: "2026-05-04",
    boostedListings: 3,
    isAutoRenew: true,
  });
  const walletAddress = "0x1234567890abcdef1234567890abcdef12345678";

  // Fetch vendor settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const [settingsResponse, membershipResponse] = await Promise.all([
          vendorApi.get("/settings"),
          vendorApi.get("/membership"),
        ]);

        if (settingsResponse.data.success) {
          setFormData((prev) => ({
            ...prev,
            timezone:
              settingsResponse.data.settings.timezone ||
              Intl.DateTimeFormat().resolvedOptions().timeZone,
            emailNotifications:
              settingsResponse.data.settings.emailNotifications ?? true,
            statusNotifications:
              settingsResponse.data.settings.statusNotifications ?? true,
            weeklySummary:
              settingsResponse.data.settings.weeklySummary ?? false,
          }));
          setIs2FAEnabled(settingsResponse.data.settings.is2FAEnabled ?? false);
        }

        if (membershipResponse.data.success) {
          setMembership(membershipResponse.data.membership);
        }
      } catch (error) {
        toast.error("Failed to load settings");
      }
    };
    fetchSettings();
  }, []);

  // Handle form input changes
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle password form changes
  const handlePasswordChange = (e: any) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle timezone change
  const handleTimezoneChange = (timezone: any) => {
    setFormData((prev) => ({
      ...prev,
      timezone: timezone.value,
    }));
  };

  // Handle settings save
  const handleSaveSettings = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await vendorApi.put("/settings", {
        timezone: formData.timezone,
        emailNotifications: formData.emailNotifications,
        statusNotifications: formData.statusNotifications,
        weeklySummary: formData.weeklySummary,
      });
      if (response.data.success) {
        toast.success("Settings updated successfully");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update settings");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle change password
  const handleChangePasswordSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        throw new Error("Passwords don't match");
      }

      const response = await vendorApi.put("/change-password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      if (response.data.success) {
        toast.success("Password changed successfully");
        setShowPasswordModal(false);
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error: any) {
      toast(
        error.response?.data?.message ||
          error.message ||
          "Failed to change password"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle 2FA toggle
  const handle2FAToggle = async () => {
    try {
      setIsSubmitting(true);
      const response = await vendorApi.post("/toggle-2fa");
      if (response.data.success) {
        setIs2FAEnabled((prev) => !prev);
        toast.success(
          `2FA ${is2FAEnabled ? "disabled" : "enabled"} successfully`
        );
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to toggle 2FA");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle logout from all devices
  const handleLogoutAll = async () => {
    try {
      const response = await vendorApi.post("/logout-all");
      if (response.data.success) {
        toast.success("Logged out from all devices");
        // Redirect to login after 2 seconds
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (error) {
      toast.error("Failed to log out from all devices");
    }
  };

  // Handle renew membership
  const handleRenewMembership = async () => {
    try {
      setIsSubmitting(true);
      const response = await vendorApi.post("/renew-membership");
      if (response.data.success) {
        setMembership((prev) => ({
          ...prev,
          expiryDate: response.data.newExpiryDate,
        }));
        toast.success("Membership renewed successfully");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to renew membership"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle auto-renew toggle
  const handleAutoRenewToggle = async () => {
    try {
      setIsSubmitting(true);
      const response = await vendorApi.put("/toggle-auto-renew");
      if (response.data.success) {
        setMembership((prev) => ({
          ...prev,
          isAutoRenew: !prev.isAutoRenew,
        }));
        toast.success(
          `Auto-renew ${membership.isAutoRenew ? "disabled" : "enabled"}`
        );
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to update auto-renew setting"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete account
  const handleDeleteAccount = async () => {
    setIsSubmitting(true);
    try {
      const response = await vendorApi.delete("/account");
      if (response.data.success) {
        toast.success("Account deletion request submitted");
        setShowDeleteModal(false);
        // Redirect to login after 2 seconds
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete account");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Copy wallet address to clipboard
  const copyWalletAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="mt-2 text-gray-600">
            Manage your vendor account preferences and security
          </p>
        </div>

        {/* Account Info */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Email
              </label>
              <input
                type="email"
                value={formData.email}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <button
                onClick={() => setShowPasswordModal(true)}
                className="w-full px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Change Password
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Wallet Address
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={walletAddress}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 pr-10"
                />
                <button
                  onClick={copyWalletAddress}
                  className="absolute right-2 top-2 text-gray-500 hover:text-blue-600"
                  title="Copy to clipboard"
                >
                  {copiedAddress ? (
                    <FiCheck className="text-green-500" />
                  ) : (
                    <FiCopy />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Timezone
              </label>
              <TimezoneSelect
                value={formData.timezone}
                onChange={handleTimezoneChange}
                className="w-full text-gray-700"
              />
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Notification Preferences
          </h2>
          <div className="space-y-3">
            <label className="flex items-start space-x-3">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={formData.emailNotifications}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
              <div className="text-sm">
                <span className="font-medium text-gray-700">
                  Email Notifications
                </span>
                <p className="text-gray-500">
                  Receive email notifications for new enquiries
                </p>
              </div>
            </label>
            <label className="flex items-start space-x-3">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  name="statusNotifications"
                  checked={formData.statusNotifications}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
              <div className="text-sm">
                <span className="font-medium text-gray-700">
                  Status Updates
                </span>
                <p className="text-gray-500">
                  Get notified about listing status changes
                </p>
              </div>
            </label>
            <label className="flex items-start space-x-3">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  name="weeklySummary"
                  checked={formData.weeklySummary}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
              <div className="text-sm">
                <span className="font-medium text-gray-700">
                  Weekly Summary
                </span>
                <p className="text-gray-500">
                  Receive a weekly summary of your activity
                </p>
              </div>
            </label>
          </div>
          <button
            onClick={handleSaveSettings}
            disabled={isSubmitting}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Save Preferences"}
          </button>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <h3 className="font-medium text-gray-700">
                  Two-Factor Authentication (2FA)
                </h3>
                <p className="text-sm text-gray-500">
                  {is2FAEnabled
                    ? "2FA is currently enabled"
                    : "Add an extra layer of security to your account"}
                </p>
              </div>
              <button
                onClick={handle2FAToggle}
                className={`px-4 py-2 rounded-md ${
                  is2FAEnabled
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                } transition-colors`}
                disabled={isSubmitting}
              >
                {is2FAEnabled ? "Disable 2FA" : "Enable 2FA"}
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <h3 className="font-medium text-gray-700">Login History</h3>
                <p className="text-sm text-gray-500">
                  View recent login activity
                </p>
              </div>
              <button
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors opacity-50 cursor-not-allowed"
                disabled
              >
                View History
              </button>
            </div>

            <div className="pt-3">
              <button
                onClick={handleLogoutAll}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Logout from All Devices
              </button>
            </div>
          </div>
        </div>

        {/* Membership & Billing */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Membership & Billing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Membership Plan
              </label>
              <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                {membership.planName}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                {new Date(membership.expiryDate).toLocaleDateString()}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Boosted Listings
              </label>
              <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                {membership.boostedListings}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-medium text-gray-700">
                Auto-renew Membership
              </h3>
              <p className="text-sm text-gray-500">
                {membership.isAutoRenew
                  ? "Your membership will renew automatically"
                  : "Turn on auto-renew for uninterrupted service"}
              </p>
            </div>
            <button
              onClick={handleAutoRenewToggle}
              className={`px-4 py-2 rounded-md ${
                membership.isAutoRenew
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } transition-colors`}
              disabled={isSubmitting}
            >
              {membership.isAutoRenew
                ? "Disable Auto-renew"
                : "Enable Auto-renew"}
            </button>
          </div>

          <button
            onClick={handleRenewMembership}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            Renew Membership Now
          </button>
        </div>

        {/* Delete Account */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-red-600">
            Danger Zone
          </h2>
          <div className="border border-red-200 rounded-md p-4 bg-red-50">
            <h3 className="font-medium text-red-700 mb-2">Delete Account</h3>
            <p className="text-sm text-red-600 mb-4">
              Warning: This action is permanent and will immediately delete all
              your data, listings, and account information. This cannot be
              undone.
            </p>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Delete My Account
            </button>
          </div>
        </div>

        {/* Change Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Change Password</h2>
              <form onSubmit={handleChangePasswordSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      name="currentPassword"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute right-2 top-2 text-gray-500 hover:text-blue-600"
                    >
                      {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-2 top-2 text-gray-500 hover:text-blue-600"
                    >
                      {showNewPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-2 top-2 text-gray-500 hover:text-blue-600"
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-2 text-red-600">
                Confirm Account Deletion
              </h2>
              <p className="mb-6 text-gray-700">
                Are you absolutely sure you want to delete your account? This
                action cannot be undone and will permanently remove:
              </p>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-1">
                <li>All your vendor listings</li>
                <li>Your account information</li>
                <li>Any associated data and history</li>
              </ul>
              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Deleting..." : "Yes, Delete My Account"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AppSettings;
