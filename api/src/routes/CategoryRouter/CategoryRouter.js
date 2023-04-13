const { Router } = require("express");
const {
  getCategories,
  postCategories,
  updateCategories,
  deleteCategories
} = require("../../handlers/categoriesHandle/CategoriesHandler");

const routerCategories = Router();

routerCategories.get("/", getCategories);
routerCategories.post("/", postCategories);
routerCategories.put("/:id", updateCategories)
routerCategories.delete("/:id", deleteCategories)

module.exports = routerCategories;
