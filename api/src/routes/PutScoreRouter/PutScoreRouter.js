const {Router} = require('express')

const {updateScore, getChocolateScore} = require('../../handlers/putScoreHandler/PutScoreHandler')

const routerScore = Router()

routerScore.put('/:id', updateScore)
routerScore.get('/:id', getChocolateScore)

module.exports = routerScore