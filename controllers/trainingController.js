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
    res.status(404).json({
      status: 'fail',
    });
    return console.log(err);
  }
};

exports.getTraining = async (req, res) => {
  try {
    console.log(req.body.id);
    const training = await Training.findById(req.params.id);
    return res.status(200).json({
      status: 'succes',
      data: {
        training,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
    });
    return console.log(err);
  }
};

exports.createTraining = async (req, res) => {
  const newTraining = new Training(req.body);
  try {
    await newTraining.save();
  } catch (err) {
    res.status(404).json({
      status: 'fail',
    });
  }
  return res.status(200).json({
    status: 'succes',
    data: {
      newTraining,
    },
  });
};
