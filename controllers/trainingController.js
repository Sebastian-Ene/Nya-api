const Training = require('../models/trainingModel');

exports.getAllTrainings = async (req, res) => {
  try {
    const trainings = await Training.find();
    res.status(200).json({
      status: 'succes',
      data: {
        trainings,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
    });
  }
};

exports.getTraining = async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);
    if (!training) throw Error('No training at this id');
    res.status(200).json({
      status: 'succes',
      data: {
        training,
      },
    });
  } catch (err) {
    await res.status(404).json({
      status: 'fail',
    });
  }
};

exports.createTraining = async (req, res) => {
  try {
    const newTraining = await Training.create(req.body);
    res.status(201).json({
      status: 'succes',
      data: {
        newTraining,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      error: err,
    });
  }
};
