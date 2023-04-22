const { Sale, Order } = require('../../db');

const getPurchasedCartsHandler = async (req, res, next) => {
  try {
    const totalOrders = await Order.count();
    const purchasedOrders = await Order.count({ where: { status: 'approved' } });

    const percentage = purchasedOrders / totalOrders;

    res.json({
      totalOrders,
      purchasedOrders,
      percentage: percentage.toFixed(2),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getPurchasedCartsHandler };

