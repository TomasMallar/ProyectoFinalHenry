const generateTokenJwt = require('../../helpers/tokenjwt/generateTokenJwt');
const handlerbars = require('handlebars');
const {encrypt} = require("../../helpers/password/bcryptHelper")
const fs = require('fs');
const { transporter } = require('../../utils/mailer');
const path = require('path');
const util = require('util');
const { User, Rol } = require("../../db")

const authGoogle = async ({ name, surname, mail, image }) => {
  console.log(image, name);
    try {
      const passwordHash = await encrypt(`${mail}${process.env.JWT_SECRET}`);

        const roles = await Rol.findOne({ where: { rol_name: 'user' } });

        const [ user, created ] = await User.findOrCreate({
            where: { mail },
            defaults: {
                name, 
                surname,
                image, 
                password: passwordHash,
                mail,
                phone: "11222333",
                date_of_birth: "2000-01-01",
                rolId: roles.id
            }
        });

        const token = await generateTokenJwt(user);

        if(!created) {
          return {
            message: "User in login",
            token
          }
        };

        return {
          message: "User created",
          token
        }

    } catch (error) {
      throw new Error(error.message);
    }
};

// const authGoogle = async (user) => {
//     try {
//         const token = await generateTokenJwt(user);

//         const { name, mail, surname } = user;

//         // Se agrega el envío del correo cuando se registra por google
//         // const readFile = util.promisify(fs.readFile);
//         // const templateFile = await readFile(path.resolve(__dirname, '../../views/emailWelcomeGoogle.handlebars'), 'utf8');
//         // const template = handlerbars.compile(templateFile);
//         // const html = template({ name })

//         // const mailOptions = {
//         //     from: 'the.chocolate.hub@outlook.com',
//         //     to: mail,
//         //     subject: 'Forgot password',
//         //     html,
//         //   };

//         // await transporter.sendMail(mailOptions);

//         return {
//             message: "User created successfully",
//             user: {
//                 name,
//                 surname
//             },
//             token,
//         }
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }

module.exports = {
  authGoogle,
};
