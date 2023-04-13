const {getProductsHandler} = require ('../../handlers/productsHandler/getProductsHandler')
const {postProductHandler} = require ('../../handlers/productsHandler/postProductHandler')

const { Router } = require("express");

const routerProducts = Router();

routerProducts.get("/", getProductsHandler); // Traer chocolates, sea todos o por name
pokemonsRouter.post('/', postProductHandler);

module.exports = routerProducts;
