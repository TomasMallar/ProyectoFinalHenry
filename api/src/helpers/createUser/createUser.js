require("dotenv").config();
const bcrypt = require("bcryptjs")
const { User, Rol } = require("../../db");
const { 
    NAME_USER, 
    SURNAME_USER, 
    MAIL_USER, 
    DATE_OF_BITH_USER,
    PASSWORD_USER,
    PHONE_USER,
    ROLE_B
} = process.env;

const createUser = async () => {
    try {
        const passwordHash = await bcrypt.hash(PASSWORD_USER, 10);

        const role = await Rol.findOne({ where: { rol_name: ROLE_B } });

        await User.findOrCreate(
            { 
                where: { mail : MAIL_USER },
                defaults: {
                    name : NAME_USER,
                    surname : SURNAME_USER,
                    mail : MAIL_USER,
                    password : passwordHash,
                    date_of_birth : DATE_OF_BITH_USER,
                    phone : PHONE_USER,
                    rolId: role.id
                }
            })
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = createUser;