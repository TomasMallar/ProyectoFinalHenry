const validatePutCategory = (req, res, next) => {
    const { id } = req.params
    const { name } = req.body
    let error = ' is required'
    let errorDataType = 'is not the expected data type'

    if(!id) error = 'ID' + error
    if (!name)  error = 'name' + error 

    //validacion de que el tipo de dato es el esperado
    if(typeof id !== 'string') errorDataType = 'ID' + errorDataType
    if (typeof name !== 'string')  errorDataType = 'name ' + errorDataType 

    if(error.length > 12) return res.status(400).json(error)
    if(errorDataType.length > 29) return res.status(400).json(errorDataType)
    next()
}

module.exports = validatePutCategory