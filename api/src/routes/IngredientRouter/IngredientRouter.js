const { Router } = require('express')
const { 
    getIngredients,
    postIngredients,
    putIngredients,
    deleteIngredients,
    getIngredientsAll
} = require('../../handlers/ingredientHandler/IngredientHandler')

const validatePost = require('../../middlewares/validateCategories&Tastes&Ingredients/validatePost')
const validatePut = require('../../middlewares/validateCategories&Tastes&Ingredients/validatePut')

const routerIngredient = Router()

routerIngredient.get('/', getIngredients)
routerIngredient.get('/all', getIngredientsAll)
routerIngredient.post('/', validatePost, postIngredients)
routerIngredient.put('/:id', validatePut, putIngredients)
routerIngredient.delete('/:id', deleteIngredients)

module.exports = routerIngredient