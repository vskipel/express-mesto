const User = require('../models/user.js')

const getUsers = (req, res) => (
  User.find({})
  .then((users) => res.status(200).send(users))
  .catch((err) => res.status(500).send({
    message: err,
  }))
);

const getProfile = (req, res) => (
  User.findOne({
    _id: req.params.userId
  })
  .then((user) => {
    if (!user) {
      return res.status(404).send({
        message: 'Нет пользователя с таким id',
      });
    }
    return res.status(200).send(user);
  })
  .catch((err) => res.status(500).send({
    message: err,
  }))
);

const createUser = (req, res) => {
  const {
    name,
    about,
    avatar
  } = req.body; // получим из объекта запроса имя, описание и аватар пользователя
  User.create({
      name,
      about,
      avatar
    })
    .then(user => res.send({
      data: user
    }))
    .catch(err => {
      console.log(err)
      if (err.name === 'ValidationError') {
        if (err.errors && err.errors.name && err.errors.name.kind === 'minlength') {
          res.status(400).send({
            message: 'Слишком короткое имя. Длина имени должна быть от 2 до 30 символов'
          })
        } else if ((err.errors && err.errors.name && err.errors.name.kind === 'maxlength')) {
          res.status(400).send({
            message: 'Слишком длинное имя. Длина имени должна быть от 2 до 30 символов'
          })
        } else if ((err.errors && err.errors.about && err.errors.about.kind === 'minlength')) {
          res.status(400).send({
            message: 'Слишком короткое описание. Длина описания должна быть от 2 до 30 символов'
          })
        } else if ((err.errors && err.errors.about && err.errors.about.kind === 'maxlength')) {
          res.status(400).send({
            message: 'Слишком длинное описание. Длина описания должна быть от 2 до 30 символов'
          })
        } else if ((err.errors.avatar)) {
          res.status(400).send({
            message: err.errors.avatar.message
          })
        } else {
          res.status(400).send({
            message: 'Неправильные данные'
          })
        }
        res.status(400).send({
          message: 'Неправильные данные'
        })
      }
      res.status(500).send({
        message: 'Произошла ошибка'
      })
    });
}

const updateProfile = (req, res) => {
  const {
    name,
    about
  } = req.body; // получим из объекта запроса имя, описание и аватар пользователя
  User.findByIdAndUpdate(req.user._id, {
      name,
      about
    }, {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    })
    .then(user => res.send({
      data: user
    }))
    .catch(err => {
      if (err.name === 'ValidationError') {
        if (err.errors && err.errors.name && err.errors.name.kind === 'minlength') {
          res.status(400).send({
            message: 'Слишком короткое имя. Длина имени должна быть от 2 до 30 символов'
          })
        } else if ((err.errors && err.errors.name && err.errors.name.kind === 'maxlength')) {
          res.status(400).send({
            message: 'Слишком длинное имя. Длина имени должна быть от 2 до 30 символов'
          })
        } else if ((err.errors && err.errors.about && err.errors.about.kind === 'minlength')) {
          res.status(400).send({
            message: 'Слишком короткое описание. Длина описания должна быть от 2 до 30 символов'
          })
        } else if ((err.errors && err.errors.about && err.errors.about.kind === 'maxlength')) {
          res.status(400).send({
            message: 'Слишком длинное описание. Длина описания должна быть от 2 до 30 символов'
          })
        } else {
          res.status(400).send({
            message: 'Неправильные данные'
          })
        }
        res.status(400).send({
          message: 'Неправильные данные'
        })
      }
      res.status(500).send({
        message: 'Произошла ошибка'
      })
    });
}

const updateAvatar = (req, res) => {
  const {
    avatar
  } = req.body;
  User.findByIdAndUpdate(req.user._id, {
      avatar
    }, {
      new: true,
      runValidators: true,
    })
    .then(user => res.send({
      data: user
    }))
    .catch(err => {
      console.log(err)
      if (err.name === 'ValidationError') {
        if ((err.errors.avatar)) {
          res.status(400).send({
            message: err.errors.avatar.message
          })
        } else {
          res.status(400).send({
            message: 'Неправильные данные'
          })
        }
        res.status(400).send({
          message: 'Неправильные данные'
        })
      }
      res.status(500).send({
        message: 'Произошла ошибка'
      })
    });
}



module.exports = {
  getUsers,
  getProfile,
  createUser,
  updateProfile,
  updateAvatar
};