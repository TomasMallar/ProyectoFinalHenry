const { getRoles, postRole } = require("../../controllers/rolesController/rolesController")

const getRolesHandler = async (req, res) => {
    try {
        const allRoles = await getRoles();

        res.status(200).json(allRoles)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const postRoleHandler = async (req, res) => {
    try {
        const { name } = req.body;

        const newRole = await postRole(name)

        res.status(200).json(newRole)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = {
    getRolesHandler,
    postRoleHandler
}