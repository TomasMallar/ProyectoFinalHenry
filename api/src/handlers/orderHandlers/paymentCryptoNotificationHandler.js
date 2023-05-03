const { Purchase ,Order, Sale, Product, orderItem, User, Cart, conn:sequelize} = require('../../db');


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
    
    const userId = order.userId;
    // Obtener los OrderItems de la orden y restar la cantidad vendida del stock de cada producto
    const orderItems = await order.getItems();
    await sequelize.transaction(async (t) => {
      await order.save({ transaction: t });
      await sale.save({ transaction: t });
      const arr = []
      for (let i = 0; i < orderItems.length; i++) {
        const orderItem = orderItems[i];
        const product = await Product.findByPk(orderItem.productId);
        arr.push(product)
        if (!product) {
          // Manejar el caso en que product es undefined
          return res.status(500).json({ message: "An error occurred while processing the payment notification." });
        }
        const newStock = product.stock - orderItem.quantity;
        await product.update({ stock: newStock });
      }
      const productsId = arr.map(o => o.id)
      for (const productId of productsId) {
        await Purchase.findOrCreate({
          where: {
            userId: userId,
            productId: productId
          }
        });
      }
    });

    const user = await User.findByPk(userId);
    const cart = await Cart.findOne({ where: { userId } });
    await cart.update({products:[]});

    res.json({ message: "Payment notification received successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while processing the payment notification." });
  }
};

module.exports = { paymentCryptoNotificationHandler };
