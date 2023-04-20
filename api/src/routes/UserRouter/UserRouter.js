const { Router } = require("express");

const { 
    getAllUserHandler, 
    getOneUserHandler,
    getSearchUserHandler,
    postNewtUserHandler, 
    postLoginUserHandler,
    updateUserHandler, 
    deleteUserHandler,
    updatePasswordHanlder 
} = require("../../handlers/userHandler/UserHandler");

const validatePostRegister = require("../../middlewares/validateUser/validatePostRegister");
const validatePostLogin = require("../../middlewares/validateUser/validatePostLogin");
const validatePutUser = require("../../middlewares/validateUser/validatePutUser");
const validateJwt = require("../../middlewares/validateJwt/validateJwt");
const validateRoleAdm = require("../../middlewares/validateRoleAdm/validateRolAdm");
const validateUserId = require("../../middlewares/validateUser/validateUserId");

const routerUser = Router();

routerUser.get("/", validateJwt, validateRoleAdm, getAllUserHandler);
routerUser.get("/profile/:id", validateJwt, validateUserId, getOneUserHandler);
routerUser.get("/search-user", validateJwt, validateRoleAdm, getSearchUserHandler);
routerUser.put("/update/:id", validateJwt, validateUserId, validatePutUser, updateUserHandler);
routerUser.delete("/delete/:id", validateJwt, validateRoleAdm, deleteUserHandler);

routerUser.put("/new-password", updatePasswordHanlder);
routerUser.post("/register", validatePostRegister, postNewtUserHandler);
routerUser.post("/login", validatePostLogin, postLoginUserHandler);



const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { User } = require("../../db")

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ead4e90f98e053",
      pass: "8318d5d293d8da"
    }
  });

routerUser.post('/forgot-password', async (req, res) => {
  const { mail } = req.body;
  const user = await User.findOne({ where: { mail } });

  if (!user) {
    res.status(404).send('User not found');
    return;
  }

  const token = jwt.sign({ userId: user.id }, 'secretkey', { expiresIn: '1h' });
  const resetUrl = `http://localhost:3001/users/reset-password/${token}`;

  const mailOptions = {
    from: 'youremail@gmail.com',
    to: mail,
    subject: 'Reset Password',
    html: `Click <a href="${resetUrl}">here</a> to reset your password.`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
      return;
    }
    console.log(info.response);
    res.status(200).send('Email sent successfully');
  });
});

routerUser.get('/reset-password/:token', (req, res) => {
  const { token } = req.params;
  const title = 'Página de inicio';
  const users = [{ name: 'John' }, { name: 'Jane' }, { name: 'Mike' }];
  try {
    const decodedToken = jwt.verify(token, 'secretkey');
    console.log(decodedToken);
    res.render("email.ejs", { title, users });
  } catch (error) {
    console.log(error);
    res.status(400).send('Invalid token');
  }
});

routerUser.put('/reset-password', async (req, res) => {
  const { token, password } = req.body;

  try {
    const decodedToken = jwt.verify(token, 'secretkey');
    const user = await User.findOne({ where: { id: decodedToken.userId } });
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    user.password = password;
    await user.save();
    res.status(200).send('Password updated successfully');
  } catch (error) {
    console.log(error);
    res.status(400).send('Invalid token');
  }
});

module.exports = routerUser;