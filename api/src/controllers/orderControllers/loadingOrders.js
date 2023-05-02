const { Order, OrderItem, Product, Sale } = require('../../db');

const loadingOrders = async (sale) => {
  const {userId, cartItems,paymentMethod,status,createdAt} = sale;
  console.log(userId, cartItems);
  const newOrder = await Order.create({
    userId: userId,
    status: status,
    createdAt: createdAt,
  });

  const orderItems = cartItems.map((item) => ({
    orderId: newOrder.id,
    productId: item.id,
    quantity: item.quantity,
  }));

  await OrderItem.bulkCreate(orderItems);


  const products = await Product.findAll({
    where: {
      id: cartItems.map((item) => item.id),
    },
  });

  // Calculamos el monto total de la venta a partir de los precios de los productos
  const amount = products.reduce((total, product, index) => {
    const item = cartItems[index];
    return total + product.price * item.quantity;
  }, 0);


  const saleData = {
    orderId: newOrder.id,
    paymentMethod: paymentMethod, // Por ejemplo, aquí podrías establecer el método de pago utilizado
    paymentId: 1231231312311,
    status: status, // Aquí podrías establecer el estado de la venta
    amount: amount,
    createdAt: createdAt,
  };

  await Sale.create(saleData);

  return;
};

module.exports = { loadingOrders };
