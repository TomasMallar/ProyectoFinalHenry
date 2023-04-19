const { Router } = require("express");
const { getRolesHandler, postRoleHandler, putRolesHandler, deleteRolesHandler } = require("../../handlers/rolesHandler/RolesHandler");
const validatePostRoles = require("../../middlewares/validateRoles/validatePostRoles");
const validateJwt = require("../../middlewares/validateJwt/validateJwt");
const validateRoleAdm = require("../../middlewares/validateRoleAdm/validateRolAdm")

const routerRoles = Router();

routerRoles.get("/", validateJwt, validateRoleAdm, getRolesHandler);
// routerRoles.post("/create", validateJwt, validateRoleAdm, validatePostRoles, postRoleHandler);
routerRoles.post("/create", validatePostRoles, postRoleHandler);
routerRoles.put("/update/:id", validateJwt, validateRoleAdm, putRolesHandler);
routerRoles.delete("/delete/:id", validateJwt, validateRoleAdm, deleteRolesHandler);


module.exports = routerRoles;