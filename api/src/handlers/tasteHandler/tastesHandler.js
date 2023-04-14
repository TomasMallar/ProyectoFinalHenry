const { getAllTastes, postNewTaste, deleteTaste, putTaste } = require('../../controllers/tasteController/tastesController')

const getTastes = async (req, res) => {
    try {
        const allTastes = await getAllTastes()
        res.status(200).json(allTastes)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const postTastes = async (req, res) => {
    try {
        const { name } = req.body
        const newTaste = await postNewTaste(name)
        res.status(200).json(newTaste)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const putTastes = async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body
        const tasteUpdated = await putTaste(id, name)
        res.status(200).json(tasteUpdated)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteTastes = async (req, res) => {
    try {
        const {id} = req.params
        const tasteDeleted = await deleteTaste(id)
        res.status(200).json(tasteDeleted)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getTastes,
    postTastes,
    putTastes,
    deleteTastes
}