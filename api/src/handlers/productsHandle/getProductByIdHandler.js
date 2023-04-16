const { getProductByIdController } = require("../../controllers/productsController/getProductByIdController");
const { cleanArrayProduct } = require("../../helpers/cleanArrayProduct");

const getProductByIdHandler = async (req, res) => {

	try {

		const { id } = req.params;
		const product = await getProductByIdController(id);
		if (product) {
		res.status(200).json(cleanArrayProduct(product));
		} else {
		res.status(404).json({ message: "Product not found" });
		}

  	} catch (error) {
    	res.status(500).json({ message: error.message });
  	}
	
};

module.exports = { getProductByIdHandler };