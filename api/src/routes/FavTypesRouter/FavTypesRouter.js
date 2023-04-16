const { Router } = require('express')
const { 
    getFavTypes,
    postFavTypes,
    deleteFavTypes
} = require('../../handlers/favTypesHandler/favTypesHandler')

const validatePost = require('../../middlewares/validateCategories&Tastes&Ingredients/validatePost')
const validatePut = require('../../middlewares/validateCategories&Tastes&Ingredients/validatePut')

const routerFavoriteTypes = Router()

routerFavoriteTypes.get('/:id', getFavTypes)
routerFavoriteTypes.post('/:id', validatePost,postFavTypes)
routerFavoriteTypes.delete('/:id', deleteFavTypes)

module.exports = routerFavoriteTypes