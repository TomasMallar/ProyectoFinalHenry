const { Category } = require("../db");

const getCategoriesFromDB = async () => {
  const allCategoriesFromDB = await Category.findAll();

  return allCategoriesFromDB;
};

const postCategoriesDB = async (data) => {
  const { name } = data;

  if (!name) throw new Error("Missing required data");

  const newCategory = await Category.findOrCreate({ where: { name } });

  return newCategory[0];
};

module.exports = { getCategoriesFromDB, postCategoriesDB };
