const errorStandard = (err, req, res, next) => {
  console.error(err);

  res.status(err.httpStatus || 500).send({
    status: 'error',
    message: err.message,
  });
};

const notFound = (req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Ruta no encontrada',
  });
};

const generateError = (msg, code) => {
  const err = new Error(msg);
  err.httpStatus = code;
  throw err;
};

module.exports = { errorStandard, notFound, generateError };
