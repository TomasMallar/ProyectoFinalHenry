const { Router } = require("express");

const { getTopSoldProductHandler } = require("../../handlers/metricHandlers/getTopSoldProductHandler");
const { getTotalSalesAndOrdersByMonthHandler } = require("../../handlers/metricHandlers/getTotalSalesAndOrdersByMonthHandler");
const { getPurchasedCartsHandler } = require("../../handlers/metricHandlers/getPurchasedCartsHandler");
const { getPurchasedCartsByCardPaymentHandler } = require("../../handlers/metricHandlers/getPurchasedCartsByCardPaymentHandler");
const { getAverageAmountSalesHandler } = require("../../handlers/metricHandlers/getAverageAmountSalesHandler");


const routerMetric = Router();


routerMetric.get('/top-sold-product', getTopSoldProductHandler);

routerMetric.get('/total-sales-orders-by-month', getTotalSalesAndOrdersByMonthHandler);
routerMetric.get('/purchasedCarts', getPurchasedCartsHandler);
routerMetric.get('/purchasedCartsByCardPayment', getPurchasedCartsByCardPaymentHandler);
routerMetric.get('/average-amount-sales', getAverageAmountSalesHandler) ;



module.exports = routerMetric;