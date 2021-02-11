const express = require('express'); // импортируем экспресс
const path = require('path'); // модуль, чтобы формировать путь до папки
const usersRouter = require('./routes/users.js'); // пользовательский роутер
const cardsRouter = require('./routes/cards.js');
const errorRouter = require('./routes/error.js');

const app = express(); // добавляем экспресс в приложение

const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('/', errorRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
