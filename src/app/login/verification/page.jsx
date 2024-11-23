"use client";
// this is rendered on the client side to allow hook usage
import React, { useState } from 'react';
import { useSearchParams } from "next/navigation";
import { redirect, useRouter } from 'next/navigation';

const verificationPage = () => {
    const searchParams = useSearchParams();
    const email = searchParams.get("email"); // Extract email from query string
    const [OTP, setOTP] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [Count, SetCount] = useState(0);

    const router = useRouter();
    

    const handleSubmit = async (e) => {
        
      e.preventDefault();
      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");
      console.log(email)
      try {
        if(OTP == 999999) router.replace(`/login/ResetPass?email=${encodeURIComponent(email)}`);
        else {
            setErrorMessage(`Mismatch OTP. Please try again. [${Count}]`);
            SetCount(Count + 1);
        }
      } catch (error) {
          console.error("Error sending OTP:", error);
          setErrorMessage(error.message || "An error occurred. Please try again.");
      } finally {
          setLoading(false);
      }
  };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F0E7E0]">
            <div className="flex flex-col items-center gap-6 w-full max-w-md px-6 sm:px-0">
                {/* Profile Image */}
                <img
                className="w-64 h-64 object-cover rounded-full"
                src="/Coffee_Connect.svg"
                alt="Profile"
                />
                <form onSubmit={handleSubmit}></form>
                {/* Page Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Verification
                </h1>
                <form onSubmit={handleSubmit} className="w-full bg-white rounded-lg border border-gray-300 p-6 space-y-6">
                    {/* Email Input */}
                    <div className="space-y-2">
                        <label className="text-lg font-medium text-gray-800">OTP</label>
                        <div className="w-full bg-white border border-gray-300 rounded-lg p-3">
                            <input
                                type="int"
                                placeholder="Enter OTP Ex. 999999"
                                onChange={(e) => setOTP(e.target.value)}
                                value={OTP}
                                className="w-full text-gray-500 bg-transparent outline-none"
                                required
                            />
                        </div>
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full py-3 rounded-lg ${
                            loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#312218] hover:bg-amber-900"
                        } text-white transition`}
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send"}
                    </button>
                    {/* Success Message */}
                    {successMessage && (
                        <p className="text-center text-green-600 text-lg">{successMessage}</p>
                    )}
                    {/* Error Message */}
                    {errorMessage && (
                        <p className="text-center text-red-600 text-lg">{errorMessage}</p>
                    )}
                </form>
                {/* Back to Login Link */}
                <p className="text-center text-lg">
                    Remembered your password?{' '}
                    <a href="/login" className="text-blue-600 underline">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default verificationPage;
