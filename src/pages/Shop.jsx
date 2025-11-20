import React, { useState } from "react";

const Shop = () => {
  // Dummy product list (later replace with API data)
  const allProducts = [
  { id: 1, name: "Tomatoes", price: 40, category: "Vegetables", img: "public/tomatoes.jpg" },
  { id: 2, name: "Potatoes", price: 30, category: "Vegetables", img: "public/potato.jpg" },
  { id: 3, name: "Carrots", price: 35, category: "Vegetables", img: "public/carrots.jpg" },
  { id: 4, name: "Green Apples", price: 180, category: "Fruits", img: "public/apple.jpg" },
  { id: 5, name: "Bananas", price: 60, category: "Fruits", img: "public/banana.jpg" },
  { id: 6, name: "Milk (1L)", price: 55, category: "Dairy", img: "public/milk.jpg" },
  { id: 7, name: "Paneer", price: 90, category: "Dairy", img: "public/paneer.jpg" },
  { id: 8, name: "Atta (5kg)", price: 220, category: "Groceries", img: "public/atta.jpg" },
];


  const [filteredCategory, setFilteredCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("none");

  // Filtered products logic
  const filteredProducts = allProducts
    .filter((product) =>
      filteredCategory === "All" ? true : product.category === filteredCategory
    )
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
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
            ${filteredCategory === cat ? "bg-green-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
          >
            {cat}
          </button>
        ))}
      </aside>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <main className="flex-1">

        {/* Search & Sort */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          
          {/* Search
          <input
            type="text"
            placeholder="Search for products..."
            className="px-4 py-2 rounded-lg w-full md:w-1/3 border border-gray-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          /> */}

          {/* Sort */}
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
                key={product.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-3"
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="mt-3 font-semibold text-lg">{product.name}</h3>
                <p className="text-green-600 font-bold">₹{product.price}</p>
                <button className="w-full bg-green-500 text-white mt-3 py-2 rounded hover:bg-green-600 transition">
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
