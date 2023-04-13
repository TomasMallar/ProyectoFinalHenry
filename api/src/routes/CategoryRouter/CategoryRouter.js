const { Router } = require("express");
const {
  getCategories,
  postCategories,
} = require("../../handlers/categoriesHandler/categoriesHandler");

const routerCategories = Router();

routerCategories.get("/", getCategories);
routerCategories.post("/", postCategories);

module.exports = routerCategories;
