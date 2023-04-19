const { User, Rol } = require("../../db")
const { encrypt, compare } = require("../../helpers/password/bcryptHelper");
const { Op } = require("sequelize");
const generateTokenJwt = require("../../helpers/tokenjwt/generateTokenJwt")

const getAllUser = async () => {
    try {
        const allUser = await User.findAll({
            attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'] }
        });

        if(!allUser.length) throw new Error("Users not found");
    
        return allUser;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getOneUser = async (id) => {
    try {
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'] }
        });
    
        if(!user) throw new Error("User not found");
    
        return user; 
    } catch (error) {
        throw new Error(error.message);
    }

}

const getSearchUser = async (name) => {
    try {
       const usersSearch = await User.findAll({ 
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.iLike]: `%${name}%`
                        }
                    },
                    {
                        surname: {
                            [Op.iLike]: `%${name}%`
                        }
                    }
                ]
            },
            attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'] } // Excluir el campo 'password' en los resultados
        });

        if(!usersSearch.length) { // Verificar si no se encontraron resultados
            throw new Error("No users with that name or last name were found");
        }

        return usersSearch; 
    } catch (error) {
        throw new Error(error.message);
    }
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

        const token = await generateTokenJwt(user);

        return { 
            message: "User created successfully",
            user: {
                name: user.name,
                surname: user.surname  
            },
            token,
        } 

    } catch (error) {
        throw new Error(error.message);
    }
}

//En este me faltaría agregar la autenticación con token
const postLoginUser = async ({ mail, password }) => {
    try {
        const user = await User.findOne({ where: { mail } });

        if(!user) throw new Error("User not registered with that email");

        const checkPassword = await compare(password, user.password);

        if(!checkPassword) throw new Error("Invalid credentials");

        const token = await generateTokenJwt(user);

        return { 
            message: "User successfully logged in",
            user: {
                name: user.name,
                surname: user.surname  
            },
            token,
        }       
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
                throw new Error("The password is the same as the current one, you must type a new one")
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

const updatePassword = async ({ password, mail } ) => {
    try {
        const user = await User.findOne({ where: { mail }});

        if(!user) throw new Error("User not found");

        const checkPassword = await compare(password, user.password);
        
        if(checkPassword) {
            throw new Error("The password is the same as the current one, you must type a new one");
        }
    
        const passwordHash = await encrypt(password);
    
        await User.update({ password: passwordHash }, { where: { mail }});
    
        return { message: "Password updated successfully"}; 
    } catch (error) {
        throw new Error(error.message);
    }
}

// const deleteUser = async (id) => {
//     try {
//         const user = await User.findByPk(id);

//         if(!user) throw new Error("User not found")

//         await User.destroy({ where: { id }});

//         return { message: "User deleted successfully"};
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }

module.exports = {
    getAllUser,
    getOneUser,
    getSearchUser,
    postNewUser,
    postLoginUser,
    updateUser,
    updatePassword
    // deleteUser
}