const { Op } = require('sequelize');
const {Product,Category,Type} = require ('../../db');
const { cleanArrayProduct } = require('../../helpers/cleanArrayProduct');

const getProductByName = async (name) => {
  
    const dBProduct = await Product.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
        include: [{
          model: Category,
          attributes: ["name"],
          through:{
            attributes: []
          }
        },
      {
        model: Type,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      
      }]
      });
      const dBfiltered = dBProduct.map(elem=>cleanArrayProduct(elem))
      
    return dBfiltered;
  };

  module.exports = {getProductByName};