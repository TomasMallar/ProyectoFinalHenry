const { Product } = require("../../db");

const getProductByIdController = async (id) => {
  try {
    const product = await Product.findByPk(id);
    return product;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = { getProductByIdController };