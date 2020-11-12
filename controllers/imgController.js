const fs = require('fs');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const Img = require('../models/imgModel');

exports.getAllImg = async (req, res) => {
  try {
    const images = await Img.find();
    res.status(200).json({
      status: 'succes',
      data: {
        images,
      },
    });
  } catch (err) {
    res.status(404);
    console.log(err);
  }
};

exports.getImg = async (req, res) => {
  try {
    const conn = mongoose.createConnection('mongodb://localhost:27017/nya');
    conn.once('open', function () {
      const gfs = Grid(conn.db, mongoose.mongo);
      gfs.files.findOne({ filename: req.params.id }, (err, file) => {
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      });
    });
  } catch (err) {
    res.status(404);
    console.log(err);
  }
};

exports.createImg = async (req, res) => {
  const img = fs.readFileSync(`./assets/thumb/${req.body.image}`, 'base64');
  const newImg = new Img({ name: req.body.name, image: img });
  try {
    await newImg.save();
  } catch (err) {
    return res.status(404).json({
      status: 'fail',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      newImg,
    },
  });
};
