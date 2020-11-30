const express = require('express');
const morgan = require('morgan');
const trainingRouter = require('./routes/trainingsRoute');
const mediaRouter = require('./routes/mediaRoute');

const app = express();
app.use(morgan('dev'));

app.use(express.json());

app.use('/nya/api/v1/trainings', trainingRouter);

// ------ OBSOLETE -------
app.use('/nya/api/v1/media', mediaRouter);

module.exports = app;
