const Card = require('../models/card.js');

const getCards = (req, res) => (
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send(err))
);

const createCard = (req, res) => {
  const {
    name,
    link,
  } = req.body; // получим из объекта запроса имя и ссылку на карточку
  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.send({
      data: card,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        if (err.errors && err.errors.name && err.errors.name.kind === 'minlength') {
          res.status(400).send({
            message: 'Слишком короткое название. Длина названия должна быть от 2 до 30 символов',
          });
        } else if ((err.errors && err.errors.name && err.errors.name.kind === 'maxlength')) {
          res.status(400).send({
            message: 'Слишком длинное название. Длина названия должна быть от 2 до 30 символов',
          });
        } else if ((err.errors.link)) {
          res.status(400).send({
            message: err.errors.link.message,
          });
        } else {
          res.status(400).send({
            message: 'Неправильные данные',
          });
        }
        res.status(400).send({
          message: 'Неправильные данные',
        });
      }
      res.status(500).send({
        message: 'Произошла ошибка',
      });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({
      data: card,
    }))
    .catch((err) => res.status(500).send({
      message: `Произошла ошибка — ${err}`,
    }));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $addToSet: {
      likes: req.user._id,
    },
  }, // добавить _id в массив, если его там нет
  {
    new: true,
  })
    .then((card) => res.send({
      data: card,
    }))
    .catch((err) => res.status(500).send({
      message: `Произошла ошибка — ${err}`,
    }));
};

const deleteLikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $pull: {
      likes: req.user._id,
    },
  }, // убрать _id из массива
  {
    new: true,
  })
    .then((card) => res.send({
      data: card,
    }))
    .catch((err) => res.status(500).send({
      message: `Произошла ошибка — ${err}`,
    }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLikeCard,
};
