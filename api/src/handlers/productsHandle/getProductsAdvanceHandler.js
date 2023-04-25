const { getProductsAdvanceController } = require('../../controllers/productsController/getProductsAdvanceController');

const getProductsAdvanceHandler = async (req, res) => {

	try {

		const {name,category,type,orderBy = 'id',orderDirection = 'ASC',page = 1,pageSize = 12} = req.query;
		console.log(name)
		console.log(category)
		console.log(type)
		const categories = category ? category.split(',') : null;
		const types = type ? type.split(',') : null;
		const result = await getProductsAdvanceController(name,categories, types, orderBy, orderDirection, page, pageSize);
		res.json(result);

  	} catch (error) {
		res.status(500).json({ message: 'Error al obtener los productos' });
  	}

};

module.exports = { getProductsAdvanceHandler };