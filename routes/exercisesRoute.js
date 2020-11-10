const express = require('express');
const exerciseRouter = require('../controllers/exerciseController');

const router = express.Router();

router
  .route('/')
  .get(exerciseRouter.getAllExercises)
  .post(exerciseRouter.createExercise);
router.route('/:id').get(exerciseRouter.getExercise);

module.exports = router;
