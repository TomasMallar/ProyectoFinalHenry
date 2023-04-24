import { useSelector } from "react-redux";
import React, { useRef } from "react";
import DataManagement from "../../Components/DataManagement";
import CarouselCard from "../CarouselCard/carouselCard";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./carousel.module.css"

export default function FilterBar() {

    //Brings the information from the global state with useSelector
    let carouselItems = useSelector((state) => state.carousel.products)
    // const carousel = useRef(null)

    // const onCLickLeft = (e) => {
    //     e.preventDefault();
    //     carousel.current.scrollLeft -= carousel.current.offsetWidth
    // }

    // const onCLickRight = (e) => {
    //     e.preventDefault();
    //     carousel.current.scrollLeft += carousel.current.offsetWidth
    // }
    //-----------------------------------------------------------------------------RETURN---------
    return (
        <div className="">
            <h1 className="m-6 font-serif text-5xl">NUEVA COLECCIÓN</h1>
            <button>{'<<'}</button>
            <button>{'>>'}</button>
            <div className="flex items-center justify-center w-full overflow-x-scroll scroll-smooth"
            // ref={carousel}
            >
                {
                    carouselItems?.map(p => {
                        const { id, name, image, categories, price, score } = p
                        return <ProductCard
                            key={id}
                            id={id}
                            name={name}
                            image={image}
                            category={categories}
                            price={price}
                            score={score} />
                    })
                }
            </div>
            <DataManagement />



        </div>)

}
