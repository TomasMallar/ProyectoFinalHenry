const { Router } = require('express')
const { 
    getIngredients,
    postIngredients,
    putIngredients,
    deleteIngredients
} = require('../../handlers/ingredientHandler/IngredientHandler')

const validatePost = require('../../middlewares/validateCategories&Tastes&Ingredients/validatePost')
const validatePut = require('../../middlewares/validateCategories&Tastes&Ingredients/validatePut')

const routerIngredient = Router()

routerIngredient.get('/', getIngredients)
routerIngredient.post('/', validatePost, postIngredients)
routerIngredient.put('/:id', validatePut, putIngredients)
routerIngredient.delete('/:id', deleteIngredients)

module.exports = routerIngredient