// ProductDetails.jsx

import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { ProductContext } from "../contexts/ProductContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { products } = useContext(ProductContext);

  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility

  const handleAddToCart = (product) => {
    addToCart(product, product.id);
    setShowPopup(true); // Show popup after adding to cart
    setTimeout(() => {
      setShowPopup(false); // Hide popup after 2 seconds
    }, 1000);
  };

  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return (
      <section className="h-screen flex justify-center items-center">
        Loading...
      </section>
    );
  }

  const { title, price, description, image } = product;

  return (
    <section className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 h-screen flex items-center">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
            <img className="max-w-[200px] lg:max-w-xs" src={image} alt="" />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
              {title}
            </h1>
            <div className="text-2xl text-red-500 font-medium mb-6">
              $ {price}
            </div>
            <p className="mb-8">{description}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-primary py-4 px-8 text-white"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      {/* Popup */}
      {showPopup && (
        <div
          key="popup"
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
        >
          <div
            className="bg-white p-6 rounded-lg"
            style={{ backdropFilter: "blur(50px)" }}
          >
            <p className="text-xl">Added to cart successfully!</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetails;
