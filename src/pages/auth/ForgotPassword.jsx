import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <section className="min-h-screen w-full bg-[#01b0f1] flex justify-center items-center">
      <div className="w-4/12 mx-auto">
        <div className="bg-white rounded-sm p-4 md:p-4 lg:p-6">
          <form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="inline-block text-md text-gray-700 mb-2"
              >
                Please Provide Your Registered Email ID to Reset Your Password
              </label>
              <br />
              <input
                type="email"
                placeholder="Email ID"
                className="w-full border border-gray-300 rounded-sm py-2 px-4"
              />
            </div>
            <div className="flex gap-4">
              <Link
                to="/"
                className="w-full text-white text-center text-md font-medium uppercase rounded-sm bg-[#01b0f1] p-2 shadow-lg cursor-pointer transition-opacity duration-300 hover:opacity-75"
              >
                Reset Password
              </Link>
              <Link
                to="/"
                className="w-full text-white text-center text-md font-medium uppercase rounded-sm bg-[#01b0f1] p-2 shadow-lg cursor-pointer transition-opacity duration-300 hover:opacity-75"
              >
                Login/Signup
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;