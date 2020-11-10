const Exercise = require('../models/exerciseModel');

exports.getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).json({
      status: 'succes',
      data: {
        exercises,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
    });
    return console.log(err);
  }
};

exports.getExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    res.status(200).json({
      status: 'succes',
      data: {
        exercise,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
    });
    return console.log(err);
  }
};

exports.createExercise = async (req, res) => {
  const newExercise = new Exercise(req.body);
  try {
    await newExercise.save();
  } catch (err) {
    res.status(404).json({
      status: 'fail',
    });
  }

  return res.status(200).json({
    status: 'success',
    data: {
      newExercise,
    },
  });
};
