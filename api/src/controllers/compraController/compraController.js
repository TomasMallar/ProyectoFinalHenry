const axios = require('axios')
const { ACCESS_TOKEN } = process.env;

const newOrder = async (bodyOrder) => {

    const url = 'https://api.mercadopago.com/checkout/preferences'

    const body = {
        payer_email: 'test_user_1754017320@testuser.com',
        items:
                bodyOrder.map(b => {
                    return {
                        title: b.title,
                        quantity: b.quantity,
                        unit_price: b.unit_price
                    }
                })
            ,
        back_urls: {
            failure: '/failure',
            pending: '/pending',
            success: 'http://localhost:3000/home'
        },
        auto_return: "approved",
        binary_mode: true
    }

    const payment = await axios.post(url, body, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    })

    const id = payment.data.id
    console.log(id);
    return payment.data
}

module.exports = {
    newOrder,
}