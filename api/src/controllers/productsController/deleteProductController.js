const { Product } = require('../../db');

const deleteProductController = async (id) => {

	try {
	
		await Product.update({ is_deleted: true }, { where: { id } });
	
	} catch (error) {
		throw Error(error.message);
	}

};

module.exports = { deleteProductController };