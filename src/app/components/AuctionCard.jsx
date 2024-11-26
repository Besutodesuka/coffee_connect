import React from "react";
import Link from "next/link"; // Import the Link component
import StarRate from "./Grade";
import { stringify } from "postcss";

function AuctionCard({ _id, name, grade, price, image }) {
  // Convert product name to a URL-friendly format (lowercase and hyphens instead of spaces)

  return (
    <Link href={`/home/AuctionDetail/${_id}`} passHref>
      <div className="max-w-sm mx-auto relative rounded-lg cursor-pointer">
        <div className="w-full h-auto bg-white rounded-[20px] border-2 border-[#d9d9d9] p-4 flex flex-col items-center">
          {image && (
            <img
              className="w-1/2 max-w-[179px] aspect-square rounded-full"
              src={image}
              alt={name}
            />
          )}
          {/* Show placeholder if no image */}
          {!image && (
            <img
              className="w-1/2 max-w-[179px] aspect-square rounded-full"
              src="https://via.placeholder.com/179x179"
              alt={name}
            />
          )}
          <div className="mt-4 text-black text-base sm:text-lg font-normal font-['Public Sans'] text-center">
            {name}
          </div>
          <div className="mt-4 text-black text-base sm:text-lg font-normal font-['Public Sans'] text-center">
            Current Bid
          </div>
          <div className="my-2 text-black text-[24px] sm:text-[32px] font-normal font-['Public Sans']">
            {price} $
          </div>
          
          <div className="mt-4 text-black text-[24px] sm:text-xl font-normal font-['Public Sans']">
            Ends in:
          </div>
          <div className="mt-3 w-full flex justify-end">
            <Link href={`/home/AuctionDetail/${_id}`} passHref>
              <button
                className="text-right text-black text-sm sm:text-[16px] font-normal font-['Public Sans']"
              >
                Enter Auction
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default AuctionCard;