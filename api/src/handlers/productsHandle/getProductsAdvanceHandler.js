const { getProductsAdvanceController } = require('../../controllers/productsController/getProductsAdvanceController');

const getProductsAdvanceHandler = async (req, res) => {

	try {

		const {name,category,type,orderBy = 'id',orderDirection = 'ASC',page = 1,pageSize = 10} = req.query;
		const result = await getProductsAdvanceController(name,category, type, orderBy, orderDirection, page, pageSize);
		res.json(result);

  	} catch (error) {
		res.status(500).json({ message: 'Error al obtener los productos' });
  	}

};

module.exports = { getProductsAdvanceHandler };