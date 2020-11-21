const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name Required!'],
    unique: true,
  },
  intensity: {
    type: Number,
    required: true,
  },
  duration: { type: Number, required: true },
  color: { type: String, required: true },
  exercises: {
    type: [
      {
        name: { type: String, required: true },
        reps: { type: Number, required: true },
        vid: { type: String, required: true },
      },
    ],
    required: true,
  },
  img: { type: String, required: true },
  mainFocus: { type: String, required: true },
});

const Training = mongoose.model('Training', trainingSchema);
module.exports = Training;
