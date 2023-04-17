const { Router } = require("express");
const authGoogleHandler = require("../../handlers/authHandler/authHandler")
require("../../middlewares/authGoogle/authGoogle");
const passport = require("passport");

const routerAuth = Router(); 

// routerAuth.get("/google", authGoogleHandler);
routerAuth.use("/google", passport.authenticate("auth-google", {
    scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
    ],
    session: false,
}), authGoogleHandler)

module.exports = routerAuth;