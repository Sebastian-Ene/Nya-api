const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

Grid.mongo = mongoose.mongo;
const dbURI = process.env.DATABASE.replace('USER', process.env.USER).replace(
  'PASSWORD',
  process.env.PASSWORD
);

//error handling for wrong filename needed here
exports.getMedia = async (req, res) => {
  try {
    const conn = mongoose.createConnection(dbURI);
    conn.once('open', async () => {
      const gfs = Grid(conn.db, mongoose.mongo);

      await gfs.files.findOne(
        { filename: req.params.filename },
        (err, file) => {
          const readstream = gfs.createReadStream(file.filename);
          readstream.on('error', () => {
            throw err;
          });
          readstream.pipe(res);
        }
      );
    });
  } catch (err) {
    return res.status(404);
  }
};
