import React from "react";
import { Star, Truck, ShieldCheck, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import getLogin from "../api/getlogin";
//cart insertion 
import { addOrUpdateCart } from "../api/cartApi";




const HomePage = () => {
  const navigate = useNavigate();
  // Example: called when user clicks "Add to Cart"
  const user = getLogin();
  const handleAddToCart = async (productId) => {
    if(!user){
      navigate("/login");
      return;
    }
    const userId = user.uid; // replace with logged-in user ID
    const quantity = 1; // default quantity to add

    try {
      const result = await addOrUpdateCart(userId, productId, quantity);
      console.log("Cart updated:", result);
      alert("Product added to cart!");
    } catch (error) {
      alert("Failed to add product to cart.");
    }
  };
  //end 
  return (
    <div className="bg-gray-50">
      {/* ---------------------- 1. HERO SECTION ---------------------- */}
      <section className="bg-green-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Freshness Delivered to Your Doorstep
        </h1>
        <p className="text-lg md:text-xl mb-6">
          100% fresh and organic vegetables, fruits & groceries.
        </p>
        <button onClick={()=>{navigate("/shop")}} className="bg-white text-green-700 font-semibold py-3 px-8 rounded-lg shadow hover:bg-gray-200 transition">
          Shop Now
        </button>
      </section>

      {/* ---------------------- 2. CATEGORIES ---------------------- */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Shop by Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Vegetables", img: "public/topimage.jpg" },
            { name: "Fruits", img: "public/fruits.jpg" },
            { name: "Dairy Products", img: "public/DairyProducts.jpg" },
            { name: "Organic Groceries", img: "public/organic.jpg" }
          ].map((cat, index) => (
            <div key={index} className="bg-white shadow rounded-lg overflow-hidden hover:scale-105 transition">
              <img src={cat.img} alt={cat.name} className="w-full h-36 object-cover" />
              <h3 className="text-center text-lg font-semibold py-3">{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------- 3. FEATURED PRODUCTS ---------------------- */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Fresh Tomatoes", price: "₹40/kg", img: '/GreenMart2.0/tomatoes.jpg',id:1 },
            { name: "Organic Carrots", price: "₹35/kg", img: "/GreenMart2.0/public/carrot.jpg",id:2 },
            { name: "Green Apples", price: "₹180/kg", img: "public/apple.jpg",id:3 },
            { name: "Milk (1L)", price: "₹55", img: "public/milk.jpg",id:4}
          ].map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
              <img src={product.img} alt={product.name} className="w-full h-40 object-cover rounded" />
              <h3 className="mt-3 font-semibold">{product.name}</h3>
              <p className="text-green-600 font-bold">{product.price}</p>
              <button className="w-full bg-green-500 text-white mt-3 py-2 rounded hover:bg-green-600 transition" 
                onClick={() =>handleAddToCart(product.id)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------- 4. SPECIAL OFFERS ---------------------- */}
      <section className="bg-yellow-300 py-12 text-center px-6">
        <h2 className="text-3xl font-bold mb-2">🔥 Special Offer</h2>
        <p className="text-lg font-semibold mb-3">Get 40% OFF on Fresh Vegetables Today Only!</p>
        <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition">
          Grab Offer
        </button>
      </section>

      {/* ---------------------- 5. WHY CHOOSE US ---------------------- */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose GreenMart?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <Leaf size={50} className="mx-auto text-green-600 mb-4" />
            <h3 className="font-semibold text-xl mb-2">100% Organic</h3>
            <p className="text-gray-600">Fresh and chemical-free products directly from farmers.</p>
          </div>

          <div>
            <Truck size={50} className="mx-auto text-green-600 mb-4" />
            <h3 className="font-semibold text-xl mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Your order delivered within hours.</p>
          </div>

          <div>
            <ShieldCheck size={50} className="mx-auto text-green-600 mb-4" />
            <h3 className="font-semibold text-xl mb-2">Quality Guaranteed</h3>
            <p className="text-gray-600">We handpick the freshest products for you.</p>
          </div>
        </div>
      </section>

      {/* ---------------------- 6. TESTIMONIALS ---------------------- */}
      <section className="bg-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto">
          {[
            { name: "Amit", review: "Super fresh veggies and fast delivery!" },
            { name: "Priya", review: "Loved the packaging and quality. Highly recommend!" },
            { name: "Rahul", review: "Affordable, organic and reliable service." }
          ].map((t, i) => (
            <div key={i} className="bg-gray-100 p-6 rounded-lg shadow">
              <Star className="text-yellow-500 mx-auto mb-2" />
              <p className="italic mb-3">"{t.review}"</p>
              <h4 className="font-semibold text-center">{t.name}</h4>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;