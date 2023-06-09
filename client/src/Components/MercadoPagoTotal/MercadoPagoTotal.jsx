import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export default function ButtonMPTotal({ products }) {
  const history = useHistory();

  const handleOnClick = () => {
    // obtener el token de autorización de sessionStorage
    if (!sessionStorage.getItem('token')) {
      alert('Debes iniciar sesión para poder comprar');
      history.push('/login');
      return;
    }
    const token = sessionStorage.getItem('token');

    // decodificar el token para obtener el ID del usuario
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.id;
    let order
    console.log(products, 'soy products');
    axios.post('http://localhost:3001/payment/create-order', { userId, cartItems: products.bodyOrder })
      .then((response) => {
        console.log("ESTA ES LA ORDER ID?", response.data.order.id);
        order = response.data.order.id;
        return axios.post('http://localhost:3001/payment/create-payment-preference', { orderId: order });
      })
      .then((mpResponse) => {
        // Guardar responseData y redirigir al componente PaymentSelector
        console.log("ESTA ES LA MP RESPONSE?", mpResponse.data);
        const responseData = mpResponse.data.id;
        console.log("ESTA ES LA MP RESPONSE?", responseData);
        history.push({
          pathname: '/purchase/payment-selector',
          state: { responseData, order }
        });
      });
  }

  return (
    <button onClick={handleOnClick} className="px-6 py-4 mb-8 font-serif text-xl font-bold rounded-lg shadow-sm bg-chocolate-claro text-chocolate-oscuro shadow-chocolate-claro hover:bg-chocolate-blanco">FINALIZAR COMPRA</button>
  )
}
