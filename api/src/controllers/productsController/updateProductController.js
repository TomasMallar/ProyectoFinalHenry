const { Product } = require('../../db');

const updateProductController = async (id, updateData) => {
  try {
    const product = await Product.findByPk(id);

    if (!product) {
      throw new Error('Product not found');
    }

    await product.update(updateData);

    return product;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = { updateProductController };