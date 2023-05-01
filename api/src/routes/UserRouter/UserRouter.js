const { Router } = require('express');

const {
  getAllUserHandler,
  getOneUserHandler,
  getSearchUserHandler,
  postNewtUserHandler,
  postLoginUserHandler,
  updateUserHandler,
  deleteUserHandler,
  updatePasswordHanlder,
  getUserOrderHandler,
} = require('../../handlers/userHandler/UserHandler');

const validatePostRegister = require('../../middlewares/validateUser/validatePostRegister');
const validatePostLogin = require('../../middlewares/validateUser/validatePostLogin');
const validatePutUser = require('../../middlewares/validateUser/validatePutUser');
const validateJwt = require('../../middlewares/validateJwt/validateJwt');
const validateRoleAdm = require('../../middlewares/validateRoleAdm/validateRolAdm');
const validateUserId = require('../../middlewares/validateUser/validateUserId');

const routerUser = Router();

/****************RUTAS SIN VALIDACIONES DEL TOKEN***************************/
routerUser.get('/', getAllUserHandler);
routerUser.get('/profile/:id', getOneUserHandler);
routerUser.get('/search-user', getSearchUserHandler);
routerUser.delete('/delete/:id', deleteUserHandler);

routerUser.put('/update/:id', updateUserHandler);

routerUser.post('/register', validatePostRegister, postNewtUserHandler);
routerUser.post('/login', validatePostLogin, postLoginUserHandler);

routerUser.get('/order/:id', getUserOrderHandler);

/****************RUTAS CON VALIDACIONES DEL TOKEN***************************/
// routerUser.get('/', validateJwt, validateRoleAdm, getAllUserHandler);
// routerUser.get('/profile/:id', validateJwt, validateUserId, getOneUserHandler);
// routerUser.get(
//   '/search-user',
//   validateJwt,
//   validateRoleAdm,
//   getSearchUserHandler
// );
// routerUser.delete(
//   '/delete/:id',
//   validateJwt,
//   validateRoleAdm,
//   deleteUserHandler
//   );


module.exports = routerUser;
