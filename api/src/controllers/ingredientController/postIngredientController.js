const { Ingredient } = require("../../db");

const postIngredientController = async (name) => {
  
 
   await Ingredient.findOrCreate({
      where: { name },
    });
}

module.exports = { postIngredientController}