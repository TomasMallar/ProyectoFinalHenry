const { postType } = require('../../controllers/typesController/typesController')

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
}