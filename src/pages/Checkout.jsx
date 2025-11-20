import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getLogin from "../api/getlogin";


  //call move api
const handlePlaceOrder = async () => {
  if (!address) {
    alert("Please enter your delivery address.");
    return;
  }
  if (cartItems.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  try {
    const res = await axios.post(`http://localhost:5000/place-order/${userId}`, { address });
    alert("Order placed successfully! Order ID: " + res.data.order_id);
    setCartItems([]); // clear local cart
    navigate("/success");
  } catch (err) {
    console.error("Error placing order:", err);
    alert("Failed to place order.");
  }
};


const Checkout = () => {
  const navigate = useNavigate();
  const user = getLogin();
    if(!user){
      navigate("/login");
      return;
    }
    
    const userId = user.uid; // Replace with dynamic logged-in user ID if available 
  const [isLoggedIn] = useState(true);
  // const [user] = useState({ name: "Shubham", email: "shubham@example.com" });
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");

  // Fetch cart items from server
  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/cart/${userId}`);
      setCartItems(res.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchCart();
    }
  }, [isLoggedIn]);

  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Place order
  const handlePlaceOrder = async () => {
    if (!address) {
      alert("Please enter your delivery address.");
      return;
    }
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/place-order/${userId}`, {
        address
      });
      alert("Order placed successfully!");
      setCartItems([]);
      navigate("/success");
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order.");
    }
  };


  

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-green-700">Checkout</h1>

      {!isLoggedIn ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Login to Continue</h2>
          <button className="bg-green-600 text-white px-4 py-2 rounded w-full">Login</button>
        </div>
      ) : (
        <>
          {/* User Info */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold">Welcome, {user.username}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>

          {/* Delivery Address */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-3">Delivery Address</h2>
            <textarea
              className="border w-full p-3 rounded"
              placeholder="Type your complete delivery address..."
              rows="3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>

          {/* Order Summary */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            {cartItems.map((item) => (
              <div key={item.cart_id} className="flex justify-between border-b py-2">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">₹{item.price * item.quantity}</p>
              </div>
            ))}

            <div className="flex justify-between mt-4 text-lg font-bold">
              <span>Total:</span>
              <span>₹{total}</span>
            </div>
          </div>

          {/* Payment Method */}
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

          {/* Place Order Button */}
          <button
            className="bg-green-600 text-white w-full py-3 text-lg rounded-lg hover:bg-green-700"
            onClick={()=> handlePlaceOrder()}
          >
            Place Order ({cartItems.length} items)
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
