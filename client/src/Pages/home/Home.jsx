import React from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductsAdvanceController } from "../../Redux/Actions/Actions";
import SortingAndFiltering from "../sortingAndFiltering/sortingAndFiltering";
import styles from "./home.module.css";

const Products = (props) => {
  // let allProducts = props.allProducts

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsAdvanceController());
  }, [dispatch]);

  let allProducts = useSelector((state) => state.chocolates.products);
  return (
    <>
      <div className=" bg-chocolate-blanco">
        <div className="w-full h-96 bg-[url('https://homepagereferences.my.canva.site/images/fcbc0bc46f24b9cd4495a011fe1272ba.jpg')] bg-no-repeat bg-center bg-cover opacity-90 block pt-20">
          <h1 className="mb-2.5 text-start font-serif text-5xl text-chocolate-oscuro ml-6 bg-gradient-to-r from-chocolate-mantecol w-fit rounded-lg ">
            SOMOS LOS <br /> REYES DEL <br /> CHOCOLATE
          </h1>
        </div>

        <h4 className="font-serif text-3xl font-bold mt-7 mb-7 text-chocolate-oscuro">
          Our products:
        </h4>

        <div>
          <SortingAndFiltering />
        </div>

        <div className="grid grid-cols-4">
          {/* Map each product into a single card using map */}
          {allProducts?.map((product) => {
            return (
              <>
                <ProductCard
                  // as we are receiving info from the api with the "?" we make sure that we are getting the info and the app does not crash
                  key={product?.id}
                  id={product.id}
                  name={product?.name}
                  image={product?.image}
                  category={product?.categories}
                  price={product?.price}
                  score={product?.score}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Products;
