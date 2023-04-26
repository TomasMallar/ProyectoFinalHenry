import { useSelector } from "react-redux";
import React from "react";
import DataManagement from "../../Components/DataManagement";
import CarouselCard from "../CarouselCard/carouselCard";
import { Link } from "react-router-dom"

export default function FilterBar() {

    let carouselItems = useSelector((state) => state.carousel.products);

    return (
        <div className="relative p-5 bg-chocolate-blanco">
            <h1 className="py-6 font-serif text-4xl ml-14">
                PRODUCTOS RECOMENDADOS
            </h1>
            <div className="flex flex-wrap justify-around gap-3 py-6 items-evenly">
                {
                    carouselItems?.slice(0, 4)?.map(p => {
                        const { id, name, image, categories, price, score } = p
                        return (<Link to="/products">
                            <CarouselCard
                                key={id}
                                id={id}
                                name={name}
                                image={image}
                                category={categories}
                                price={price}
                                score={score} />
                        </Link>
                        )
                    })
                }
            </div>

            <button className="p-4 text-xl font-bold shadow-md h-fit shadow-chocolate-claro bg-chocolate-claro rounded-xl text-chocolate-oscuro hover:bg-chocolate-mantecol hover:shadow">
                <Link to="/products">
                Ver todos
                </Link>
            </button>

            <DataManagement />
        </div>)

}
