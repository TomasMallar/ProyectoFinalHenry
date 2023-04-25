const verifyToken = require("../../helpers/tokenjwt/verifyTokenJwt");

const validateUserId = async (req, res, next) => {
    try {
        const { id } = req.params;

        
        const token = req.headers.authorization.split(" ").pop();
        const tokenData = await verifyToken(token);

        if(tokenData.id !== parseInt(id)){
            return res.status(400).json({ message: "You don't have access" });
        }

        next()
    } catch (error) {
        return res.status(500).json({ message: "Id validation error" });
    }
}

module.exports = validateUserId;