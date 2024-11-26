"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const ProfileSection = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [profilePicture, setProfilePicture] = useState("/rmbg-profile.png");
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditFirstname, setshowEditFirstname] = useState(false);
  const [showEditLastname, setshowEditLastname] = useState(false);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  useEffect(() => {
    if (session?.user?.email) {
      fetch("/api/profile/get")
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch user data");
          }
          return res.json();
        })
        .then((data) => {
          setUserData(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
          console.error("Error fetching user data:", err);
        });
    }
  }, [session?.user?.email]);

  const handleSaveChange = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Prepare the request body
    const requestBody = {};

    // Add first name and last name if they are provided
    if (newFirstName) requestBody.firstName = newFirstName;
    if (newLastName) requestBody.lastName = newLastName;

    // Add address data if provided
    if (address || city || state || zipCode) {
      // Join address fields into a single string, separated by commas
      const addressData = [address, city, state, zipCode].join(", ").trim();
      if (addressData) requestBody.address = addressData;
    }

    // Validate that at least one field is provided (first name, last name, or address)
    if (
      !requestBody.firstName &&
      !requestBody.lastName &&
      !requestBody.address
    ) {
      console.error("First name, last name, or address must be provided.");
      return; // Don't proceed if none is provided
    }

    console.log("Request Body being sent:", requestBody); // Log the request body

    try {
      const res = await fetch("/api/profile/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody), // Send the updated data
      });

      if (!res.ok) {
        throw new Error("Error updating profile");
      }

      const updatedUser = await res.json();
      console.log("Updated user profile:", updatedUser);

      // Refresh the page to reflect the changes
      window.location.reload();

      // Close the modal after successful update
      setshowEditFirstname(false);
      setshowEditLastname(false);
      setShowAddressModal(false); // Close the address modal if it's open
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (status === "loading" || loading) {
    return <p>Loading...</p>;
  }

  // Error state
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Not signed in
  if (!session) {
    return <p>Please sign in to view your profile.</p>;
  }

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
              <p className="text-2xl font-semibold text-gray-700">
                {userData.username}
              </p>
              <p className="text-sm text-gray-500">
                Accepted formats: JPG, PNG, JPEG
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative w-full">
                <label className="block text-gray-700 text-sm mb-1">
                  First Name
                </label>
                <span className="w-full px-4 py-2 border border-gray-300 rounded-lg block pr-12">
                  {userData.firstname}
                </span>
                <button
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500 hover:underline"
                  onClick={() => {
                    setshowEditFirstname(true);
                  }}
                  style={{ marginTop: "18px" }}
                >
                  <img
                    src="/edit_remove.png"
                    alt="Edit"
                    className="w-10 h-10" // Adjust size of the icon
                  />
                </button>
              </div>

              <div className="relative w-full">
                <label className="block text-gray-700 text-sm mb-1">
                  Last Name
                </label>
                <span className="w-full px-4 py-2 border border-gray-300 rounded-lg block pr-12">
                  {userData.lastname}
                </span>
                <button
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500 hover:underline"
                  onClick={() => {
                    setshowEditLastname(true);
                  }}
                  style={{ marginTop: "18px" }}
                >
                  <img
                    src="/edit_remove.png"
                    alt="Edit"
                    className="w-10 h-10" // Adjust size of the icon
                  />
                </button>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 text-sm">Email</label>
              <div className="relative w-full">
                <span className="w-full px-4 py-2 border border-gray-300 rounded-lg block pr-12">
                  {session.user.email}
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm">Password</label>
                <div className="relative w-full">
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-12" // Add padding to the right for the icon
                    placeholder="••••••••"
                    disabled
                  />
                  <a
                    href="/login/forgetPass"
                    className="absolute inset-y-0 right-0 flex items-center pr-3" // Position the icon inside the input box
                  >
                    <img
                      src="/edit_remove.png"
                      alt="Edit"
                      className="w-10 h-10" // Adjust size of the icon
                    />
                  </a>
                </div>
              </div>
              <div className="mt-6 flex justify-center"></div>
            </div>

            <div className="space-y-4">
              {/* Payment Method Section */}
              <div className="relative w-full">
                <label className="block text-gray-700 text-sm mb-1">
                  Payment Method
                </label>
                <span className="w-full px-4 py-2 border border-gray-300 rounded-lg block pr-12">
                  1234 5678 8910
                </span>
                <button
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500 hover:underline"
                  onClick={() => setShowPaymentModal(true)}
                  style={{ marginTop: "18px" }}
                >
                  <img
                    src="/edit_remove.png"
                    alt="Edit"
                    className="w-10 h-10" // Adjust size of the icon
                  />
                </button>
              </div>

              {/* Address Section */}
              <div className="relative w-full">
                <label className="block text-gray-700 text-sm mb-1">
                  Address
                </label>
                <span className="w-full px-4 py-2 border border-gray-300 rounded-lg block pr-12">
                  {userData.location || "Add your address"}
                </span>
                <button
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500 hover:underline"
                  onClick={() => setShowAddressModal(true)}
                  style={{ marginTop: "18px" }}
                >
                  <img
                    src="/edit_remove.png"
                    alt="Edit"
                    className="w-10 h-10" // Adjust size of the icon
                  />
                </button>
              </div>
            </div>
          </div>

          {/*sign out*/}
          <div className="mt-6 flex justify-center">
            <Link
              href="/api/auth/signout"
              onClick={(e) => {
                e.preventDefault();
                signOut({ callbackUrl: "/" });
              }}
              className="px-6 py-2 bg-[#312218] text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-200"
            >
              Sign Out
            </Link>
          </div>
        </section>
      </div>

      {showEditFirstname && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">Edit First Name</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveChange(e);
              }}
            >
              <div>
                <label className="block text-gray-700 text-sm">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={newFirstName}
                  onChange={(e) => setNewFirstName(e.target.value)} // Update state when typing
                  placeholder="Enter your first name"
                />
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-700 border rounded-lg"
                  onClick={() => setshowEditFirstname(false)} // Close modal without saving
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#312218] text-white rounded-lg"
                >
                  Save change
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditLastname && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">Edit Last Name</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveChange(e);
              }}
            >
              <div>
                <label className="block text-gray-700 text-sm">Last Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={newLastName}
                  onChange={(e) => setNewLastName(e.target.value)} // Update state when typing
                  placeholder="Enter your last name"
                />
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-700 border rounded-lg"
                  onClick={() => setshowEditLastname(false)} // Close modal without saving
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#312218] text-white rounded-lg"
                >
                  Save change
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">Add Payment Method</h3>
            <form>
              <div>
                <label className="block text-gray-700 text-sm">
                  Card Number
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="1234 5678 9123 4567"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm">Bank Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Krungthai"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm">Card Type</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Credits"
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm">
                  Expiry Date
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm">CVC</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="321"
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
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#312218] text-white rounded-lg"
                >
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveChange(e);
              }}
            >
              <div>
                <label className="block text-gray-700 text-sm">Address</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="123 Main St"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm">City</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="City Name"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm">State</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="State Name"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm">ZIP Code</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="12345"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
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
      <Navbar />
      <ProfileSection />
      <Footer />
    </div>
  );
};

export default App;
