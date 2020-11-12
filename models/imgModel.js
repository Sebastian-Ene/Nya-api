const mongoose = require('mongoose');

const imgSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'img need name!'],
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Img = mongoose.model('Img', imgSchema);
module.exports = Img;
