const { Router } = require("express");
const { createOrderHandler } = require("../../handlers/orderHandlers/createOrderHandler");
const { createPaymentPreferenceHandler } = require("../../handlers/orderHandlers/createPaymentPreferenceHandler");
const { paymentNotificationHandler } = require("../../handlers/orderHandlers/paymentNotificationHandler");
const { paymentCryptoNotificationHandler } = require("../../handlers/orderHandlers/paymentCryptoNotificationHandler");
const validateJwt = require("../../middlewares/validateJwt/validateJwt")

const routerPayment = Router();

// routerPayment.post('/create-order', validateJwt, createOrderHandler);
routerPayment.post('/create-order', createOrderHandler);
routerPayment.post('/create-payment-preference', createPaymentPreferenceHandler);
routerPayment.post('/handle-payment-notification', paymentNotificationHandler);
routerPayment.post('/crypto-payment-notification', paymentCryptoNotificationHandler);
//
// routerPayment.post('/handle-payment-notification', (req, res) => {
//     console.log('Notificación recibida:', req.body);
//     res.status(200).send();
//   });
module.exports = routerPayment;