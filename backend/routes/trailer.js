const express = require('express');
const router = express.Router();

// Import trailer controllers
const trailerControllers = require('../controllers/trailer');

router.get('/video', trailerControllers.getTrailer);

module.exports = router;
