// components/CoffeeCard.jsx
import React from 'react';
import StarRate from './Grade';

function CoffeeCard ({ name, grade, price, image }) {
    // navigate to product details
    return (
      <div className="max-w-sm mx-auto relative rounded-lg">
        <div className="w-full h-auto bg-white rounded-[20px] border-2 border-[#d9d9d9] p-4 flex flex-col items-center">
            {image && <img
            className="w-1/2 max-w-[179px] aspect-square rounded-full"
            src={image}
            alt={name}
          />}
          {/* if no image show placeholder images */}
          {!image && <img
            className="w-1/2 max-w-[179px] aspect-square rounded-full"
            src="https://via.placeholder.com/179x179"
            alt={name}
          />}
          
          <div className="mt-4 text-black text-base sm:text-lg font-normal font-['Public Sans'] text-center">
            {name}
          </div>
          <div className="my-2 text-black text-[24px] sm:text-[32px] font-normal font-['Public Sans']">
            {price} $
          </div>
          <div className="mt-3 w-full flex justify-center">
            <StarRate score={grade} className="mx-3"/>
          </div>
          <div className="mt-3 w-full flex justify-end">
                <button className="text-right text-black text-sm sm:text-lg font-normal font-['Public Sans']">
                Add to cart 
                </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CoffeeCard;
  