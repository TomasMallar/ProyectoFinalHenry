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
    <div>
      <h2>Seleccione un método de pago:</h2>
      <div>
        <button
          onClick={handleCryptoClick}
        // className={selectedPayment === 'crypto' ? 'selected' : ''}
        >
          Criptomonedas
        </button>
        <button
          onClick={handleMercadoPagoClick}
        // className={selectedPayment === 'mercadopago' ? 'selected' : ''}
        >
          MercadoPago
        </button>
      </div>
      <div>
        <h2>calcular tiempo de envio</h2>
        <Maps />
      </div>
    </div>
  );
}

export default PaymentSelector;
