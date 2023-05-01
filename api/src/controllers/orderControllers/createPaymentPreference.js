const mercadopago = require('mercadopago');
const { Order, OrderItem, Product } = require('../../db');

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

const createPaymentPreference = async (orderId) => {
  console.log("orderId", orderId)
  const order = await Order.findByPk(orderId, {
    include: [{
      model: OrderItem,
      as: 'items',
      include: {
        model: Product,
        as: 'product',
      }
    }],
  });
  console.log(order)
  if (!order) {
    throw new Error('Pedido no encontrado');
  }

  const items = order.items.map((item) => ({
    title: item.product.name,
    unit_price: item.product.price,
    quantity: item.quantity,
  }));

  const preference = {
    items,
    external_reference: `${order.id}`,
    back_urls: {
      success: 'http://localhost:3000/purchase/approved',
      failure: 'http://localhost:3000/purchase/rejected',
      pending: 'http://localhost:3000/purchase/pending',
    },
    notification_url: 'https://9fe3-181-31-209-160.sa.ngrok.io/payment/handle-payment-notification',
  };
  

  const response = await mercadopago.preferences.create(preference);
  console.log("Preferencia de pago creada:", response.body);

  return response.body.init_point;
};

module.exports = { createPaymentPreference };