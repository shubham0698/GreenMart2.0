import axios from "axios";

/**
 * Add a product to cart or update its quantity.
 * @param {number} userId - ID of the logged-in user
 * @param {number} productId - ID of the product
 * @param {number} quantity - Quantity to add (or update)
 * @returns {Promise} Axios response
 */
export const addOrUpdateCart = async (userId, productId, quantity = 1) => {
  try {
    const res = await axios.post("http://localhost:5000/cart", {
      user_id: userId,
      product_id: productId,
      quantity,
    });
    return res.data;
  } catch (error) {
    console.error("Error adding/updating cart:", error);
    throw error;
  }
};
