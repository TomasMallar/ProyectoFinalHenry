import React, { useState, useEffect } from "react";
import styles from "./carrito.module.css";
import ButtonMP from "../../Components/IntegracionMercadoPago/IntegracionMercadoPago";
import ButtonMPTotal from "../../Components/MercadoPagoTotal/MercadoPagoTotal";

const Carrito = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  const handleDeleteCart = () => {
    localStorage.removeItem("cartItems");
    setCartItems([]);
  };

  const getUniqueProducts = (cartItems) => {
    const uniqueProducts = {};
    cartItems.forEach((item) => {
      if (uniqueProducts[item.id]) {
        uniqueProducts[item.id].quantity += 1;
      } else {
        uniqueProducts[item.id] = {
          ...item,
          quantity: 1,
        };
      }
    });
    return Object.values(uniqueProducts);
  };

  const uniqueCartItems = getUniqueProducts(cartItems);

  const handleAddToCart = (item) => {
    const updatedCartItems = [...cartItems];
    const existingItemIndex = updatedCartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (existingItemIndex !== -1) {
      updatedCartItems[existingItemIndex].quantity += 1;
    } else {
      updatedCartItems.push({ ...item, quantity: 1 });
    }
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const handleRemoveFromCart = (item) => {
    const updatedCartItems = [...cartItems];
    const existingItemIndex = updatedCartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (existingItemIndex !== -1) {
      updatedCartItems[existingItemIndex].quantity -= 1;
      if (updatedCartItems[existingItemIndex].quantity === 0) {
        updatedCartItems.splice(existingItemIndex, 1);
      }
    }
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const handleDeleteFromCart = (item) => {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(updatedCartItems);
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

    const buildProductsObject = (cartItems) => {
        const products = {
            bodyOrder: cartItems.map(item => ({
                title: item.name,
                unit_price: item.price,
                quantity: item.quantity,
                id:item.id
            }))
        }
        return products;
    }

    const calcularTotalCarrito = () => {
        let total = 0;
        for (const item of cartItems) {
            total += item.price * item.quantity;
        }
        return total;
    }


  return (
    <div className={styles.container}>
      <h2>Carrito de Productos</h2>
      <button onClick={handleDeleteCart}>Borrar carrito</button>
      <p>Total del carrito: ${calcularTotalCarrito()}</p>
      <ButtonMPTotal products={buildProductsObject(cartItems)} />
      {uniqueCartItems.length > 0 ? (
        uniqueCartItems.map((item) => (
          <div key={item.id}>
            <img src={item.image} alt={item.name} />
            <p>Nombre: {item.name}</p>
            <p>Cantidad: {item.quantity}</p>
            <p>Precio Total: ${item.price * item.quantity}</p>
            <button onClick={() => handleAddToCart(item)}>+</button>
            <button onClick={() => handleRemoveFromCart(item)}>-</button>
            <button onClick={() => handleDeleteFromCart(item)}>Eliminar</button>
            <ButtonMP title={item.name} unit_price={item.price} />
          </div>
        ))
      ) : (
        <p>No hay productos en el carrito.</p>
      )}
    </div>
  );
};

export default Carrito;
