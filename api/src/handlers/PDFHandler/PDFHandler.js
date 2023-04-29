const { PDFMetrics } = require('../../controllers/PDFController/PDFController')

const createPDF = async(req, res) => {
    try {
        await PDFMetrics(req, res)
    } catch (error) {
        res.status(400).json({error: error.message})        
    }
}

module.exports = {
    createPDF
}