const updateUsersRegCodeQuery = require('../../models/usersQuery/updateUsersRegCodeQuery');

const validateCode = async (req, res, next) => {
  try {
    const { regCode } = req.params;

    await updateUsersRegCodeQuery(regCode);

    res.send({
      status: 'ok',
      message: 'Usuario activado',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = validateCode;
