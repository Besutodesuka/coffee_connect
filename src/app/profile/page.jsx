"use client"

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { signOut } from "next-auth/react";
import { useRouter, redirect } from 'next/navigation'
import Link from "next/link";

const ProfileSection = () => (
  <section className="mt-10 mx-auto max-w-4xl p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-6 text-[#191c1e]">Profile Information</h2>
    <form className="space-y-4">
      <div>
        <label className="block text-gray-700 text-sm">Full Name</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="example@gmail.com"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="••••••••"
        />
      </div>
      <button type="submit" className="w-full px-4 py-2 bg-[#312218] text-white rounded-lg">
        Save Changes
      </button>
      <Link 
        href='/api/auth/signout'
        onClick={(e) => {
            e.preventDefault();
            signOut({ callbackUrl: '/' });
        }}
      >
            Sign Out
      </Link>
    </form>
  </section>
);

const App = () => {
    // Profile Section
    // App Layout
    return (
    <div>
        <Navbar/>
        <ProfileSection/>
        <Footer/>
    </div>
    );
}

export default App;
