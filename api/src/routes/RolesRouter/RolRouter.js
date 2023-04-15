const { Router } = require("express");
const { getRolesHandler, postRoleHandler } = require("../../handlers/rolesHandler/RolesHandler");
const validatePostRoles = require("../../middlewares/validateRoles/validatePostRoles")

const routerRoles = Router();

routerRoles.get("/", getRolesHandler);
routerRoles.post("/create", validatePostRoles, postRoleHandler);


module.exports = routerRoles;