const { Sale, Order } = require('../../db');

const getPurchasedCartsHandler = async (req, res, next) => {
  try {
    const totalOrders = await Order.count();
    const purchasedOrders = await Order.count({ where: { status: 'approved' } });
    const notPurchasedOrders = await Order.count({ where: { status: 'pending' } });

    const percentage = (purchasedOrders / totalOrders)*100;
    const percentageNotPurchased = (notPurchasedOrders / totalOrders)*100;

    res.json({
      totalOrders,
      notPurchasedOrders,
      purchasedOrders,
      percentageNotPurchased: percentageNotPurchased.toFixed(2),
      percentage: percentage.toFixed(2),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getPurchasedCartsHandler };

