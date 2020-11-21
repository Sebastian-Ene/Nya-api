const Training = require('../models/trainingModel');

exports.getAllTrainings = async (req, res) => {
  try {
    //build query

    //filter
    const queryObj = { ...req.query };
    const excludeFields = ['sort', 'page', 'limit'];
    excludeFields.forEach((el) => delete queryObj[el]);
    let query = Training.find(queryObj);
    //sorting
    query = query.sort(req.query.sort);

    //pagination
    const page = req.query.page * 1 - 1;
    const limit = req.query.limit * 1;
    query = query.skip(page * limit).limit(limit);

    //if an empty page is requested return 404 page not found
    if (req.query.page) {
      const numTraining = await Training.countDocuments();
      if (numTraining <= page * limit) throw new Error('Page not found!');
    }

    //exclude __v
    query = query.select('-__v');

    //execute query
    const trainings = await query;

    // sending res
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
