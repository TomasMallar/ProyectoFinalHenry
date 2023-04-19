const verifyToken = require("../../helpers/tokenjwt/verifyTokenJwt");
const { Rol } = require("../../db")

const validateRoleAdm = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ").pop();
        const tokenData = await verifyToken(token);

        const rolId = tokenData.rol;
        const role = await Rol.findByPk(rolId);

        if(role.rol_name !== process.env.ROLE_B) {
            return res.status(400).json({ message: "You don't have access"})
        }

        next()
    } catch (error) {
        return res.status(500).json({ message: "Role validation error"})
    }
}

module.exports = validateRoleAdm;