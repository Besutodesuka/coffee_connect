"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';

const ForgetPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const { data: session } = useSession();
    console.log(session);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        try {
            const resCheckUser = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await resCheckUser.json();

            if (resCheckUser.ok && data.user) {
                setSuccessMessage("User found! Redirecting...");
                setTimeout(() => {
                    router.replace(`/login/verification?email=${encodeURIComponent(email)}`);
                }, 500);
            } else {
                throw new Error(data.message || "User not found.");
            }
        } catch (error) {
            console.error("Error in handleSubmit:", error);
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F0E7E0]">
            <div className="flex flex-col items-center gap-6 w-full max-w-md px-6 sm:px-0">
                <img
                    className="w-64 h-64 object-cover rounded-full"
                    src="/Coffee_Connect.svg"
                    alt="Profile"
                />
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Forgot Password</h1>
                <form
                    onSubmit={handleSubmit}
                    className="w-full bg-white rounded-lg border border-gray-300 p-6 space-y-6"
                >
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
                    <button
                        type="submit"
                        className={`w-full py-3 rounded-lg ${
                            loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#312218] hover:bg-amber-900"
                        } text-white transition`}
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send"}
                    </button>
                    {successMessage && <p className="text-center text-green-600 text-lg">{successMessage}</p>}
                    {errorMessage && <p className="text-center text-red-600 text-lg">{errorMessage}</p>}
                </form>
                <p className="text-center text-lg">
                    Remembered your password?{" "}
                    <a href="/login" className="text-blue-600 underline">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default ForgetPasswordPage;