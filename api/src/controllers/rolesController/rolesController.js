const { User, Rol } = require("../../db");
const { encrypt } = require("../../helpers/password/bcryptHelper");
const generateTokenJwt = require("../../helpers/tokenjwt/generateTokenJwt");

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

const putRoles = async (id, rol_name) => {
    try {
        const user = await User.findByPk(id); 

        if(!user) throw new Error("User not found");

        const role = await Rol.findOne({ where: { rol_name }})

        if(!role) throw new Error("Role not found");

        await User.update({ rolId : role.id }, { where: { id }});

        return { message: "Role changed successfully"};
    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteRoles = async (id) => {
    try {
        const rol = await Rol.findByPk(id);

        if(!rol) throw new Error("Role not found");
    
        await Rol.destroy({ where: { id }});
    
        await User.update({ rolId: null }, { where: { rolId: id }})
    
        return { message: "Role deleted successfully"};
    } catch (error) {
        throw new Error(error.message);
    }
}

const postNewUserAdm = async ({ name, surname, password, phone, mail, date_of_birth }) => {
    try {
        const passwordHash = await encrypt(password);

        const roles = await Rol.findOne({ where: { rol_name: process.env.ROLE_B } });

        const [ user, created ] = await User.findOrCreate({
            where: { mail },
            defaults: {
                name, 
                surname, 
                password: passwordHash,
                phone,
                mail,
                date_of_birth,
                rolId: roles.id
            }
        });

        if(!created) throw new Error("The email is already registered, modify the role");

        // const token = await generateTokenJwt(user);

        return { 
            message: "Admin user created successfully",
            user: {
                name: user.name,
                surname: user.surname  
            },
            // token,
        } 

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getRoles,
    postRole,
    putRoles,
    deleteRoles,
    postNewUserAdm
}