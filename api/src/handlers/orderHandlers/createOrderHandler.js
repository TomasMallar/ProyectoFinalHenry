const { createOrder } = require('../../controllers/orderControllers/createOrderController');

const createOrderHandler = async (req, res) => {
  try {
    const { userId,  cartItems } = req.body;
    // const userId = req.userId;
    
    console.log(userId,cartItems)
    if (!userId ||  !cartItems) {
      return res.status(400).json({ message: 'Faltan datos en la solicitud' });
    }

    const newOrder = await createOrder(userId, cartItems);

    res.status(201).json({ message: 'Pedido creado con éxito', order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el pedido' });
  }
};

module.exports = { createOrderHandler };

