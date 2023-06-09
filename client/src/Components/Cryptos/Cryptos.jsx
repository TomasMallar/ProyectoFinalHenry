import axios from 'axios'
import React, { useState } from 'react';
import { ethers } from "ethers";
import { useHistory } from 'react-router-dom';

const Crypto = (order) => {
    const history = useHistory();

    const [responseMessage, setResponseMessage] = useState('')
    const startPayment = async ({ ether, addr }) => {
        try {

            if (!window.ethereum) {
                throw new Error("No crypto wallet found. Please install it.");
            }

            await window.ethereum.send("eth_requestAccounts");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            ethers.utils.getAddress(addr);
            const tx = await signer.sendTransaction({
                to: addr,
                value: ethers.utils.parseEther(ether),
            });


            const body = {
                hash: tx.hash,
                amount: ether,
                orderId: order.order
            }
            console.log(body);
            await axios.post('http://localhost:3001/payment/crypto-payment-notification', body)
            history.push('/purchase/approved');

            setResponseMessage('Pago exitoso')
            return tx;
        } catch (error) {
            console.log(error.message);
            setResponseMessage(`Error al realizar el pago`);
        }
    };

    const pesosAEther = () => {
        const items = JSON.parse(localStorage.getItem('cartItems'))
        const totalPrice = items.reduce((acumulador, currentValue) => {
            return acumulador + currentValue.price
        }, 0)
        console.log(totalPrice);

        const cambio = 0.0000025
        let ether = totalPrice * cambio
        console.log(ether.toString().slice(0, 7));
        return ether.toString().slice(0, 7)
    }

    const handlePayment = async () => {
        const ether = pesosAEther()
        const addr = "0x0C16F41d6e190CdA2E3A002FD518AC0B5367C3D9";
        const tx = await startPayment({ ether, addr });

        console.log(tx, responseMessage);
    };

    return (
        <div>
            <button onClick={handlePayment} className="p-4 text-xl font-bold shadow-sm h-fit shadow-chocolate-claro bg-chocolate-claro rounded-xl text-chocolate-oscuro hover:bg-chocolate-blanco">
                Pagar
            </button>
        </div>
    )
}

export default Crypto