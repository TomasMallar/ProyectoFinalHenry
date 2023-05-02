const { Router } = require("express");

const { getCartHandler } = require("../../handlers/cartHandler/getCartHandler");
const { saveCartHandler } = require("../../handlers/cartHandler/saveCartHandler");

const routerCart = Router();

routerCart.get('/', getCartHandler );
routerCart.post('/:userId', saveCartHandler);


module.exports = routerCart;