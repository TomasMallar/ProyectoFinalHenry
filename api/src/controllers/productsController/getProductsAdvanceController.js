const { Product, Type, Ingredient, Category, conn:sequelize } = require('../../db');
const { Op } = require('sequelize');
const { cleanArrayProduct } = require('../../helpers/cleanArrayProduct');


const getProductsAdvanceController = async (where, orderBy, orderDirection, page, pageSize, categories, types,ingredients) => {
  const offset = (page - 1) * pageSize;
  const limit = pageSize;
  const order = [[orderBy, orderDirection]];

  const productsQuery = {
    where,
    order,
    offset,
    limit,
    include: []
  };

  if (categories) {
	productsQuery.where['id'] = {
	  [Op.and]: [
		sequelize.literal(`(SELECT COUNT(*) FROM "ProductsCategory" WHERE "ProductsCategory"."productId" = "Product"."id" AND "ProductsCategory"."categoryId" IN (SELECT "id" FROM "Categories" WHERE "name" IN (${categories.map(category => `'${category}'`).join(', ')}))) = ${categories.length}`)
	  ]
	};
	productsQuery.include.push({
	  model: Category,
	  as: 'categories',
	  through: { attributes: [] }, // To avoid including the join table columns in the result
	});
  } else {
	productsQuery.include.push({
	  model: Category,
	  as: 'categories',
	});
  }
  

  if (types) {
    productsQuery.include.push({
      model: Type,
      as: 'types',
      where: {
        name: { [Op.in]: types }
      }
    });
  } else {
	productsQuery.include.push({
		model: Type,
		as: 'types'
	  });
}

 if (ingredients) {
	productsQuery.include.push({
		model: Ingredient,
		as: 'ingredients',
		where: {
		  name: { [Op.in]: ingredients }
		}
	  });
	} else {
		productsQuery.include.push({
			model: Ingredient,
			as: 'ingredients'
		});
	}

	const { count } = await Product.findAndCountAll({
		...productsQuery,
		distinct: true,
		col: 'id',
	  });
	  const rows = await Product.findAll(productsQuery)

  const cleans = rows.map((product) => cleanArrayProduct(product));

  const totalPages = Math.ceil(count / pageSize);

  return { totalPages, currentPage: page, pageSize, totalProducts: count, products: cleans };
};


module.exports = { getProductsAdvanceController };
