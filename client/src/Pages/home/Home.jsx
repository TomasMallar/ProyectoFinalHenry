import React from "react"
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductsAdvanceController } from "../../Redux/Actions/Actions";
import SortingAndFiltering from "../../Components/sortingAndFiltering/sortingAndFiltering";
import Paginated from '../../Components/Paginated/paginated';
import styles from "./home.module.css"

const Products = (props) => {

  // let allProducts = props.allProducts

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductsAdvanceController())
  }, [dispatch])

  let allProducts = useSelector((state) => state.chocolates.products)
  return (
    <><div>
      <div className={styles.headerHome}>
        <h1>SOMOS LOS <br /> REYES DEL <br /> CHOCOLATE</h1>
      </div>

      <div>
        <SortingAndFiltering />
      </div>
      <h4 className={styles.ourProducts}>Our products:</h4>
      <div>
        <Paginated />
      </div>
      <div className={styles.cardsGrid}>
        {/* Map each product into a single card using map */}
        {allProducts?.map((product) => {
          return (
            <><ProductCard
              // as we are receiving info from the api with the "?" we make sure that we are getting the info and the app does not crash
              key={product?.id}
              id={product.id}
              name={product?.name}
              image={product?.image}
              category={product?.categories}
              price={product?.price}
              score={product?.score} />
            </>
          );
        })}
      </div>
    </div>
    </>
  )
};

export default Products;
