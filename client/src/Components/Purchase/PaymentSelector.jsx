import React, { useState, useEffect } from 'react';

function PaymentSelector(props) {
  

  return (
    <div>
      <h2>Seleccione un método de pago:</h2>
      <div>
        <button
        //   onClick={() => handlePaymentSelection('crypto')}
        //   className={selectedPayment === 'crypto' ? 'selected' : ''}
        >
          Crypto
        </button>
        <button
        //   onClick={() => handlePaymentSelection('mercadopago')}
        //   className={selectedPayment === 'mercadopago' ? 'selected' : ''}
        >
          MercadoPago
        </button>
      </div>
    </div>
  );
}

export default PaymentSelector;