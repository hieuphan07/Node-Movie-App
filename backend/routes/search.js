const express = require('express');
const router = express.Router();

// Import search controllers
const searchControllers = require('../controllers/search');

router.get('/search', searchControllers.searchMovies);

module.exports = router;
