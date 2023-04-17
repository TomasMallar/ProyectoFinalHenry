import { useSelector } from "react-redux";
import React, { useState } from "react";
import DataManagement from "../../Pages/DataManagement";
import CarouselCard from "../CarouselCard/carouselCard";
import styles from "./carousel.module.css"

export default function FilterBar(){

    //Brings the information from the global state with useSelector
let carouselItems=useSelector((state)=> state.chocolates.products)
console.log(carouselItems, "items");

//-----------------------------------------------------------------------------RETURN---------
return(
<>

    <div className={styles.carousel}>

            {
            carouselItems?.map(p =>{
                const {id, name, image, categories, price, score} = p
                return <CarouselCard 
                key={id}
                id={id}
                name={name}
                image={image}
                category={categories}
                price={price}
                score={score}>
                     </CarouselCard>
                })
            }
        
    </div>            
    <DataManagement/>



</>)

}
