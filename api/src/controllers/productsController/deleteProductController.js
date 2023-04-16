const { Product } = require('../../db');

const deleteProductController = async (id) => {
    try {
        const product = await Product.findOne({ where: { id } });

        if (!product) {
            throw new Error(`Product with ID ${id} not found.`);
        }
        product.name = product.name + ` - Deleted (${id})`
        await product.destroy();
    } catch (error) {
        throw Error(error.message);
    }
};

module.exports = { deleteProductController };
