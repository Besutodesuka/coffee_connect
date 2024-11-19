import React from 'react';

function Footer() {
  return (
    <footer 
      className="bg-[#312218] justify-center items-center p-5 text-white text-center">
      <div className="flex-grow text-center p-5">
        <div className="flex flex-col items-center">
          <img
            className="w-32 h-32 object-cover rounded-full"
            src="/Coffee_Connect.svg"
            alt="Profile"
          />
          <p className="text-3xl mt-2">
            <strong>"We connect happiness"</strong>
          </p>
          <p className="text-1xl mt-3">
            We connect coffee farmers and entrepreneurs who are passionate about starting coffee bean-related businesses. By offering quality control, free shipping management and cost, a transparent bidding system, direct trading relations, and the distribution of coffee samples. Coffee Connect ensures a fair solution for sourcing and trading high-quality coffee beans between farmers and entrepreneurs.
          </p>
        </div>
        <div className="mt-5 flex justify-center items-center space-x-3">
          <a href="/login">
            <button className="px-6 py-2 bg-white text-black border border-black rounded-full hover:bg-gray-100 transition duration-200">
              Sign up
            </button>
          </a>
          <a href="">
          <button className="px-6 py-2 bg-white text-black border border-black rounded-full hover:bg-gray-100 transition duration-200">
            Contact
          </button>
          </a>
        </div>
      </div>
      <div className="mt-5 flex justify-center space-x-12">
        <img
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
          src="/Facebook.svg"
          alt="Facebook"
        />
        <img
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
          src="/Instragram.svg"
          alt="Instragram"
        />
        <img
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
          src="/Tiktok.svg"
          alt="Tiktok"
        />
      </div>
    </footer>
  );
}

export default Footer;
