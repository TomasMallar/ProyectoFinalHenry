const { Product, Category } = require("../db");

// Controller para traer todos los chocolates
const getAllProductsFromDB = async () => {
  const allProductsFromDB = await Product.findAll();

  const allProducts = allProductsFromDB.map((chocolate) => {
    return {
      name: chocolate.name,
      price: chocolate.price,
      image: chocolate.image,
      score: chocolate.score,
    };
  });

  return allProducts;
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

  return "Product was created successfully";
};

module.exports = {
  getAllProductsFromDB,
  postProductsDB,
};
