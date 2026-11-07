import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.NODE_ENV === 'production'
  ? process.env.JWT_SECRET
  : 'volt-development-secret';

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({
      message: 'Se requiere autorización',
    });
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    req.user = payload;

    return next();
  } catch (error) {
    return res.status(401).send({
      message: 'Token inválido o expirado',
    });
  }
};

export default auth;
