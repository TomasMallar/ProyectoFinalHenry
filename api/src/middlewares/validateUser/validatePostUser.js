const validatePostUser = (req, res, next) => {
    const { name, surname, mail, date_of_birth, password, phone } = req.body
    let error = ' is required'
    let errorDataType = ' is not the expected data type'

    // validacion de que no falte ninguno
    if (!name)  error = 'name' + error 
    if (!surname)  error = 'surname' + error 
    if (!mail)  error = 'mail' + error 
    if (!date_of_birth)  error = 'date_of_birth' + error 
    if (!password)  error = 'password' + error 
    if (!phone)  error = 'phone' + error 

    // validacion de que sean del mismo tipo de dato que se espera
    if (typeof name !== 'string')  errorDataType = 'name' + errorDataType 
    if (typeof surname !== 'string')  errorDataType = 'surname' + errorDataType 
    if (typeof mail !== 'string')  errorDataType = 'mail' + errorDataType 
    if (typeof date_of_birth !== 'string')  errorDataType = 'date_of_birth' + errorDataType 
    if (typeof password !== 'string')  errorDataType = 'password' + errorDataType 
    if (typeof phone !== 'number')  errorDataType = 'phone' + errorDataType 

    if(error.length > 12) return res.status(400).json(error)
    if(errorDataType.length > 29) return res.status(400).json(errorDataType)
    next()
}

module.exports = validatePostUser