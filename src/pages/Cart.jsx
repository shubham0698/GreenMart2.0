import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const navigate = useNavigate();
  // ---------- DUMMY DATA (Replace later with API) ----------
  const dummyCart = [
    { id: 1, name: "Tomatoes", price: 40, category: "Vegetables", img: "public/tomatoes.jpg", quantity: 1 },
    { id: 2, name: "Potatoes", price: 30, category: "Vegetables", img: "public/potato.jpg", quantity: 2 },
    { id: 3, name: "Green Apples", price: 180, category: "Fruits", img: "public/apple.jpg", quantity: 1 },
    { id: 3, name: "Green Apples", price: 180, category: "Fruits", img: "public/apple.jpg", quantity: 1 }
    
  ];

  // save in state so quantity can update
  const [cartItems, setCartItems] = useState(dummyCart);

  // ---------- Update quantity ----------
  const updateQuantity = (id, qty) => {
    if (qty <= 0) return removeItem(id);

    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  // ---------- Remove item ----------
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // ---------- Total Price ----------
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">

        <h2 className="text-3xl font-bold mb-6">🛒 Your Cart</h2>

        {/* -------- EMPTY CART MESSAGE -------- */}
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600 text-xl py-10">
             Oops! Your cart is empty.
          </p>
        ) : (
          <>
            {/* -------- CART ITEMS -------- */}
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b py-4"
              >
                {/* Image */}
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />

                {/* Name + Price */}
                <div className="flex-1 ml-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-green-600 font-bold">₹{item.price}</p>
                </div>

                {/* Quantity Update */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 bg-gray-300 rounded"
                  >
                    -
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 bg-gray-300 rounded"
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-4 text-red-500 font-semibold"
                >
                  Remove
                </button>
              </div>
            ))}

            {/* -------- TOTAL + BUTTON -------- */}
            <div className="mt-6">
              <h3 className="text-xl font-bold">
                Total: <span className="text-green-600">₹{totalPrice}</span>
              </h3>

              <button className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition" 
                onClick={()=>{navigate("/checkout")}}
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
