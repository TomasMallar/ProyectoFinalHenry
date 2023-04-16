const { undodeleteProductController } = require('../../controllers/productsController/undodeleteProductController');

const undodeleteProductHandler = async (req, res) => {
  
	try {
		console.log("llegue")
		const { id } = req.params;
		await undodeleteProductController(id);
		res.status(200).json({ message: 'Element marked as undodeleted successfully' });
	
	} catch (error) {
		res.status(500).json({ message: 'An error occurred while marking the element as undodeleted', error: error.message });
	  }

};

module.exports = { undodeleteProductHandler };