const {Router} = require('express')

const {updateScore} = require('../../handlers/putScoreHandler/PutScoreHandler')

const routerScore = Router()

routerScore.put('/:id', updateScore)

module.exports = routerScore