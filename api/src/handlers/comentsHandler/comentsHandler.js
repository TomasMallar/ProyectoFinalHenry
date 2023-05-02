const { getComents, postComent, putComent, deleteComent, updateAllComents, commentsDeleted } = require('../../controllers/comentsController/comentsController')


const getAllComents = async (req, res) => {
    try {
        const { page = 0 } = req.query
        const { id } = req.params
        console.log(id);
        const allComents = await getComents(id, page)
        res.status(200).json(allComents)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const updatedComments = async(req, res) => {
    try {
        const {productId} = req.params
        console.log(productId);
        const updated = await commentsDeleted(productId)
        res.status(200).json(updated)
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

const updateImageAllComents = async(req, res) => {
    try {
        const {userId, image} = req.body
        const comentsModifed = await updateAllComents(userId, image)
        res.status(200).json(comentsModifed)
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
    deleteComents,
    updateImageAllComents, 
    updatedComments
}