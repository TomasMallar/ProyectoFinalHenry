const { Sale, OrderItem, Product, conn: sequelize } = require('../../db');
const { Op } = require('sequelize');
const moment = require('moment');

const getMonthPerformanceHandler = async (req, res, next) => {
  try {
    const currentMonth = moment().month();
    const prevMonth = moment().subtract(1, 'months').month();
    const currentYear = moment().year();
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const currentMonthSales = await Sale.sum('amount', {
      where: {
        status: 'approved',
        createdAt: {
          [Op.gte]: moment(`${currentYear}-${currentMonth + 1}-01`).toDate(),
          [Op.lte]: moment(`${currentYear}-${currentMonth + 1}-31`).toDate()
        }
      }
    });

    const prevMonthSales = await Sale.sum('amount', {
      where: {
        status: 'approved',
        createdAt: {
          [Op.gte]: moment(`${prevYear}-${prevMonth + 1}-01`).toDate(),
          [Op.lte]: moment(`${prevYear}-${prevMonth + 1}-31`).toDate()
        }
      }
    });

    const salesVariation = (((currentMonthSales - prevMonthSales) / prevMonthSales) * 100).toFixed(2)

    res.json({
      currentMonthSales,
      prevMonthSales,
      salesVariation
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
    getMonthPerformanceHandler
};
