const { Order, OrderItem, Product, conn: sequelize } = require('../../db');
const { Op } = require('sequelize');
const moment = require('moment');

const getTopSoldProductHandler = async (req, res, next) => {
  try {
    const { month } = req.query;
    const monthStart = moment(month, 'YYYY-MM').startOf('month').toISOString();
    const monthEnd = moment(month, 'YYYY-MM').endOf('month').toISOString();

    const topSoldProducts = await OrderItem.findAll({
      attributes: [
        'productId',
        [sequelize.fn('COUNT', sequelize.col('productId')), 'count']
      ],
      include: {
        model: Order,
        as: 'order',
        where: {
          status: 'approved',
          createdAt: {
            [Op.between]: [monthStart, monthEnd]
          }
        }
      },
      group: ['productId', 'order.id'], // Agregar 'order.id' en la cláusula GROUP BY
      order: [[sequelize.literal('count'), 'DESC']],
      limit: 1
    });

    const topSoldProduct = await Product.findOne({
      where: {
        id: topSoldProducts[0].productId
      }
    });

    res.json({
      month,
      topSoldProduct
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTopSoldProductHandler };
