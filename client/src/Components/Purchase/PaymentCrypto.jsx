import Crypto from "../Cryptos/Cryptos"
import { useLocation } from 'react-router-dom';

const PaymentCrypto = () => {

    const location = useLocation();
    const order = location.state?.order;
    console.log(order);
    return (
        <div>
            <Crypto order={order}/>
        </div>
    )
}

export default PaymentCrypto