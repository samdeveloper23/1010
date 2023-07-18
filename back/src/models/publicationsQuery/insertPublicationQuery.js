const getDB = require('../../db/getDB');

const insertPublicationQuery = async (
  title,
  photoName,
  place,
  description,
  userId
) => {
  let connection;

  try {
    connection = await getDB();

    const createdAt = new Date();

    const [publication] = await connection.query(
      `INSERT INTO publications(title, photoName, place, description, userId, createdAt) VALUES(?, ?, ?, ?, ?, ?)`,
      [title, photoName, place, description, userId, createdAt]
    );

    return {
      id: publication.insertId,
      title,
      photoName,
      place,
      description,
      userId,
      createdAt,
    };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertPublicationQuery;
