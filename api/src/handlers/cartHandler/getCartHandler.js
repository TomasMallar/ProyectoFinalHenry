const { Cart, User } = require('../../db');

const getCartHandler = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log("ESTE ES EL USERID",typeof userId);
    console.log("ESTE ES EL USERID",userId);
    
    const user = await User.findByPk(userId);
    console.log("ESTE ES EL USER",user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    let cart = await user.getCart();
    console.log("ESTE ES EL CART",cart);
    if (!cart) {
      cart = await Cart.create({ products: [] });
      await user.setCart(cart);
    }
    return res.json({ cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getCartHandler };
