import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
    landmark: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userData = {
        fullname: form.name,
        email: form.email,
        password: form.password,
        phone: form.mobile,
        address: form.address + " | Landmark: " + form.landmark,
        pin: form.pincode,
        city: form.city,
        state: form.state,
      };

      const res = await axios.post("http://localhost:5000/register", userData);

      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 shadow-lg rounded-xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Create Your Account</h2>

        <form onSubmit={handleSignup}>
          {/* SAME FORM UI - NO CHANGES */}


          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 border rounded mb-4"
            onChange={handleChange}
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded mb-4"
            onChange={handleChange}
            required
          />

          {/* Mobile */}
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            className="w-full p-3 border rounded mb-4"
            onChange={handleChange}
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded mb-4"
            onChange={handleChange}
            required
          />

          {/* Confirm Password */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-3 border rounded mb-4"
            onChange={handleChange}
            required
          />

          <h3 className="text-xl font-semibold mb-3">Delivery Details</h3>

          {/* Address */}
          <textarea
            name="address"
            placeholder="Full Address (House No, Street, Area)"
            className="w-full p-3 border rounded mb-4"
            rows="3"
            onChange={handleChange}
            required
          ></textarea>

          {/* Pincode */}
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            className="w-full p-3 border rounded mb-4"
            onChange={handleChange}
            required
          />

          {/* City */}
          <input
            type="text"
            name="city"
            placeholder="City"
            className="w-full p-3 border rounded mb-4"
            onChange={handleChange}
            required
          />

          {/* State */}
          <input
            type="text"
            name="state"
            placeholder="State"
            className="w-full p-3 border rounded mb-4"
            onChange={handleChange}
            required
          />

          {/* Landmark */}
          <input
            type="text"
            name="landmark"
            placeholder="Landmark (Optional)"
            className="w-full p-3 border rounded mb-4"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg text-lg hover:bg-green-700 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center mt-4 text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
