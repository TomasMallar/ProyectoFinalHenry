const { Router } = require("express");
const { postNewType } = require("../../handlers/typesHandler/typesHandler")


const routerTypes = Router();

routerTypes.post("/", postNewType)

module.exports = routerTypes