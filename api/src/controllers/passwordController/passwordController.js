const { User } = require("../../db");
const jwt = require("jsonwebtoken");
const { encrypt, compare } = require("../../helpers/password/bcryptHelper");
const handlerbars = require("handlebars");
const fs = require("fs");
const { transporter } = require('../../utils/mailer');
const path = require('path');
const util = require('util');

const postForgotPassword = async (mail) => {
    try {
        const user = await User.findOne({ where: { mail }});

        if(!user) throw new Error("Error entering email");

        const token = jwt.sign({ id: user.id, mail: user.mail }, process.env.JWT_SECRET, { expiresIn: "10m" });

        const verificationLink = `http://localhost:3001/password/verify-token/${token}`;
 
        const { name } = user;

        const readFile = util.promisify(fs.readFile);
        const templateFile = await readFile(path.resolve(__dirname, '../../views/emailForgotPassword.handlebars'), 'utf8');
        const template = handlerbars.compile(templateFile);
        const html = template({ name , verificationLink })

        const mailOptions = {
            from: 'thechocolatehub@outlook.com.ar',
            to: mail,
            subject: 'Forgot password',
            html,
          };

        await transporter.sendMail(mailOptions);
          
        console.log('Correo electrónico enviado exitosamente');
    } catch (error) {
        throw new Error(error.message);
    }
}

const getVerifyTokenPassword = async (token) => {
    try {
       const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        if(!verifyToken) {
            return {
                message: "Something went wrong with the verification",
                token: null,
                verification: false,
            }
        }

        return {
            message: "Successful verification",
            token,
            verification: true,
        } 
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateNewPassword = async ({ password, mail } ) => {
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

module.exports = {
    postForgotPassword,
    getVerifyTokenPassword,
    updateNewPassword
}