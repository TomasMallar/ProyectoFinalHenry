const { Sale, Order } = require('../../db');
const { Op } = require('sequelize');
const moment = require('moment');

const getTotalSalesAndOrdersByMonthHandler = async (req, res, next) => {
  try {
    const { month } = req.query;
    const monthStart = moment(month, 'YYYY-MM').startOf('month').toISOString();
    const monthEnd = moment(month, 'YYYY-MM').endOf('month').toISOString();
    const ordersPending = await Order.count({
      where: {
        status: 'pending',
        createdAt: {
          [Op.gte]: monthStart,
          [Op.lte]: monthEnd,
        },
      },
    });
    const salesApproved = await Sale.count({
      where: {
        status: 'approved',
        createdAt: {
          [Op.gte]: monthStart,
          [Op.lte]: monthEnd,
        },

      },
    });
    res.json({
      month,
      ordersPending,
      salesApproved,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTotalSalesAndOrdersByMonthHandler };

