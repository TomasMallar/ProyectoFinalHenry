import React from 'react';
import { useLocation } from 'react-router-dom';

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

  return (
    <div>
      <h2>Seleccione un método de pago:</h2>
      <div>
        <button
          // onClick={() => handlePaymentSelection('crypto')}
          // className={selectedPayment === 'crypto' ? 'selected' : ''}
        >
          Crypto{order}
        </button>
        <button
          onClick={handleMercadoPagoClick}
          // className={selectedPayment === 'mercadopago' ? 'selected' : ''}
        >
          MercadoPago
        </button>
      </div>
    </div>
  );
}

export default PaymentSelector;
