const express = require('express');
const router = express.Router();

// Import controllers
const movieControllers = require('../controllers/movie');

// Routers
router.get('/trending', movieControllers.getTrending);

router.get('/top-rate', movieControllers.getTopRated);

router.get('/discover', movieControllers.getDiscover);

module.exports = router;
