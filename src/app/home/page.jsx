"use client"
//this site will be market place

import Image from "next/image";
import Container from "../components/Container";
// import {RadioGroup, Radio} from "@nextui-org/react";
import CoffeeCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StarRate from "../components/Grade";

import React, {useEffect, useState, useRef  } from 'react'
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

import { IoIosClose } from "react-icons/io";

function Sidebar({SetQuality, updateFilter, SetMaxPrice, SetMinPrice}) {
  return (
    <aside className="w-full md:w-1/4 lg:w-1/5 px-4 py-10 bg-[#F8F4F1]">
      <form>
      <div className="flex flex-col gap-4">
        <div className="text-[#191c1e] text-xl font-normal font-['Public Sans']">
          QUALITY
        </div>
        <div className="flex flex-col gap-3">
            {[5, 4, 3, 2, 1].map((stars, index) => (
              <div key={index} className="flex col-auto text-black">
                <input
                className="p-2 mx-2"
                  type="radio"  
                  value={stars}
                  id={index} 
                  // checked={}
                  onChange={() => {
                    SetQuality(stars)
                  }}
                />
                <StarRate score={stars}/>
                {(index !== 0) && 
                <label className="mx-2">or more</label>}
              </div>
            ))}
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-[#312218]/50"></div>

      {/* PRICE RANGE */}
      <div className="flex flex-col gap-4">
        <div className="text-[#191c1e] text-xl font-normal font-['Public Sans']">
          PRICE RANGE
        </div>
        <div className="flex items-center gap-3">
          <input
            onChange={(e) => SetMinPrice(e.target.value)} 
            type="number"
            placeholder="Min price"
            className="w-1/2 px-4 py-2 bg-white rounded-sm border border-[#e4e7e9] text-[#76868e] text-base font-normal font-['Public Sans'] focus:outline-none"
          />
          <input
            onChange={(e) => SetMaxPrice(e.target.value)} 
            type="number"
            placeholder="Max price"
            className="w-1/2 px-4 py-2 bg-white rounded-sm border border-[#e4e7e9] text-[#76868e] text-base font-normal font-['Public Sans'] focus:outline-none"
          />
        </div>
        <button onClick={updateFilter}>
            apply
        </button>
      </div>
      </form>
    </aside>
  );
}

export default function Home() {
  const [SortOptions, SetSortOptions] = useState([]);
  const [FilterOptions, SetFilterOptions] = useState([]);

    // Initialize products state
  const [products, setProducts] = useState([]);
  const [MaxPrice, SetMaxPrice] = useState("");
  const [MinPrice, SetMinPrice] = useState("");
  const [Quality, SetQuality] = useState("");

  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login page if not authenticated
  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) router.push('/login');
  }, [session, status, router]);

  // Fetch products when the component mounts
  const hasFetchedProducts = useRef(false);

  useEffect(() => {
    if (hasFetchedProducts.current) return;
    hasFetchedProducts.current = true;

    async function fetchProducts() {
      try {
        const res = await fetch('/api/product/search/queryall', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await res.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    }

    fetchProducts();
  }, []);

  // SetFilterOptions();
  function removeFilter(filter_name){
    const array = FilterOptions.filter((filter) => filter !== filter_name);
    SetFilterOptions(array);
  }

  const updateFilter = (e) =>{
    e.preventDefault();
    var array = [];
    if (MaxPrice && MaxPrice >= 0){
      array.push(`Price <= ${MaxPrice}`)
    }
    if (MinPrice && MinPrice >= 0){
      array.push(`Price >= ${MinPrice}`)
    }
    if (Quality){
      array.push("⭐".repeat(Quality))
    }
    console.log({array})
    SetFilterOptions(array);
  }

  // ! not clear from class diagram pendding review
//   {/* COFFEE BEANS TYPE */}
//   <div className="flex flex-col gap-6">
//   <div className="text-[#191c1e] text-xl font-normal font-['Public Sans']">
//     COFFEE BEANS TYPE
//   </div>
//   <div className="flex flex-col gap-3">
//     {/* {/* Option 1 */}
//     <div className="flex items-center gap-2">
//       <div className="w-5 h-5 bg-[#f98131] rounded-full flex items-center justify-center">
//         <div className="w-2 h-2 bg-white rounded-full"></div>
//       </div>
//       <div className="text-[#191c1e] text-lg font-normal font-['Public Sans']">
//         Arabica
//       </div>
//     </div>
//     {/* Option 2 */}
//     <div className="flex items-center gap-2">
//       <div className="w-5 h-5 bg-white border border-[#c9cfd2] rounded-full"></div>
//       <div className="text-[#475156] text-lg font-normal font-['Public Sans']">
//         Robusta
//       </div>
//     </div>
//   </div>
// </div>

// {/* Divider */}
// <div className="my-6 border-t border-[#312218]/50"></div>

// {/* LOCATION */}
// <div className="flex flex-col gap-4">
//   <div className="text-[#191c1e] text-xl font-normal font-['Public Sans']">
//     LOCATION
//   </div>
//   <div className="flex items-center px-4 py-3 bg-white rounded-sm border border-[#e4e7e9]">
//     <input
//       type="text"
//       placeholder="Search for location"
//       className="flex-grow text-[#76868e] text-lg font-normal font-['Public Sans'] focus:outline-none"
//     />
//     <div className="w-5 h-5">
//       {/* Icon placeholder */}
//     </div>
//   </div>
// </div>

// {/* Divider */}
// <div className="my-6 border-t border-[#312218]/50"></div>

// {/* REGION */}
// <div className="flex flex-col gap-4">
//   <div className="text-[#191c1e] text-xl font-normal font-['Public Sans']">
//     REGION
//   </div>
//   <div className="flex flex-wrap gap-2">
//     {['Northern', 'Northeastern', 'Eastern', 'Central', 'Western', 'Southern'].map(
//       (region, index) => (
//         <button
//           key={index}
//           className={`px-3 py-1.5 rounded-sm border ${
//             region === 'Northern' ? 'border-2 border-[#f98131]' : 'border-[#e4e7e9]'
//           } flex items-center`}
//         >
//           <div
//             className={`${
//               region === 'Northern' ? 'text-[#f98131]' : 'text-[#191c1e]'
//             } text-lg font-normal font-['Public Sans']`}
//           >
//             {region}
//           </div>
//         </button>
//       )
//     )}
//   </div>
// </div>

// {/* Divider */}
// <div className="my-6 border-t border-[#312218]/50"></div>

// {/* SOIL TYPE */}
// <div className="flex flex-col gap-4">
//   <div className="text-[#191c1e] text-xl font-normal font-['Public Sans']">
//     SOIL TYPE
//   </div>
//   <div className="flex flex-col gap-3">
//     {['Peat-based Soil', 'Coconut Coir', 'Compost', 'Sand-Based Soil'].map(
//       (soilType, index) => (
//         <div key={index} className="flex items-center gap-2">
//           <div
//             className={`w-5 h-5 ${
//               soilType === 'Peat-based Soil'
//                 ? 'bg-[#f98131]'
//                 : 'bg-white border border-[#c9cfd2]'
//             } rounded-full flex items-center justify-center`}
//           >
//             {soilType === 'Peat-based Soil' && (
//               <div className="w-2 h-2 bg-white rounded-full"></div>
//             )}
//           </div>
//           <div
//             className={`${
//               soilType === 'Peat-based Soil' ? 'text-[#191c1e]' : 'text-[#475156]'
//             } text-lg font-normal font-['Public Sans']`}
//           >
//             {soilType}
//           </div>
//         </div>
//       )
//     )}
//   </div>
// </div>

// {/* Divider */}
// <div className="my-6 border-t border-[#312218]/50"></div>
          //  <div className="flex flex-col gap-3">
          //   {['All Price', 'Under $20', '$25 to $100', '$100 to $300'].map((priceRange, index) => (
          //     <div key={index} className="flex items-center gap-2">
          //       <div className="w-5 h-5 bg-white border border-[#c9cfd2] rounded-full"></div>
          //       <div className="text-[#475156] text-lg font-normal font-['Public Sans']">
          //         {priceRange}
          //       </div>
          //     </div>
          //   ))}
          // </div> 
  
  function FilterBar({length, FilterOptions, removeFilter }) {

    // this object is used to visualize the option from the sidebar
    return (
      <div>
        {/* Sort Options */}
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-4">
            <div className="text-[#191c1e] text-lg font-normal font-['Public Sans']">
              Sort by:
            </div>
            {/* //TODO: add sorting option */}
            <div className="relative">
              <select 
              className="block appearance-none w-full bg-white border border-[#e4e7e9] px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onSelect={(e) => SetSortOptions(e.target.value)} 
              >
                <option>grade</option>
                <option>price</option>
                {/* Other options */}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                {/* Down Arrow Icon */}
                
                {/* Replace with actual icon */}
              </div>
            </div>
          </div>
          {/* Results Found */}
          <div>
            <span className="text-[#191c1e] text-base font-normal font-['Public Sans']">
              {length}
            </span>
            <span className="text-[#5f6c72] text-base font-normal font-['Public Sans']">
              {' '}
              Results found.
            </span>
          </div>
        </div>
  
        {/* Active Filters */}
      {<div className="bg-[#f2f3f4] p-3 rounded-lg flex items-center gap-4 flex-wrap">
        <div className="text-[#5f6c72] text-lg font-normal font-['Public Sans']">
          Active Filters:
        </div>
        {/* Active Filter Tags */}
        {FilterOptions && FilterOptions.map(
          (filter, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <div className='flex col-auto rounded-3xl p-2 bg-green-200'>
                <label classname="mx-2">{filter}</label>
                <button onClick={() => removeFilter(filter)}>
                    <IoIosClose />
                </button>
              </div>
            </div>
          ))}
      </div>}
      </div>
    );
  }
  
  function ProductsGrid({products}) {
    // TODO: Implement querySelector
    console.log({products});
  
    return (
      <div>
        {/* Sort and Filter Bar visuallized from sequence diagram 3.1 https://www.notion.so/Class-sequnece-diagram-Use-case-Refine-Market-Place-827eb8336d9442739e23d949153f8509?pvs=4*/}
        <FilterBar 
        length = {products.length}
        FilterOptions={FilterOptions}
        removeFilter={removeFilter}
        />
  
        {/* Product Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products && products.map((product, index) => (
            <CoffeeCard 
            key = {index}
            name={product.product_name}
            image={null} 
            grade={product.grade}
            price={product.price}
              />
          ))}
          {/* Duplicate the ProductCard component with different data as needed */}
        </div>
      </div>
    );
  }
  // TODO: make product query possible
  // Check if the user is logged in

  // While the session is loading, you might want to render a loading state
  // if (status === 'loading') {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="bg-[#F8F4F1]">
        <Navbar session={session} />
        {/* Main Content */}
        <div className="flex flex-wrap">
          {/* Sidebar */}
          <Sidebar 
          SetQuality={SetQuality}
          updateFilter={updateFilter}
          SetMaxPrice={SetMaxPrice}
          SetMinPrice={SetMinPrice}
          />
          {/* Products Section */}
          <div className="w-full md:w-3/4 lg:w-4/5 px-4">
            <ProductsGrid products={products}/>
          </div>
        </div>
        <Footer />
    </div>
  );
}