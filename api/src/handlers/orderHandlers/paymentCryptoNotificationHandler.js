const { Order, Sale } = require('../../db');

const paymentCryptoNotificationHandler = async (req, res) => {
  try {
    const { orderId, hash, amount } = req.body;
    
    // Buscar la orden en la base de datos y actualizar su estado a "approved"
    const order = await Order.findOne({ where: { id: orderId } });
    order.status = "approved";
    await order.save();

    // Crear una nueva venta en la base de datos
    const sale = await Sale.create({
      orderId: order.id,
      amount: amount,
      status: "approved",
      paymentMethod: "crypto",
      paymentId: hash
    });

    res.json({ message: "Payment notification received successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while processing the payment notification." });
  }
};

module.exports = { paymentCryptoNotificationHandler };
