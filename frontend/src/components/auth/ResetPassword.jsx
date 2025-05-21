import { useState } from "react";
import { ArrowRight, Lock, Eye, EyeOff } from "lucide-react";

function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = () => {
        // Reset messages
        setErrorMessage("");
        setSuccessMessage("");

        // Validation
        if (!newPassword) {
            setErrorMessage("Please enter a new password");
            return;
        }

        if (newPassword.length < 8) {
            setErrorMessage("Password must be at least 8 characters long");
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        setIsLoading(true);

        // Simulate API call for password reset
        setTimeout(() => {
            setIsLoading(false);
            setSuccessMessage("Your password has been reset successfully");
            setNewPassword("");
            setConfirmPassword("");
        }, 1500);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center">
                        <Lock className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Set new password</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Create a strong password with at least 8 characters
                    </p>
                </div>

                {/* Reset Form */}
                <div className="mt-8 space-y-6">
                    {/* Error Message */}
                    {errorMessage && (
                        <div className="rounded-md bg-red-50 p-4">
                            <p className="text-sm font-medium text-red-800">{errorMessage}</p>
                        </div>
                    )}

                    {/* Success Message */}
                    {successMessage && (
                        <div className="rounded-md bg-green-50 p-4">
                            <p className="text-sm font-medium text-green-800">{successMessage}</p>
                        </div>
                    )}

                    {/* Form Inputs */}
                    <div className="space-y-6">
                        {/* New Password */}
                        <div>
                            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="new-password"
                                    name="new-password"
                                    type={showNewPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={toggleNewPasswordVisibility}
                                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                                >
                                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white ${isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150`}
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    {isLoading ? (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <ArrowRight className="h-5 w-5 text-white" aria-hidden="true" />
                                    )}
                                </span>
                                {isLoading ? "Resetting..." : "Reset Password"}
                            </button>
                        </div>
                    </div>

                    {/* Back to Login */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Remember your password?{" "}
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                Back to login
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;