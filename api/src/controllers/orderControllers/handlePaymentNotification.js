const { Sale, Order, OrderItem, Product, User, Cart, Purchase } = require('../../db');
const mercadopago = require('mercadopago');

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

const handlePaymentNotification = async (req, res, next) => {
  const { topic, id } = req.query;
  console.log('LLEGAMOS AL PAY NOTI:', topic, id)

  if (topic === 'payment') {
    try {
      const payment = await mercadopago.payment.findById(id);
      const orderId = payment.body.external_reference;
      const order = await Order.findByPk(orderId);
      const merchantOrder = await mercadopago.merchant_orders.findById(payment.body.order.id);
      console.log("ACA DEBERIA DE VER EL MERCHANT ORDER", merchantOrder)

      if (!order) {
        res.status(404).json({ message: 'Pedido no encontrado' });
        return;
      }

      const saleData = {
        orderId: orderId,
        paymentId: payment.body.id,
        paymentMethod: payment.body.payment_method_id,
        status: payment.body.status,
      };

      const [sale, created] = await Sale.findOrCreate({
        where: {
          orderId: orderId
        }
      });

      await sale.update({
        orderId: orderId,
        paymentId: payment.body.id,
        paymentMethod: payment.body.payment_method_id,
        status: payment.body.status,
        amount: merchantOrder.body.paid_amount
      });

      await order.update({ status: payment.body.status });

      const userId = order.userId;

      if (payment.body.status === 'approved') {
        const orderItems = await OrderItem.findAll({ where: { orderId } });

        const arr = []
        orderItems.forEach(async (item) => {
          const product = await Product.findByPk(item.productId);
          arr.push(product)
          const newTotalSold = product.totalSold + item.quantity;
          const newStock = product.stock - item.quantity;
          await product.update({ totalSold: newTotalSold, stock: newStock });
        });

        const productsId = arr.map(o => o.id)
        for (const productId of productsId) {
          await Purchase.findOrCreate({
            where: {
              userId: userId,
              productId: productId
            }
          });
        }
        
        const user = await User.findByPk(userId);
        const cart = await Cart.findOne({ where: { userId } });
        await cart.update({ products: [] });

      }


      res.status(200).send('Notificación procesada correctamente');
    } catch (error) {
      next(error);
    }
  }

}

module.exports = { handlePaymentNotification };