const express = require('express');

const router = express.Router();

router.route('/:filename').get(() => {});

module.exports = router;
