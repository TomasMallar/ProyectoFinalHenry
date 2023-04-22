import { Link } from "react-router-dom"
import style from "./card.module.css"
import carImagen from "../../img/shopping-cart.png"
import ButtonMP from "../IntegracionMercadoPago/IntegracionMercadoPago"
import React, { useState, useEffect } from "react";

const ProductCard = ({ id, name, image, price, category }) => {
    const [cartItems, setCartItems] = useState([]);

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