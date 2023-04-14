const { Router } = require("express");
const {
  getCategories,
  postCategories,
  updateCategories,
  deleteCategories
} = require("../../handlers/categoriesHandle/CategoriesHandler");

const validatePost = require('../../middlewares/validateCategories&Tastes&Ingredients/validatePost')
const validatePut = require('../../middlewares/validateCategories&Tastes&Ingredients/validatePut')

const routerCategories = Router();

routerCategories.get("/", getCategories);
routerCategories.post("/", validatePost, postCategories);
routerCategories.put("/:id", validatePut, updateCategories)
routerCategories.delete("/:id", deleteCategories)

module.exports = routerCategories;
