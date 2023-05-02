const {updateScoreFromDB, getChocolateById} = require('../../controllers/putScoreController/PutScoreController')

const updateScore = async(req, res) => {

    try {
        
        const {id} = req.params
        const { score } = req.body
        const scoreUpdated = await updateScoreFromDB(score, id)
        res.status(200).json(scoreUpdated)

    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

const getChocolateScore = async(req, res) => {
    try {
        
        const {id} = req.params
        const chocolateScore = await getChocolateById( id)
        res.status(200).json(chocolateScore)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { updateScore, getChocolateScore }