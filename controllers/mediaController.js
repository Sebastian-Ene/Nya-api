const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

Grid.mongo = mongoose.mongo;
const dbURI = process.env.DATABASE.replace('USER', process.env.USER).replace(
  'PASSWORD',
  process.env.PASSWORD
);

//error handling for wrong filename needed here
exports.getMedia = (req, res) => {
  try {
    const conn = mongoose.createConnection(dbURI);
    conn.once('open', async () => {
      try {
        const gfs = Grid(conn.db, mongoose.mongo);
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } catch (err) {
        res.status(404).json({ status: 'YESSSS' });
      }
    });
  } catch (err) {
    res.status(404).json({ status: 'YESSSS' });
  }
};
