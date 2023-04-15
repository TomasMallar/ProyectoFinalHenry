const {Product,Category,Type,Ingredient} = require ('../../db');
const { cleanArrayProduct } = require("../../helpers/cleanArrayProduct");

const getProductByIdController = async (id) => {

	try {
	
		const product = await Product.findByPk(id, {
			include: [
			  {
				model: Category,
				attributes: ["name"],
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

		  if(product === null) throw Error('No results for the specified id');

		  const dBfiltered = cleanArrayProduct(product);
		  return dBfiltered;
	
	} catch (error) {
		throw Error(error.message);
	}

};

module.exports = { getProductByIdController };