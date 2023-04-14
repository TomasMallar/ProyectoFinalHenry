const { Router } = require("express");
const {
  getCategories,
  postCategories,
  updateCategories,
  deleteCategories
} = require("../../handlers/categoriesHandle/CategoriesHandler");

const validatePostCategory = require('../../middlewares/validateCategories/validatePostCategory')
const validatePutCategory = require('../../middlewares/validateCategories/validatePutCategory')

const routerCategories = Router();

routerCategories.get("/", getCategories);
routerCategories.post("/", validatePostCategory, postCategories);
routerCategories.put("/:id", validatePutCategory, updateCategories)
routerCategories.delete("/:id", deleteCategories)

module.exports = routerCategories;
