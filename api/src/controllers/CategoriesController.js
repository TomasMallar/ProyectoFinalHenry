const { Category } = require("../db");

const postCategoriesDB = async (data) => {
  const { name } = data;

  if (!name) throw new Error("Missing required data");

  await Category.findOrCreate({ where: { name } });

  return "Product was created successfully";
};

module.exports = { postCategoriesDB };
