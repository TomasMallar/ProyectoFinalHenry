import React, { useState, useEffect } from "react";
import styles from "./carrito.module.css";
import ButtonMP from "../../Components/IntegracionMercadoPago/IntegracionMercadoPago";
import ButtonMPTotal from "../../Components/MercadoPagoTotal/MercadoPagoTotal";
import { Link } from "react-router-dom";

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
      updatedCartItems[existingItemIndex].totalPrice =
      updatedCartItems[existingItemIndex].quantity *
      updatedCartItems[existingItemIndex].price;
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
      if (updatedCartItems[existingItemIndex].quantity > 1) {
        updatedCartItems[existingItemIndex].quantity -= 1;
        // Actualizar el precio total del ítem
        updatedCartItems[existingItemIndex].totalPrice =
          updatedCartItems[existingItemIndex].quantity *
          updatedCartItems[existingItemIndex].price;
      } else {
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

  const calcularTotalCarrito = () => {
    let total = 0;
    for (const item of cartItems) {
      total += item.price * item.quantity;
    }
    return total;
  }


  return (
    <div className="w-full h-full p-16 font-serif bg-chocolate-blanco text-chocolate-oscuro">
      <h2 className="pb-2 text-4xl">
        PRODUCTOS DEL CARRITO
      </h2>
      <div className="p-4 bg-chocolate-mantecol rounded-2xl">

        <div className="px-10 divide-y divide-black">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-6">

                <div className="w-[20%]">
                  <img src={item.image} alt={item.name} className="object-cover w-56 h-40 " />
                </div>

                <div className="w-[40%] flex flex-col gap-10">
                  <p className="text-2xl font-bold">
                    {item.name}
                  </p>
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
            <button className="p-4 text-xl font-bold shadow-sm h-fit shadow-chocolate-claro bg-chocolate-claro rounded-xl text-chocolate-oscuro hover:bg-chocolate-blanco">
            <Link to="/products">Ver nuestos productos</Link>
          </button>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-6 justify-items-center">
          <button onClick={handleDeleteCart} className="p-4 text-xl font-bold shadow-sm h-fit shadow-chocolate-claro bg-chocolate-claro rounded-xl text-chocolate-oscuro hover:bg-chocolate-blanco">
            Borrar carrito
          </button>
          <p className="left-0 p-2 m-2 text-2xl font-bold ">
            Total del carrito: ${calcularTotalCarrito()}
          </p>
          <ButtonMPTotal products={buildProductsObject(cartItems)} />
        </div>

      </div>
    </div>
  );
};

export default Carrito;
