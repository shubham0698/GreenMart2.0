import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 lg:px-20">

      {/* Page Heading */}
      <h1 className="text-4xl font-bold text-green-700 text-center mb-10">
        Contact Us
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Contact Form */}
        <div className="bg-white shadow-lg p-8 rounded-xl">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Send us a message</h2>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            ></textarea>

            <button
              type="submit"
              className="bg-green-600 text-white py-3 px-6 rounded-lg w-full hover:bg-green-700 transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Contact Details */}
        <div>
          <div className="bg-white shadow-lg p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-5">Contact Information</h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-green-600 text-xl" />
                <span className="text-gray-700">+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-green-600 text-xl" />
                <span className="text-gray-700">support@greenmart.com</span>
              </div>

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-green-600 text-xl" />
                <span className="text-gray-700">
                  GreenMart HQ, Pune, Maharashtra, India
                </span>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="bg-white shadow-lg p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Working Hours</h2>
            <p className="text-gray-700">Mon – Fri: 9:00 AM – 7:00 PM</p>
            <p className="text-gray-700">Saturday: 10:00 AM – 5:00 PM</p>
            <p className="text-gray-700">Sunday: Closed</p>
          </div>

          {/* Social Media */}
          <div className="bg-white shadow-lg p-8 rounded-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Follow Us</h2>
            <div className="flex gap-5 text-2xl">
              <FaFacebook className="text-green-600 cursor-pointer hover:text-green-800" />
              <FaInstagram className="text-green-600 cursor-pointer hover:text-green-800" />
              <FaTwitter className="text-green-600 cursor-pointer hover:text-green-800" />
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-14 bg-white shadow-lg rounded-xl overflow-hidden">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.100272482808!2d73.85674387502487!3d18.56168198253874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c10c5f2fa539%3A0xe8402f14a5bc1a1d!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1699200000000!5m2!1sen!2sin"
          width="100%"
          height="400"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h2>

        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8 space-y-5">
          <details className="border-b pb-3 cursor-pointer">
            <summary className="font-semibold text-lg text-gray-800">How long does delivery take?</summary>
            <p className="mt-2 text-gray-600">Delivery usually takes 2–4 hours depending on location.</p>
          </details>

          <details className="border-b pb-3 cursor-pointer">
            <summary className="font-semibold text-lg text-gray-800">Are your vegetables organic?</summary>
            <p className="mt-2 text-gray-600">Yes, all vegetables come from certified organic farmers.</p>
          </details>

          <details className="border-b pb-3 cursor-pointer">
            <summary className="font-semibold text-lg text-gray-800">Do you offer refunds?</summary>
            <p className="mt-2 text-gray-600">If the product is damaged or spoiled, we offer full refunds.</p>
          </details>
        </div>
      </div>
    </div>
  );
};

export default Contact;
