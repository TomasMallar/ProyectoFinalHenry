const { Router } = require("express");
const { postNewType, getAllTypes,getTypes } = require("../../handlers/typesHandler/typesHandler")


const routerTypes = Router();

routerTypes.get("/", getAllTypes)
routerTypes.get("/all", getTypes)
routerTypes.post("/", postNewType)

module.exports = routerTypes