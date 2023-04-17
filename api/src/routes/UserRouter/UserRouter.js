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
const validateJwt = require("../../middlewares/validateJwt/validateJwt")

const routerUser = Router();

routerUser.get("/", getAllUserHandler);
routerUser.get("/profile/:id", validateJwt, getOneUserHandler);
routerUser.get("/searchuser", getSearchUserHandler);
routerUser.post("/register", validatePostRegister, postNewtUserHandler);
routerUser.put("/update/:id", validateJwt, validatePutUser, updateUserHandler);
routerUser.delete("/delete/:id", validateJwt, deleteUserHandler); //Podríamos agregar que además solo sea acceso a admi

routerUser.post("/login", validatePostLogin, postLoginUserHandler);

module.exports = routerUser;