const { postType, getTypesAll, getTypesWithID, putTypes, deleteTypes } = require('../../controllers/typesController/typesController')

const getAllTypes = async(req,res) => {
    try {
        const types = await getTypesAll()
        res.status(200).json(types)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getTypes = async(req, res) => {
    try {
        const types = await getTypesWithID()
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

const putType = async(req, res) =>{
    try {
        const { id } = req.params
        const { name } = req.body
        const typeUpdated = await putTypes(id, name)
        res.status(200).json(typeUpdated)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteType = async(req, res ) => {
    try {
        const { id } = req.params
        const typeDeleted = await deleteTypes(id)
        res.status(200).json(typeDeleted)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = {
    postNewType,
    getAllTypes,
    getTypes, 
    putType,
    deleteType
}