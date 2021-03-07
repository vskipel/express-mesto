const mongoose = require('mongoose'); // подключаем mongoose

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator: (avatar) => /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!]))?/.test(avatar),
      message: (props) => `${props.value} — некорректная ссылка`,
    },
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
