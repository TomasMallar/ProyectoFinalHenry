const {getProductsHandler} = require ('../../handlers/productsHandle/getProductsHandler')
const {postProductHandler} = require ('../../handlers/productsHandle/postProductHandler')
const {deleteProductHandler} = require ('../../handlers/productsHandle/deleteProductHandler')
const {updateProductHandler} = require ('../../handlers/productsHandle/updateProductHandler')
const {getProductByIdHandler} = require ('../../handlers/productsHandle/getProductByIdHandler')

const { Router } = require("express");

const routerProducts = Router();

routerProducts.get("/", getProductsHandler); // Traer chocolates, sea todos o por name
routerProducts.get("/:id", getProductByIdHandler);
routerProducts.post('/', postProductHandler);
routerProducts.put('/:id/delete',deleteProductHandler)
routerProducts.put('/:id/update',updateProductHandler)

module.exports = routerProducts;
