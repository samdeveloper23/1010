const selectAllPublicationQuery = require('../../models/publicationsQuery/selectAllPublicationQuery');

const getListPublication = async (req, res, next) => {
  try {
    const { keyword, date } = req.query;

    const publications = await selectAllPublicationQuery(
      keyword,
      date,
      req.user?.id
    );

    res.send({
      status: 'ok',
      data: {
        publications,
      },
    });
  } catch (err) {
    next(err);
  }
};
module.exports = getListPublication;
