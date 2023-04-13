const {Product, Category} = require ('../../db');

const postProductController = async (name,price,stock,ingredients,image,score,types,categories) => {

    const newProduct = await Product.create({name,price,stock,ingredients,image,score,types});

    const categoryDb = await Category.findAll({
        where: {
            name: categories,
        },
    });

    newProduct.addCategory(categoryDb);
    categ= categoryDb.map(elem => elem.name)
    return {...newProduct.dataValues,categories:categ};

};

module.exports = {postProductController};