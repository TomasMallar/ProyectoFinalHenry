const {Product,Category} = require ('../../db');
const { cleanArrayProduct } = require('../../helpers/cleanArrayProduct');
const getProductsAll = async () => {
    try {
      const dBProduct = await Product.findAll({
        include: {
          model: Category,
          attributes: ["name"],
          through:{
            attributes: []
          }
        }
      });
  
          let limpios= dBProduct.map(elem=> cleanArrayProduct(elem))

          return limpios;
  
    } catch (error) {
      throw Error(error.message);
    }
  }

  
  module.exports = { getProductsAll }