import React, { useEffect, useState } from "react";
import { PRODUCTS_API } from "../../utils/constants";
import { Product, ProductShimmer } from "../../components";
import BannerImg from "../../../public/banner.jpg";
import { toast } from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch(PRODUCTS_API);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
      toast(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <section className="pt-30 md:pt-20 md:min-h-[50vh] w-full flex justify-center items-center mb-5">
        <div className="container mx-auto">
          <div className="bg-gray-100 flex items-center rounded-md">
            <div className="hidden md:flex w-3/12 h-[36rem] items-center">
              <img
                src={BannerImg}
                alt="Banner Image"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="w-full md:w-9/12 p-6 md:7 flex items-center">
              <div>
                <h1 className="text-3xl text-black font-bold mb-2 md:text-4xl">
                  Products
                </h1>
                <p className="text-md text-gray-600">
                  Discover the perfect blend of style and comfort with ShopLane.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <section className="py-2 mb-10">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <ProductShimmer key={index} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-2 px-6 md:px-0 mb-10">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {products &&
                products.map((product) => {
                  const { id, image, title, category, price, rating } = product;
                  return (
                    <React.Fragment key={id}>
                      <Product
                        product={product}
                        image={image}
                        title={title}
                        category={category}
                        price={price}
                        rating={rating?.rate}
                      />
                    </React.Fragment>
                  );
                })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Products;