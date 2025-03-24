import React from "react";
import BannerImg from "../../../public/banner.jpg";

const Clothing = () => {
  return (
    <section className="min-h-screen w-full flex justify-center items-center mb-5">
      <div className="container mx-auto">
        <div className="bg-white flex flex-wrap items-center rounded-md">
          <div className="w-full md:w-3/12">
            <img
              src={BannerImg}
              alt="Banner Image"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="w-full md:w-9/12 flex items-center">
            <div className="w-full p-5 md:pt-28">
              <div className="mb-7">
                <h1 className="text-center text-4xl text-black font-bold mb-2 md:text-left">
                  Clothing | Comming Soon
                </h1>
                <p className="text-md text-gray-600">
                  Discover the perfect blend of style and comfort with ShopLane.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clothing;