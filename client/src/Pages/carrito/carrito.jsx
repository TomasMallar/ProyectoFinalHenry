import React, { useState, useEffect } from "react";

const Carrito = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Obtener los datos del localStorage al montar el componente
        const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        setCartItems(storedCartItems);
    }, []);

    const handleDelteCart = () => {
        localStorage.clear();
        alert("carrito borrado")
    }


    return (
        <div>
            <h2>Carrito de Productos</h2>
            <button onClick={handleDelteCart}>
                Borrar carrito
            </button>
            {cartItems.length > 0 ? (
                cartItems.map((item) => (
                    <div key={item.id}>
                        <img src={item.image} alt={item.name} />
                        <p>Nombre: {item.name}</p>
                        <p>Precio: {item.price}</p>
                    </div>
                ))
            ) : (
                <p>No hay productos en el carrito.</p>
            )}
        </div>
    )
}

export default Carrito;