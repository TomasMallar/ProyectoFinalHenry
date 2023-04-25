import { useSelector } from "react-redux";
import React, { useRef, useEffect } from "react";
import DataManagement from "../../Components/DataManagement";
import ProductCard from "../ProductCard/ProductCard";

export default function FilterBar() {

    const carouselRef = useRef(null);

    let carouselItems = useSelector((state) => state.carousel.products);


    const handleMoveLeft = () => {
        carouselRef.current.scrollTo({
            left: carouselRef.current.scrollLeft - carouselRef.current.offsetWidth,
            behavior: "smooth"
        });
    };

    const handleMoveRight = () => {
        carouselRef.current.scrollTo({
            left: carouselRef.current.scrollLeft + carouselRef.current.offsetWidth,
            behavior: "smooth"
        });
    };


    return (
        <div className="relative p-5 overflow-hidden bg-chocolate-blanco">
            <h1 className="mb-6 font-serif text-5xl ml-14">
                PRODUCTOS RECOMENDADOS
                </h1>
            <button className="absolute top-0 z-10 flex items-center justify-center w-[10vw] h-full border-none left-0 bg-gradient-to-r from-chocolate-blanco hover:from-chocolate-oscuro"
            onClick={handleMoveLeft}
            >
                {'<<'}
            </button>
            <button className="absolute top-0 z-10 flex items-center justify-center w-[10vw] h-full border-none right-0 bg-gradient-to-l from-chocolate-blanco hover:from-chocolate-oscuro"
            onClick={handleMoveRight}
            >
                {'>>'}
            </button>
            <div className="px-[10vw] flex scroll-smooth overflow-x-hidden "
                ref={carouselRef}
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
