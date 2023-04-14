const {Product, Category, Type} = require ('../../db');

const postProductController = async (name,price,stock,image,score,categories,types) => {

    try {

        const newProduct = await Product.create({name,price,stock,image,score,types});

        const categoryDb = await Category.findAll({
            where: {
                name: categories,
            },
        });
        await newProduct.addCategory(categoryDb);
        categ= categoryDb.map(elem => elem.name)

        const typeDb = await Type.findAll({
            where: {
                name: types,
            },
        });
        await newProduct.addType(typeDb);
        typ= typeDb.map(elem => elem.name)

        return {...newProduct.dataValues,categories:categ,types:typ};

    } catch (error) {
        return error.message;
    }

};

module.exports = {postProductController};