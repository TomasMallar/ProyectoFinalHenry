const { authGoogle } = require("../../controllers/authController/authController");

const authGoogleHandler = async (req, res) => {
    try {
        const { name, surname, mail, image } = req.body;
        
        const userGoogle = await authGoogle({ name, surname, mail, image });

        res.status(200).json(userGoogle);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = authGoogleHandler;