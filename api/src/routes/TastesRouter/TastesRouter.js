const { Router } = require('express')
const { 
    getTastes,
    postTastes,
    putTastes,
    deleteTastes
} = require('../../handlers/tasteHandler/tastesHandler')

const validatePost = require('../../middlewares/validateCategories&Tastes&Ingredients/validatePost')
const validatePut = require('../../middlewares/validateCategories&Tastes&Ingredients/validatePut')

const routerTastes = Router()

routerTastes.get('/', getTastes)
routerTastes.post('/', validatePost,postTastes)
routerTastes.put('/:id', validatePut, putTastes)
routerTastes.delete('/:id', deleteTastes)

module.exports = routerTastes