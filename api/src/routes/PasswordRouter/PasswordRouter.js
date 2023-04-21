const { Router } = require("express");
const { postForgotPasswordHandler, getVerifyTokenPasswordHandler, updateNewPasswordHanlder } = require("../../handlers/passwordHandler/passwordHandler");
const validateMail = require("../../middlewares/validatePassword/validateMail");
const validateMailPassword = require("../../middlewares/validatePassword/validateMailPassword")
const validateJwt = require("../../middlewares/validateJwt/validateJwt");

const routerPassword = Router();

routerPassword.post("/forgot-password", validateMail, postForgotPasswordHandler);
routerPassword.get("/verify-token/:token", getVerifyTokenPasswordHandler);
routerPassword.put("/new-password", validateJwt, validateMailPassword, updateNewPasswordHanlder)

module.exports = routerPassword;