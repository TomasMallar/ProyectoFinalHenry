const { Router } = require("express");
const routerProducts = require("./ProductsRouter/ProductsRouter");
const routerCategories = require("./CategoryRouter/CategoryRouter");
const routerTypes = require("./TypesRouter/TypesRouter");
const routerTastes = require("./TastesRouter/TastesRouter")
const routerIngredient = require("./IngredientRouter/IngredientRouter")

const router = Router();

// Ruta para los chocolates
router.use("/products", routerProducts);
router.use("/categories", routerCategories);
router.use("/types", routerTypes);
router.use("/tastes", routerTastes)
router.use("/ingredient", routerIngredient)
module.exports = router;
