import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      {/* Card */}
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 w-20 h-20 flex items-center justify-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl font-semibold text-green-700 mb-2">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for shopping with us.  
          Your order has been confirmed and will be delivered soon.
        </p>

        {/* Order number (dummy for now) */}
        <div className="bg-gray-100 p-3 rounded-lg mb-6">
          <p className="text-gray-700">
            <span className="font-semibold">Order ID:</span> #GM12345678
          </p>
        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 text-white w-full py-3 rounded-lg text-lg hover:bg-green-700 transition"
        >
          Shop More
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
