const express = require('express'); // импортируем экспресс
const bodyParser = require('body-parser'); //подключаем мидлвар для парсинга JSON в body
const mongoose = require('mongoose'); // подключаем mongoose
const path = require('path'); // модуль, чтобы формировать путь до папки
const usersRouter = require('./routes/users.js'); // пользовательский роутер
const cardsRouter = require('./routes/cards.js');
const errorRouter = require('./routes/error.js');

const app = express(); // добавляем экспресс в приложение

const PORT = 3000;

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('!!! Connected to DB'))

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()) //подключаем мидлвэр
app.use((req, res, next) => {
  req.user = {
    _id: '60420f05cdd774449f79f2eb' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('/', errorRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
