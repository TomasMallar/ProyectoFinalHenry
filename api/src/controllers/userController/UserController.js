const { User, Rol } = require("../../db")
const { encrypt, compare } = require("../../helpers/password/bcryptHelper")

const getAllUser = async () => {
    const allUser = await User.findAll({
        attributes: { exclude: ['password'] }
    });

    return allUser;
}

const postNewUser = async ({ name, surname, password, phone, mail, date_of_birth }) => {
    try {
        const passwordHash = await encrypt(password);

        const roles = await Rol.findOne({ where: { rol_name: 'user' } });

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


        if(!created) throw new Error("The email is already registered");

        return { message: "User created successfully"};
    } catch (error) {
        throw new Error(error.message);
    }
}

//En este me faltaría agregar la autenticación con token
const postLoginUser = async ({ mail, password }) => {
    try {
        const user = await User.findOne({ where: { mail } });

        if(!user) throw new Error("Unregistered user");

        const checkPassword = await compare(password, user.password);

        if(!checkPassword) throw new Error("Password is incorrect");

        return { message: "User successfully logged in" };

    } catch (error) {
        throw new Error(error.message);
    }
}

const updateUser = async (id, userData) => {
    try {
        const user = await User.findByPk(id);

        if(!user) throw new Error("User not found");

        if(userData.password) {
            const checkPassword = await compare(userData.password, user.password);

            if(checkPassword) {
                throw new Error("the password is the same as the current one, you must type a new one")
            }

            const passwordHash = await encrypt(userData.password);
            
            userData.password = passwordHash;
        }

        if(
            userData.name === user.name || 
            userData.surname === user.surname || 
            userData.phone === user.phone || 
            userData.date_of_birth === user.date_of_birth ||
            userData.mail === user.mail
            ) {
                throw new Error("The data provided is the same as the current data. No update is necessary.")
        }

        await User.update(userData, { where: { id } });

        return { message: "User updated successfully" };
    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteUser = async (id) => {
    try {
        await User.destroy({ where: { id }});

        return { message: "User deleted successfully"};
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getAllUser,
    postNewUser,
    postLoginUser,
    updateUser,
    deleteUser
}