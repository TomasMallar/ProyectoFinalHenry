const { getProductsAdvanceController } = require('../../controllers/productsController/getProductsAdvanceController');

const getProductsAdvanceHandler = async (req, res) => {
	try {
	  const { name, category, type, orderBy = 'id', orderDirection = 'ASC', page = 1, pageSize = 12 } = req.query;
		console.log(req.query)
	  const where = {};
  
	  if (name) {
		where.name = { [Op.iLike]: `%${name}%` };
	  }
	  if (category) {
		where.category = { [Op.in]: category.split(',') };
	  }
	  if (type) {
		where.type = { [Op.in]: type.split(',') };
	  }
  
	  const result = await getProductsAdvanceController(where, orderBy, orderDirection, page, pageSize);
	  res.json(result);
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Error al obtener los productos' });
	}
  };
  

module.exports = { getProductsAdvanceHandler };