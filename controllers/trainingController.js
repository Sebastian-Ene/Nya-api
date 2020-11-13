const Training = require('../models/trainingModel');

exports.getAllTrainings = async (req, res) => {
  try {
    const trainings = await Training.find();
    return res.status(200).json({
      status: 'succes',
      data: {
        trainings,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: 'fail',
    });
  }
};

exports.getTraining = async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);
    if (!training) throw Error('No training at this id');
    return res.status(200).json({
      status: 'succes',
      data: {
        training,
      },
    });
  } catch (err) {
    return await res.status(404).json({
      status: 'fail',
    });
  }
};

exports.createTraining = async (req, res) => {
  const newTraining = new Training(req.body);
  try {
    await newTraining.save();
    return res.status(200).json({
      status: 'succes',
      data: {
        newTraining,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: 'fail',
    });
  }
};
