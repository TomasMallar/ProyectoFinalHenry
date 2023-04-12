const { Product, Category } = require("../db");

// Controller para traer todos los chocolates
const getAllProductsFromDB = async () => {
  const allProductsFromDB = await Product.findAll();
  /*const allProductsFromDB = await Product.findAll({
    include: {
      model: Category,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });*/

  /*const allProductsWithCategoryNames = allProductsFromDB.map((product) => {
    const categories = product.categories.map((category) => category.name);
    return {
      ...product.dataValues,
      categories,
    };
  });*/

   const allProducts = allProductsFromDB.map((chocolate) => {
     return {
       name: chocolate.name,
       price: chocolate.price,
       image: chocolate.image,
       score: chocolate.score,
     };
   });

   return allProducts;
  //return allProductsWithCategoryNames;
};

const postProductsDB = async (data) => {
  const { name, price, stock, ingredients, image, score, types, categories } =
    data;

  if (
    !name ||
    !price ||
    !stock ||
    !ingredients ||
    !image ||
    !score ||
    !types ||
    !categories
  ) {
    throw new Error("Missing required data");
  }

  const newProduct = {
    name,
    price,
    stock,
    ingredients,
    image,
    score,
    types,
  };

  const createNewProduct = await Product.create(newProduct);

  const findCategories = await Category.findAll({
    where: { name: categories },
  });

  createNewProduct.addCategory(findCategories);

  return { message: "Successfully created", createNewProduct };
};

module.exports = {
  getAllProductsFromDB,
  postProductsDB,
};
