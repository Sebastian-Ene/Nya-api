// ------ OBSOLETE --------

const express = require('express');
const mediaRouter = require('../controllers/mediaController');

const router = express.Router();

router.route('/:filename').get(mediaRouter.getMedia);

module.exports = router;
