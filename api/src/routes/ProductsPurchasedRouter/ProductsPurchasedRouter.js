const { getProducts } = require('../../handlers/ProductsPurchasedHandler/ProductsPurchasedHandler')
const { Router } = require("express");

const routerPurchased = Router()

routerPurchased.get('/:productId', getProducts)

module.exports = routerPurchased