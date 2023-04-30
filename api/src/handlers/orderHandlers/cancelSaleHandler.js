const { Sale,Order,OrderItem,Product,User, conn:sequelize } = require("../../db");


const cancelSaleHandler = async (req, res) => {
    const { userId } = req.body;
    const { saleId } = req.params;
  
    try {
      // Obtener la venta a cancelar
      const sale = await Sale.findOne({
        where: { id: saleId },
        include: [
          {
            model: Order,
            
            as: "order",
            include: [
              {
                model: User,
                as: "user",
                where: { id: userId },
              },
              {
                model: OrderItem,
                as: "items",
                include: {
                  model: Product,
                  as: "product",
                },
              },
            ],
          },
        ],
      });
  
      if (!sale) {
        return res.status(404).json({ message: "Sale not found" });
      }
  
      // Actualizar el stock de los productos
      await sequelize.transaction(async (t) => {
        for (let i = 0; i < sale.order.items.length; i++) {
          const orderItem = sale.order.items[i];
          const product = orderItem.product;
          const newStock = product.stock + orderItem.quantity;
          await product.update({ stock: newStock }, { transaction: t });
        }
  
        // Cancelar la venta
        sale.status = "cancelled";
        await sale.save({ transaction: t });
      });
  
      res.json({ message: "Sale cancelled successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while cancelling the sale" });
    }
  };

    module.exports = { cancelSaleHandler };