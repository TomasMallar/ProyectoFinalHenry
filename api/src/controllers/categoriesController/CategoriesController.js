const { Category } = require("../../db");

const getCategoriesFromDB = async () => {
  const allCategoriesFromDB = await Category.findAll();

  return allCategoriesFromDB;
};

const postCategoriesDB = async (data) => {
  const { name } = data;

  if (!name) throw new Error("Missing required data");

  const [newCategory] = await Category.findOrCreate({
    where: { name },
  });

  return { message: "Successfully created", newCategory };
};

const updateCategoryDB = async (name, id) => {
  const updateCategory = await Category.update({ name: name }, { where: { id: id } })
  
  if(updateCategory !== 0) return {message: "Updated successfully"}
  else return {message: "Error while updating"}
}

const deleteCategoryDB = async (id) => {
  const categoryDeleted = await Category.destroy({ where: { id: id } })

  if (categoryDeleted !== 0) return { message: "Successfully deleted" }
  else return { message: "Error while deleting" }
}

module.exports = { getCategoriesFromDB, postCategoriesDB, updateCategoryDB, deleteCategoryDB };
