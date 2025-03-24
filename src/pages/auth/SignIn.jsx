import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ModelImg from "../../../public/model.jpg";
import { toast } from "react-toastify";

const SignIn = () => {
  const Schema = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(Schema);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.email) {
      formErrors.email = "Please enter valid email.";
    }
    if (!formData.password) {
      formErrors.password = "Please enter valid password.";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const foundUser = users.find(
        (user) =>
          user.email === formData.email && user.password === formData.password
      );
      if (foundUser) {
        navigate("/products");
        toast("Logged in successfully.");
      } else {
        toast("Invalid email or password");
      }
    }
  };

  return (
    <section className="flex justify-center items-center bg-white">
      <div className="w-full grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:block">
          <img
            src={ModelImg}
            alt="Model"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="h-screen flex justify-center items-center bg-white">
          <form
            onSubmit={handleFormSubmit}
            className="w-full p-6 md:p-8 lg:p-10"
          >
            <h1 className="text-3xl text-[#01b0f1] uppercase tracking-medium font-bold mb-6">
              Sign In
            </h1>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="inline-block text-md text-gray-700 mb-2"
              >
                Email
              </label>
              <br />
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email"
                onChange={handleInputChange}
                id="email"
                className="w-full border border-gray-300 rounded-sm py-2 px-4"
              />
              {errors?.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="mb-3">
              <label
                htmlFor="password"
                className="inline-block text-md text-gray-700 mb-2"
              >
                Password
              </label>
              <br />
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="Password"
                onChange={handleInputChange}
                id="password"
                className="w-full border border-gray-300 rounded-sm py-2 px-4"
              />
              {errors?.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <p className="text-right mb-6">
              <Link
                to="/forgot-password"
                className="text-md text-[#01b0f1] font-medium"
              >
                Forgot Password?
              </Link>
            </p>
            <button className="w-full text-white text-md font-medium uppercase rounded-sm bg-[#01b0f1] p-2 shadow-lg cursor-pointer transition-opacity duration-300 hover:opacity-75">
              Log me in
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;