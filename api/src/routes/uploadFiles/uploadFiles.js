const { Router } = require('express')
const {uploadImage, uploadImageProfile} = require('../../handlers/uploadFilesHandler/uploadFilesHandler')

const uploadRouter = Router()

uploadRouter.post('/product', uploadImage)
uploadRouter.post('/profile', uploadImageProfile)

module.exports = uploadRouter