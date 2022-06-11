const express = require('express');
const router = express.Router();

router.use('/movies', require('./movie.js'));

router.use('/reviews', require('./review.js'));

router.use('/comments', require('./comment.js'));

module.exports = router;