import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // TODO: login API here
    console.log("Login Data:", form);

    navigate("/"); // redirect to home
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 shadow-lg rounded-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded mb-4"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded mb-4"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-gray-700">
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-600 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
