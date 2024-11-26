"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { useSession } from "next-auth/react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(); // Assuming userId is hardcoded for now; fetch from context or authentication
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session && session.user) {
      setUserId(session.user.id); // Assuming userId is stored in session.user.id
    }
  }, [session]);
  // Fetch cart items from the API based on userId
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`/api/cart/showcart?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [userId]);

  const handleUpdateCart = async () => {
    if (!userId) return;

    try {
      const response = await fetch(`/api/cart/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          cartItems: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update cart");
      }

      const data = await response.json();
      console.log(data.message); // Display success message
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleRemoveItem = async (id, productId) => {
    try {
      const response = await fetch(`/api/cart/remove`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          productId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }

      // Update the UI by filtering out the removed item
      setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
      
      const data = await response.json();
      handleUpdateCart();

      console.log(data.message); // Display success message
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  useEffect(() => {
    if (cartItems.length > 0 && userId) {
      handleUpdateCart();
    }
  }, [cartItems]); 


  const handleQuantityChange = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  // const handleRemoveItem = (id) => {
  //   setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  // };

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.productId.price * item.quantity, 0);

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
                    <tr key={item._id} className="border-b">
                      <td className="py-4 flex items-center">
                        <img
                          src="/Coffee_Product.svg"
                          alt={item.name}
                          className="w-12 h-12 rounded-lg mr-4"
                        />
                        <span>{item.productId.product_name}</span>
                      </td>
                      <td className="text-center py-4">${item.productId.price}</td>
                      <td className="text-center py-4">
                        <div className="flex items-center justify-center">
                          <button
                            className="px-2 py-1 border rounded-lg text-gray-600"
                            onClick={() => handleQuantityChange(item._id, -1)}
                          >
                            -
                          </button>
                          <span className="px-4">{item.quantity}</span>
                          <button
                            className="px-2 py-1 border rounded-lg text-gray-600"
                            onClick={() => handleQuantityChange(item._id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="text-center py-4">
                        ${item.productId.price * item.quantity}
                      </td>
                      <td className="text-center py-4">
                        <button
                          className="text-red-500"
                          onClick={() => handleRemoveItem(item._id, item.productId)}
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
                <button
                  className="border px-4 py-2 rounded-lg"
                  onClick={handleUpdateCart}
                >
                  Update Cart
                </button>
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
                <a href="/payment">
                <button className="bg-orange-500 text-white px-6 py-2 rounded-lg w-full hover:bg-orange-600">
                  Make Payment
                </button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
