
const { Router } = require('express')

const { postOrder } = require('../../handlers/compraHandler/compraHandler')
const routerPay = Router()

routerPay.post('/', postOrder)

module.exports = routerPay