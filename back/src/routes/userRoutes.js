const express = require('express');
const route = express.Router();
const authUser = require('../middlewares/authUsers');
const userExists = require('../middlewares/userExists');

const {
  newUser,
  validateCode,
  loginUsers,
  getUser,
  getOwnUser,
  sendRecoverPass,
  editUsersRecoverPass,
  editUsersPass,
  editUserAvatar,
  deleteUser,
  getAllUsers,
} = require('../controllers/users');
const authUserOptional = require('../middlewares/authUserOptional');

//MIDDLEWARES USERS

//Crea un usuario pendiente de validar.
route.post(`/users`, newUser);

//Valida a un usuario recién registrado para darle acceso.
route.put('/users/validate/:regCode', validateCode);

//Logea a un usuario retornando un token.
route.post('/users/login', loginUsers);

//Retorna información del usuario del token.
route.get('/users/owner', authUser, userExists, getOwnUser);

//Retorna información de un usuario concreto.
route.get('/users/:userId', authUserOptional, getUser);

//Retorna un listado de usuarios a través de un filtro de búsqueda
route.get('/users', authUserOptional, getAllUsers);

//Permite actualizar el avatar del usuario.
route.put('/users/avatar', authUser, userExists, editUserAvatar);

//Envía al usuario un correo de recuperación de contraseña.
route.post('/users/password/recover', sendRecoverPass);

//Permite actualizar la contraseña mediante la recuperación.
route.put('/users/password/recover', editUsersRecoverPass);

//Resetea la contraseña de un usuario.
route.put('/users/password', authUser, userExists, editUsersPass);

//Permite eliminar al usuario del token
route.delete('/users/:userId', authUser, userExists, deleteUser);

module.exports = route;
