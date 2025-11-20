import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const navigate = useNavigate();

  // Dummy login state -> change later using context/API
  const [isLoggedIn] = useState(true);
  const [user] = useState({ name: "Shubham", email: "shubham@example.com" });

  // Dummy cart (replace with API later)
  const cartItems = [
    { id: 1, name: "Tomatoes", price: 40, qty: 2 },
    { id: 2, name: "Milk (1L)", price: 55, qty: 1 },
    { id: 3, name: "Bananas", price: 60, qty: 1 },
  ];

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      
      <h1 className="text-3xl font-semibold mb-6 text-green-700">
        Checkout
      </h1>

      {/* ===================== IF NOT LOGGED IN ===================== */}
      {!isLoggedIn ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Login to Continue</h2>
          {/* <input
            type="email"
            placeholder="Enter Email"
            className="border w-full p-2 rounded mb-3"
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="border w-full p-2 rounded mb-4"
          /> */}
          <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
            Login
          </button>
        </div>
      ) : (
        <>
          {/* ===================== USER SECTION ===================== */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold">Welcome, {user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>

          {/* ===================== ADDRESS SECTION ===================== */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-3">Delivery Address</h2>
            <textarea
              className="border w-full p-3 rounded"
              placeholder="Type your complete delivery address..."
              rows="3"
            ></textarea>
          </div>

          {/* ===================== CART SUMMARY ===================== */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b py-2"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                </div>
                <p className="font-semibold">
                  ₹{item.price * item.qty}
                </p>
              </div>
            ))}

            <div className="flex justify-between mt-4 text-lg font-bold">
              <span>Total:</span>
              <span>₹{total}</span>
            </div>
          </div>

          {/* ===================== PAYMENT SECTION ===================== */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-3">Payment Method</h2>

            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" /> Cash on Delivery
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" /> UPI Payment
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" /> Debit / Credit Card
              </label>
            </div>
          </div>

          {/* ===================== BUTTON ===================== */}
          <button
            className="bg-green-600 text-white w-full py-3 text-lg rounded-lg hover:bg-green-700"
            onClick={()=>{navigate('/success')}}
          >
            Place Order ( {cartItems.length} items )
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
