import React, { useState } from "react";
import { useParams } from "react-router-dom";

const dummyProducts = [
  { id: 1, name: "Tomatoes", price: 40, category: "Vegetables", img: "/tomatoes.jpg", desc: "Fresh, organic tomatoes delivered directly from farms." },
  { id: 2, name: "Green Apples", price: 180, category: "Fruits", img: "/apple.jpg", desc: "Crisp and juicy green apples packed with nutrients." },
  { id: 3, name: "Milk (1L)", price: 55, category: "Dairy", img: "/milk.jpg", desc: "Pure and fresh milk sourced from trusted dairy farms." },
];

const ProductDetail = () => {
//   const { id } = useParams();
  const { id } = 1;
  
  const product = dummyProducts.find((p) => p.id === Number(1));

  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      
      {/* LEFT: IMAGE */}
      <div className="flex justify-center">
        <img
          src={product.img}
          alt={product.name}
          className="w-full max-w-md rounded-lg shadow"
        />
      </div>

      {/* RIGHT: DETAILS */}
      <div>
        <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
        <p className="text-gray-500 mb-2">Category: {product.category}</p>

        <h2 className="text-4xl font-semibold text-green-600 mb-5">
          ₹{product.price}
        </h2>

        {/* Quantity selector */}
        <div className="flex items-center gap-3 mb-5">
          <span className="font-medium">Quantity:</span>
          <button
            onClick={() => qty > 1 && setQty(qty - 1)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            -
          </button>
          <span className="text-lg">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            +
          </button>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mb-6">
          <button className="bg-green-600 text-white w-full py-3 rounded-lg hover:bg-green-700 transition">
            Add to Cart
          </button>

          <button className="bg-orange-500 text-white w-full py-3 rounded-lg hover:bg-orange-600 transition">
            Buy Now
          </button>
        </div>

        <hr className="my-6" />

        {/* Description */}
        <h3 className="text-xl font-semibold mb-2">Product Description</h3>
        <p className="text-gray-600 leading-relaxed">
          {product.desc}
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
