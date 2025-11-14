import React from "react";
import { FaLeaf, FaTruck, FaSmile, FaUsers } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 lg:px-20">

      {/* Header */}
      <h1 className="text-4xl font-bold text-green-700 text-center mb-10">
        About GreenMart
      </h1>

      {/* Section 1: Intro */}
      <section className="max-w-4xl mx-auto text-center mb-16">
        <p className="text-gray-700 text-lg leading-relaxed">
          GreenMart is committed to delivering fresh, organic, and locally sourced vegetables 
          straight from the farm to your doorstep. We believe in healthy eating, sustainable 
          farming, and building a community that values purity and freshness.
        </p>
      </section>

      {/* Section 2: Our Story */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed">
            GreenMart was founded with a simple goal — to make fresh and organic vegetables
            accessible to every home. It started as a small local delivery service and
            has now grown into a trusted platform connecting thousands of families with 
            certified organic farmers.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            From sourcing to packaging to doorstep delivery, our process ensures freshness
            and quality at every step.
          </p>
        </div>

        <img
          src="https://images.unsplash.com/photo-1542834369-f10ebf06d3af"
          alt="Farm"
          className="rounded-2xl shadow-lg"
        />
      </section>

      {/* Section 3: What Makes Us Different */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          What Makes Us Different
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          
          <div className="bg-white p-8 shadow rounded-xl hover:shadow-lg transition">
            <FaLeaf className="text-green-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">100% Organic</h3>
            <p className="text-gray-600">Chemical-free, fresh vegetables from certified farms.</p>
          </div>

          <div className="bg-white p-8 shadow rounded-xl hover:shadow-lg transition">
            <FaTruck className="text-green-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Fresh produce delivered within hours.</p>
          </div>

          <div className="bg-white p-8 shadow rounded-xl hover:shadow-lg transition">
            <FaSmile className="text-green-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Customer Satisfaction</h3>
            <p className="text-gray-600">Trusted by thousands of happy families.</p>
          </div>

          <div className="bg-white p-8 shadow rounded-xl hover:shadow-lg transition">
            <FaUsers className="text-green-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Local Farmers</h3>
            <p className="text-gray-600">Supporting local farming communities.</p>
          </div>
        </div>
      </section>

      {/* Section 4: Stats / Achievements */}
      <section className="bg-white shadow-lg p-10 rounded-2xl mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Our Achievements
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">

          <div>
            <h3 className="text-4xl font-bold text-green-700 mb-2">20K+</h3>
            <p className="text-gray-600">Happy Customers</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-green-700 mb-2">150+</h3>
            <p className="text-gray-600">Partner Farmers</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-green-700 mb-2">5+ Years</h3>
            <p className="text-gray-600">Delivering Freshness</p>
          </div>

        </div>
      </section>

      {/* Section 5: Our Team */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Meet Our Team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <img
              src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe"
              className="w-28 h-28 mx-auto rounded-full mb-4"
              alt="team"
            />
            <h3 className="text-xl font-bold">Shubham Patil</h3>
            <p className="text-gray-600">Founder & CEO</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
              className="w-28 h-28 mx-auto rounded-full mb-4"
              alt="team"
            />
            <h3 className="text-xl font-bold">Riya Sharma</h3>
            <p className="text-gray-600">Operations Head</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <img
              src="https://images.unsplash.com/photo-1603415526960-f7e0328f663c"
              className="w-28 h-28 mx-auto rounded-full mb-4"
              alt="team"
            />
            <h3 className="text-xl font-bold">Aman Verma</h3>
            <p className="text-gray-600">Marketing Lead</p>
          </div>

        </div>
      </section>

      {/* Section 6: Call to Action */}
      <section className="text-center mb-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Want Fresh Veggies?</h2>
        <p className="text-gray-600 mb-6">Start your healthy lifestyle today with GreenMart.</p>

        <a
          href="/shop"
          className="bg-green-600 text-white py-3 px-8 rounded-lg text-lg hover:bg-green-700 transition"
        >
          Shop Now
        </a>
      </section>

    </div>
  );
};

export default About;
