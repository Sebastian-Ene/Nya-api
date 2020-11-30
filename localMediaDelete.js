// ------ OBOSOLETE-------

const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

dotenv.config({ path: './config.env' });
const dbURI = process.env.DATABASE.replace('USER', process.env.USER).replace(
  'PASSWORD',
  process.env.PASSWORD
);

//modify things --here--
//filename from the db
const filename = '2a.jpg';
//-------here-------
const checkAndDel = (Filename) => {
  const conn = mongoose.createConnection(dbURI);
  conn.once('open', () => {
    const gfs = Grid(conn.db, mongoose.mongo);
    let exists = false;
    //check
    gfs.exist({ filename: Filename }, (err, found) => {
      if (found) exists = true;
      else console.log('---------- \n File not Found! \n -----');
      if (exists) {
        //delete
        console.log('---------- \n Deleting \n -----');
        gfs.remove(
          {
            filename: Filename,
          },
          (erro) => {
            conn.close();
            console.log('---------- \n Succes \n -----');
          }
        );
      } else conn.close();
    });
  });
};

checkAndDel(filename);
