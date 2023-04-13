const {getProductsHandler} = require ('../../handlers/productsHandler/getProductsHandler')

const { Router } = require("express");

const routerProducts = Router();

routerProducts.get("/", getProductsHandler); // Traer chocolates, sea todos o por name

module.exports = routerProducts;
