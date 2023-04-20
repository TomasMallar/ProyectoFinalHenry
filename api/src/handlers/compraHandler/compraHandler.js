const {newOrder} = require('../../controllers/compraController/compraController')
const postOrder = async(req, res) => {
    try {
        const { bodyOrder } = req.body
        const order = await newOrder(bodyOrder)
        res.status(200).json(order)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    postOrder,
}