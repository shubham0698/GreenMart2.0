import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import getLogin from "../api/getlogin";

const Cart = () => {
  const navigate = useNavigate();
  const user = getLogin();
  if(!user){
    navigate("/login");
    return;
  }
  
  const userId = user.uid; // Replace with dynamic logged-in user ID if available

  const [cartItems, setCartItems] = useState([]);

  // ---------- Fetch cart from backend ----------
  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/cart/${userId}`);
      setCartItems(res.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ---------- Update quantity ----------
  const updateQuantity = async (product_id, qty) => {
    try {
      await axios.post("http://localhost:5000/cart", {
        user_id: userId,
        product_id,
        quantity: qty,
      });
      fetchCart(); // refresh cart
    } catch (err) {
      console.error("Error updating cart:", err);
    }
  };

  // ---------- Remove item ----------
  const removeItem = (product_id) => updateQuantity(product_id, 0);

  // ---------- Total Price ----------
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-3xl font-bold mb-6">🛒 Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600 text-xl py-10">
            Oops! Your cart is empty.
          </p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item.cart_id}
                className="flex items-center justify-between border-b py-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />

                <div className="flex-1 ml-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-green-600 font-bold">₹{item.price}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.product_id, item.quantity - 1)
                    }
                    className="px-3 py-1 bg-gray-300 rounded"
                  >
                    -
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product_id, item.quantity + 1)
                    }
                    className="px-3 py-1 bg-gray-300 rounded"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.product_id)}
                  className="ml-4 text-red-500 font-semibold"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="mt-6">
              <h3 className="text-xl font-bold">
                Total: <span className="text-green-600">₹{totalPrice}</span>
              </h3>

              <button
                className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
                onClick={() => {
                  navigate("/checkout");
                }}
              >
                Proceed to Buy ({cartItems.length} item
                {cartItems.length > 1 ? "s" : ""})
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
