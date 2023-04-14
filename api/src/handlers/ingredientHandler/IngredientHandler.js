const { getAllIngredients, postNewIngredient, deleteIngredient, putIngredient } = require('../../controllers/ingredientController/IngredientsController')

const getIngredients = async (req, res) => {
    try {
        const allIngredients = await getAllIngredients()
        res.status(200).json(allIngredients)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const postIngredients = async (req, res) => {
    try {
        const { name } = req.body
        const newIngredient = await postNewIngredient(name)
        res.status(200).json(newIngredient)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const putIngredients = async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body
        const ingredientUpdated = await putIngredient(id, name)
        res.status(200).json(ingredientUpdated)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteIngredients = async (req, res) => {
    try {
        const { id } = req.params
        const ingredientDeleted = await deleteIngredient(id)
        res.status(200).json(ingredientDeleted)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getIngredients,
    postIngredients,
    putIngredients,
    deleteIngredients
}