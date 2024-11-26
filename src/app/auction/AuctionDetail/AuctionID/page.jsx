'use client';

import React, { useEffect, useState } from 'react';
import Navbar from "../../../components/navbar";
import Footer from "../../../components/Footer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import StarRate from "../../../components/Grade";

const AuctionDetail = ({ params }) => {
  const { ProductID } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // Quantity state
  const [purchaseType, setPurchaseType] = useState('retail'); // Purchase type state

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) router.push('/login');
  }, [session, status, router]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/search/${ProductID}`);
        if (!res.ok) throw new Error('Failed to fetch product data');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [ProductID]);

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handlePurchaseTypeChange = (type) => {
    setPurchaseType(type);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div>
      <Navbar session={session} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Product Image */}
          <div className="w-1/3">
            <img
              src={product.image || '/Coffee_Product.svg'}
              alt={product.product_name}
              className="rounded-lg w-full"
            />
          </div>

          {/* Auction Details */}
          <div className="w-2/3">
            <div>
              <h1 className="text-2xl font-bold mb-2">{product.product_name}</h1>
              <span className="text-orange-500 text-2xl font-semibold block mb-4">
                ${product.price}
              </span>
              <div className="flex items-center gap-2">
                <StarRate score={product.grade} />
                <span className="text-gray-600">{product.grade} Star Quality</span>
              </div>
            </div>

            {/* Purchase Options */}
            <div className="flex items-center gap-4 mt-4">
              <button
                className={`px-4 py-2 rounded-lg border ${
                  purchaseType === 'retail'
                    ? 'bg-orange-500 text-white'
                    : 'border-gray-600 text-gray-600'
                }`}
                onClick={() => handlePurchaseTypeChange('retail')}
              >
                RETAIL PURCHASE
              </button>
              <button
                className={`px-4 py-2 rounded-lg border ${
                  purchaseType === 'contract'
                    ? 'bg-orange-500 text-white'
                    : 'border-gray-600 text-gray-600'
                }`}
                onClick={() => handlePurchaseTypeChange('contract')}
              >
                CONTRACT
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm font-semibold">Weight:</p>
                <p className="text-gray-600">{product.weight}g</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Coffee beans type:</p>
                <p className="text-gray-600">{product.bean_type}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Region:</p>
                <p className="text-gray-600">{product.region}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Soil type:</p>
                <p className="text-gray-600">{product.soil_type}</p>
              </div>
            </div>

            {/* Quantity Selector and Actions */}
            <div className="mt-6">
              {/* Stock Quantity */}
              <p className="text-gray-600 text-sm font-medium">
                Available Quantity: <span className="font-semibold">{product.quantity}</span>
              </p>

              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center border border-gray-600 rounded-lg">
                  <button
                    className="px-4 py-2 text-gray-600"
                    onClick={() => handleQuantityChange(-1)}
                  >
                    -
                  </button>
                  <span className="px-6 py-2">{quantity}</span>
                  <button
                    className="px-4 py-2 text-gray-600"
                    onClick={() => handleQuantityChange(1)}
                  >
                    +
                  </button>
                </div>
                <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
                  ADD TO CART
                </button>
                <button className="border border-gray-600 px-6 py-2 rounded-lg hover:bg-gray-100">
                  BUY NOW
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold mb-4">Description</h2>
          <p className="text-gray-600">
            {product.description}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuctionDetail;
