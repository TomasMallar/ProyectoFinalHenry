const {
  getAllProducts,
  postProducts,
} = require("../../handlers/ProductsHandler");

const { Router } = require("express");

const routerProducts = Router();

routerProducts.get("/", getAllProducts); // Traer todos los chocolates
routerProducts.post("/", postProducts);

module.exports = routerProducts;
