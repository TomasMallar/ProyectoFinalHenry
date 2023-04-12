const {
  getCategoriesFromDB,
  postCategoriesDB,
} = require("../controllers/CategoriesController");

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

module.exports = {
  getCategories,
  postCategories,
};
