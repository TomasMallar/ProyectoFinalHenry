const { Product } = require('../../db')

const updateScoreFromDB = async(score, id)=> {

    const currentScore = await Product.findByPk(Number(id))
    if(currentScore)
    {
        let suma = currentScore.score.suma === undefined  ? currentScore.score.score : currentScore.score.suma

        currentScore.cont++
        suma += score
        
        let promedio = suma / currentScore.cont
        
        currentScore.score = {
            score: promedio,
            suma: suma
        }
        const result = await currentScore.save()
        return result
    }

}

module.exports = {
    updateScoreFromDB
}