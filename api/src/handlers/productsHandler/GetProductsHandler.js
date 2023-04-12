const { getProductbyName } = require("../../controllers/productsControllers/getProductByName");
const { getProductsAll } = require("../../controllers/productsControllers/getProductsAll");

const getProductsHandler = async (req,res) => {
    const {name} = req.query;
    const results =  name ? await getProductbyName(name) : await getProductsAll();
    res.status(200).json(results);
};

module.exports = {getProductsHandler};