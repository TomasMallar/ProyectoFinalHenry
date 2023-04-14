const { Router } = require("express");
const { postNewType, getAllTypes } = require("../../handlers/typesHandler/typesHandler")


const routerTypes = Router();

routerTypes.get("/", getAllTypes)
routerTypes.post("/", postNewType)

module.exports = routerTypes