const express = require('express');
const imgRouter = require('../controllers/imgController');

const router = express.Router();

router.route('/').get(imgRouter.getAllImg).post(imgRouter.createImg);
router.route('/:id').get(imgRouter.getImg);

module.exports = router;
