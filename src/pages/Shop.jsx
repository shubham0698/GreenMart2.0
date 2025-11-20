import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { addOrUpdateCart } from "../api/cartApi";
import getLogin from "../api/getlogin";

const Shop = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");
   // Example: called when user clicks "Add to Cart"
    const user = getLogin();
    const handleAddToCart = async (productId) => {
      if(!user){
        navigate("/login");
        return;
      }
      const userId = user.uid;//replace with logged-in user ID
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

  // -------------------------------------------------
  // READ SEARCH QUERY FROM URL (?search=apple)
  // -------------------------------------------------
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";  // default empty string

  // -------------------------------------------------
  // FETCH PRODUCTS FROM BACKEND
  // -------------------------------------------------
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
        setAllProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // -------------------------------------------------
  // FILTER + SEARCH + SORT LOGIC
  // -------------------------------------------------
  const filteredProducts = allProducts
    // Category filter
    .filter((product) =>
      filteredCategory === "All"
        ? true
        : product.category === filteredCategory
    )
    // Search filter
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    // Sorting
    .sort((a, b) => {
      if (sortOrder === "low") return a.price - b.price;
      if (sortOrder === "high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6 flex gap-10 w-full mx-auto">

      {/* ---------------- SIDEBAR ---------------- */}
      <aside className="hidden md:block w-60 bg-white shadow rounded-lg p-6 h-fit">
        <h3 className="text-xl font-semibold mb-4">Categories</h3>

        {["All", "Vegetables", "Fruits", "Dairy", "Groceries"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilteredCategory(cat)}
            className={`block w-full text-left px-4 py-2 rounded mb-2 
              ${filteredCategory === cat
                ? "bg-green-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"}`}
          >
            {cat}
          </button>
        ))}
      </aside>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <main className="flex-1">

        {/* Sort Dropdown */}
        <div className="flex justify-end mb-6">
          <select
            className="px-4 py-2 rounded-lg border border-gray-300"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="none">Sort by</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.product_id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-3"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded"
                />

                <h3 className="mt-3 font-semibold text-lg">{product.name}</h3>
                <p className="text-green-600 font-bold">₹{product.price}</p>

                <button className="w-full bg-green-500 text-white mt-3 py-2 rounded hover:bg-green-600 transition"
                  onClick={()=>handleAddToCart(product.product_id)}
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500 text-lg">
              No products found.
            </p>
          )}
        </div>

      </main>
    </div>
  );
};

export default Shop;
