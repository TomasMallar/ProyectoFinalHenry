const { deleteProductController } = require('../../controllers/productsController/deleteProductController');

const deleteProductHandler = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteProductController(id);
    res.status(200).json({ message: 'Element marked as deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while marking the element as deleted' });
  }
};

module.exports = { deleteProductHandler };