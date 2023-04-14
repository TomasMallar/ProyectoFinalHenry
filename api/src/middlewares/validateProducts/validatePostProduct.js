const validatePostProduct = (req, res, next) => {
    const { name, price, stock, image, score } = req.body
    let error = ' is required'
    let errorDataType = 'is not the expected data type'

    //validacion de que no falta ninguno
    if (!name)  error = 'name' + error 
    if (!price)  error = 'price' + error
    if (!stock)  error = 'stock' + error
    if (!image)  error = 'image' + error
    if (!score)  error = 'score' + error

    // validacion de que sean del mismo tipo de dato que se espera
    if (typeof name !== 'string')  errorDataType = 'name ' + errorDataType 
    if (typeof price !== 'number')  errorDataType = 'price ' + errorDataType 
    if (typeof stock !== 'number')  errorDataType = 'stock ' + errorDataType 
    if (typeof image !== 'string')  errorDataType = 'image ' + errorDataType 
    if (typeof score !== 'number')  errorDataType = 'score ' + errorDataType 

    if(error.length > 12) return res.status(400).json(error)
    if(errorDataType.length > 29) return res.status(400).json(errorDataType)
    next()
}

module.exports = validatePostProduct