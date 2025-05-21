import { useState } from "react";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeButton } from "../../components/Buttons";

function RequestPasswordReset() {

    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center">
                        <Lock className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Reset your password</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        We'll send a password reset link to your email
                    </p>
                </div>

                {/* Reset Form */}
                <div className="mt-8 space-y-6">

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="your.email@example.com"
                                />
                            </div>
                        </div>

                        <ThemeButton
                        />

                    </form>

                    {/* Back to Login */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Remember your password?{" "}
                            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                                Back to login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RequestPasswordReset