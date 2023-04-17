const { postProductController } = require('../../controllers/productsController/postProductController');
const { postTypeController } = require('../../controllers/typesController/postTypeController');
const { postIngredientController } = require('../../controllers/ingredientController/postIngredientController');
const { postCategoryController } = require('../../controllers/categoriesController/postCategoryController');

async function loadProductHandler(req, res) {
    const { products, types, ingredients, categories } = req.body;
    console.log(products.length)
    try {
        // Crear nuevos types
        if (types && types.length) {
          await Promise.all(types.map(type => postTypeController(type.name)));
        }
    
        // Crear nuevos ingredients
        if (ingredients && ingredients.length) {
          await Promise.all(ingredients.map(ingredient => postIngredientController(ingredient.name)));
        }
    
        // Crear nuevos categories
        if (categories && categories.length) {
          await Promise.all(categories.map(category => postCategoryController(category.name)));
        }
    
        // Crear nuevos products
        if (products && products.length) {
          await Promise.all(products.map(product => postProductController(product.name, product.price, product.stock, product.image, product.categories, product.types, product.ingredients)));
        }
  
      res.status(201).json({
        message: 'Elementos creados exitosamente.',
        createdProducts: products,
        createdTypes: types,
        createdIngredients: ingredients,
        createdCategories: categories,
      });
    } catch (error) {
      res.status(500).json({ message: 'Hubo un error al crear los elementos.', error });
    }
  }

module.exports = { loadProductHandler };