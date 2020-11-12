const express = require('express');
const imgRouter = require('../controllers/imgController');

const router = express.Router();

router.route('/:filename').get(imgRouter.getImg);

module.exports = router;
