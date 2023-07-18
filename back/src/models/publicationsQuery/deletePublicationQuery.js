const getDB = require('../../db/getDB');
const deletePhoto = require('../../services/deletePhoto');

const deletePublicationQuery = async (publicationId) => {
  let connection;

  try {
    connection = await getDB();

    await connection.query('DELETE FROM comments WHERE publicationId = ?', [
      publicationId,
    ]);

    const [deletePhotoPublications] = await connection.query(
      'SELECT photoName FROM publications WHERE id = ?',
      [publicationId]
    );

    const photoName = deletePhotoPublications[0]?.photoName;

    if (photoName) {
      await deletePhoto(photoName);
    }

    await connection.query('DELETE FROM publications WHERE id = ?', [
      publicationId,
    ]);

    await connection.commit();
  } catch (error) {
    if (connection) await connection.rollback();
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deletePublicationQuery;
