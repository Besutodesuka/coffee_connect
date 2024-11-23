"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const ResetPasswordPage = () => {
    const searchParams = useSearchParams();
    const email = searchParams.get("email"); // Extract email from query string
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        try {
            if (newPassword !== confirmPassword) {
                throw new Error("Passwords do not match!");
            }

            const response = await fetch("/api/resetPass", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email, // Send the email along with the new password
                    newPassword,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to reset password. Check the API.");
            }
            const data = await response.json();
            console.log(data);

            if (response.ok) {
                setSuccessMessage("Password reset successfully! Redirecting...");
                setTimeout(() => {
                    router.replace("/login");
                }, 1000);
            } else {
                throw new Error(data.message || "Failed to reset password.");
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage(error.message || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F0E7E0]">
            <div className="flex flex-col items-center gap-6 w-full max-w-md px-6 sm:px-0">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Reset Password</h1>
                <form
                    onSubmit={handleSubmit}
                    className="w-full bg-white rounded-lg border border-gray-300 p-6 space-y-6"
                >
                    <div className="space-y-2">
                        <label className="text-lg font-medium text-gray-800">New Password</label>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full bg-transparent outline-none border border-gray-300 rounded-lg p-3"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-lg font-medium text-gray-800">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-transparent outline-none border border-gray-300 rounded-lg p-3"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-3 rounded-lg ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#312218] hover:bg-amber-900"} text-white transition`}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Reset Password"}
                    </button>
                    {successMessage && <p className="text-center text-green-600 text-lg">{successMessage}</p>}
                    {errorMessage && <p className="text-center text-red-600 text-lg">{errorMessage}</p>}
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
