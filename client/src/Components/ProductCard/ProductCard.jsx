import { Link } from "react-router-dom"
import style from "./card.module.css"
import carImagen from "../../img/shopping-cart-cards.png"
import ButtonMP from "../IntegracionMercadoPago/IntegracionMercadoPago"
import React, { useState, useEffect } from "react";

const ProductCard = ({ id, name, image, price, category }) => {
    const [cartItems, setCartItems] = useState([]);
    const [showBubble, setShowBubble] = useState(false);

    const addToCart = (product) => {
        // Verificar si el producto ya existe en el carrito
        const existingProduct = cartItems.find(item => item.id === product.id);
        if (existingProduct) {
            // Si el producto ya existe, actualizar su cantidad sumando 1
            const updatedCartItems = cartItems.map(item => {
                if (item.id === product.id) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            setCartItems(updatedCartItems);
        } else {
            // Si el producto no existe, agregarlo con una cantidad de 1
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
        setShowBubble(true);
    };

    useEffect(() => {
        const existingCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        localStorage.setItem(
            "cartItems",
            JSON.stringify([...existingCartItems, ...cartItems])
        );
    }, [cartItems]);

    return (
        <div className="p-3 font-serif border border-solid shadow-lg border-chocolate-mantecol rounded-xl bg-chocolate-oscuro w-72 hover:shadow-chocolate-bombom hover:bg-chocolate-bombom">

            <button className="border-none ml-60 w-fit" onClick={() => addToCart({ id, name, image, price, category })}>
                <img src={carImagen} alt="" className="w-8" />
            </button>

            <Link className="flex flex-col items-center m-auto text-chocolate-blanco" to={`/products/${id}`}>
                <h1 className="h-16 m-0 text-2xl leading-7 w-72">
                    {name}
                </h1>
                <img src={image} alt={name} className=" w-52 h-52" />

                <div className="flex flex-col justify-center h-16 m-1 mb-1 text-justify">
                    {category?.map((c) => {
                        return <p className="leading-5 text-start">
                            - {c}
                        </p>
                    })}
                </div>
                <h3 className="text-lg leading-4">
                    $ {price}
                </h3>
            </Link>

            {/* <ButtonMP title={name} unit_price={price} /> */}
        </div>
    )
}

export default ProductCard