const validatePostCategory = (req, res, next) => {
    const { name } = req.body
    let error = ' is required'
    let errorDataType = 'is not the expected data type'

    //validacion de que no falta el nombre
    if (!name)  error = 'name' + error 

    //validacion de que el tipo de dato es el esperado
    if (typeof name !== 'string')  errorDataType = 'name ' + errorDataType 

    if(error.length > 12) return res.status(400).json(error)
    if(errorDataType.length > 29) return res.status(400).json(errorDataType)
    next()
}

module.exports = validatePostCategory