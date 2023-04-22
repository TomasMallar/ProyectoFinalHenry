const { User } = require("../../db")
const verifyToken = require("../../helpers/tokenjwt/verifyTokenJwt")

const validateJwt = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ").pop();

        if(!token) {
            return res.status(400).json({ message: "No token"});
        }

        const tokenData = await verifyToken(token);
        //payload decodificado
        if (!tokenData.id) {
            return res.status(400).json({ message: "No token"});
        }

        const user = await User.findOne({ where: { id: tokenData.id}});

        if(!user) {
            return res.status(400).json("Validation Error");
        }

        req.userId = tokenData.id;

        next();
    } catch (error) {
        return res.status(400).json("Invalid token");
    }
}

module.exports = validateJwt;