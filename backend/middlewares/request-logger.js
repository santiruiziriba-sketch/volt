import fs from 'fs';

const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  res.on('finish', () => {
    const log = {
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      duration: `${Date.now() - startTime}ms`,
    };

    fs.appendFile('request.log', `${JSON.stringify(log)}\n`, (error) => {
      if (error) {
        console.error('Error al escribir request.log:', error);
      }
    });
  });

  next();
};

export default requestLogger;
