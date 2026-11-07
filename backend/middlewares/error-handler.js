import { isCelebrateError } from 'celebrate';

const errorHandler = (err, req, res, _next) => {
  if (isCelebrateError(err)) {
    return res.status(400).send({
      message: 'Datos inválidos',
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).send({
      message: 'Datos inválidos',
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).send({
      message: 'ID inválido',
    });
  }

  if (err.code === 11000) {
    return res.status(409).send({
      message: 'El recurso ya existe',
    });
  }

  if (err.statusCode) {
    return res.status(err.statusCode).send({
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).send({
    message: 'Error interno del servidor',
  });
};

export default errorHandler;
