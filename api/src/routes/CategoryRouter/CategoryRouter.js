const { postCategories } = require("../../handlers/CategoriesHandler");

const { Router } = require("express");

const routerCategories = Router();

// routerCategories.get("/");
routerCategories.post("/", postCategories);

module.exports = routerCategories;
