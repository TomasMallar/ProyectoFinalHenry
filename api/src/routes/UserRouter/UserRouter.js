const { Router } = require("express");

const { 
    getAllUserHandler, 
    getOneUserHandler,
    getSearchUserHandler,
    postNewtUserHandler, 
    postLoginUserHandler,
    updateUserHandler, 
    deleteUserHandler,
    updatePasswordHanlder 
} = require("../../handlers/userHandler/UserHandler");

const validatePostRegister = require("../../middlewares/validateUser/validatePostRegister");
const validatePostLogin = require("../../middlewares/validateUser/validatePostLogin");
const validatePutUser = require("../../middlewares/validateUser/validatePutUser");
const validateJwt = require("../../middlewares/validateJwt/validateJwt");
const validateRoleAdm = require("../../middlewares/validateRoleAdm/validateRolAdm");
const validateUserId = require("../../middlewares/validateUser/validateUserId");

const routerUser = Router();

routerUser.get("/", validateJwt, validateRoleAdm, getAllUserHandler);
routerUser.get("/profile/:id", validateJwt, validateUserId, getOneUserHandler);
routerUser.get("/search-user", validateJwt, validateRoleAdm, getSearchUserHandler);
routerUser.put("/update/:id", validateJwt, validateUserId, validatePutUser, updateUserHandler);
routerUser.delete("/delete/:id", validateJwt, validateRoleAdm, deleteUserHandler);

routerUser.put("/new-password", updatePasswordHanlder);
routerUser.post("/register", validatePostRegister, postNewtUserHandler);
routerUser.post("/login", validatePostLogin, postLoginUserHandler);


module.exports = routerUser;