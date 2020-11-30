// ---------- OBSOLETE -------

//Run to populate db
//hey, SebDev here. will make this smarter. just wait :D
//Nailed it - SebDev
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Grid = require('gridfs-stream');

dotenv.config({ path: './config.env' });
const dbURI = process.env.DATABASE.replace('USER', process.env.USER).replace(
  'PASSWORD',
  process.env.PASSWORD
);
//modify things -----here------
//filename MUST NOT have any spaces in it.
//MUST have the extension ie: ".jpg"
const filename = '2a.jpg';
const yourPath = './assets/thumb/';
// ------here------
//this is magic, don't try to understand it, it will consume you
const conn = mongoose.createConnection(dbURI);
conn.once('open', () => {
  const gfs = Grid(conn.db, mongoose.mongo);
  gfs.exist({ filename: filename }, (err, found) => {
    if (!found) {
      console.log(' ------- \n Writing \n------');
      const writestream = gfs.createWriteStream({
        filename: filename,
      });
      fs.createReadStream(yourPath + filename)
        .pipe(writestream)
        .on('close', () => {
          console.log('----- \n It is done! \n ------');
          conn.close();
        });
    } else {
      console.log(' ----- \n File already exists \n ----');
      conn.close();
    }
  });
});
