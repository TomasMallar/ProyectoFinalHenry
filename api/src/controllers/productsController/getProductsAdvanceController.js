const filterByCategory = require("../../helpers/filters/filterByCategories");
const filterByTypes = require("../../helpers/filters/filterByTypes");
const { sortProducts } = require("../../helpers/orders/orderBy");
const { paginateProducts } = require("../../helpers/pagination/pagination");
const { getProductsAll } = require("./getProductsAll");

const getProductsAdvanceController = async (name,categories, types, orderBy, orderDirection, page, pageSize) => {

	try {
		console.log(orderBy)
		console.log(name)
		
		const allProducts = await getProductsAll(orderBy, orderDirection, page, pageSize);
		let filteredProducts = allProducts;
		if (name) filteredProducts = filteredProducts.filter((product) => product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1);
		if (categories) filteredProducts = filterByCategory(filteredProducts, categories);
		if (types) filteredProducts = filterByTypes(filteredProducts, types);
		let filterOrderProducts = sortProducts(filteredProducts,orderBy,orderDirection)
		let paginatedProducts = paginateProducts(filterOrderProducts,page,pageSize)
		return paginatedProducts;

	} catch (error) {
		throw Error(error.message);
	}

};

module.exports = { getProductsAdvanceController };