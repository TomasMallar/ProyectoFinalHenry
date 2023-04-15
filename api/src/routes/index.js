const { Router } = require("express");
const routerProducts = require("./ProductsRouter/ProductsRouter");
const routerCategories = require("./CategoryRouter/CategoryRouter");
const routerTypes = require("./TypesRouter/TypesRouter");
const routerUser = require("./UserRouter/UserRouter");
const routerRoles = require("./RolesRouter/RolRouter");
const routerTastes = require("./TastesRouter/TastesRouter")
const routerIngredient = require("./IngredientRouter/IngredientRouter")
const routerScore = require('./PutScoreRouter/PutScoreRouter')

const router = Router();

// Ruta para los chocolates
router.use("/products", routerProducts);
router.use("/categories", routerCategories);
router.use("/types", routerTypes);

router.use("/tastes", routerTastes)
router.use("/ingredient", routerIngredient)

//Rutas para usuarios y roles
router.use("/users", routerUser);
router.use("/roles", routerRoles);

router.use("/score", routerScore)

module.exports = router;
