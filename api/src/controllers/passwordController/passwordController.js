const { User } = require("../../db");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { encrypt, compare } = require("../../helpers/password/bcryptHelper");
const handlerbars = require("handlebars");
const fs = require("fs");

const postForgotPassword = async (mail) => {
    try {
        const user = await User.findOne({ where: { mail }});

        if(!user) throw new Error("Error entering email");

        const token = jwt.sign({ id: user.id, mail: user.mail }, process.env.JWT_SECRET, { expiresIn: "10m" });

        const verificationLink = `http://localhost:3001/password/verify-token/${token}`;
 
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "ead4e90f98e053",
              pass: "8318d5d293d8da"
            }
        });

        const { name } = user;

        const templateFile = fs.readFileSync(__dirname + "/../../views/emailForgotPassword.handlebars").toString();
        const template = handlerbars.compile(templateFile);
        const html = template({ name , verificationLink })

        const mailOptions = {
            from: 'mail@example.com',
            to: mail,
            subject: 'Forgot password',
            html,
          };

        await transporter.sendMail(mailOptions);

        console.log('Correo electrónico enviado exitosamente');
        // console.log("Correo enviado:", info.messageId);
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