const { Sale, conn: sequelize } = require('../../db');
const { Op } = require('sequelize');

const getPurchasedCartsByCardPaymentHandler = async (req, res, next) => {
  try {
    const totalSalesAmountByCardsPayment = await Sale.findOne({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('amount')), 'totalSalesAmountByCards']
      ],
      where: {
        status: 'approved',
        paymentMethod: {
          [Op.or]: ['master', 'amex', 'visa']
        }
      }
    });
    const { totalSalesAmountByCards } = totalSalesAmountByCardsPayment.dataValues;
    const totalSalesAmountByCryptoPayment = await Sale.findOne({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('amount')), 'totalSalesAmountByCrypto']
      ],
      where: {
        status: 'approved',
        paymentMethod: {
          [Op.or]: ['crypto']
        }
      }
    });
    const { totalSalesAmountByCrypto } = totalSalesAmountByCryptoPayment.dataValues;
    const totalSalesAmountByTransferPayment = await Sale.findOne({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('amount')), 'totalSalesAmountByTransfer']
      ],
      where: {
        status: 'approved',
        paymentMethod: {
          [Op.or]: ['account_money']
        }
      }
    });
    const { totalSalesAmountByTransfer } = totalSalesAmountByTransferPayment.dataValues;




    const result = await Sale.findOne({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('amount')), 'totalSalesAmount']
      ],
      where: {
        status: 'approved',
      }
    });
    const {totalSalesAmount } = result.dataValues;


    const totalSales = await Sale.count();
    const totalSalesByCardsPayment = await Sale.count({
      where: {
        status: 'approved',
        paymentMethod: {
          [Op.or]: ['master', 'amex', 'visa']
        }
      }
    });
    const totalSalesByCryptoPayment = await Sale.count({
      where: {
        status: 'approved',
        paymentMethod: {
          [Op.or]: ['crypto']
        }
      }
    });
    const totalSalesByTransferPayment = await Sale.count({
      where: {
        status: 'approved',
        paymentMethod: {
          [Op.or]: ['account_money']
        }
      }
    });
    const percentageOfPurchasedCartsByCardsPayment = ((totalSales > 0) ? (totalSalesByCardsPayment / totalSales) : 0)*100;
    const percentageOfPurchasedCartsByCryptoPayment  = ((totalSales > 0) ? (totalSalesByCryptoPayment / totalSales) : 0)*100;
    const percentageOfPurchasedCartsByTransferPayment = ((totalSales > 0) ? (totalSalesByTransferPayment / totalSales) : 0)*100;

    res.json({
      "total sales with any payment": totalSales,
      "total sales amount": totalSalesAmount,
      "total sales by Cards Payment": totalSalesByCardsPayment,
      "total sales amount by Cards Payment": totalSalesAmountByCards,
      "total sales by Crypto Payment": totalSalesByCryptoPayment,
      "total sales amount by Crypto Payment": totalSalesAmountByCrypto,
      "total sales by Transfer Payment": totalSalesByTransferPayment,
      "total sales amount by Transfer Payment": totalSalesAmountByTransfer,
      "percentage of purchased carts by Cards Payment": percentageOfPurchasedCartsByCardsPayment,
      "percentage of purchased carts by Crypto Payment": percentageOfPurchasedCartsByCryptoPayment,
      "percentage of purchased carts by Transfer Payment": percentageOfPurchasedCartsByTransferPayment
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getPurchasedCartsByCardPaymentHandler };


