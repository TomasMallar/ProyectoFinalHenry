const filterByCategory = require("../../helpers/filters/filterByCategories");
const filterByTypes = require("../../helpers/filters/filterByTypes");
const { sortProducts } = require("../../helpers/orders/orderBy");
const { paginateProducts } = require("../../helpers/pagination/pagination");
const { getProductsAll } = require("./getProductsAll");

const getProductsAdvanceController = async (category, type, orderBy, orderDirection, page, pageSize) => {

	try {
		
		const allProducts = await getProductsAll(orderBy, orderDirection, page, pageSize);
		let filteredProducts = allProducts;
		if (category) filteredProducts = filterByCategory(filteredProducts, category);
		if (type) filteredProducts = filterByTypes(filteredProducts, type);
		let filterOrderProducts = sortProducts(filteredProducts,orderBy,orderDirection)
		let paginatedProducts = paginateProducts(filterOrderProducts,page,pageSize)
		return paginatedProducts;

	} catch (error) {
		throw Error(error.message);
	}

};

module.exports = { getProductsAdvanceController };