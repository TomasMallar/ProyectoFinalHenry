const {Product,Category,Type,Ingredient} = require ('../../db');
const { cleanArrayProduct } = require('../../helpers/cleanArrayProduct');
const { sortProducts } = require("../../helpers/orders/orderBy");
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
					model: Type,
					attributes: ['name'],
					through: {
					attributes: [],
					},
				},
				{
					model: Ingredient,
					attributes: ['name'],
					through: {
					attributes: [],
					},
				},
			],
		});
	
		let limpios= dBProduct.map(elem=> cleanArrayProduct(elem));
		let OrderProducts = sortProducts(limpios,"id","ASC")
		return OrderProducts;
  
    	} catch (error) {
    		throw Error(error.message);
    	}
};

  
module.exports = { getProductsAll };