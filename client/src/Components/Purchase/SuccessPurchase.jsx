import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const SuccessPurchase = () => {
  return (
    <div className="h-screen p-12 font-serif text-chocolate-oscuro bg-chocolate-blanco">
      <div className='p-6 bg-chocolate-mantecol rounded-2xl'>
        <h1 className='p-2 text-3xl'>Compra exitosa</h1>
        <p className='p-2 text-xl'>Tu compra ha sido procesada con éxito. ¡Gracias por tu pedido!</p>

        <button className="p-4 text-xl font-bold shadow-sm h-fit shadow-chocolate-claro bg-chocolate-claro rounded-xl text-chocolate-oscuro hover:bg-chocolate-blanco">
          <Link to="/home"> Volver a Home</Link>
        </button>
      </div>
    </div>
  );
};

export default SuccessPurchase;
