import User from '../models/user.js';

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'Usuario no encontrado',
        });
      }

      return res.send({
        email: user.email,
        name: user.name,
      });
    })
    .catch(next);
};

export default getCurrentUser;
