const { Op } = require('sequelize');
const {Product,Category,Type,Ingredient} = require ('../../db');
const { cleanArrayProduct } = require('../../helpers/cleanArrayProduct');

const getProductByName = async (name) => {

	try {

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
				},
				{
					model: Ingredient,
					attributes: ['name'],
					through: {
					attributes: [],
					},
				}
		]
		});

		if(dBProduct.length === 0) throw Error('No results for the specified name')
		
		const dBfiltered = dBProduct.map(elem=>cleanArrayProduct(elem));
		return dBfiltered;

	} catch (error) {
		throw error;
	}

};

module.exports = {getProductByName};