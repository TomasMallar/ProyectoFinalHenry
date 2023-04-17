const { Category } = require("../../db");

const postCategoryController = async (name) => {
  
 
   await Category.findOrCreate({
      where: { name },
    });
}

module.exports = { postCategoryController}