import React from "react";
import { MdOutlineStar } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../store/features/cartSlice";
import { toast } from "react-toastify";

const Product = ({ product, image, title, category, price, rating }) => {
  const dispatch = useDispatch();
  const addToCart = (product) => {
    dispatch(addItemToCart(product));
    toast(product?.title + " added to the cart.");
  };
  return (
    <article className="rounded-sm shadow-lg transition-shadow duration-300 hover:shadow-sm">
      <div className="relative">
        <div className="p-4">
          <img src={image} alt={title} className="h-[14rem] w-auto mx-auto" />
          <span className="absolute top-2 right-2 bg-[#01b0f1] rounded-sm flex items-center text-sm text-white shadow-md py-1 px-2">
            {rating}
            <MdOutlineStar />
          </span>
        </div>
      </div>
      <div className="relative min-h-[136px] p-4">
        <h3 className="text-md font-medium text-gray-500 line-clamp-2 mb-1">
          {title}
        </h3>
        <p className="text-sm font-medium text-gray-400 capitalise mb-1">
          {category}
        </p>
        <h2 className="text-lg font-bold text-[#01b0f1]">${price}</h2>
        <button
          onClick={() => addToCart(product)}
          className="absolute bottom-4 right-4 cursor-pointer"
          title="Add to Cart"
        >
          <FaCartPlus
            size={30}
            className="transition-all duration-200 hover:text-[#01b0f1]"
          />
        </button>
      </div>
    </article>
  );
};

export default Product;
