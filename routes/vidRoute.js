const express = require('express');

const router = express.Router();

router.route('/').post(() => {});
router.route('/:id').get(() => {});

module.exports = router;
