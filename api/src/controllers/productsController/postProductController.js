const {Product, Category} = require ('../../db');

const postProductController = async (name,price,stock,image,score,categories) => {
    try{
    const newProduct = await Product.create({name,price,stock,image,score});

    const categoryDb = await Category.findAll({
        where: {
            name: categories,
        },
    });
    console.log(categoryDb)
    console.log(categories)
    await newProduct.addCategory(categoryDb);
    categ= categoryDb.map(elem => elem.name)
    return {...newProduct.dataValues,categories:categ};
}
catch(error){
    return error.message;}

};

module.exports = {postProductController};