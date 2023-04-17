const { authGoogle } = require("../../controllers/authController/authController")

const authGoogleHandler = async (req, res) => {
    try {
        const userGoogle = await authGoogle(req.user);

        res.status(200).json(userGoogle);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = authGoogleHandler;