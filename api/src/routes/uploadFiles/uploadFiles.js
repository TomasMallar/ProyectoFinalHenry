const { Router } = require('express')
const {uploadImage} = require('../../handlers/uploadFilesHandler/uploadFilesHandler')

const uploadRouter = Router()

uploadRouter.post('/', uploadImage)

module.exports = uploadRouter