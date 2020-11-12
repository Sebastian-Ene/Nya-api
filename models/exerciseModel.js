const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name!'],
    unique: true,
  },
  reps: { type: Number, required: true },
  vid: { type: String, required: true },
});

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;
