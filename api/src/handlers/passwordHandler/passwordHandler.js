const { postForgotPassword, getVerifyTokenPassword, updateNewPassword } = require("../../controllers/passwordController/passwordController")

const postForgotPasswordHandler = async (req, res) => {
    try {
        const { mail } = req.body;

        const forgotPaswword = await postForgotPassword(mail);

        res.status(200).json(forgotPaswword)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getVerifyTokenPasswordHandler = async (req, res) => {
    try {
        const { token } = req.params;

        const verifyToken = await getVerifyTokenPassword(token);
    
        res.status(200).json(verifyToken);
    } catch (error) {
        res.status(400).json( { message: error.message });
    }
}

const updateNewPasswordHanlder = async (req, res) => {
    try {
        const { password, mail } = req.body;

        const newPassword = await updateNewPassword({ password, mail });

        res.status(200).json(newPassword);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    postForgotPasswordHandler,
    getVerifyTokenPasswordHandler,
    updateNewPasswordHanlder
}