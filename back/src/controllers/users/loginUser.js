const selectUserEmailQuery = require('../../models/usersQuery/selectUserEmailQuery');
const { generateError } = require('../../services/errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUsers = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email) {
      generateError('Debe introducir un email', 400);
    }
    if (!password) {
      generateError('Debe introducir una contraseña', 400);
    }

    const user = await selectUserEmailQuery(email);

    const validationPass = await bcrypt.compare(password, user.password);

    if (!validationPass) {
      generateError('Contraseña incorrecta', 401);
    }

    const infoToken = {
      id: user.id,
      role: user.role,
    };

    const token = jwt.sign(infoToken, process.env.SECRET, {
      expiresIn: '1d',
    });

    res.send({
      status: 'ok',
      data: {
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = loginUsers;
