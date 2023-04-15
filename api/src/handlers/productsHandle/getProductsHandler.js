const { getProductByName } = require("../../controllers/productsController/GetProductByNameController");
const { getProductsAll } = require("../../controllers/productsController/getProductsAll");

const getProductsHandler = async (req,res) => {
    try {
        const {name} = req.query;
        const results =  name ? await getProductByName(name) : await getProductsAll();
        res.status(200).json(results);     
    } catch (error) {
        res.status(400).json({error: error.message})
    }

};

module.exports = {getProductsHandler};