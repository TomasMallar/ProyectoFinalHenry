import { useSelector } from "react-redux";
import React, { useRef } from "react";
import DataManagement from "../../Components/DataManagement";
import ProductCard from "../ProductCard/ProductCard";

export default function FilterBar() {

    let carouselItems = useSelector((state) => state.carousel.products)

    return (
        <div className="relative p-5 overflow-hidden bg-chocolate-blanco">
            <h1 className="m-6 font-serif text-5xl">NUEVA COLECCIÓN</h1>
            <button className="absolute top-0 z-10 flex items-center justify-center w-[10vw] h-full border-none left-0 bg-gradient-to-r from-chocolate-blanco">
                {'<<'}
            </button>
            <button className="absolute top-0 z-10 flex items-center justify-center w-[10vw] h-full border-none right-0 bg-gradient-to-l from-chocolate-blanco">
                {'>>'}
            </button>
            <div className="px-[10vw] flex overflow-x-auto scroll-smooth">
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
