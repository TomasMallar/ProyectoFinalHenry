const {Product, Category} = require ('../../db');

const postProductController = async (name,price,stock,ingredients,image,score,types,categories) => {

    const newProduct = await Product.create({name,price,stock,image,score});

    // const categoryDb = await Category.findAll({
    //     where: {
    //         name: categories,
    //     },
    // });

    // newPokemon.addCategory(categoryDb);
    // categ= categoryDb.map(elem => elem.name)
    // return {...newProduct.dataValues,categories:categ};

    return newProduct
};

module.exports = {postProductController};