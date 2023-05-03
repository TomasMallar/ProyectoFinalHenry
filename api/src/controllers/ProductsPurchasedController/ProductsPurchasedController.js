const { Purchase } = require('../../db');

const getProductsPurchased = async(userId, productId) => {
    console.log(userId + " = " + productId + 'LLEGUE');
    const products = await Purchase.findAll({
        where: {
            userId: userId,
            productId: productId
        }
    })
    console.log(products);
    return products
}

module.exports = { getProductsPurchased }