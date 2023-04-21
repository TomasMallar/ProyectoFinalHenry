import { Link } from "react-router-dom"
import style from "./card.module.css"
import carImagen from "../../img/shopping-cart.png"
import ButtonMP from "../IntegracionMercadoPago/IntegracionMercadoPago"
import React, { useState, useEffect } from "react";

const ProductCard = ({ id, name, image, price, category }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        // Agregar el producto al estado local del carrito
        setCartItems([...cartItems, product]);
    };

    useEffect(() => {
        const existingCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        localStorage.setItem(
            "cartItems",
            JSON.stringify([...existingCartItems, ...cartItems])
        );
    }, [cartItems]);

    return (
        <div className={style.container}>
            <button className={style.carButtonTrolley} onClick={() => addToCart({ id, name, image, price, category })}>
                <img src={carImagen} alt="" className={style.carImagen} />
            </button>
            <Link className={style.cardLink} to={`/products/${id}`}>
                <h1> {name} </h1>
                <img src={image} alt={name} className={style.pictures} />
                <div className={style.ingredients}> {category?.map((c) => {
                    return <p>- {c}</p>

                })} </div>
                <h3>$ {price}</h3>
            </Link>
            <ButtonMP className={style.carButtonBuy} title={name} unit_price={price} />
        </div>
    )
}

export default ProductCard