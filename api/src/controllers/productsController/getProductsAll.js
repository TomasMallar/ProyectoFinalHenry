const {Product,Category,Type} = require ('../../db');
const { cleanArrayProduct } = require('../../helpers/cleanArrayProduct');
const getProductsAll = async () => {
    try {
      const dBProduct = await Product.findAll({
        include: [
          {
            model: Category,
            attributes: ['name'],
            through: {
              attributes: [],
            },
          },
          {
            model: Type, // Incluye el modelo Type aquí
            attributes: ['name'], // Asume que Type también tiene un atributo "name"
            through: {
              attributes: [],
            },
          },
        ],
      });
  
          let limpios= dBProduct.map(elem=> cleanArrayProduct(elem))

          return limpios;
  
    } catch (error) {
      throw Error(error.message);
    }
  }

  
  module.exports = { getProductsAll }