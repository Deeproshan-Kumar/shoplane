import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto">
        <div className="text-center py-6">
          <h2 className="text-4xl font-bold text-gray-800 uppercase mb-2">
            Shop<span className="text-[#01b0f1]">Lane</span>
          </h2>
          <p className="text-sm">
            <Link to="/" className="text-[#01b0f1]">
              &copy; ShopLane
            </Link>{" "}
            {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;