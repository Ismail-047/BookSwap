import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Camera, ArrowRight, UserRoundPlus } from "lucide-react";
import { ThemeButton } from "../../components/Buttons";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../zustand/authStore";
import SelectUserProfileImage from "../../components/SelectUserProfileImage";

function Signup() {

    const [userData, setUserData] = useState({
        email: "",
        address: "",
        lastName: "",
        password: "",
        firstName: "",
        mobileNumber: "",
        confirmPassword: "",
    });

    const navigateTo = useNavigate();
    const { signupUser } = useAuthStore();

    const [isLoading, setIsLoading] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value, });
    };

    const handleFormSubmission = async (e) => {
        e.preventDefault();

        const images = [];
        images.push(profileImage);

        setIsLoading(true);
        await signupUser(userData, images, navigateTo);
        setIsLoading(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

            <div className="w-full max-w-2xl space-y-8">

                <div className="text-center">
                    <div className="mx-auto h-20 w-20 rounded-full bg-blue-600 text-white flex items-center justify-center">
                        <UserRoundPlus size={40} />
                    </div>
                    <h2 className="mt-5 text-3xl font-black text-gray-900">CREATE AN ACCOUNT</h2>
                    <p className="mt-1 text-lg text-gray-600">
                        Join us and enjoy our services
                    </p>
                </div>

                {/* Signup Fields */}
                <form onSubmit={handleFormSubmission}
                    className="mt-5 space-y-6">

                    {/* Profile Picture Upload */}
                    <SelectUserProfileImage setProfileImage={setProfileImage} />

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                        {/* First Name */}
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                First Name *
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    required
                                    value={userData.firstName}
                                    onChange={handleInputChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="John"
                                />
                            </div>
                        </div>

                        {/* Last Name */}
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                Last Name *
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    required
                                    value={userData.lastName}
                                    onChange={handleInputChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address *
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={userData.email}
                                    onChange={handleInputChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {/* Mobile */}
                        <div>
                            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                                Mobile Number
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="mobileNumber"
                                    name="mobileNumber"
                                    type="tel"
                                    value={userData.mobileNumber}
                                    onChange={handleInputChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password *
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                    value={userData.password}
                                    onChange={handleInputChange}
                                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="••••••••"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password *
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                    value={userData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="••••••••"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Address *
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MapPin className="h-5 w-5 text-gray-400" />
                            </div>
                            <input required
                                id="address"
                                name="address"
                                type="text"
                                value={userData.address}
                                onChange={handleInputChange}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="123 Main St, City, Country"
                            />
                        </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-center">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            checked={isAgreed}
                            onChange={(e) => setIsAgreed(e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                            I agree to the{" "}
                            <Link to="/terms-of-service" className="font-medium text-blue-600 hover:text-blue-500">
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link to="/privacy-policy" className="font-medium text-blue-600 hover:text-blue-500">
                                Privacy Policy
                            </Link>
                        </label>
                    </div>

                    <ThemeButton
                        btnLabel="SIGNUP"
                        Icon={ArrowRight}
                        isButtonLoading={isLoading}
                        isButtonDisabled={!isAgreed}
                        extraClasses="w-full h-[55px] rounded-md"
                    />

                </form>

                {/* Login Link */}
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="hover:underline font-medium text-blue-600 hover:text-blue-500">
                            Log In
                        </Link>
                    </p>
                </div>

            </div>

        </div>
    );
}

export default Signup;