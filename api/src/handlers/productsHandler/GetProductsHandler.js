const { getProductByName } = require("../../controllers/productsController/getProductByNameController");
const { getProductsAll } = require("../../controllers/productsController/getProductsAll");

const getProductsHandler = async (req,res) => {
    const {name} = req.query;
    const results =  name ? await getProductByName(name) : await getProductsAll();
    res.status(200).json(results);
};

module.exports = {getProductsHandler};