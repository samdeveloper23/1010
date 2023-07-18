const insertPublicationQuery = require('../../models/publicationsQuery/insertPublicationQuery');
const savePhoto = require('../../services/savePhoto');

const { generateError } = require('../../services/errors');

const newPublication = async (req, res, next) => {
  try {
    const { title, place, description, photo } = req.body;


    if (!title || !place || !description || !req.files?.photo) {
      generateError('Faltan campos', 400);
    }
    const photoFile = await savePhoto(req.files.photo, 500);

    const publication = await insertPublicationQuery(
      title,
      photoFile,
      place,
      description,
      req.user.id
    );

    res.send({
      status: 'ok',
      data: {
        publication,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newPublication;
