import { Link } from "react-router-dom"
import style from "./card.module.css"
import carImagen from "../../img/shopping-cart-cards.png"
import ButtonMP from "../IntegracionMercadoPago/IntegracionMercadoPago"
import React, { useState, useEffect } from "react";
import Fade from "react-reveal/Fade"

const ProductCard = ({ id, name, image, price, category }) => {
    const [cartItems, setCartItems] = useState([]);
    const [showBubble, setShowBubble] = useState(false);
    const product = { id, name, image, price, category };

    const addToCart = (product) => {
        console.log('ESTE ES EL PRODUCTO ARMADO', product);
        const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const existingProduct = storedCartItems.find(item => item.id === product.id);
        console.log('ESTE ES EL PRODUCTO EXISTENTE', existingProduct);
      
        if (existingProduct) {
          // Si el producto ya existe, actualizar su cantidad sumando 1
          const updatedCartItems = storedCartItems.map(item => {
            if (item.id === product.id) {
              console.log('LLEGAMOS AL MAS?');
              return { id: item.id, quantity: item.quantity + 1 };
            } else {
              return item;
            }
          });
          console.log('ESTE ES EL CARRITO ACTUALIZADO', updatedCartItems);
          localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        } else {
          // Si el producto no existe, agregarlo con una cantidad de 1
          const updatedCartItems = [...storedCartItems, { id: product.id, quantity: 1 }];
          localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        }
      };

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        setCartItems(storedCartItems);
    }, []);

    return (
        <div className="p-3 font-serif border border-solid shadow-lg border-chocolate-mantecol rounded-xl bg-chocolate-oscuro w-72 hover:shadow-chocolate-bombom hover:bg-chocolate-bombom">
            <Fade cascade>{
                localStorage.getItem('token') ?(
                <button className="border-none ml-60 w-fit" onClick={() => addToCart(product)}>
                    <img src={carImagen} alt="" className="w-8" />
                </button>) : (
                    <Link to="/login">
                <button className="border-none ml-60 w-fit">
                    <img src={carImagen} alt="" className="w-8" />
                </button>
                    </Link>
                )}
                <Link to={`/products/${id}`}>

                    <div className="flex flex-col items-center m-auto text-chocolate-blanco" >
                        <h1 className="h-16 m-0 text-2xl leading-7 w-72">
                            {name}
                        </h1>
                        <img src={image} alt={name} className=" w-52 h-52" />

                        <div className="flex flex-col justify-center h-16 m-1 mb-1 text-justify">
                            {category?.map((c) => {
                                return <p className="leading-5 text-start" key={c}>
                                    - {c}
                                </p>
                            })}
                        </div>
                        <h3 className="text-lg leading-4">
                            $ {price}
                        </h3>
                    </div>
                    {/* <ButtonMP title={name} unit_price={price} /> */}
                </Link>
            </Fade>
        </div>
    )
}

export default ProductCard