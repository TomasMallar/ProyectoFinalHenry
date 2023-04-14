const validatePutProduct = (req, res, next) => {
    const { id } = req.params;
    const { updateData } = req.body
    let error = ' is required'
    let errorDataType = ' is not the expected data type'

    // validacion de que no falte ninguno
    if (!id) error = 'ID' + error
    if (!updateData) error = 'Object' + error

    // validacion de que sean del mismo tipo de dato que se espera
    if (typeof id !== 'string') errorDataType = 'ID' + errorDataType
    if (typeof updateData !== 'object') errorDataType = 'updateData' + errorDataType

    if (error.length > 12) return res.status(400).json(error)
    if(errorDataType.length > 29) return res.status(400).json(errorDataType)
    next()
}

module.exports = validatePutProduct