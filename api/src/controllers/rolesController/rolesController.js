const { User, Rol } = require("../../db")

const getRoles = async () => {
    const allRoles = await Rol.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
    });

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

const putRoles = async (id, name) => {
    try {
        const rol = await Rol.findByPk(id);

        if(!rol) throw new Error("Rol not found");

        await Rol.update({ rol_name: name }, { where: { id } });

        return { message: "Role changed successfully"};
    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteRoles = async (id) => {
    try {
        const rol = await Rol.findByPk(id);

        if(!rol) throw new Error("Rol not found");
    
        await Rol.destroy({ where: { id }});
    
        await User.update({ rolId: null }, { where: { rolId: id }})
    
        return { message: "Role deleted successfully"};
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getRoles,
    postRole,
    putRoles,
    deleteRoles
}