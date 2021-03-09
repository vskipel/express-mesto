const User = require('../models/user.js');

class NoUserError extends Error {
  constructor(name, message) {
    super(message);
    this.name = name;
  }
}

const getUsers = (req, res) => (
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({
      message: err,
    }))
);

const getProfile = (req, res) => (
  User.findOne({
    _id: req.params.userId,
  })
    .then((user) => {
      if (!user) {
        throw new NoUserError('userNotFound', 'Нет пользователя с таким id');
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: `Введены некорректные данные — ${err.message}`,
        });
      } else if (err.name === 'userNotFound') {
        res.status(404).send({
          message: `Ошибка — ${err.message}`,
        });
      }
      res.status(500).send({
        message: err.message,
      });
    })
);

const createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
  } = req.body; // получим из объекта запроса имя, описание и аватар пользователя
  User.create({
    name,
    about,
    avatar,
  })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: `Ошибка валидации данных — ${err.message}`,
        });
      }
      res.status(500).send({
        message: 'Произошла ошибка',
      });
    });
};

const updateProfile = (req, res) => {
  const {
    name,
    about,
  } = req.body; // получим из объекта запроса имя, описание и аватар пользователя
  User.findByIdAndUpdate(req.user._id, {
    name,
    about,
  }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .then((user) => {
      if (!user) {
        throw new NoUserError('userNotFound', 'Нет пользователя с таким id');
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: `Ошибка валидации данных — ${err.message}`,
        });
      } else if (err.name === 'userNotFound') {
        res.status(404).send({
          message: `Ошибка — ${err.message}`,
        });
      }
      res.status(500).send({
        message: `Произошла ошибка — ${err.message}`,
      });
    });
};

const updateAvatar = (req, res) => {
  const {
    avatar,
  } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    avatar,
  }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NoUserError('userNotFound', 'Нет пользователя с таким id');
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: `Введены некорректные данные — ${err.message}`,
        });
      } else if (err.name === 'userNotFound') {
        res.status(404).send({
          message: `Ошибка — ${err.message}`,
        });
      }
      res.status(500).send({
        message: `Произошла ошибка — ${err.message}`,
      });
    });
};

module.exports = {
  getUsers,
  getProfile,
  createUser,
  updateProfile,
  updateAvatar,
};
