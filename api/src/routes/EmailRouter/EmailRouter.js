const { Router } = require('express')
const { emailNewUserHandler } = require('../../handlers/emailHandlers/emailNewUserHandler')

const routerEmail = Router()

routerEmail.post('/new-user', emailNewUserHandler)

module.exports = routerEmail