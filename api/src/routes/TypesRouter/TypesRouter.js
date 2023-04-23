const { Router } = require("express");
const { postNewType, getAllTypes,getTypes, putType, deleteType } = require("../../handlers/typesHandler/typesHandler")


const routerTypes = Router();

routerTypes.get("/", getAllTypes)
routerTypes.get("/all", getTypes)
routerTypes.post("/", postNewType)
routerTypes.put('/:id', putType)
routerTypes.delete('/:id', deleteType)

module.exports = routerTypes