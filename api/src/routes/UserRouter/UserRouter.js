const { Router } = require("express");

const { 
    updateUserHandler, 
    deleteUser, 
    postNewtUserHandler, 
    getAllUserHandler, 
    postLoginUserHandler 
} = require("../../handlers/userHandler/UserHandler");

const validatePostRetgister = require("../../middlewares/validateUser/validatePostRegister");
const validatePostLogin = require("../../middlewares/validateUser/validatePostLogin")

const routerUser = Router();

routerUser.get("/", getAllUserHandler);
routerUser.post("/register", validatePostRetgister, postNewtUserHandler);
routerUser.post("/login", validatePostLogin, postLoginUserHandler)
routerUser.put("/update/:id", updateUserHandler);
routerUser.delete("/delete/:id", deleteUser);

module.exports = routerUser