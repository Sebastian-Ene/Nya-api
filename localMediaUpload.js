//Run to populate db
//hey, SebDev here. will make this smarter. just wait :D

const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Grid = require('gridfs-stream');

dotenv.config({ path: './config.env' });
const dbURI = process.env.DATABASE.replace('USER', process.env.USER).replace(
  'PASSWORD',
  process.env.PASSWORD
);
//modify things here
//filename MUST NOT have any spaces in it.
//MUST have the extension ie: ".jpg"
const filename = 'v2.mp4';
const yourPath = './assets/video/';

//this is magic, don't try to understand it, it will consume you
const conn = mongoose.createConnection(dbURI);
conn.once('open', async function () {
  const gfs = Grid(conn.db, mongoose.mongo);
  const writestream = gfs.createWriteStream({
    filename: filename,
  });
  await fs.createReadStream(yourPath + filename).pipe(writestream);
  console.log('It is done!');
});
