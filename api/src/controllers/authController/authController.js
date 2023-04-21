const generateTokenJwt = require("../../helpers/tokenjwt/generateTokenJwt")

const authGoogle = async (user) => {
    try {
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

module.exports = {
    authGoogle
}