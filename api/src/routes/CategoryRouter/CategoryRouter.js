const { Router } = require("express");
const {
  getCategories,
  postCategories,
} = require("../../handlers/CategoriesHandler");

const routerCategories = Router();

routerCategories.get("/", getCategories);
routerCategories.post("/", postCategories);

module.exports = routerCategories;
