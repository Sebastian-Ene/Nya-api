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
        vidName: { type: String, required: true },
        vidLink: { type: String, default: '' },
      },
    ],
    required: true,
  },
  imgName: { type: String, required: true },
  imgLink: { type: String, default: '' },
  mainFocus: { type: String, required: true },
});

const Training = mongoose.model('Training', trainingSchema);
module.exports = Training;
