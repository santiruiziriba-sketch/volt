import fs from 'fs';

const errorLogger = (err, req, res, next) => {
  const log = {
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.originalUrl,
    status: err.statusCode || err.status || (err.details ? 400 : 500),
    message: err.message,
  };

  fs.appendFile('error.log', `${JSON.stringify(log)}\n`, (error) => {
    if (error) {
      console.error('Error al escribir error.log:', error);
    }
  });

  next(err);
};

export default errorLogger;
