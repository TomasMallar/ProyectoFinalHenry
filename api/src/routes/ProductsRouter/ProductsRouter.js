const {getProductsHandler} = require ('../../handlers/productsHandler/getProductsHandler')
const {postProductHandler} = require ('../../handlers/productsHandler/postProductHandler')
const {deleteProductHandler} = require ('../../handlers/productsHandler/deleteProductHandler')
const {updateProductHandler} = require ('../../handlers/productsHandler/updateProductHandler')
const {getProductByIdHandler} = require ('../../handlers/productsHandler/getProductByIdHandler')

const { Router } = require("express");

const routerProducts = Router();

routerProducts.get("/", getProductsHandler); // Traer chocolates, sea todos o por name
routerProducts.get("/:id", getProductByIdHandler);
routerProducts.post('/', postProductHandler);
routerProducts.put('/:id/delete',deleteProductHandler)
routerProducts.put('/:id/update',updateProductHandler)

module.exports = routerProducts;
