const { Router } = require("express");
const routerProducts = require("./ProductsRouter/ProductsRouter");
const routerCategories = require("./CategoryRouter/CategoryRouter");
const routerTypes = require("./TypesRouter/TypesRouter");
const routerUser = require("./UserRouter/UserRouter");
const routerRoles = require("./RolesRouter/RolRouter");
const routerFavoriteTypes = require("./FavTypesRouter/FavTypesRouter")
const routerIngredient = require("./IngredientRouter/IngredientRouter")
const routerScore = require('./PutScoreRouter/PutScoreRouter')
const routerPay = require('./CompraRouter/mercadopago')
const routerAuth = require("./AuthRouter/AuthRouter");
const routerEmail = require('./EmailRouter/EmailRouter');
const routerPassword = require("./PasswordRouter/PasswordRouter");
const routerEmail = require('./EmailRouter/EmailRouter')
const routerPayment = require('./PaymentRouter/PaymentRouter')
const routerMetric = require('./MetricRouter/MetricRouter')
const router = Router();

const passport = require("passport");
require("../middlewares/authGoogle/authGoogle")


// Ruta para los chocolates
router.use("/products", routerProducts);
router.use("/categories", routerCategories);
router.use("/types", routerTypes);

router.use("/favtypes", routerFavoriteTypes)
router.use("/ingredient", routerIngredient)

//Rutas para usuarios y roles
router.use("/email", routerEmail)

router.use("/users", routerUser);
router.use("/roles", routerRoles);

router.use("/score", routerScore)

router.use('/pay', routerPay)

router.use('/payment', routerPayment)

router.use('/metric',routerMetric)

//Autenticación con google
router.use("/auth", routerAuth);

//Forgot password
router.use("/password", routerPassword);

module.exports = router;
