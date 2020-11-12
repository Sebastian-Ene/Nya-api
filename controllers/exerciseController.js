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
    return res.status(404).json({
      status: 'fail',
    });
  }
};

exports.getExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) throw Error('No exercise at this id boi');
    res.status(200).json({
      status: 'succes',
      data: {
        exercise,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: 'fail',
    });
  }
};

exports.createExercise = async (req, res) => {
  const newExercise = new Exercise(req.body);
  try {
    await newExercise.save();
    return res.status(200).json({
      status: 'success',
      data: {
        newExercise,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: 'fail',
    });
  }
};
