import React from "react";

const ProductCard = ({ product, onAddToCart }) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col">
    <img
      src={product.image}
      alt={product.name}
      className="h-40 w-full object-cover rounded-lg mb-3"
    />
    <h3 className="text-gray-800 font-semibold text-lg">{product.name}</h3>
    <p className="text-gray-500 text-sm">{product.unit}</p>
    <p className="text-green-700 font-bold text-lg mt-1">${product.price}</p>
    <button
      onClick={() => onAddToCart(product)}
      className="mt-auto bg-green-700 text-white py-1.5 rounded-lg hover:bg-green-800 transition-colors"
    >
      Add to Cart
    </button>
  </div>
);

export default ProductCard;
