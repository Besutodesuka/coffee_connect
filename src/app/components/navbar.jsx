import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className="bg-[#312218] text-white p-5">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo and Links */}
          <div className="flex items-center space-x-5">
            <img
              className="w-14 h-14 object-cover rounded-full"
              src="/Coffee_Connect.svg"
              alt="Profile"
            />
            <Link href="/" className="text-base font-bold">Home</Link>
            <span>|</span>
            <Link href="/home" className="text-base font-bold">Retail Product</Link>
            <span>|</span>
            <Link href="/" className="text-base font-bold">Contact Product</Link>
            <span>|</span>
            <Link href="/" className="text-base font-bold">Auction</Link>
          </div>

          <ul className="flex items-center space-x-5">
          {/* After search navigate to Retail product add pls */}
          <div className="flex items-center bg-white text-gray-400 border border-gray-300 rounded-full px-4 py-2 shadow-md focus-within:ring-2 focus-within:ring-orange-500 w-96 ml-auto">
            <input
                type="search"
                placeholder="Search coffee, roaster, origin, and more..."
                className="flex-grow bg-transparent outline-none text-gray-600 placeholder-gray-400"
            />
            </div>

            <a href="/cart">
                <img
                    src="/Cart.svg"
                    alt="Cart"
                    className="w-6 h-6 object-contain cursor-pointer mr-3"
                />
            </a>
            {/* When user is logged in */}
            {session && (
                <li className="mx-3">
                    <Link href="/profile">
                        <img
                            src="/Profile.svg"
                            alt="Profile"
                            className="w-6 h-6 object-contain"
                        />
                </Link>
            </li>
            )}

            {/* When the user has not logged in */}
            {!session && (
                <div className="flex justify-center items-center space-x-3">
                <a href="/login">
                    <button className="px-6 py-2 bg-white text-black border border-black rounded-md hover:bg-gray-100 transition duration-200">
                        Sign in
                    </button>
                </a>
            
                <a href="/register">
                    <button className="px-6 py-2 bg-orange-500 text-white border border-orange-500 rounded-md hover:bg-orange-600 transition duration-200">
                        Sign up
                    </button>
                </a>
                </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
