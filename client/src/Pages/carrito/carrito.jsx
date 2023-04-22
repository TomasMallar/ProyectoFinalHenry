import React, { useState, useEffect } from "react";

const Carrito = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        setCartItems(storedCartItems);
    }, []);

    const handleDeleteCart = () => {
        localStorage.removeItem("cartItems");
        setCartItems([]);
    }

    const getUniqueProducts = (cartItems) => {
        const uniqueProducts = {};
        cartItems.forEach(item => {
            if (uniqueProducts[item.id]) {
                uniqueProducts[item.id].quantity += 1;
            } else {
                uniqueProducts[item.id] = {
                    ...item,
                    quantity: 1
                };
            }
        });
        return Object.values(uniqueProducts);
    }

    const uniqueCartItems = getUniqueProducts(cartItems);

    const handleAddToCart = (item) => {
        const updatedCartItems = [...cartItems];
        const existingItem = updatedCartItems.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            updatedCartItems.push({ ...item, quantity: 1 });
        }
        setCartItems(updatedCartItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }

    const handleRemoveFromCart = (item) => {
        const updatedCartItems = [...cartItems];
        const itemIndex = updatedCartItems.findIndex(cartItem => cartItem.id === item.id);
        if (itemIndex !== -1) {
            updatedCartItems[itemIndex].quantity -= 1;
            if (updatedCartItems[itemIndex].quantity === 0) {
                updatedCartItems.splice(itemIndex, 1);
            }
        }
        setCartItems(updatedCartItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }

    return (
        <div>
            <h2>Carrito de Productos</h2>
            <button onClick={handleDeleteCart}>
                Borrar carrito
            </button>
            {uniqueCartItems.length > 0 ? (
                uniqueCartItems.map((item) => (
                    <div key={item.id}>
                        <img src={item.image} alt={item.name} />
                        <p>Nombre: {item.name}</p>
                        <p>Precio: {item.price}</p>
                        <p>Cantidad: {item.quantity}</p>
                        <button onClick={() => handleAddToCart(item)}>+</button>
                        <button onClick={() => handleRemoveFromCart(item)}>-</button>
                    </div>
                ))
            ) : (
                <p>No hay productos en el carrito.</p>
            )}
        </div>
    )
}

export default Carrito;