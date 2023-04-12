const {
  getProductsHandler,
  postProducts,
} = require("../../handlers/ProductsHandler");

const { Router } = require("express");

const routerProducts = Router();

routerProducts.get("/", getProductsHandler); // Traer chocolates, sea todos o por name
routerProducts.post("/", postProducts);

module.exports = routerProducts;
