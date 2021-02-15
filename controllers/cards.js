const path = require('path');
const getDataFromFile = require('../helpers/files.js');

const dataPath = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => (
  getDataFromFile(dataPath)
    .then((cards) => {
      if (!cards) {
        return res.status(500).send({
          message: 'Карточки не найдены',
        });
      }
      return res.status(200).send(cards);
    })
    .catch((err) => res.status(400).send(err))
);

module.exports = getCards;
