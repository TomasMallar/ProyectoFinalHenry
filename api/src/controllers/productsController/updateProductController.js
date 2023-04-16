const { Product, Category, Type, Ingredient } = require('../../db');
const { cleanArrayProduct } = require('../../helpers/cleanArrayProduct');
const { getProductByIdController } = require('./getProductByIdController');

const updateProductController = async (id, name, price, stock, image, categories, types, ingredients) => {
  
  try {

	const product = await getProductByIdController(id)

    const [updatedCategories, updatedTypes, updatedIngredients] = await Promise.all([
      Category.findAll({ where: { name: categories } }),
      Type.findAll({ where: { name: types } }),
      Ingredient.findAll({ where: { name: ingredients } })
    ]);

    const productData = {
      name: name || product.name,
      price: price || product.price,
      stock: stock || product.stock,
      image: image || product.image
    };

    const hasDifferences = (
      productData.name !== product.name ||
      productData.price !== product.price ||
      productData.stock !== product.stock ||
      productData.image !== product.image ||
      !arraysAreEqual(updatedCategories, product.categories) ||
      !arraysAreEqual(updatedTypes, product.types) ||
      !arraysAreEqual(updatedIngredients, product.ingredients)
    );

    if (hasDifferences) {
      await product.update(productData);

      await Promise.all([
        product.setCategories(updatedCategories),
        product.setTypes(updatedTypes),
        product.setIngredients(updatedIngredients)
      ]);
    }

	return cleanArrayProduct(product);

  } catch (error) {
    throw Error(error.message);
  }
};

const arraysAreEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const sortedArr1 = arr1.sort((a, b) => a.id - b.id);
  const sortedArr2 = arr2.sort((a, b) => a.id - b.id);

  for (let i = 0; i < arr1.length; i++) {
    if (sortedArr1[i].id !== sortedArr2[i].id) {
      return false;
    }
  }

  return true;
};

module.exports = { updateProductController };