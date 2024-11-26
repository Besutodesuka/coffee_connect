"use client";

import { useState, useEffect } from "react";
import Container from "../components/Container";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { useSession } from "next-auth/react";

export default function PaymentPage() {
  const [userId, setUserId] = useState();
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("<Address>");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("<Payment Method>");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // For Confirm Payment Modal
  const [errorMessage, setErrorMessage] = useState(""); // To store error messages

  useEffect(() => {
    if (session && session.user) {
      setUserId(session.user.id); // Assuming userId is stored in session.user.id
    }
  }, [session]);

  useEffect(() => {
    if (userId) {
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
    }
  }, [userId]);
  

  const handleclearCart = async (userId) => {
    try {
      const response = await fetch(`/api/cart/clear?userId=${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to clear cart");
      }
      setCartItems([]); // Clear cart items locally
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };
  

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.productId.price * item.quantity, 0);

  const openAddressModal = () => setIsModalOpen(true);
  const closeAddressModal = () => setIsModalOpen(false);

  const openPaymentMethodModal = () => setIsPaymentMethodModalOpen(true);
  const closePaymentMethodModal = () => setIsPaymentMethodModalOpen(false);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address); // Update the selected address immediately
    closeAddressModal(); // Close the modal after selection
  };

  const handlePaymentMethodSelect = (paymentMethod) => {
    if (paymentMethod === "Credit Card") {
      setSelectedPaymentMethod("Method1"); // Sets to Method1 for Credit Card
    } else if (paymentMethod === "PayPal") {
      setSelectedPaymentMethod("Method2"); // Sets to Method2 for PayPal
    }
    closePaymentMethodModal(); // Close the modal after selection
  };

  const openConfirmPaymentModal = () => {
    if (selectedAddress === "<Address>") {
      setErrorMessage("Please select an address.");
      return;
    }

    if (selectedPaymentMethod === "<Payment Method>") {
      setErrorMessage("Please select a payment method.");
      return;
    }

    setErrorMessage(""); // Clear any previous error messages
    setIsConfirmModalOpen(true);
  };

  const closeConfirmPaymentModal = () => setIsConfirmModalOpen(false);

  const AddressModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Select Address</h2>
        <ul>
          <li className="mb-2">
            Address 1
            <button
              onClick={() => handleAddressSelect("Address 1")}
              className="ml-4 text-blue-600 hover:underline"
            >
              Select
            </button>
          </li>
          <li className="mb-2">
            Address 2
            <button
              onClick={() => handleAddressSelect("Address 2")}
              className="ml-4 text-blue-600 hover:underline"
            >
              Select
            </button>
          </li>
        </ul>
        <button
          onClick={closeAddressModal}
          className="mt-4 w-full bg-gray-200 text-gray-800 rounded-md py-2"
        >
          Close
        </button>
      </div>
    </div>
  );

  const PaymentMethodModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>
        <ul>
          <li className="mb-2">
            Credit Card
            <button
              onClick={() => handlePaymentMethodSelect("Credit Card")}
              className="ml-4 text-blue-600 hover:underline"
            >
              Select
            </button>
          </li>
          <li className="mb-2">
            PayPal
            <button
              onClick={() => handlePaymentMethodSelect("PayPal")}
              className="ml-4 text-blue-600 hover:underline"
            >
              Select
            </button>
          </li>
        </ul>
        <button
          onClick={closePaymentMethodModal}
          className="mt-4 w-full bg-gray-200 text-gray-800 rounded-md py-2"
        >
          Close
        </button>
      </div>
    </div>
  );

  
  

  const Method1ConfirmModal = () => {
    useEffect(() => {
      if (userId) {
        handleclearCart(userId); // Clear the cart after confirming payment
      }
    }, [userId]);
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <p className="text-center text-gray-700 mb-4">Your transaction is completed successfully.</p>
          <div className="flex flex-col space-y-4">
            <a href="/home">
              <button className="w-full bg-green-500 text-white rounded-md py-2">Purchase More</button>
            </a>
            <a href="/cart">
              <button className="w-full bg-gray-200 text-gray-800 rounded-md py-2">Back to the cart</button>
            </a>
          </div>
        </div>
      </div>
    );
  };
  

  const Method2ConfirmModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <p className="text-center text-red-500 mb-4">Your transaction failed. Please try again.</p>
        <button
          onClick={closeConfirmPaymentModal}
          className="w-full bg-red-500 text-white rounded-md py-2"
        >
          Retry Payment
        </button>
      </div>
    </div>
  );

  return (
    <main className="flex flex-col min-h-screen">
      <Container>
        <Navbar session={session} />

        <section className="flex flex-col items-center justify-center flex-grow py-10">
          <div className="w-full max-w-4xl space-y-6 bg-gray-50 p-6 rounded-lg shadow-md">
            {/* Products Section */}
            <div className="border border-gray-300 rounded-lg bg-white">
              <div className="flex items-center justify-between p-4 border-b border-gray-300">
                <h2 className="text-lg font-semibold">Products</h2>
                <div className="grid grid-cols-3 gap-6 text-sm font-semibold text-gray-600 w-1/2 text-center">
                  <span>Price</span>
                  <span>Quantity</span>
                  <span>Sub-Total</span>
                </div>
              </div>

              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <img
                      src="/Coffee_Product.svg"
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <span className="ml-4 text-gray-700">{item.productId.product_name}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-6 w-1/2 text-center">
                    <span className="text-gray-700">${item.productId.price}</span>
                    <span className="text-gray-700">{item.quantity}</span>
                    <span className="text-gray-700 font-medium">${item.productId.price * item.quantity}</span>
                  </div>
                </div>
              ))}

              <div className="flex justify-end p-4 text-lg font-semibold">
                TOTAL: <span className="ml-2 text-orange-600">${calculateSubtotal()}</span>
              </div>
            </div>

            {/* Address Section */}
            <div className="border border-gray-300 rounded-lg bg-white">
              <div className="flex justify-between items-center p-4 border-b border-gray-300">
                <h2 className="text-lg font-semibold">Address</h2>
                <button onClick={openAddressModal} className="text-blue-600 hover:underline">
                  Change
                </button>
              </div>
              <div className="p-4 text-gray-700">{selectedAddress}</div>
            </div>

            {/* Payment Method Section */}
            <div className="border border-gray-300 rounded-lg bg-white">
              <div className="flex justify-between items-center p-4 border-b border-gray-300">
                <h2 className="text-lg font-semibold">Payment Method</h2>
                <button onClick={openPaymentMethodModal} className="text-blue-600 hover:underline">
                  Change
                </button>
              </div>
              <div className="p-4 text-gray-700">{selectedPaymentMethod}</div>
            </div>

            {/* Error Message */}
            {errorMessage && <div className="text-red-600 text-center mt-4">{errorMessage}</div>}

            {/* Confirm Payment Button */}
            <div className="flex justify-center py-4">
            <button
              onClick={openConfirmPaymentModal}
              className="w-auto bg-orange-500 text-white rounded-md px-6 py-3 text-lg font-semibold"
              disabled={!userId} // Disable button if userId is not set
            >
              Confirm Payment ➔
            </button>
            </div>
          </div>
        </section>

        {/* Modals */}
        {isModalOpen && <AddressModal />}
        {isPaymentMethodModalOpen && <PaymentMethodModal />}
        {isConfirmModalOpen && selectedPaymentMethod === "Method1" && <Method1ConfirmModal />}
        {isConfirmModalOpen && selectedPaymentMethod === "Method2" && <Method2ConfirmModal />}
      </Container>
      <Footer />
    </main>
  );
}
