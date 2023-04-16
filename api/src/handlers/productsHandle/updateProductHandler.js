const { updateProductController } = require('../../controllers/productsController/updateProductController');

const updateProductHandler = async (req, res) => {

	try {

		const { id } = req.params;
    	const {name,price,stock,image,categories,types,ingredients} = req.body;
	    const updatedProduct = await updateProductController(id, name,price,stock,image,categories,types,ingredients);
		res.status(200).json(updatedProduct);
		
	} catch (error) {
    	res.status(500).json({ error: error.message });
	}

};

module.exports = { updateProductHandler };