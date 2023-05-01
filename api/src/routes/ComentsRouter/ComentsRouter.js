const {Router} = require('express')
const { getAllComents, postNewComent, updateComent, deleteComents, updateImageAllComents, updatedComments } = require('../../handlers/comentsHandler/comentsHandler')

const routerComents = Router()

routerComents.get('/:id', getAllComents)
routerComents.get('/updatedcomments/:productId', updatedComments)

routerComents.post('/', postNewComent)

routerComents.put('/', updateComent)
routerComents.put('/all', updateImageAllComents)

routerComents.delete('/:comentId', deleteComents)

module.exports = routerComents