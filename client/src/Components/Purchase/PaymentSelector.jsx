import React from 'react';
// import { useState, useEffect } from 'react';
// import Crypto from '../Cryptos/Cryptos';
import { useLocation, useHistory } from 'react-router-dom';
import Maps from '../Maps/Maps'
function PaymentSelector() {
  const location = useLocation();
  const responseData = location.state?.responseData;
  const order = location.state?.order;

  const handleMercadoPagoClick = () => {
    if (responseData) {
      window.location.href = responseData;
    } else {
      console.error('No se encuentra el enlace de pago de MercadoPago en la respuesta.');
    }
  };

  const history = useHistory();

  const handleCryptoClick = () => {
    history.push({
      pathname: '/purchase/crypto',
      state: { order, from: '/purchase/payment-selector' }
    });
  };

  return (
    <div className='flex items-center justify-center h-screen p-16 font-serif bg-chocolate-blanco text-chocolate-oscuro'>
      <div className=' bg-chocolate-mantecol rounded-2xl'>
        <h2 className='p-6 text-4xl'>
          Seleccione un método de pago:
        </h2>

        <div className='flex items-center justify-evenly'>
          <button
            onClick={handleCryptoClick}
            className='p-4 text-xl font-bold shadow-sm h-fit shadow-chocolate-claro bg-chocolate-claro rounded-xl text-chocolate-oscuro hover:bg-chocolate-blanco'
          >
            Criptomonedas
          </button>
          <button
            onClick={handleMercadoPagoClick}
            className="p-4 text-xl font-bold shadow-sm h-fit shadow-chocolate-claro bg-chocolate-claro rounded-xl text-chocolate-oscuro hover:bg-chocolate-blanco"
          >
            MercadoPago
          </button>
        </div>

        <div >
          <h2 className='p-6 text-2xl'>
            Calcular tiempo de envio
          </h2>
          <Maps />
        </div>
      </div>
    </div>
  );
}

export default PaymentSelector;
