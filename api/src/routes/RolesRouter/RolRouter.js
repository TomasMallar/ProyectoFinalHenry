const { Router } = require("express");
const { getRolesHandler, postRoleHandler, putRolesHandler, postNewUserAdmHandler } = require("../../handlers/rolesHandler/RolesHandler");
const validatePostRoles = require("../../middlewares/validatePostRoles/validatePostRoles");
const validateJwt = require("../../middlewares/validateJwt/validateJwt");
const validateRoleAdm = require("../../middlewares/validateRoleAdm/validateRolAdm")

const routerRoles = Router();

routerRoles.get("/", validateJwt, validateRoleAdm, getRolesHandler);
routerRoles.put("/update-role-user/:id", validateJwt, validateRoleAdm, putRolesHandler);
routerRoles.post("/new-user-adm", validateJwt, validateRoleAdm, postNewUserAdmHandler);

// routerRoles.post("/create", validateJwt, validateRoleAdm, validatePostRoles, postRoleHandler);
// routerRoles.post("/create", validatePostRoles, postRoleHandler);

//Comento la ruta delete porque no tendría sentido eliminar un rol cuando se está trabajando con user y adm.
// routerRoles.delete("/delete/:id", validateJwt, validateRoleAdm, deleteRolesHandler);

module.exports = routerRoles;