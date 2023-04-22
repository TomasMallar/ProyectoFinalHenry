const { Sale, Order, Product } = require('../../db');
const { Op } = require('sequelize');
sequelize = require('sequelize');



const getSuccessfulSalesAndAverageAmountHandler = async (req, res, next) => {
  try {
    const successfulSales = await Sale.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'successfulSales'],
        [sequelize.fn('AVG', sequelize.col('amount')), 'averageAmount'],
      ],
      where: { status: 'approved' },
    });

    res.json(successfulSales);
  } catch (error) {
    next(error);
  }
};

module.exports = { getSuccessfulSalesAndAverageAmountHandler };
