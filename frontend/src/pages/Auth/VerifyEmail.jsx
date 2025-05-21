import { useState, useRef, useEffect } from "react";
import { Mail, ShieldCheck, Info } from "lucide-react";
import { ThemeButton } from "../../components/Buttons";
import useAuthStore from "../../zustand/authStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function VerifyEmailForm() {

    const navigateTo = useNavigate();
    const { verifyUserEmail } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState(sessionStorage.getItem("email"));
    const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);

    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)
    ];

    useEffect(() => {
        // Auto-focus the first input on component mount
        if (inputRefs[0].current) inputRefs[0].current.focus();
    }, []);

    const handleInputChange = (index, value) => {
        // Only allow numbers
        if (!/^\d*$/.test(value)) return;

        // Update the verification code array
        const newVerificationCode = [...verificationCode];
        newVerificationCode[index] = value;
        setVerificationCode(newVerificationCode);

        // Auto-focus the next input field if this one is filled
        if (value !== "" && index < 5) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && verificationCode[index] === "" && index > 0) {
            inputRefs[index - 1].current.focus();
        }
        if (e.key === "ArrowLeft" && index > 0) {
            inputRefs[index - 1].current.focus();
        }
        if (e.key === "ArrowRight" && index < 5) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").trim();

        if (!/^\d+$/.test(pastedData)) return;

        const digits = pastedData.slice(0, 6).split("");
        const newVerificationCode = [...verificationCode];

        digits.forEach((digit, index) => {
            if (index < 6) {
                newVerificationCode[index] = digit;
            }
        });

        setVerificationCode(newVerificationCode);

        if (digits.length < 6) {
            inputRefs[digits.length].current.focus();
        } else {
            inputRefs[5].current.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (verificationCode.some(digit => digit === ""))
            toast.error("Please enter all 6 digits of the verification code");

        const joinedCode = verificationCode.join("");

        setIsLoading(true);
        await verifyUserEmail(email, joinedCode, navigateTo);
        setIsLoading(false);

    };

    return (
        <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

            <div className="w-full max-w-md space-y-8">

                <div className="text-center">
                    <div className="mx-auto h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center">
                        <Mail className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">VERIFY YOUR EMAIL</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        We've sent a 6-digit verification code to
                    </p>
                    <p className="text-blue-600 font-medium">{email}</p>
                </div>

                {/* Verification Code Input */}
                <form onSubmit={handleSubmit}>

                    <label className="block text-sm font-medium text-gray-700 text-center mb-2 mt-5">
                        Enter verification code
                    </label>
                    <div className="flex justify-center space-x-3">
                        {verificationCode.map((digit, index) => (
                            <div key={index} className="w-12 h-14">
                                <input
                                    ref={inputRefs[index]}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={index === 0 ? handlePaste : undefined}
                                    className="w-full h-full outline-none rounded-lg border border-gray-300 text-center text-xl font-semibold focus:border-blue-500 focus:ring-2 focus:ring-blue-500 shadow-sm"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <ThemeButton
                        Icon={ShieldCheck}
                        btnLabel="VERIFY"
                        isButtonLoading={isLoading}
                        extraClasses="w-full mt-10 h-[55px]"
                    />

                </form>

                <div className="text-sm text-gray-700 flex gap-2.5 justify-center w-full">
                    <Info size={20} />
                    <p>
                        Code expires in 30 minutes
                    </p>
                </div>

            </div>

        </div>
    );
}