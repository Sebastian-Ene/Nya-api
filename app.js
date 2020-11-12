const express = require('express');
const morgan = require('morgan');
const trainingRouter = require('./routes/trainingsRoute');
const exerciseRouter = require('./routes/exercisesRoute');
const imgRouter = require('./routes/imgRoute');

const app = express();
app.use(morgan('dev'));

app.use(express.json());

app.use('/nya/api/v1/trainings', trainingRouter);
app.use('/nya/api/v1/exercises', exerciseRouter);
app.use('/nya/api/v1/img', imgRouter);
app.use('/nya/api/v1/vid', () => {});

module.exports = app;
