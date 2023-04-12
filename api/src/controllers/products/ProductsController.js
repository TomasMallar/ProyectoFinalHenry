const { Product } = require('../db')

// Controller para traer todos los chocolates
const getAllProductsFromDB = async () => {

    const allProductsFromDB = await Product.findAll()
    
    const allProducts = allProductsFromDB.map(chocolate => {
        return {
            name: chocolate.name,
            price: chocolate.price,
            image: chocolate.image,
            score: chocolate.score
        }
    })

    return allProducts
}

module.exports = {
    getAllProductsFromDB,
}