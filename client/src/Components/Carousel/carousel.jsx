import { useSelector } from "react-redux";
import React, { useRef } from "react";
import DataManagement from "../../Components/DataManagement";
import CarouselCard from "../CarouselCard/carouselCard";
import styles from "./carousel.module.css"

export default function FilterBar(){
    
    //Brings the information from the global state with useSelector
let carouselItems=useSelector((state)=> state.carousel.products)
console.log(carouselItems, "items");
const carousel = useRef(null)

const onCLickLeft = (e) =>{
    e.preventDefault();
    carousel.current.scrollLeft -= carousel.current.offsetWidth
}

const onCLickRight = (e) =>{
    e.preventDefault();
    carousel.current.scrollLeft += carousel.current.offsetWidth
}
//-----------------------------------------------------------------------------RETURN---------
return(
<div className={styles.container}>
<h1 className={styles.nuevaColeccion}>NUEVA COLECCIÓN</h1>
    <div className={styles.carousel} ref={carousel}>

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
    <button onClick={onCLickLeft}>{'<<'}</button>
    <button onClick={onCLickRight}>{'>>'}</button>

    <DataManagement/>



</div>)

}
