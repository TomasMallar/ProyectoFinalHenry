const { postType, getTypesAll } = require('../../controllers/typesController/typesController')

const getAllTypes = async(req,res) => {
    try {
        const types = await getTypesAll()
        res.status(200).json(types)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const postNewType = async (req, res) => {
    try {
        const { name } = req.body
        const newTypeCreated = await postType(name)
        res.status(200).json(newTypeCreated)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    postNewType,
    getAllTypes
}