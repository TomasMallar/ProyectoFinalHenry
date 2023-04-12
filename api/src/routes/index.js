const { Router } = require("express");
const routerProducts = require("./ProductsRouter/ProductsRouter");
const routerCategories = require("./CategoryRouter/CategoryRouter");

const router = Router();

// Ruta para los chocolates
router.use("/products", routerProducts);
router.use("/categories", routerCategories);

module.exports = router;
