const { Order, OrderItem, Product } = require('../../db');

const createOrder = async (userId, cartItems) => {
  console.log(userId, cartItems);
  const newOrder = await Order.create({
    userId: userId,
  });

  const orderItems = cartItems.map((item) => ({
    orderId: newOrder.id,
    productId: item.id,
    quantity: item.quantity,
  }));

  await OrderItem.bulkCreate(orderItems);

  return newOrder;
};

module.exports = { createOrder };

