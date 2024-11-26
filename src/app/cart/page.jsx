"use client";
import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Coffee Name",
      price: 10,
      quantity: 1,
      image: "/Coffee_Product.svg", // Example image path
    },
  ]);



  const handleQuantityChange = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Your cart is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Products</th>
                    <th className="text-center py-2">Price</th>
                    <th className="text-center py-2">Quantity</th>
                    <th className="text-center py-2">Sub-Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-4 flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg mr-4"
                        />
                        <span>{item.name}</span>
                      </td>
                      <td className="text-center py-4">${item.price}</td>
                      <td className="text-center py-4">
                        <div className="flex items-center justify-center">
                          <button
                            className="px-2 py-1 border rounded-lg text-gray-600"
                            onClick={() => handleQuantityChange(item.id, -1)}
                          >
                            -
                          </button>
                          <span className="px-4">{item.quantity}</span>
                          <button
                            className="px-2 py-1 border rounded-lg text-gray-600"
                            onClick={() => handleQuantityChange(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="text-center py-4">
                        ${item.price * item.quantity}
                      </td>
                      <td className="text-center py-4">
                        <button
                          className="text-red-500"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          &times;
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
                <div className="mt-4 flex justify-between">
                  <a href="/home">
                    <button className="text-orange-500 font-semibold hover:underline">
                      &#8592; Return to Shop
                    </button>
                  </a>
                  <button className="border px-4 py-2 rounded-lg">Update Cart</button>
              </div>
            </div>

            {/* Summary Section */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Cart Totals</h2>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span>Sub-total:</span>
                  <span>${calculateSubtotal()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg mb-4">
                  <span>Total:</span>
                  <span>${calculateSubtotal()}</span>
                </div>
                <button className="bg-orange-500 text-white px-6 py-2 rounded-lg w-full hover:bg-orange-600">
                  Make Payment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AddToCart;
