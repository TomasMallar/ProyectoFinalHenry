const {Product, Category, Type, Ingredient} = require ('../../db');

const postProductController = async (name,price,stock,image,categories,types,ingredients) => {

    try {

        const scoreObject = { currentScore: 5, cont: 1, suma: 5 };
        const score = scoreObject;

        const newProduct = await Product.create({name,price,stock,image,score,types,ingredients});

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

        const ingredientDb = await Ingredient.findAll({
            where: {
                name: ingredients,
            },
        });
        await newProduct.addIngredient(ingredientDb);
        ing= ingredientDb.map(elem => elem.name)       

        const { createdAt, updatedAt,deletedAt, ...filteredProduct } = newProduct.dataValues;
        return { ...filteredProduct, categories: categ, types: typ, ingredients: ing };

    } catch (error) {
        return error.message;
    }

};

module.exports = {postProductController};