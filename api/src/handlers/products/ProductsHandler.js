const { getAllProductsFromDB } = require('../controllers/products/ProductsController')

// Handler para traer todos los chocolates
const getAllProducts = async (req, res) => {
    try {
        const allProducts = await getAllProductsFromDB()
        res.status(200).json(allProducts)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getAllProducts
}