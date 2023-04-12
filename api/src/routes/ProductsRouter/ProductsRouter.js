const { getAllProducts } = require('../../handlers/products/ProductsHandler')

const { Router } = require('express')

const routerProducts = Router()

routerProducts.get('/', getAllProducts) // Traer todos los chocolates

module.exports = routerProducts