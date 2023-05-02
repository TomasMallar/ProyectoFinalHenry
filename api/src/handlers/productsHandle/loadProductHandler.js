const { postProductController } = require('../../controllers/productsController/postProductController');
const { postTypeController } = require('../../controllers/typesController/postTypeController');
const { postIngredientController } = require('../../controllers/ingredientController/postIngredientController');
const { postCategoryController } = require('../../controllers/categoriesController/postCategoryController');
const { Sale } = require('../../db');
const { loadingOrders } = require('../../controllers/orderControllers/loadingOrders');
const { postNewUser } = require('../../controllers/userController/UserController');

async function loadProductHandler(req, res) {
    const { products, types, ingredients, categories,users,sales123,sales223,sales323,sales423,sales523,sales122,sales222,sales322,sales422,sales522,sales622,sales722,sales822,sales922,sales1022,sales1122,sales1222 } = req.body;
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
        
        if(users && users.length){
          console.log(users)
          await Promise.all(users.map(user => postNewUser(user)));
        }
        


          await Promise.all(sales123.map(sale => loadingOrders(sale)));
          await Promise.all(sales223.map(sale => loadingOrders(sale)));
          await Promise.all(sales323.map(sale => loadingOrders(sale)));
          await Promise.all(sales423.map(sale => loadingOrders(sale)));
          await Promise.all(sales523.map(sale => loadingOrders(sale)));
          await Promise.all(sales122.map(sale => loadingOrders(sale)));
          await Promise.all(sales222.map(sale => loadingOrders(sale)));
          await Promise.all(sales322.map(sale => loadingOrders(sale)));
          await Promise.all(sales422.map(sale => loadingOrders(sale)));
          await Promise.all(sales522.map(sale => loadingOrders(sale)));
          await Promise.all(sales622.map(sale => loadingOrders(sale)));
          await Promise.all(sales722.map(sale => loadingOrders(sale)));
          await Promise.all(sales822.map(sale => loadingOrders(sale)));
          await Promise.all(sales922.map(sale => loadingOrders(sale)));
          await Promise.all(sales1022.map(sale => loadingOrders(sale)));
          await Promise.all(sales1122.map(sale => loadingOrders(sale)));
          await Promise.all(sales1222.map(sale => loadingOrders(sale)));

  
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