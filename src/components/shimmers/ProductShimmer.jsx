import React from "react";

const ProductShimmer = () => {
  return (
    <article>
      <div className="h-full shadow-lg overflow-hidden">
        <div className="h-[14rem] bg-gray-300 w-full"></div>
        <div className="p-4">
          <div className="h-4 bg-gray-300 animate-pulse mb-1"></div> 
          <div className="h-4 w-6/12 bg-gray-200 animate-pulse mb-1"></div> 
          <div className="h-4 w-2/12 bg-gray-100 animate-pulse mb-1"></div>
          <div className="h-4 w-4/12 bg-gray-100 animate-pulse"></div>
        </div>
      </div>
    </article>
  );
};

export default ProductShimmer;
