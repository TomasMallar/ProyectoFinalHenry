const { getProductbyName } = require("../../controllers/productsController/getProductByNameController");
const { getProductsAll } = require("../../controllers/productsController/getProductsAll");

const getProductsHandler = async (req,res) => {
    const {name} = req.query;
    const results =  name ? await getProductbyName(name) : await getProductsAll();
    res.status(200).json(results);
};

module.exports = {getProductsHandler};