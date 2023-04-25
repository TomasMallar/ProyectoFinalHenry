const { Sale } = require('../../db');
const { Op } = require('sequelize');

const getPurchasedCartsByCardPaymentHandler = async (req, res, next) => {
  try {
    const totalSales = await Sale.count();
    const totalSalesByCardsPayment = await Sale.count({
      where: {
        status: 'approved',
        paymentMethod: {
          [Op.or]: ['master', 'amex', 'visa']
        }
      }
    });
    const percentageOfPurchasedCartsByCardsPayment = (totalSales > 0) ? (totalSalesByCardsPayment / totalSales) : 0;

    res.json({
      "total sales with any payment": totalSales,
      "total sales by Cards Payment": totalSalesByCardsPayment,
      "percentage of purchased carts by Cards Payment": percentageOfPurchasedCartsByCardsPayment
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getPurchasedCartsByCardPaymentHandler };


