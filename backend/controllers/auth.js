import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const JWT_SECRET = process.env.NODE_ENV === 'production'
  ? process.env.JWT_SECRET
  : 'volt-development-secret';

export const createUser = (req, res) => {
  const { email, password, name } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => {
      res.status(201).send({
        email: user.email,
        name: user.name,
      });
    })
    .catch((error) => {
      if (error.code === 11000) {
        return res.status(409).send({
          message: 'El email ya está registrado',
        });
      }

      if (error.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Datos de usuario inválidos',
        });
      }

      return res.status(500).send({
        message: 'Error del servidor',
      });
    });
};

export const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return res.status(401).send({
          message: 'Email o contraseña incorrectos',
        });
      }

      return bcrypt.compare(password, user.password).then((isValid) => {
        if (!isValid) {
          return res.status(401).send({
            message: 'Email o contraseña incorrectos',
          });
        }

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: '7d',
        });

        return res.send({ token });
      });
    })
    .catch(next);
};
