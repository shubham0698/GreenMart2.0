import React, { useEffect, useState } from "react";
import axios from "axios";
import getLogin from "../api/getlogin";


const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const user = getLogin();
    if(!user){
      navigate("/login");
      return;
    }    
    const userId = user.uid; // Replace with dynamic logged-in user ID if available

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/my-orders/${userId}`);
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-green-700">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-lg">You have no orders yet.</p>
      ) : (
        orders.map(order => (
          <div key={order.order_id} className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-2">Order #{order.order_id}</h2>
            <p className="text-gray-600 mb-2">
              Placed on: {new Date(order.created_at).toLocaleString()}
            </p>
            <p className="text-gray-600 mb-2">Payment: {order.payment_status}</p>
            <p className="text-gray-600 mb-4">Status: {order.order_status}</p>

            <div className="border-t pt-2">
              {order.items.map(item => (
                <div key={item.order_item_id} className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-4 text-lg font-bold">
              <span>Total:</span>
              <span>₹{order.total_amount}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
