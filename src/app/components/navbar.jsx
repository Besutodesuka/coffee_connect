import React from 'react';
import Link from 'next/link';

function Navbar() {
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
            <Link href="/"className="text-base font-bold">Home</Link>
            <span>|</span>
            <Link href="/"className="text-base font-bold">Retail Product</Link>
            <span>|</span>
            <Link href="/"className="text-base font-bold">Contact Product</Link>
            <span>|</span>
            <Link href="/"className="text-base font-bold">Auction</Link>
          </div>

          {/* Sign In and Sign Up */}
          <ul className="flex">
            <li className="mx-3">
              <Link href="/login">Sign in</Link>
            </li>
            <li className="mx-3">
              <Link href="/register">Sign up</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
