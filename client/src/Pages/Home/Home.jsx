import React from "react"
import ProductCard from "../../Components/ProductCard/ProductCard";
import Footer from "../../Components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllChocolates } from "../../Redux/Actions/Actions";
import style from "./Home.module.css"

const HomePage = (props) => {

  // let allProducts = props.allProducts

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllChocolates())
  }, [dispatch])

  let allProducts = useSelector((state) => state.chocolates)




  return (
    <div>
      <div className={style.headerHome}>
        <div className={style.headerTitle}>
        <h1>SOMOS LOS <br /> REYES DEL <br /> CHOCOLATE</h1>
        </div>
        <div className={style.headerButton}>
        <button>!Que rico¡</button>
        </div>
      </div>

      <div className={style.containerCards}>
        {/* Map each product into a single card using map */}
        {
          allProducts?.map((product) => {
            return (
              <ProductCard
                // as we are receiving info from the api with the "?" we make sure that we are getting the info and the app does not crash
                key={product?.id}
                id={product.id}
                name={product?.name}
                image={product?.image}
                price={product?.price}
                score={product?.score}
              />
            )
          })}
      </div>

      <Footer />
    </div>
  )
};

export default HomePage;
