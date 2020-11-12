//Run to populate db

const mongoose = require('mongoose');
const fs = require('fs');
const Grid = require('gridfs-stream');

// create or use an existing mongodb-native db instance.
// for this example we'll just create one:

const conn = mongoose.createConnection('mongodb://localhost:27017/nya');
conn.once('open', function () {
  const gfs = Grid(conn.db, mongoose.mongo);
  const writestream = gfs.createWriteStream({
    filename: 'vid1',
    content_type: 'video/mp4',
  });
  fs.createReadStream('./assets/video/v1.mp4').pipe(writestream);
});
