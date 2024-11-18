import React from 'react';

function Footer() {
  return (
    <footer 
      className="bg-[#333] justify-center items-center p-5 text-white text-center">
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
      </div>
      <p className="mt-2">Copyright 2024.</p>
    </footer>
  );
}

export default Footer;
