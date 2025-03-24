import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BannerImg from "../../../public/banner.jpg";
import { FaOpencart } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeItemFromCart,
  updateTotalAmount,
} from "../../store/features/cartSlice";
import { toast } from "react-toastify";

const Cart = () => {
  const products = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  const handleIncreaseQty = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreseQty = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleRemoveItemFromCart = (id) => {
    dispatch(removeItemFromCart(id));
    toast("Product removed from the cart.");
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    let total = 0;
    products.forEach((product) => {
      total += product.price * product.quantity;
    });
    dispatch(updateTotalAmount(total.toFixed(2)));
  }, [products]);
  return (
    <section className="min-h-screen w-full flex justify-center items-center mb-5">
      <div className="container mx-auto">
        <div className="bg-white flex flex-wrap items-center rounded-md">
          <div className="w-full pt-20 md:w-3/12 sm:pt-0">
            <img
              src={BannerImg}
              alt="Banner Image"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="w-full md:w-9/12 flex items-center">
            <div className="w-full p-5 md:pt-28">
              <div className="mb-7">
                <h1 className="text-center text-4xl text-black font-bold mb-2 md:text-3xl md:text-left">
                  Cart
                </h1>
                <p className="text-md text-gray-600">
                  Discover the perfect blend of style and comfort with ShopLane.
                </p>
              </div>
              {products.length === 0 ? (
                <>
                  <div>
                    <FaOpencart size={100} className="text-[#01b0f1] mb-4" />
                    <h3 className="font-bold text-2xl mb-2">
                      Your cart is empty!
                    </h3>
                    <p className="mb-6">
                      You can go to home page to view more restaurants
                    </p>
                    <Link
                      to="/products"
                      className="block max-w-[14rem] bg-[#01b0f1] w-full text-white text-center text-md font-medium py-3 px-6 rounded-sm cursor-pointer transition-all duration-300 hover:opacity-75"
                    >
                      Explore Products
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="shadow-md">
                    <div className="w-full max-h-[25rem] overflow-auto bg-white rounded-sm mb-5 p-4">
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th className="text-gray-700 text-left p-1">
                              Product
                            </th>
                            <th className="text-gray-700 text-left p-1">
                              Title
                            </th>
                            <th className="text-gray-700 text-left p-1">
                              Price
                            </th>
                            <th className="text-gray-700 text-left p-1">
                              Quantity
                            </th>
                            <th className="text-gray-700 text-left p-1"></th>
                            <th className="text-gray-700 text-left p-1"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {products &&
                            products.map((product) => {
                              return (
                                <tr key={product?.id}>
                                  <td className="p-1">
                                    <img
                                      src={product?.image}
                                      alt={product?.title}
                                      className="h-15 w-15 rounded-sm md:h-20 md:w-20"
                                    />
                                  </td>
                                  <td className="p-1 line-clamp-2">
                                    {product?.title.slice(0, 20) + "..."}
                                  </td>
                                  <td className="p-1 text-nowrap">
                                    ${product?.price}/-
                                  </td>
                                  <td className="p-1">
                                    <input
                                      type="number"
                                      value={product?.quantity}
                                      className="border border-gray-400 w-14 rounded-sm py-1 px-2"
                                      readOnly
                                    />
                                  </td>
                                  <td className="p-1">
                                    <div className="flex items-center">
                                      <button
                                        onClick={() =>
                                          handleDecreseQty(product?.id)
                                        }
                                        className="bg-[#01b0f1] p-2 rounded-sm h-8 w-8 text-sm text-white font-medium cursor-pointer"
                                      >
                                        -
                                      </button>
                                      <button
                                        disabled
                                        className="p-2 h-8 w-8 text-[#01b0f1] text-sm font-medium"
                                      >
                                        {product?.quantity}
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleIncreaseQty(product?.id)
                                        }
                                        className="bg-[#01b0f1] p-2 rounded-sm h-8 w-8 text-sm text-white font-medium cursor-pointer"
                                      >
                                        +
                                      </button>
                                    </div>
                                  </td>
                                  <td className="p-1">
                                    <button
                                      onClick={() =>
                                        handleRemoveItemFromCart(product?.id)
                                      }
                                      className="cursor-pointer"
                                    >
                                      <FaTrashAlt className="text-[#f60062]" />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                    <div className="p-4">
                      <button
                        onClick={handleClearCart}
                        className="bg-[#f60062] w-full text-white text-md font-medium py-3 px-6 rounded-sm cursor-pointer transition-all duration-300 hover:opacity-75 mb-4"
                      >
                        Clear Cart
                      </button>
                    </div>
                    <div className="w-full bg-white rounded-sm">
                      <div className="p-4">
                        <h2 className="text-black text-2xl font-bold mb-4">
                          Cart Totals
                        </h2>
                        <h4 className="text-gray-600 mb-2">
                          Subtotal: ${totalAmount}/-
                        </h4>
                        <p className="text-gray-600 mb-4">
                          Total:${totalAmount}/-
                        </p>
                        <button className="bg-[#01b0f1] w-full text-white text-md font-medium py-3 px-6 rounded-sm cursor-pointer transition-all duration-300 hover:opacity-75">
                          Proceed to Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;