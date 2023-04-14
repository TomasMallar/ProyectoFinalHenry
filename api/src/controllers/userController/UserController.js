const { User } = require("../../db")
const { encrypt, compare } = require("../../helpers/password/bcryptHelper")

const getAllUser = async () => {
    const allUser = await User.findAll();

    return allUser;
}

const postNewUser = async ({ name, surname, password, phone, mail, date_of_birth }) => {
    try {
        const passwordHash = await encrypt(password);

        const [ user, created ] = await User.findOrCreate({
            where: { mail },
            defaults: {
                name, 
                surname, 
                password: passwordHash,
                phone,
                mail,
                date_of_birth
            }
        });

        if(!created) throw new Error("The email is already registered");

        return "User created successfully";
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

        return { dataUpdate: user };

    } catch (error) {
        throw new Error(error.message);
    }
}

const updateUser = async (id, userData) => {
    try {
        const user = await User.findByPk(id);

        if(!user) throw new Error("User not found");

        if(userData.password) {
            const checkPassword = await compare(password, user.password);

            if(checkPassword) {
                throw new Error("the password is the same as the current one, you must type a new one")
            }

            const passwordHash = await encrypt(password);
            
            userData.password = passwordHash;
        }

        await User.update(userData, { where: { id } });
        console.log(user);

        return { data: user };
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getAllUser,
    postNewUser,
    postLoginUser,
    updateUser
}