const { generateError } = require('../../services/errors');
const upDateUsersRegCodeFinallyQuery = require('../../models/usersQuery/upDateUsersRegCodeFinallyQuery');

const editUsersRecoverPass = async (req, res, next) => {
  try {
    const { recoverPassCode, newPass } = req.body;

    if (!recoverPassCode || !newPass) {
      generateError('faltan campos por rellenar', 400);
    }

    await upDateUsersRegCodeFinallyQuery(recoverPassCode, newPass);

    res.send({
      status: 'ok',
      message: 'contraseña correctamente actualizada',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = editUsersRecoverPass;
