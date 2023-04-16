const { Product } = require('../../db');
const { Op } = require('sequelize');

const undodeleteProductController = async (id) => {
    try {
        console.log(`Searching for product with ID: ${id}`);

        const product = await Product.findOne({
            where: {
                id,
                deletedAt: {
                    [Op.ne]: null,
                },
            },
            paranoid: false,
        });

        if (!product) {
            console.log('No matching product found');
            throw new Error(`Product with ID ${id} not found.`);
        }

        console.log('Product:', product.toJSON());
        await Product.restore({ where: { id } });
    } catch (error) {
        throw Error(error.message);
    }
};

module.exports = { undodeleteProductController };
