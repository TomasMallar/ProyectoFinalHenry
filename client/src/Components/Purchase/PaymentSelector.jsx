import React, { useState, useEffect } from 'react';
import Crypto from '../Cryptos/Cryptos';

function PaymentSelector(props) {
  

  return (
    <div>
      <h2>Seleccione un método de pago:</h2>
      <div>
        <Crypto/>
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