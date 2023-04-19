const { Router } = require("express");

const { 
    getAllUserHandler, 
    getOneUserHandler,
    getSearchUserHandler,
    postNewtUserHandler, 
    postLoginUserHandler,
    updateUserHandler, 
    deleteUserHandler, 
} = require("../../handlers/userHandler/UserHandler");

const validatePostRegister = require("../../middlewares/validateUser/validatePostRegister");
const validatePostLogin = require("../../middlewares/validateUser/validatePostLogin");
const validatePutUser = require("../../middlewares/validateUser/validatePutUser");
const validateJwt = require("../../middlewares/validateJwt/validateJwt");
const validateRoleAdm = require("../../middlewares/validateRoleAdm/validateRolAdm");

const routerUser = Router();

routerUser.get("/", validateJwt, validateRoleAdm, getAllUserHandler);
routerUser.get("/profile/:id", validateJwt, getOneUserHandler);
routerUser.get("/searchuser", validateJwt, validateRoleAdm, getSearchUserHandler);
routerUser.put("/update/:id", validateJwt, validatePutUser, updateUserHandler);
routerUser.delete("/delete/:id", validateJwt, validateRoleAdm, deleteUserHandler);

routerUser.post("/register", validatePostRegister, postNewtUserHandler);
routerUser.post("/login", validatePostLogin, postLoginUserHandler);

module.exports = routerUser;