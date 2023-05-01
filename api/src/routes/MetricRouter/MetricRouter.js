const { Router } = require("express");

const { getTopSoldProductHandler } = require("../../handlers/metricHandlers/getTopSoldProductHandler");
const { getTotalSalesAndOrdersByMonthHandler } = require("../../handlers/metricHandlers/getTotalSalesAndOrdersByMonthHandler");
const { getPurchasedCartsHandler } = require("../../handlers/metricHandlers/getPurchasedCartsHandler");
const { getPurchasedCartsByCardPaymentHandler } = require("../../handlers/metricHandlers/getPurchasedCartsByCardPaymentHandler");
const { getAverageAmountSalesHandler } = require("../../handlers/metricHandlers/getAverageAmountSalesHandler");
const { getTotalSalesByMonthHandler } = require("../../handlers/metricHandlers/getTotalSalesByMonthHandler");
const { getMonthPerformanceHandler } = require("../../handlers/metricHandlers/getMonthPerformanceHandler");
const {getAllSalesPaginatedHandler} = require("../../handlers/metricHandlers/getAllSalesPaginatedHandler");
const {getAllOrdersPaginatedHandler} = require("../../handlers/metricHandlers/getAllOrdersPaginatedHandler");
const {getSalesByUserHandler} = require("../../handlers/metricHandlers/getSalesByUserHandler");
const {getOrdersByUserHandler} = require("../../handlers/metricHandlers/getOrdersByUserHandler");

const routerMetric = Router();


routerMetric.get('/top-sold-product', getTopSoldProductHandler);

routerMetric.get('/total-sales-orders-by-month', getTotalSalesByMonthHandler);
routerMetric.get('/purchasedCarts', getPurchasedCartsHandler);
routerMetric.get('/purchasedCartsByCardPayment', getPurchasedCartsByCardPaymentHandler);
routerMetric.get('/average-amount-sales', getAverageAmountSalesHandler) ;
routerMetric.get('/month-performance', getMonthPerformanceHandler);
routerMetric.get('/all-sales', getAllSalesPaginatedHandler );
routerMetric.get('/all-orders', getAllOrdersPaginatedHandler );
routerMetric.get('/all-sales/user', getSalesByUserHandler );
routerMetric.get('/all-orders/user', getOrdersByUserHandler );


module.exports = routerMetric;