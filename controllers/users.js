const path = require('path');
const getDataFromFile = require('../helpers/files.js');

const dataPath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res) => (
  getDataFromFile(dataPath)
    .then((users) => {
      if (!users) {
        return res.status(500).send({
          message: 'Пользователи не найдены',
        });
      }
      return res.status(200).send(users);
    })
    .catch((err) => res.status(400).send({
      message: err,
    }))
);

const getProfile = (req, res) => (
  getDataFromFile(dataPath)
    .then((users) => {
      if (!users) {
        return res.status(500).send({
          message: 'Пользователи не найдены',
        });
      }
      return users.find((user) => user._id === req.params.id);
    })
    .then((user) => {
      if (!user) {
        return res.status(500).send({
          message: 'Нет пользователя с таким id',
        });
      }
      return res.status(200).send(user);
    })
    .catch((err) => res.status(400).send({
      message: err,
    }))
);

module.exports = {
  getUsers,
  getProfile,
};
