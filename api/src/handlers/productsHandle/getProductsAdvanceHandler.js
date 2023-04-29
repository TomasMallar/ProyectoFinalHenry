const { getProductsAdvanceController } = require('../../controllers/productsController/getProductsAdvanceController');
const { Op } = require('sequelize');

const getProductsAdvanceHandler = async (req, res) => {
	try {
	  const { name, category, type, orderBy, orderDirection, page, pageSize } = req.query;
	  console.log(req.query)
	  const where = {};
  
	  // Valores predeterminados y validación
	  const validOrderByColumns = ['id', 'name', 'price', 'stock', 'scoresStars'];
	  const sanitizedOrderBy = orderBy && validOrderByColumns.includes(orderBy) ? orderBy : "id";
	  const sanitizedOrderDirection = orderDirection && orderDirection.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
	  const sanitizedPage = page && !isNaN(page) ? parseInt(page) : 1;
	  const sanitizedPageSize = pageSize && !isNaN(pageSize) ? parseInt(pageSize) : 12;
  
	  if (name) {
		where.name = { [Op.iLike]: `%${name}%` };
	  }
  
	  const categories = category ? category.split(',') : null;
	  const types = type ? type.split(',') : null;
  
	  const result = await getProductsAdvanceController(where, sanitizedOrderBy, sanitizedOrderDirection, sanitizedPage, sanitizedPageSize, categories, types);
	  res.json(result);
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Error al obtener los productos' });
	}
  };
  

module.exports = { getProductsAdvanceHandler };
