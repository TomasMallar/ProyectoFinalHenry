const { getComents, postComent, putComent, deleteComent } = require('../../controllers/comentsController/comentsController')


const getAllComents = async (req, res) => {
    try {
        const { page = 1 } = req.query
        const { id } = req.params
        const allComents = await getComents(id, page)
        res.status(200).json(allComents)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const postNewComent = async (req, res) => {
    try {
        const { userId, content, productId } = req.body
        const coment = await postComent(userId, content, productId)
        res.status(200).json(coment)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const updateComent = async (req, res) => {
    try {
        const { userId, comentId, content } = req.body
        console.log(userId, comentId, content);
        const updatedComent = await putComent(userId, comentId, content)
        res.status(200).json(updatedComent)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteComents = async (req, res) => {
    try { 
        const { comentId} = req.params
        const { userId } = req.body
       
        const deletedComent = await deleteComent(userId, comentId)
        res.status(200).json(deletedComent)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getAllComents,
    postNewComent,
    updateComent,
    deleteComents
}