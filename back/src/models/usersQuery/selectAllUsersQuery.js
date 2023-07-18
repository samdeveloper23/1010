const getDB = require('../../db/getDB');
const { generateError } = require('../../services/errors');

const selectAllUsersQuery = async (keyword = '') => {
  let connection;

  try {
    connection = await getDB();

    const [users] = await connection.query(
      `
          SELECT 
              id, 
              username, 
              email, 
              role, 
              avatar
          FROM users 
          WHERE userName LIKE ? OR personalInfo LIKE ?
      `,
      [`%${keyword}%`, `%${keyword}%`]
    );

    // Si no hay usuarios, lanzamos un error.
    if (users.length < 1) {
      generateError('No hay usuarios', 404);
    }

    return users;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectAllUsersQuery;
