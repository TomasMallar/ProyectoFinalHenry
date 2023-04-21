const { Ingredient } = require("../../db");

const getAllIngredients = async() => {
    const ingredients = await Ingredient.findAll()
    const allIngredients = ingredients.map(ingredient => ingredient.name)
    return allIngredients
}

const getIngredientsWithId = async() => {
    const ingredients = await Ingredient.findAll()
    const allIngredients = ingredients.map(ingredient => {
        return {
            id: ingredient.id,
            name: ingredient.name
        }
    })
    return allIngredients
}

const postNewIngredient = async(name) => {
    const [newIngredient] = await Ingredient.findOrCreate({
        where: {name: name}
    })

    return newIngredient
}

const putIngredient = async(id, name) => {
    const updateIngredient = await Ingredient.update({name: name},{
        where: {id: id}
    })

    if(updateIngredient !== 0) return {message: "Updated successfully"}
    else return {message: "Error while updating"}
}

const deleteIngredient = async(id) => {
    const ingredientDeleted = await Ingredient.destroy({where: {id: id}})
    if (ingredientDeleted !== 0) return { message: "Successfully deleted" }
    else return { message: "Error while deleting" }
}

module.exports = {
    getAllIngredients,
    postNewIngredient,
    putIngredient,
    deleteIngredient,
    getIngredientsWithId
}