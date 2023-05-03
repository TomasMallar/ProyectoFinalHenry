import Crypto from "../Cryptos/Cryptos"
import { useLocation } from 'react-router-dom';

const PaymentCrypto = () => {

    const location = useLocation();
    const order = location.state?.order;
    console.log("ESTA ES LA ORDER",order);
    return (
        <div className="flex items-center justify-center p-10 font-serif bg-chocolate-blanco text-chocolate-oscuro">
            <div className="p-6 bg-chocolate-mantecol rounded-xl w-96">
                <h2 className="m-2 text-2xl">
                    Paga con criptomonedas
                </h2>
                <p className="p-2 m-2 text-lg text-start">
                    Para pagar con criptomonedas, necesitarás una billetera de criptomonedas. Una billetera de criptomonedas es similar a una billetera física, pero en lugar de almacenar billetes y monedas, almacena tus criptomonedas. Si aún no tienes una billetera, puedes descargar una desde el siguiente enlace:
                </p>
                <a href="https://example.com/" className="text-lg underline  hover:text-chocolate-blanco">
                    Descargar billetera de criptomonedas
                </a>
                <Crypto order={order} />
            </div>
        </div>
    )
}

export default PaymentCrypto