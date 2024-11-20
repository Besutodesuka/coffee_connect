"use client";
// this is rendered on the client side to allow hook usage
import React, { useState } from 'react';
// import { sendPasswordResetEmail } from 'some-auth-service'; // Replace with your actual email sending service
import { useRouter } from 'next/navigation';

const ForgetPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            // Mock function for sending email
            // await sendPasswordResetEmail(email); // Replace with your actual service logic
            
            setSuccessMessage("A password reset link has been sent to your email.");
        } catch (error) {
            console.error("Error sending password reset email:", error);
            setErrorMessage("Failed to send reset link. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F0E7E0]">
            <div className="flex flex-col items-center gap-9 w-full max-w-md px-6 sm:px-0">
                {/* Page Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Forgot Password
                </h1>
                <form onSubmit={handleSubmit} className="w-full bg-white rounded-lg border border-gray-300 p-6 space-y-6">
                    {/* Email Input */}
                    <div className="space-y-2">
                        <label className="text-lg font-medium text-gray-800">Email Address</label>
                        <div className="w-full bg-white border border-gray-300 rounded-lg p-3">
                            <input
                                type="email"
                                placeholder="Enter your email Ex. coffee@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className="w-full text-gray-500 bg-transparent outline-none"
                                required
                            />
                        </div>
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full py-3 rounded-lg ${
                            loading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-800 hover:bg-gray-700"
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

export default ForgetPasswordPage;
