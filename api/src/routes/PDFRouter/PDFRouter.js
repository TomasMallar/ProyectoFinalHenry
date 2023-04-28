const {createPDF} = require('../../handlers/PDFHandler/PDFHandler')
const { Router } = require('express')

const routerPDF = Router()

routerPDF.get('/', createPDF)

module.exports = routerPDF