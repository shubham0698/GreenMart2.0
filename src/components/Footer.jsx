import React from "react";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 pt-16 pb-10">
      {/* Top Section */}
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12">

        {/* Brand Section */}
        <div className="lg:col-span-2">
          <h3 className="text-3xl font-extrabold text-green-400 mb-4">GreenMart</h3>
          <p className="text-gray-400 mb-6">
            Your trusted destination for 100% fresh and organic vegetables & fruits.
          </p>

          {/* Contact Info */}
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-center gap-2">
              <MapPin size={18} className="text-green-400" />
              Pune, Maharashtra, India
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} className="text-green-400" />
              +91 9876543210
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-green-400" />
              support@greenmart.com
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-green-400 transition">Home</a></li>
            <li><a href="#products" className="hover:text-green-400 transition">Shop</a></li>
            <li><a href="#" className="hover:text-green-400 transition">About Us</a></li>
            <li><a href="#" className="hover:text-green-400 transition">FAQs</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Customer Service</h4>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-green-400 transition">Contact Us</a></li>
            <li><a href="#" className="hover:text-green-400 transition">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-green-400 transition">Returns</a></li>
            <li><a href="#" className="hover:text-green-400 transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Stay Updated</h4>
          <p className="text-gray-400 mb-4">
            Subscribe to get the latest deals and exclusive offers.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l-lg outline-none bg-gray-800 text-gray-200"
            />
            <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-r-lg text-white font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 mt-12 pt-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

          {/* Social Icons */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="hover:text-green-400 transition"><Facebook size={22} /></a>
            <a href="#" className="hover:text-green-400 transition"><Instagram size={22} /></a>
            <a href="#" className="hover:text-green-400 transition"><Twitter size={22} /></a>
            <a href="#" className="hover:text-green-400 transition"><Linkedin size={22} /></a>
          </div>

          <p className="text-gray-500 text-center">
            © {new Date().getFullYear()} <span className="text-green-400">GreenMart</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
