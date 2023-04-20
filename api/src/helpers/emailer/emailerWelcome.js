const nodemailer = require("nodemailer");
const handlebars = require('handlebars');
const ejs = require("ejs");
const fs = require('fs');
//Función principal de Transport 

const path = require('path');

const createTrans = () => {
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "ead4e90f98e053",
          pass: "8318d5d293d8da"
        }
      });

    return transport;
};

//Función que se encarga de disparar el correo
// const sendMailWelcome = async (name, mail) => {
//     const transport = createTrans();
//     const templatePath = path.join(__dirname, 'email.handlebars');
//     const template = handlebars.compile(fs.readFileSync(templatePath, 'utf8'));

//     const info = await transport.sendMail({
//         from: '"Chocolates Henry 🍫" <chocolates@example.com>',
//         to: mail, //En el caso que quiera mandar a muchos correos envío un [] donde cada posición es un string del mail de cada user
//         subject: `Welcome ${name} to Chocolates Henry`, 
//         html: template({ name })
//     })

//     console.log("Message sent: %s", info.messageId);

//     return;
// }

// module.exports = sendMailWelcome;



