const { Op } = require('sequelize');
const {Product,Category} = require ('../../db');
const { cleanArrayProduct } = require('../../helpers/cleanArrayProduct');

const getProductByName = async (name) => {
  try {
    const dBProduct = await Product.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
        include: {
          model: Category,
          attributes: ["name"],
          through:{
            attributes: []
          }
        }
      });
      const dBfiltered = dBProduct.map(elem=>cleanArrayProduct(elem))
      
    return dBfiltered;
  }
  catch (error) {
    throw Error(error.message);
  }
}

  module.exports = {getProductByName};