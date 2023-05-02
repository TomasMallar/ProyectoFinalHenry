import React, { useState, useEffect } from "react";
import styles from "./carrito.module.css";
import ButtonMP from "../../Components/IntegracionMercadoPago/IntegracionMercadoPago";
import ButtonMPTotal from "../../Components/MercadoPagoTotal/MercadoPagoTotal";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade"
import axios from "axios";

const Carrito = () => {
  const [cartItemsInCart, setCartItemsInCart] = useState([]);

  const saveCartToDB = async (cartItems) => {
    const userId = localStorage.getItem("user").id;
    try {
      const response = await axios.post(`http://localhost:3001/users/${userId}/cart`, cartItems);
      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
    const fetchCartItemsInfo = async () => {
      const cartItemsInfo = await Promise.all(storedCartItems.map(async (cartItem) => {
        const response = await fetch(`http://localhost:3001/products/${cartItem.id}`);
        const product = await response.json();
        return { ...product, quantity: cartItem.quantity };
      }));
      setCartItemsInCart(cartItemsInfo);
    }
  
    fetchCartItemsInfo();
  }, []);

  const handleDeleteCart = () => {
    localStorage.removeItem("cartItems");
    setCartItemsInCart([]);
    saveCartToDB([]);
  };

  const [stock, setStock] = useState(null)

  const handleAddToCart = async(item) => {
    const response = await axios.get(`http://localhost:3001/products/${item.id}`)
    if(response.data.stock === item.quantity){
      setStock('Sin stock!')
      return
    }
    const existingItemIndex = cartItemsInCart.findIndex((cartItem) => cartItem.id === item.id);
    const updatedCartItems = [...cartItemsInCart];
    if (existingItemIndex !== -1) {
      updatedCartItems[existingItemIndex].quantity++;
    } else {
      updatedCartItems.push({ ...item, quantity: 1 });
    }
    setCartItemsInCart(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    saveCartToDB(updatedCartItems);
  };

  const handleRemoveFromCart = (item) => {
    stock && setStock(null)
    const existingItemIndex = cartItemsInCart.findIndex((cartItem) => cartItem.id === item.id);
    const updatedCartItems = [...cartItemsInCart];
    if (existingItemIndex !== -1) {
      if (updatedCartItems[existingItemIndex].quantity > 1) {
        updatedCartItems[existingItemIndex].quantity--;
      } else {
        updatedCartItems.splice(existingItemIndex, 1);
      }
    }
    setCartItemsInCart(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    saveCartToDB(updatedCartItems);
  };

  const handleDeleteFromCart = (item) => {
    const updatedCartItems = cartItemsInCart.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItemsInCart(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const buildProductsObject = (cartItems) => {
    const products = {
      bodyOrder: cartItems.map((item) => ({
        id: item.id,
        title: item.name,
        unit_price: item.price,
        quantity: item.quantity,
      })),
    };
    return products;
  };

  const calcularTotalCarrito = () => {
    let total = 0;
    for (const item of cartItemsInCart) {
      total += item.price * item.quantity;
    }
    return total;
  }

  return (
    <div className="w-full h-full p-16 font-serif bg-chocolate-blanco text-chocolate-oscuro">

      <Fade>


        <h2 className="pb-2 text-4xl">
          PRODUCTOS DEL CARRITO
        </h2>
        <div className="p-4 bg-chocolate-mantecol rounded-2xl">

          <Fade left cascade>
            <div className="px-10 divide-y divide-black">
            {stock && <p>{stock}</p>}
              {cartItemsInCart.length > 0 ? (
                cartItemsInCart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-6">

                    <div className="w-[20%]">
                      <Link to={`/products/${item.id}`}>
                        <img src={item.image} alt={item.name} className="object-cover w-56 h-40 " />
                      </Link>
                    </div>

                    <div className="w-[40%] flex flex-col gap-10 ">
                      <Link to={`/products/${item.id}`}>
                        <p className="text-2xl font-bold hover:underline hover:decoration-chocolate-oscuro">
                          {item.name}
                        </p>
                      </Link>
                      <p className="text-xl ">
                        Precio Total: ${item.price * item.quantity}
                      </p>
                    </div>

                    <div className="w-[10%] flex justify-between items-center p-0 bg-chocolate-claro">
                      <button onClick={() => handleAddToCart(item)} className="p-2 hover:bg-chocolate-blanco">
                        +
                      </button>
                      
                      <p className="p-2">
                        {item.quantity}
                      </p>
                      <button onClick={() => handleRemoveFromCart(item)} className="p-2 hover:bg-chocolate-blanco">
                        -
                      </button>
                    </div>

                    <div className="w-[30%]">
                      <button className="hover:underline decoration-chocolate-oscuro" onClick={() => handleDeleteFromCart(item)}>
                        Eliminar
                      </button>
                      {/* <ButtonMP title={item.name} unit_price={item.price} /> */}
                    </div>

                  </div>
                ))
              ) : (
                <div className="p-10">
                  <p className="m-4 text-2xl font-bold animate-pulse">
                    No hay productos en el carrito.
                  </p>
                  <Link to="/products">
                    <button className="p-4 text-xl font-bold shadow-sm h-fit shadow-chocolate-claro bg-chocolate-claro rounded-xl text-chocolate-oscuro hover:bg-chocolate-blanco">
                      Ver nuestos productos
                    </button>
                  </Link>
                </div>
              )}
            </div>

          </Fade>

          <div className="flex justify-end gap-6 justify-items-center">
            <button onClick={handleDeleteCart} className="p-4 text-xl font-bold shadow-sm h-fit shadow-chocolate-claro bg-chocolate-claro rounded-xl text-chocolate-oscuro hover:bg-chocolate-blanco">
              Borrar carrito
            </button>
            <p className="left-0 p-2 m-2 text-2xl font-bold ">
              Total del carrito: ${calcularTotalCarrito()}
            </p>
            <ButtonMPTotal products={buildProductsObject(cartItemsInCart)} />
          </div>
        </div>
      </Fade>

    </div>
  );
};

export default Carrito;
