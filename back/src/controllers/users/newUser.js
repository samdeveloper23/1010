const insertUserQuery = require('../../models/usersQuery/insertUserQuery');
const { v4: uuid } = require('uuid');
const { generateError } = require('../../services/errors');
const sendMail = require('../../services/sendMail');

const newUser = async (req, res, next) => {
  try {
    const { email, username, password, personalInfo } = req.body;
    if (!email || !username || !password) {
      generateError('Faltan campos', 400);
    }

    const registrationCode = uuid();

    const body = await insertUserQuery(
      email,
      username,
      password,
      registrationCode,
      personalInfo
    );

    const emailSubject = 'Activación de usuario en tattooArt';

    const emailBody = `

            ¡Bienvenid@ ${username} a tattoArt!
            
            Puedes activar tu usuario a través del siguiente codigo, cópielo y péguelo:
           
            ${registrationCode}

            Este es un email autogenerado, por favor no responda a este email.
        `;

    await sendMail(email, emailSubject, emailBody);
    res.send({
      status: 'ok',
      data: registrationCode,
      message:
        'Usuario creado, introduzca el codigo de verificación',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newUser;
