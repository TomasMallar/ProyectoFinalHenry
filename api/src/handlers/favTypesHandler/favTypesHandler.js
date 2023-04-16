const { 
    getAllFavTypes,
    postNewFavType,
    deleteFavType } = require('../../controllers/favTypesController/favTypesController')

const getFavTypes = async (req, res) => {
    try {
        const {id} = req.params
        const allFavTypes = await getAllFavTypes(id)
        res.status(200).json(allFavTypes)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const postFavTypes = async (req, res) => {
    try {
        const {id} = req.params
        const { name } = req.body
        const newType = await postNewFavType(name, id)
        res.status(200).json(newType)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}



const deleteFavTypes = async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body
        const favTypeDeleted = await deleteFavType(id, name)
        res.status(200).json(favTypeDeleted)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getFavTypes,
    postFavTypes,
    deleteFavTypes
}