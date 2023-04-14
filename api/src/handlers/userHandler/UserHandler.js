const { getAllUser, postNewUser, postLoginUser, updateUser } = require("../../controllers/userController/UserController");
const validatePutUser = require("../../helpers/validateUser/validatePutUser")


const getAllUserHandler = async (req, res) => {
    try {
        const allUser = await getAllUser();

        res.status(200).json(allUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const postNewtUserHandler = async (req, res) => {
    try {
        const { name, surname, password, mail, phone, date_of_birth } = req.body;

        const newUser = await postNewUser({
            name, 
            surname,
            mail, 
            phone, 
            date_of_birth,
            password
        });

        res.status(200).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const postLoginUserHandler = async (req, res) => {
    try {
        const { mail, password } = req.body;

        const userLogin = await postLoginUser({
            mail,
            password
        }); 

        res.status(200).json(userLogin);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const updateUserHandler = async (req, res) => {
    try {
        const { id } = req.params;
        
        const updateData = validatePutUser(req.body);

        const update = await updateUser(id, updateData);

        res.status(200).json(update);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const deleteUser = async (req, res) => {

}

module.exports = {
    getAllUserHandler,
    postNewtUserHandler,
    postLoginUserHandler,
    updateUserHandler,
    deleteUser,

}

