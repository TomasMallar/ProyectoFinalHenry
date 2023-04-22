import axios from 'axios'
import React, { useState } from 'react';
import { ethers } from "ethers";

const Crypto = () => {

    const [value, setValue] = useState(0)
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

            const items = JSON.parse(localStorage.getItem('cartItems'))
            const totalPrice = items.reduce((acumulador, currentValue) => {
                return acumulador + currentValue.price
            }, 0)

            console.log(items);
            const body = {
                hash: tx.hash,
                totalPrice: totalPrice,
                //orden de compra
            }
            //const response = axios.post('http://localhost:3001/crypto-payment-notification', body)

            setResponseMessage('Pago exitoso')
            return tx;
        } catch (error) {
            console.log(error.message);
            setResponseMessage(`Error al realizar el pago`);
        }
    };


    const handlePayment = async () => {
        const ether = value;
        const addr = "0x0C16F41d6e190CdA2E3A002FD518AC0B5367C3D9";
        const tx = await startPayment({ ether, addr });

        console.log(tx);
    };

    const changeHandler = (event) => {
        setValue(event.target.value)
        console.log(value);
    }

    return (
        <div>
            <input type="text" onChange={changeHandler} value={value} />
            <button onClick={handlePayment}>Pay with MetaMask</button>
            {responseMessage && <h1>{responseMessage}</h1>}
        </div>
    )
}

export default Crypto