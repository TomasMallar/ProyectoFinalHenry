const { updateProductController } = require('../../controllers/productsController/updateProductController');

const updateProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedProduct = await updateProductController(id, updateData);

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { updateProductHandler };