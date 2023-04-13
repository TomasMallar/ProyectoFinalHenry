const {getProductsHandler} = require ('../../handlers/productsHandler/getProductsHandler')
const {postProductHandler} = require ('../../handlers/productsHandler/postProductHandler')
const {deleteProductHandler} = require ('../../handlers/productsHandler/deleteProductHandler')

const { Router } = require("express");

const routerProducts = Router();

routerProducts.get("/", getProductsHandler); // Traer chocolates, sea todos o por name
routerProducts.post('/', postProductHandler);
routerProducts.put('/:id/delete',deleteProductHandler)

module.exports = routerProducts;
