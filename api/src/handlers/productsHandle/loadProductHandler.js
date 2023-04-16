async function loadProductHandler(req, res) {
    const { products, types, ingredients, categories } = req.body;
  
    try {
      // Crear nuevos types
      if (types && types.length) {
        await Promise.all(types.map(createTypeController));
      }
  
      // Crear nuevos ingredients
      if (ingredients && ingredients.length) {
        await Promise.all(ingredients.map(createIngredientController));
      }
  
      // Crear nuevos categories
      if (categories && categories.length) {
        await Promise.all(categories.map(createCategoryController));
      }
  
      // Crear nuevos products
      if (products && products.length) {
        await Promise.all(products.map(createProductController));
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