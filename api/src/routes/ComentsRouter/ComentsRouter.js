const {Router} = require('express')
const { getAllComents, postNewComent, updateComent, deleteComents } = require('../../handlers/comentsHandler/comentsHandler')

const routerComents = Router()

routerComents.get('/:id', getAllComents)

routerComents.post('/', postNewComent)

routerComents.put('/', updateComent)

routerComents.delete('/:comentId', deleteComents)

module.exports = routerComents