const { Sale, OrderItem, Product, conn: sequelize } = require('../../db');
const { Op } = require('sequelize');
const moment = require('moment');

const getMonthPerformanceHandler = async (req, res, next) => {
  try {
    const currentMonth = moment().month();
const prevMonth = moment().subtract(1, 'months').month();
const currentYear = moment().year();
const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
const currentSemester = currentMonth < 6 ? 1 : 2;
const currentSemesterStart = currentSemester === 1 ? moment().startOf('year') : moment().month(6).startOf('month');
const currentSemesterEnd = currentSemester === 1 ? moment().month(5).endOf('month') : moment().endOf('year');
const lastSemesterStart = currentMonth < 6 ? moment(`${currentYear - 1}-07-01`) : moment(`${currentYear}-01-01`);
    const lastSemesterEnd = currentMonth < 6 ? moment(`${currentYear - 1}-12-31`) : moment(`${currentYear}-06-30`);

const currentMonthSales = (await Sale.sum('amount', {
  where: {
    status: 'approved',
    createdAt: {
      [Op.gte]: moment(`${currentYear}-${currentMonth + 1}-01`).toDate(),
      [Op.lte]: moment(`${currentYear}-${currentMonth + 1}-31`).toDate()
    }
  }
}))  || 0;

const prevMonthSales = (await Sale.sum('amount', {
  where: {
    status: 'approved',
    createdAt: {
      [Op.gte]: moment(`${prevYear}-${prevMonth + 1}-01`).toDate(),
      [Op.lte]: moment(`${prevYear}-${prevMonth + 1}-31`).toDate()
    }
  }
}) )|| 0;

const currentSemesterTotalSales = (await Sale.sum('amount', {
  where: {
    status: 'approved',
    createdAt: {
      [Op.gte]: currentSemesterStart.toDate(),
      [Op.lte]: currentSemesterEnd.toDate()
    }
  }
}) )|| 0;

const lastSemesterTotalSales = (await Sale.sum('amount', {
  where: {
    status: 'approved',
    createdAt: {
      [Op.gte]: lastSemesterStart.toDate(),
      [Op.lte]: lastSemesterEnd.toDate()
    }
  }
})) || 0;

const currentYearTotalSales = (await Sale.sum('amount', {
  where: {
    status: 'approved',
    createdAt: {
      [Op.gte]: moment(`${currentYear}-01-01`).toDate(),
      [Op.lte]: moment(`${currentYear}-12-31`).toDate()
    }
  }
})) || 0;

const lastYearTotalSales = (await Sale.sum('amount', {
  where: {
    status: 'approved',
    createdAt: {
      [Op.gte]: moment(`${currentYear - 1}-01-01`).toDate(),
      [Op.lte]: moment(`${currentYear - 1}-12-31`).toDate()
    }
  }
})) || 0;

const salesVariaton = prevMonthSales === 0 ? 100 :
 parseInt((((currentMonthSales - prevMonthSales) / prevMonthSales) * 100).toFixed(0));
const VariationSemester = lastSemesterTotalSales === 0 ? 100 :
 parseInt((((currentSemesterTotalSales - lastSemesterTotalSales) / lastSemesterTotalSales) * 100).toFixed(0));
const VariationYear = lastYearTotalSales === 0 ? 100 :
 parseInt((((currentYearTotalSales - lastYearTotalSales) / lastYearTotalSales) * 100).toFixed(0));


const salesPerformance = {
  currentMonthSales,
  prevMonthSales,
  salesVariaton,
  currentSemesterTotalSales,
  lastSemesterTotalSales,
    VariationSemester,
  currentYearTotalSales,
  lastYearTotalSales,
    VariationYear
};

res.json(salesPerformance);
    

    } catch (error) {
      next(error);
    }
  };
  
  module.exports = {
    getMonthPerformanceHandler
  };
  
