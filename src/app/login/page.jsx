"use client"
// this is rendered in client site able to use hook
import React, { useState } from 'react'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter, redirect } from 'next/navigation'
import { useSession } from 'next-auth/react';
// From Ken's Machine, did have to login btw. HOW TF.
const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const { data: session } = useSession();
    // if (session) router.replace('home');
    // auto login page/ remember me
    // TODO: Required checkmark from user.

    // Function used for trigger sign in button
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await signIn("credentials", {
                email, password, redirect: false 
            })

            if (res.error) {
                setError("Invalid Username or Password");
                return;
            }
            

            router.replace("home");

        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F0E7E0]">
        <div className="flex flex-col items-center gap-9 w-full max-w-md px-6 sm:px-0">
            {/* Profile Image */}
            <img
            className="my-10 w-64 h-64 object-cover rounded-full"
            src="/Coffee_Connect.svg"
            alt="Profile"
            />
            <form onSubmit={handleSubmit}>
                
            {/* Login Form */}
            <div className="w-full bg-white rounded-lg border border-gray-300 p-6 space-y-6">
            {/* Username */}
            <div className="space-y-2">
                <label className="text-lg font-medium text-gray-800">Username</label>
                <div className="w-full bg-white border border-gray-300 rounded-lg p-3">
                <input
                    onChange={(e) => setEmail(e.target.value)} 
                    type="email" 
                    placeholder="Enter your email Ex. coffee@example.com"
                    className="w-full text-gray-500 bg-transparent outline-none"
                />
                </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
                <label className="text-lg font-medium text-gray-800">Password</label>
                <div className="w-full bg-white border border-gray-300 rounded-lg p-3">
                <input
                    onChange={(e) => setPassword(e.target.value)} 
                    type="password" 
                    placeholder="Enter your password"
                    className="w-full text-gray-500 bg-transparent outline-none"
                />
                </div>
                <a href="#" className="text-blue-600 underline text-lg">
                Forgot password?
                </a>
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2">
                <input
                type="checkbox"
                id="remember"
                className="w-4 h-4"
                />
                <label htmlFor="remember" className="text-lg text-gray-800">
                Remember this device
                </label>
            </div>
            
            {/* Sign-in Button */}
            <button className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition">
                Sign in
            </button>
                {error && (
                    <label className=' w-fit text-sm text-red-500 py-0.5 px-0 underline'>
                        {error}
                    </label>
                )}

            {/* Sign-up Link */}
            <p className="text-center text-lg">
                Don’t have an account?{' '}
                <a href="/register" className="text-blue-600 underline">
                Sign up
                </a>
            </p>
            </div>
                
            </form>
        </div>
        </div>
        
    );
};

export default LoginPage