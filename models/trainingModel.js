const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name!'],
    unique: true,
  },
  intensity: {
    type: Number,
    required: true,
  },
  duration: { type: Number, required: true },
  color: { type: String, required: true },
  exercises: { type: Array, required: true },
});

const Training = mongoose.model('Training', trainingSchema);
module.exports = Training;
