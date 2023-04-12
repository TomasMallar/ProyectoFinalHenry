const { Router } = require('express');
const routerProducts = require('./ProductsRouter/ProductsRouter')

const router = Router();

// Ruta para los chocolates
router.use('/products', routerProducts)

module.exports = router;
