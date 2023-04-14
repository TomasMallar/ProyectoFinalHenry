const { Router } = require("express");

const { 
    updateUserHandler, 
    deleteUser, 
    postNewtUserHandler, 
    getAllUserHandler, 
    postLoginUserHandler 
} = require("../../handlers/userHandler/UserHandler");

const validatePostUser = require("../../middlewares/validateUser/validatePost");

const routerUser = Router();

routerUser.get("/", getAllUserHandler);
routerUser.post("/register", validatePostUser, postNewtUserHandler);
routerUser.post("/login", postLoginUserHandler)
routerUser.put("/:id", updateUserHandler);
// routerUser.delete("/:id", deleteUser);

module.exports = routerUser