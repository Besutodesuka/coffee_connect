"use client";

import React, { useEffect, useState, useRef } from "react";
import Container from "./components/Container";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import { useSession } from "next-auth/react";
import CoffeeCard from "./components/ProductCard";

export default function Home() {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const hasFetchedProducts = useRef(false);

  async function fetchProducts() {
    try {
      const res = await fetch("/api/product/search/queryall", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      console.log(data);

      if (Array.isArray(data)) {
        setProducts(data);
      } else if (Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        throw new Error("invalid error type");
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }

  useEffect(() => {
    if (hasFetchedProducts.current) return;
    hasFetchedProducts.current = true;

    fetchProducts();
  }, []);

  return (
    <main className="flex flex-col min-h-screen">
      <Container>
        <Navbar session={session} />

        {/* First section */}
        <div
          className="flex-grow text-center p-5 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/HomeBG.svg')" }}
        >
          <div className="flex flex-col items-center my-5">
            <p className="text-5xl">
              <strong>"We connect happiness"</strong>
            </p>
            <br></br>
            <img
              className="my-5 w-57 h-57 object-cover rounded-full"
              src="/Coffee_Connect.svg"
              alt="Profile"
            />
          </div>
        </div>

        {/* Second section */}
        <div className="flex-grow text-center p-5">
          <br></br>
          <h3 className="text-3xl">
            <strong>What is Coffee Connect?</strong>
          </h3>
          <p className="text-1xl mt-3">
            We connect coffee farmers and entrepreneurs who are passionate about
            starting coffee bean-related businesses. By offering quality
            control, free shipping management and cost, a transparent bidding
            system, direct trading relations, and the distribution of coffee
            samples. Coffee Connect ensures a fair solution for sourcing and
            trading high-quality coffee beans between farmers and entrepreneurs.
          </p>
        </div>

        <div>
          <br></br>
          <br></br>
          <h3 className="text-3xl px-10">
            <strong>Recommend Products</strong>
          </h3>
          {/* Product Grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products &&
              products
                .slice(0, 3)
                .map((product, index) => (
                  <CoffeeCard
                    key={index}
                    _id={product._id}
                    name={product.product_name}
                    image="/Coffee_Product.svg"
                    grade={product.grade}
                    price={product.price}
                  />
                ))}
            {/* Duplicate the ProductCard component with different data as needed */}
          </div>
          <br></br>
          <a href="/home">
            <div className="flex justify-center mt-6">
              <button className="flex flex-col items-center px-6 py-2 bg-[#312218] text-white border border-[#312218] rounded-md hover:bg-[#312218] transition duration-200">
                View all products
              </button>
            </div>
          </a>
          <br></br>
        </div>

        <Footer />
      </Container>
    </main>
  );
}
