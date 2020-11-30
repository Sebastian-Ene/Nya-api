const S3 = require('aws-sdk/clients/s3');
const Training = require('../models/trainingModel');
// Set a new instance of the service
const s3 = new S3({
  apiVersion: '2006-03-01',
  region: 'eu-central-1',
});

async function mediaUrl(key) {
  try {
    const params = { Bucket: 'nya', Key: key, Expires: 60 };
    const url = await s3.getSignedUrlPromise('getObject', params);
    return url;
  } catch (err) {
    return 'Gone bad';
  }
}

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
    const dbtrainings = await query;
    //add imageLink
    const trainings = await Promise.all(
      dbtrainings.map(async (el) => {
        el.imgLink = await mediaUrl(`img/${el.imgName}`);
        return el;
      })
    );

    // sending res
    res.status(200).json({
      status: 'succes',
      data: {
        trainings,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'fail',
    });
  }
};

exports.getTraining = async (req, res) => {
  try {
    const dbTraining = await Training.findById(req.params.id);
    if (!dbTraining) throw Error('No training at this id');
    // generate vidLink fo each video and update res object
    const exercisesArray = await Promise.all(
      dbTraining.exercises.map(async (el) => {
        el.vidLink = await mediaUrl(`vid/${el.vidName}`);
        return el;
      })
    );
    const training = dbTraining;
    training.exercises = exercisesArray;

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
