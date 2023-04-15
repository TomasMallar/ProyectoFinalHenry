const { Rol } = require("../../db")

const getRoles = async () => {
    const allRoles = await Rol.findAll();

    return allRoles;
}

const postRole = async (name) => {
    try {
        await Rol.findOrCreate({ where: { rol_name: name } });

        return { message: "Role created successfully"}
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getRoles,
    postRole
}