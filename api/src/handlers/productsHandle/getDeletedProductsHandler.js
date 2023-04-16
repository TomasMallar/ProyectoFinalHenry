const { Product } = require('sequelize');

async function getDeletedProductsHandler(req, res) {
  try {
    const deletedProducts = await Product.findAll({
      where: {
        deletedAt: {
          [Op.not]: null
        }
      }
    });
    res.status(200).json(deletedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los productos eliminados' });
  }
}
module.exports = { getDeletedProductsHandler };