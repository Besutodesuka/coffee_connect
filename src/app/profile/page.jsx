"use client"

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { signOut } from "next-auth/react";
import { useRouter, redirect } from 'next/navigation'
import Link from "next/link";

// const ProfileSection = () => (
//   <section className="mt-10 mx-auto max-w-4xl p-6 bg-white rounded-lg shadow-md">

//     <h2 className="text-2xl font-bold mb-6 text-[#191c1e]">Profile Information</h2>
//     <form className="space-y-4">
//       <div>
//         <label className="block text-gray-700 text-sm">Full Name</label>
//         <input
//           type="text"
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//           placeholder="John Doe"
//         />
//       </div>
//       <div>
//         <label className="block text-gray-700 text-sm">Email</label>
//         <input
//           type="email"
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//           placeholder="example@gmail.com"
//         />
//       </div>
//       <div>
//         <label className="block text-gray-700 text-sm">Password</label>
//         <input
//           type="password"
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//           placeholder="••••••••"
//         />
//       </div>
//       <button type="submit" className="w-full px-4 py-2 bg-[#312218] text-white rounded-lg">
//         Save Changes
//       </button>
//       <Link
//         href='/api/auth/signout'
//         onClick={(e) => {
//             e.preventDefault();
//             signOut({ callbackUrl: '/' });
//         }}
//       >
//             Sign Out
//       </Link>
//     </form>
//   </section>
// );


import { useState } from "react";

const ProfileSection = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [profilePicture, setProfilePicture] = useState("/Coffee_Connect.svg");

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 flex">
        {/* Sidebar */}
        <aside className="w-1/4 border-r pr-4">
          <nav>
            <ul className="space-y-4">
              <li className="text-lg font-semibold text-yellow-700 hover:text-[#312218] cursor-pointer">
                Profile
              </li>
              <li className="text-lg font-semibold text-gray-700 hover:text-[#312218] cursor-pointer">
                Purchase History
              </li>
              <li className="text-lg font-semibold text-gray-700 hover:text-[#312218] cursor-pointer">
                Contract History
              </li>
              <li className="text-lg font-semibold text-gray-700 hover:text-[#312218] cursor-pointer">
                Auction History
              </li>
            </ul>
          </nav>
        </aside>

        {/* Profile Section */}
        <section className="w-3/4 pl-6">
          <h2 className="text-2xl font-bold mb-6 text-[#191c1e]">Profile</h2>

        {/* Profile Picture Section */}
        <div className="flex items-center mb-6">
          <div className="relative">
            <img
              src={profilePicture}
              alt="Profile"
              className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover"
            />
            <button
              type="button"
              className="absolute bottom-2 right-2 bg-[#312218] text-white px-2 py-1 rounded-full text-xs"
              onClick={() => setShowUploadModal(true)}
            >
              Edit
            </button>
          </div>
          <div className="ml-6">
            <p className="text-lg font-semibold text-gray-700">Change your profile picture</p>
            <p className="text-sm text-gray-500">Accepted formats: JPG, PNG, JPEG</p>
          </div>
        </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm">Full Name</label>
              <div className="flex items-center">
                <span className="w-full px-4 py-2 border border-gray-300 rounded-lg">John Doe</span>
                <button className="ml-2 text-blue-500 hover:underline">Edit</button>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm">Email</label>
              <div className="flex items-center">
                <span className="w-full px-4 py-2 border border-gray-300 rounded-lg">example@gmail.com</span>
                <button className="ml-2 text-blue-500 hover:underline">Edit</button>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm">Payment Method</label>
              <button
                className="text-sm text-blue-500 underline"
                onClick={() => setShowPaymentModal(true)}
              >
                Add Payment Method
              </button>
            </div>
            <div>
              <label className="block text-gray-700 text-sm">Address</label>
              <button
                className="text-sm text-blue-500 underline"
                onClick={() => setShowAddressModal(true)}
              >
                Add/Edit Address
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">Add Payment Method</h3>
            <form>
              <div>
                <label className="block text-gray-700 text-sm">Card Number</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="1234 5678 9123 4567"
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm">Expiry Date</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="MM/YY"
                />
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-700 border rounded-lg"
                  onClick={() => setShowPaymentModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-[#312218] text-white rounded-lg">
                  Add Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">Add/Edit Address</h3>
            <form>
              <div>
                <label className="block text-gray-700 text-sm">Street</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="123 Main St"
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm">City</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="City Name"
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm">State</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="State Name"
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm">ZIP Code</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="12345"
                />
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-700 border rounded-lg"
                  onClick={() => setShowAddressModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#312218] text-white rounded-lg"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


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
