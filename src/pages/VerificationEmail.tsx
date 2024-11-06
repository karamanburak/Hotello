import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import useAuthCall from "../hooks/useAuthCall";

const VerificationEmail = () => {
    const { verifyEmail } = useAuthCall()
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const navigate = useNavigate();
    const isLoading = false;

    const handleChange = (index: number, value: string) => {
        const newCode = [...code];

        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);

            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex]?.focus();
        } else {
            newCode[index] = value;
            setCode(newCode);
            if (value && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleResendCode = () => {
        // Logic to resend the verification code goes here
        console.log("Resending verification code...");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const verificationCode = code.join("");
        console.log("Verification code submitted:", verificationCode);
        try {
            await verifyEmail(verificationCode)
        } catch (error) {
            console.error("Verification failed:", error);

        }
        console.log(`Verification code submitted: ${verificationCode}`);
    };

    useEffect(() => {
        if (code.every(digit => digit !== "")) {
            const fakeEvent = { preventDefault: () => { } };
            handleSubmit(fakeEvent as React.FormEvent<HTMLFormElement>);
        }
    }, [code]);

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div className="flex justify-center items-center w-full h-[100vh]">
            <div className={`bg-light:background dark:bg-dark:background2 p-6 rounded-lg shadow-lg border border-light:border dark:border-dark:border`}>
                <div className="flex mb-4">
                    <MdKeyboardArrowLeft className="mt-0.5 text-2xl cursor-pointer" onClick={() => navigate("/login")} />
                    <span className="ml-1">Back to login</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">Verify Code</h2>
                <p>Enter the 6-digit code sent to your email address.</p>
                <form onSubmit={handleSubmit} className="space-y-2 mt-6">
                    <div className="flex gap-2 sm:gap-4">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => { inputRefs.current[index] = el }}
                                type="text"
                                name="code"
                                value={digit}
                                maxLength={1}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className={`text-dark-secondary bg-white border border-dark-border2 rounded-md w-12 h-12 text-center px-2 py-1 focus:outline-none focus:border-blue-500 hover:border-blue-400 ${digit ? 'border-light-primary' : 'border-dark-primary'}`}
                            />
                        ))}
                    </div>
                    <div className="flex flex-col gap-8">
                        <p className="text-light:textSecondary dark:text-dark:textSecondary">
                            Didn’t receive a code?
                            <button
                                onClick={handleResendCode}
                                className="text-red-500 dark:text-dark:primary font-semibold ml-1" >
                                Resend
                            </button>
                        </p>
                        <button
                            type="submit"
                            className={`px-6 py-3 rounded-md text-dark-text ${isLoading ? 'bg-dark-textSecondary' : 'bg-light-button'}`}
                            disabled={isLoading}
                        >
                            {isLoading ? "Verifying..." : "Verify Email"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VerificationEmail;
