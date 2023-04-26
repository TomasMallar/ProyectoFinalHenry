const { Sale, OrderItem, Product, conn: sequelize } = require('../../db');
const { Op } = require('sequelize');
const moment = require('moment');

const getTotalSalesByMonthHandler = async (req, res, next) => {
  try {
    const salesByMonth = await Sale.findAll({
        attributes: [
          [sequelize.literal("DATE_PART('month', \"createdAt\")"), 'month'],
          [sequelize.literal("DATE_PART('year', \"createdAt\")"), 'year'],
          [sequelize.fn('SUM', sequelize.col('amount')), 'total_sales_amount'],
          [sequelize.fn('COUNT', sequelize.col('id')), 'total_sales' ]
        ],
        group: ['month', 'year'],
          order: [
    [sequelize.fn('DATE_PART', 'month', sequelize.col('createdAt')), 'ASC'],
    [sequelize.fn('DATE_PART', 'year', sequelize.col('createdAt')), 'ASC'],
  ],
      });
      
      
    res.json(salesByMonth);
  } catch (error) {
    next(error);
  }
};

module.exports = { getTotalSalesByMonthHandler };
