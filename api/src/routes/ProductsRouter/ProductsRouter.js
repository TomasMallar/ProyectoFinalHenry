const {getProductsHandler} = require ('../../handlers/productsHandle/getProductsHandler')
const {postProductHandler} = require ('../../handlers/productsHandle/postProductHandler')
const {deleteProductHandler} = require ('../../handlers/productsHandle/deleteProductHandler')
const {undodeleteProductHandler} = require ('../../handlers/productsHandle/undodeleteProductHandler')
const {updateProductHandler} = require ('../../handlers/productsHandle/updateProductHandler')
const {getProductByIdHandler} = require ('../../handlers/productsHandle/getProductByIdHandler')
const {getProductsAdvanceHandler} = require ('../../handlers/productsHandle/getProductsAdvanceHandler')

const validatePostProduct = require('../../middlewares/validateProducts/validatePostProduct')
const validatePutProduct = require('../../middlewares/validateProducts/validatePutProduct')

const { Router } = require("express");

const routerProducts = Router();

routerProducts.get("/", getProductsHandler); // Traer chocolates, sea todos o por name
routerProducts.get("/advanced-search", getProductsAdvanceHandler);
routerProducts.get("/:id", getProductByIdHandler);
routerProducts.post('/', validatePostProduct, postProductHandler);
routerProducts.put('/:id/delete',deleteProductHandler)
routerProducts.put('/:id/update', updateProductHandler)
routerProducts.put('/:id/undodelete', undodeleteProductHandler)

module.exports = routerProducts;
