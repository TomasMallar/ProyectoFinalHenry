const { Router } = require("express");
const { getRolesHandler, postRoleHandler, putRolesHandler, deleteRolesHandler } = require("../../handlers/rolesHandler/RolesHandler");
const validatePostRoles = require("../../middlewares/validateRoles/validatePostRoles")

const routerRoles = Router();

routerRoles.get("/", getRolesHandler);
routerRoles.post("/create", validatePostRoles, postRoleHandler);
routerRoles.put("/update/:id", putRolesHandler);
routerRoles.delete("/delte", deleteRolesHandler);


module.exports = routerRoles;