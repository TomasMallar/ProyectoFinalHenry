const { Router } = require('express')
const { emailNewUserHandler } = require('../../handlers/emailHandlers/emailNewUserHandler')
const  emailVerificationController  = require('../../controllers/emailControllers/emailVerificationController')
const { emailAllUsersHandler } = require('../../handlers/emailHandlers/emailAllUsersHandler')
const routerEmail = Router()

routerEmail.post('/new-user', emailNewUserHandler)
routerEmail.post('/choconews', emailAllUsersHandler)
routerEmail.get('/verify-email', emailVerificationController.verifyEmail);

module.exports = routerEmail