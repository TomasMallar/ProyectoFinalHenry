const { getProductsPurchased } = require('../../controllers/ProductsPurchasedController/ProductsPurchasedController')
const getProducts = async (req, res) => {
    try {
        const {productId} = req.params
        const {userId} = req.query
        const productsPurchased = await getProductsPurchased(userId, productId)
        res.status(200).json(productsPurchased)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { getProducts }