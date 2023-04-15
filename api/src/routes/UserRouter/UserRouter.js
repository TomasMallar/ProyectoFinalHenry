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

const validatePostRetgister = require("../../middlewares/validateUser/validatePostRegister");
const validatePostLogin = require("../../middlewares/validateUser/validatePostLogin");
const validatePutUser = require("../../middlewares/validateUser/validatePutUser")

const routerUser = Router();

routerUser.get("/", getAllUserHandler);
routerUser.get("/profile/:id", getOneUserHandler);
routerUser.get("/searchuser", getSearchUserHandler);
routerUser.post("/register", validatePostRetgister, postNewtUserHandler);
routerUser.post("/login", validatePostLogin, postLoginUserHandler);
routerUser.put("/update/:id", validatePutUser, updateUserHandler);
routerUser.delete("/delete/:id", deleteUserHandler);

module.exports = routerUser;
