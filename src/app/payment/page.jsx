"use client";

import { useState } from "react";
import Container from "../components/Container";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { useSession } from "next-auth/react";

export default function PaymentPage() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("<Address>");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("<Payment Method>");
  const [tempAddress, setTempAddress] = useState("");
  const [tempPaymentMethod, setTempPaymentMethod] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);  // For Confirm Payment Modal
  const [errorMessage, setErrorMessage] = useState("");  // To store error messages

  const openAddressModal = () => setIsModalOpen(true);
  const closeAddressModal = () => setIsModalOpen(false);

  const openPaymentMethodModal = () => setIsPaymentMethodModalOpen(true);
  const closePaymentMethodModal = () => setIsPaymentMethodModalOpen(false);

  const handleAddressSelect = (address) => {
    setTempAddress(address);
  };

  const handlePaymentMethodSelect = (method) => {
    setTempPaymentMethod(method);
  };

  const saveAddressChanges = () => {
    setSelectedAddress(tempAddress);
    closeAddressModal();
  };

  const savePaymentMethodChanges = () => {
    setSelectedPaymentMethod(tempPaymentMethod);
    closePaymentMethodModal();
  };

  const openConfirmPaymentModal = () => {
    // Validate address selection
    if (selectedAddress !== "Address1" && selectedAddress !== "Address2") {
      setErrorMessage("Please select address.");
      return;
    }

    // Validate payment method selection
    if (selectedPaymentMethod !== "Method1" && selectedPaymentMethod !== "Method2") {
      setErrorMessage("Please select payment method.");
      return;
    }

    // If both address and payment method are valid, open the confirm modal
    setErrorMessage("");  // Clear any previous error messages
    setIsConfirmModalOpen(true);
  };

  const closeConfirmPaymentModal = () => {
    setIsConfirmModalOpen(false);  // Close the confirm modal
  };

  // Define modals for each payment method
  const Method1ConfirmModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <div className="space-y-4">
          <p className="text-center text-black">Your transaction is completed. You can see your order status in <strong>purchase history</strong> under your profile.</p>
          <div className="flex flex-col space-y-4">
            <a href="/">
            <button className="w-full border-2 border-black bg-[#312218] text-white rounded-md p-2 text-center">Purchase more</button>
            </a>
            <a href="/">
            <button className="w-full border-2 border-black bg-white text-black rounded-md p-2 text-center">History</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  const Method2ConfirmModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <div className="space-y-4">
          <p className="text-center text-red-500">Your transaction is failed.</p>
          <div className="flex flex-col space-y-4">
            <button 
                onClick={closeConfirmPaymentModal}
                className="w-full border-2 border-black bg-[#312218] text-white rounded-md p-2 text-center"
            >
                Pay again
            </button>
            <a href="/">
                <button className="w-full border-2 border-black bg-white text-black rounded-md p-2 text-center">Home</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <main className="flex flex-col min-h-screen">
      <Container>
        <Navbar session={session} />

        {/* Page Content */}
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

              <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <img
                    src="/Coffee_Product.svg"
                    alt="Coffee Product"
                    className="w-16 h-16 object-cover rounded"
                  />
                  <span className="ml-4 text-gray-700">&lt;coffee name&gt;</span>
                </div>
                <div className="grid grid-cols-3 gap-6 w-1/2 text-center">
                  <span className="text-gray-700">$10</span>
                  <span className="text-gray-700">01</span>
                  <span className="text-gray-700 font-medium">$10</span>
                </div>
              </div>

              <div className="flex justify-end p-4 text-lg font-semibold">
                TOTAL: <span className="ml-2 text-orange-600">$10</span>
              </div>
            </div>

            {/* Address Section */}
            <div className="border border-gray-300 rounded-lg bg-white">
              <div className="flex justify-between items-center p-4 border-b border-gray-300">
                <h2 className="text-lg font-semibold">Address</h2>
                <button
                  onClick={openAddressModal}
                  className="text-blue-600 hover:underline"
                >
                  Change
                </button>
              </div>
              <div className="p-4 text-gray-700">{selectedAddress}</div>
            </div>

            {/* Payment Method Section */}
            <div className="border border-gray-300 rounded-lg bg-white">
              <div className="flex justify-between items-center p-4 border-b border-gray-300">
                <h2 className="text-lg font-semibold">Payment Method</h2>
                <button
                  onClick={openPaymentMethodModal}
                  className="text-blue-600 hover:underline"
                >
                  Change
                </button>
              </div>
              <div className="p-4 text-gray-700">{selectedPaymentMethod}</div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="text-red-600 text-center mt-4">
                {errorMessage}
              </div>
            )}

            {/* Confirm Payment Button */}
            <div className="flex justify-center py-4">
              <button
                onClick={openConfirmPaymentModal}
                className="w-auto bg-orange-500 text-white rounded-md px-6 py-3 text-lg font-semibold"
              >
                Confirm Payment ➔
              </button>
            </div>
          </div>
        </section>

        {/* Address Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
              <div className="space-y-4">
                <button
                  onClick={() => handleAddressSelect("Address1")}
                  className={`w-full border-2 ${tempAddress === "Address1" ? "border-orange-500" : "border-gray-300"} rounded-md p-2 text-left`}
                >
                  Address1
                </button>
                <button
                  onClick={() => handleAddressSelect("Address2")}
                  className={`w-full border-2 ${tempAddress === "Address2" ? "border-orange-500" : "border-gray-300"} rounded-md p-2 text-left`}
                >
                  Address2
                </button>
                <button className="w-full border border-gray-300 rounded-md p-2 text-gray-500 hover:bg-gray-100">
                  Add more address
                </button>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={saveAddressChanges}
                  className="bg-[#312218] text-white rounded-md px-3 py-2 text-sm"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Payment Method Modal */}
        {isPaymentMethodModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
              <div className="space-y-4">
                <button
                  onClick={() => handlePaymentMethodSelect("Method1")}
                  className={`w-full border-2 ${tempPaymentMethod === "Method1" ? "border-orange-500" : "border-gray-300"} rounded-md p-2 text-left`}
                >
                  Method1
                </button>
                <button
                  onClick={() => handlePaymentMethodSelect("Method2")}
                  className={`w-full border-2 ${tempPaymentMethod === "Method2" ? "border-orange-500" : "border-gray-300"} rounded-md p-2 text-left`}
                >
                  Method2
                </button>
                <button className="w-full border border-gray-300 rounded-md p-2 text-gray-500 hover:bg-gray-100">
                  Add more address
                </button>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={savePaymentMethodChanges}
                  className="bg-[#312218] text-white rounded-md px-3 py-2 text-sm"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirm Payment Modals */}
        {isConfirmModalOpen && selectedPaymentMethod === "Method1" && <Method1ConfirmModal />}
        {isConfirmModalOpen && selectedPaymentMethod === "Method2" && <Method2ConfirmModal />}

      </Container>
      <Footer />
    </main>
  );
}
