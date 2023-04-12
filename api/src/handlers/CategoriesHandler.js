const postCategoriesDB = require("../controllers/CategoriesController");

const postCategories = async (req, res) => {
  try {
    // const newCategories = await postCategoriesDB(req.body);

    res.status(200).send("Chau");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postCategories,
};
