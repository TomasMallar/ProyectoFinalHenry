const generateTokenJwt = require("../../helpers/tokenjwt/generateTokenJwt")
const handlerbars = require("handlebars");
const fs = require("fs");
const { transporter } = require('../../utils/mailer');
const path = require('path');
const util = require('util');

const authGoogle = async (user) => {
    try {
        const token = await generateTokenJwt(user);

        const { name, mail, surname } = user;

        // Se agrega el envío del correo cuando se registra por google
        const readFile = util.promisify(fs.readFile);
        const templateFile = await readFile(path.resolve(__dirname, '../../views/emailWelcomeGoogle.handlebars'), 'utf8');
        const template = handlerbars.compile(templateFile);
        const html = template({ name })

        const mailOptions = {
            from: 'the.chocolate.hub@outlook.com',
            to: mail,
            subject: 'Forgot password',
            html,
          };

        await transporter.sendMail(mailOptions);

        return { 
            message: "User created successfully",
            user: {
                name,
                surname  
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