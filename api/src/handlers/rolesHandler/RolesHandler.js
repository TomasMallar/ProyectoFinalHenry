const { getRoles, postRole, putRoles, postNewUserAdm } = require("../../controllers/rolesController/rolesController")

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

const putRolesHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { rol_name } = req.body;

        const updateRoles = await putRoles(id, rol_name);

        res.status(200).json(updateRoles);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const postNewUserAdmHandler = async (req, res) => {
    try {
        const { name, surname, password, mail, phone, date_of_birth } = req.body;

        const newUserAdm = await postNewUserAdm({ name, surname, password, phone, mail, date_of_birth });

        res.status(200).json(newUserAdm);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// const deleteRolesHandler = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const deleteRol = await deleteRoles(id);
        
//         res.status(200).json(deleteRol);
//     } catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// }

module.exports = {
    getRolesHandler,
    postRoleHandler,
    putRolesHandler,
    postNewUserAdmHandler
    // deleteRolesHandler
}