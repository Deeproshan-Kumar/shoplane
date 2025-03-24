import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModelImg from "../../../public/model.jpg";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { initialData } from "../../utils/formUtils";
import { countryCodes } from "../../utils/formUtils";
import { toast } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState(initialData);
  const [country, setCountry] = useState(null);
  const [currentState, setCurrentState] = useState(null);
  const [currentCity, setCurrentCity] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCountryChange = (_country) => {
    setCountry(_country);
    setFormData((prevFormData) => ({
      ...prevFormData,
      country: _country.name,
    }));
  };

  const handleStateChange = (_state) => {
    setCurrentState(_state);
    setFormData((prevFormData) => ({
      ...prevFormData,
      state: _state.name,
    }));
  };

  const handleCityChange = (_city) => {
    setCurrentCity(_city);
    setFormData((prevFormData) => ({
      ...prevFormData,
      city: _city.name,
    }));
  };

  const validateForm = () => {
    // Email regex for validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Password regex for validation (at least one number, one uppercase, one lowercase letter, special character and min 8 characters)
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    let formErrors = {};
    if (!formData.industry) {
      formErrors.industry = "Please choose an industry.";
    }
    if (!formData.firstName) {
      formErrors.firstName = "Please enter valid first name.";
    }
    if (!formData.email || !emailRegex.test(formData.email)) {
      formErrors.email = "Please enter valid email.";
    }
    if (!formData.address) {
      formErrors.address = "Please enter valid address.";
    }
    if (!formData.country) {
      formErrors.country = "Please select your country.";
    }
    if (!formData.state) {
      formErrors.state = "Please select your state.";
    }
    if (!formData.city) {
      formErrors.city = "Please select your city.";
    }
    if (!formData.pinCode) {
      formErrors.pinCode = "Please enter valid pin code.";
    }
    if (!formData.countryCode) {
      formErrors.countryCode = "Please select country code.";
    }
    if (!formData.mobile) {
      formErrors.mobile = "Please enter valid mobile number.";
    }
    if (!formData.password || !passwordRegex.test(formData.password)) {
      formErrors.password =
        "Must contain at least one number and one one uppercase and one lowercase letter and at least 8 characters.";
    }
    if (!formData.password || formData.password !== formData.cpassword) {
      formErrors.cpassword = "Confirm password should be same as password.";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      const user = {
        firstName: formData?.firstName,
        email: formData?.email,
        password: formData?.password,
      };
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      existingUsers.push(user);
      localStorage.setItem("users", JSON.stringify(existingUsers));
      setFormData(initialData);
      navigate("/login");
      toast("Registered successfully.");
    } else {
      toast("Something went wrong.");
    }
  };
  return (
    <section className="flex justify-center items-center  bg-white">
      <div className="w-full grid grid-cols-1 md:grid-cols-2">
        <div className="relative hidden md:block">
          <img
            src={ModelImg}
            alt="Model"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute top-0 left-0 h-full w-full"></div>
        </div>
        <div className="h-screen overflow-y-auto">
          <form
            onSubmit={handleFormSubmit}
            className="w-full p-6 md:p-8 lg:p-10"
          >
            <h1 className="text-3xl text-[#01b0f1] uppercase tracking-medium font-bold mb-6">
              Sign Up
            </h1>

            <div className="mb-3">
              <label
                htmlFor="r"
                className="inline-block text-md text-gray-700 mb-2"
              >
                Individual/Enterprise/Government
                <span className="text-red-500 pl-1">*</span>
              </label>
              <br />
              <div className="flex items-center">
                <div className="w-4/12 flex text-md text-gray-700">
                  <input
                    type="radio"
                    name="industry"
                    value="Individual"
                    checked={formData.industry === "Individual"}
                    id="individual"
                    className="mr-2"
                    onChange={handleInputChange}
                  />
                  <label htmlFor="individual">Individual</label>
                </div>
                <div className="w-4/12 flex text-md text-gray-700">
                  <input
                    type="radio"
                    name="industry"
                    value="Enterprise"
                    checked={formData.industry === "Enterprise"}
                    id="enterprise"
                    className="mr-2"
                    onChange={handleInputChange}
                  />
                  <label htmlFor="enterprise">Enterprise</label>
                </div>
                <div className="w-4/12 flex text-md text-gray-700">
                  <input
                    type="radio"
                    name="industry"
                    value="Government"
                    checked={formData.industry === "Government"}
                    id="government"
                    className="mr-2"
                    onChange={handleInputChange}
                  />
                  <label htmlFor="government">Government</label>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mb-3">
              <div className="w-6/12">
                <label
                  htmlFor="firstName"
                  className="inline-block text-md text-gray-700 mb-2"
                >
                  First Name<span className="text-red-500 pl-1">*</span>
                </label>
                <br />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  placeholder="First Name"
                  id="firstName"
                  className="w-full border border-gray-300 rounded-sm py-2 px-4"
                  onChange={handleInputChange}
                />
                {errors?.firstName && (
                  <p className="text-red-500 text-sm">{errors?.firstName}</p>
                )}
              </div>
              <div className="w-6/12">
                <label
                  htmlFor="lastName"
                  className="inline-block text-md text-gray-700 mb-2"
                >
                  Last Name
                </label>
                <br />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  placeholder="Last Name"
                  id="lastName"
                  className="w-full border border-gray-300 rounded-sm py-2 px-4"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="inline-block text-md text-gray-700 mb-2"
              >
                Email<span className="text-red-500 pl-1">*</span>
              </label>
              <br />
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email"
                id="email"
                className="w-full border border-gray-300 rounded-sm py-2 px-4"
                onChange={handleInputChange}
              />
              {errors?.email && (
                <p className="text-red-500 text-sm">{errors?.email}</p>
              )}
            </div>
            <div className="mb-3">
              <label
                htmlFor="address"
                className="inline-block text-md text-gray-700 mb-2"
              >
                Address<span className="text-red-500 pl-1">*</span>
              </label>
              <br />
              <input
                type="text"
                name="address"
                value={formData.address}
                placeholder="Address"
                id="address"
                className="w-full border border-gray-300 rounded-sm py-2 px-4"
                onChange={handleInputChange}
              />
              {errors?.address && (
                <p className="text-red-500 text-sm">{errors?.address}</p>
              )}
            </div>
            <div className="flex gap-4 mb-3">
              <div className="w-6/12">
                <label
                  htmlFor="country"
                  className="inline-block text-md text-gray-700 mb-2"
                >
                  Country<span className="text-red-500 pl-1">*</span>
                </label>
                <br />
                <CountrySelect
                  onChange={handleCountryChange}
                  placeHolder="Select Country"
                />
                {errors?.country && (
                  <p className="text-red-500 text-sm">{errors?.country}</p>
                )}
              </div>
              <div className="w-6/12">
                <label
                  htmlFor="state"
                  className="inline-block text-md text-gray-700 mb-2"
                >
                  State<span className="text-red-500 pl-1">*</span>
                </label>
                <br />
                <StateSelect
                  countryid={country?.id}
                  onChange={handleStateChange}
                  placeHolder="Select State"
                />
                {errors?.state && (
                  <p className="text-red-500 text-sm">{errors?.state}</p>
                )}
              </div>
            </div>
            <div className="flex gap-4 mb-3">
              <div className="w-6/12">
                <label
                  htmlFor="city"
                  className="inline-block text-md text-gray-700 mb-2"
                >
                  City<span className="text-red-500 pl-1">*</span>
                </label>
                <br />
                <CitySelect
                  countryid={country?.id}
                  stateid={currentState?.id}
                  onChange={handleCityChange}
                  placeHolder="Select City"
                />
                {errors?.city && (
                  <p className="text-red-500 text-sm">{errors?.city}</p>
                )}
              </div>
              <div className="w-6/12">
                <label
                  htmlFor="pinCode"
                  className="inline-block text-md text-gray-700 mb-2"
                >
                  Pincode<span className="text-red-500 pl-1">*</span>
                </label>
                <br />
                <input
                  type="number"
                  name="pinCode"
                  value={formData.pinCode}
                  placeholder="Pin Code"
                  id="pinCode"
                  className="w-full border border-gray-300 rounded-sm py-2 px-4"
                  onChange={handleInputChange}
                />
                {errors?.pinCode && (
                  <p className="text-red-500 text-sm">{errors?.pinCode}</p>
                )}
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="mobileNumber"
                className="inline-block text-md text-gray-700 mb-2"
              >
                Mobile Number<span className="text-red-500 pl-1">*</span>
              </label>
              <br />
              <div className="flex gap-4">
                <div className="w-3/12">
                  <select
                    name="countryCode"
                    id="countryCode"
                    className="w-full border border-gray-300 rounded-sm py-2 px-4"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                  >
                    {countryCodes &&
                      countryCodes.map((countryCode, index) => {
                        return (
                          <option value={countryCode} key={index}>
                            {countryCode}
                          </option>
                        );
                      })}
                  </select>
                  {errors?.countryCode && (
                    <p className="text-red-500 text-sm">
                      {errors?.countryCode}
                    </p>
                  )}
                </div>
                <div className="w-9/12">
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    placeholder="Mobile Number"
                    id="mobile"
                    className="w-full border border-gray-300 rounded-sm py-2 px-4"
                    onChange={handleInputChange}
                  />
                  {errors?.mobile && (
                    <p className="text-red-500 text-sm">{errors?.mobile}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-4 mb-3">
              <div className="w-6/12">
                <label
                  htmlFor="fax"
                  className="inline-block text-md text-gray-700 mb-2"
                >
                  Fax
                </label>
                <br />
                <input
                  type="number"
                  name="fax"
                  value={formData.fax}
                  placeholder="Fax"
                  id="fax"
                  className="w-full border border-gray-300 rounded-sm py-2 px-4"
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-6/12">
                <label
                  htmlFor="phone"
                  className="inline-block text-md text-gray-700 mb-2"
                >
                  Phone
                </label>
                <br />
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  placeholder="Phone"
                  id="phone"
                  className="w-full border border-gray-300 rounded-sm py-2 px-4"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="password"
                className="inline-block text-md text-gray-700 mb-2"
              >
                Password<span className="text-red-500 pl-1">*</span>
              </label>
              <br />
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="Password"
                id="password"
                className="w-full border border-gray-300 rounded-sm py-2 px-4"
                onChange={handleInputChange}
              />
              {errors?.password && (
                <p className="text-red-500 text-sm">{errors?.password}</p>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="cpassword"
                className="inline-block text-md text-gray-700 mb-2"
              >
                Confirm Password<span className="text-red-500 pl-1">*</span>
              </label>
              <br />
              <input
                type="password"
                name="cpassword"
                value={formData.cpassword}
                placeholder="Confirm Password"
                id="cpassword"
                className="w-full border border-gray-300 rounded-sm py-2 px-4"
                onChange={handleInputChange}
              />
              {errors?.cpassword && (
                <p className="text-red-500 text-sm">{errors?.cpassword}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full text-white text-md font-medium uppercase rounded-sm bg-[#01b0f1] p-2 shadow-lg cursor-pointer transition-opacity duration-300 hover:opacity-75"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;