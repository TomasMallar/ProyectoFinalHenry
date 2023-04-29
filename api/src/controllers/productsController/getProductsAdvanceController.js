const { Product } = require('../../db');
const { Op } = require('sequelize');

const getProductsAdvanceController = async (where, orderBy, orderDirection, page, pageSize) => {
  const offset = (page - 1) * pageSize;
  const limit = pageSize;
  const order = [[orderBy, orderDirection]];

  const { count, rows } = await Product.findAndCountAll({
    where,
    order,
    offset,
    limit,
  });

  const totalPages = Math.ceil(count / pageSize);

  return { totalPages, currentPage: page, pageSize, totalProducts: count, products: rows };
};

module.exports = { getProductsAdvanceController };
