const {
  getCategoriesFromDB,
  postCategoriesDB,
  updateCategoryDB,
  deleteCategoryDB
} = require('../../controllers/categoriesController/CategoriesController')

const getCategories = async (req, res) => {
  try {
    const allCategories = await getCategoriesFromDB();

    res.status(200).json(allCategories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postCategories = async (req, res) => {
  try {
    const newCategories = await postCategoriesDB(req.body);

    res.status(200).json(newCategories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCategories = async (req, res) => {
  try {
    const {name} = req.body
    const {id} = req.params
    const updateCategory = await updateCategoryDB(name, id)
    res.status(200).json(updateCategory)
  } catch (error) {
    res.status(400).json({error: error.message})
  } 
}

const deleteCategories = async (req, res) => {
  try {
    const { id } = req.params
    const categoryDeleted = await deleteCategoryDB(id)
    res.status(200).json(categoryDeleted)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = {
  getCategories,
  postCategories,
  updateCategories,
  deleteCategories
};
