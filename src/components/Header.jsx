import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  const items = useSelector((state) => state.cart.items);
  return (
    <header className="fixed px-4 top-0 left-0 w-full bg-white shadow-md z-20 sm:px-0">
      <nav>
        <div className="h-20 container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="w-2/12 text-2xl font-bold text-gray-800 uppercase md:text-3xl lg:text-4xl"
          >
            Shop<span className="text-[#01b0f1]">Lane</span>
          </Link>
          <ul className="fixed w-full top-20 left-0 bg-[#01b0f1] p-2 flex justify-center items-center space-x-4 md:space-x-6 lg:space-x-10 sm:relative sm:top-0 sm:w-auto sm:bg-[transparent] sm:p-0">
            <li>
              <Link
                to="/"
                className="text-sm font-medium uppercase text-gray-600 tracking-wide transition-all duration-300 hover:text-[#01b0f1]"
                style={pathname === "/" ? { color: "#01b0f1" } : {}}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="text-sm font-medium uppercase text-gray-600 tracking-wide transition-all duration-300 hover:text-[#01b0f1]"
                style={pathname === "/products" ? { color: "#01b0f1" } : {}}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/clothings"
                className="text-sm font-medium uppercase text-gray-600 tracking-wide transition-all duration-300 hover:text-[#01b0f1]"
                style={pathname === "/clothings" ? { color: "#01b0f1" } : {}}
              >
                Clothing
              </Link>
            </li>
            <li>
              <Link
                to="/accessories"
                className="text-sm font-medium uppercase text-gray-600 tracking-wide transition-all duration-300 hover:text-[#01b0f1]"
                style={pathname === "/accessories" ? { color: "#01b0f1" } : {}}
              >
                Accessories
              </Link>
            </li>
          </ul>
          <div className="w-2/12 flex justify-end">
            <Link to="/cart" className="flex">
              <FaShoppingCart />
              <span className="h-5 w-5 -mt-3 rounded-full bg-[#01b0f1] text-sm text-center text-white">
                {items?.length | 0}
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;