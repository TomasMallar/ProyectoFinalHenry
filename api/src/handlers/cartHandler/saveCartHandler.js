const { Cart, User } = require('../../db');

const saveCartHandler = async (req, res) => {
    try {
      const { userId } = req.params;
      console.log("ESTE ES EL USERID",userId);
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const {cartItems} = req.body;
      console.log("ESTOS SON LOS ITEMS",cartItems)
      console.log("ESTOS SON LOS ITEMS",typeof cartItems)

      ;
      const cart = await Cart.findOne({ where: { userId } });
      console.log("ESTE ES EL CART",cart);
      if (!cart) {
        await Cart.create({ userId, products: cartItems });
      } else {
        cart.products = cartItems;
        await cart.save();
      }
      return res.json({ message: 'Cart updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { saveCartHandler };