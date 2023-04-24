import Crypto from "../Cryptos/Cryptos"
import { useLocation } from 'react-router-dom';

const PaymentCrypto = () => {

    const location = useLocation();
    const order = location.state?.order;
    console.log(order);
    return (
        <div>
            <h2>Paga con criptomonedas</h2>
                <p>Para pagar con criptomonedas, necesitarás una billetera de criptomonedas. Una billetera de criptomonedas es similar a una billetera física, pero en lugar de almacenar billetes y monedas, almacena tus criptomonedas. Si aún no tienes una billetera, puedes descargar una desde el siguiente enlace:</p>
                <a href="https://example.com/">Descargar billetera de criptomonedas</a>
            <Crypto order={order}/>
        </div>
    )
}

export default PaymentCrypto