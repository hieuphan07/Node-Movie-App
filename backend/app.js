const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const port = 5050;

// Import routes
const movieRouters = require('./routes/movie');
const trailerRouters = require('./routes/trailer');
const searchRouters = require('./routes/search');
const errorRoutes = require('./routes/404');

// Import middleware
const authorization = require('./middleware/auth');

// Setting
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(
	cors({
		origin: '*',
	})
);
// Allow request from different local host address
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
	next();
});

// Check priority auth
app.use(authorization);

// Routes
app.use('/api/movies', movieRouters);
app.use('/api/movies', trailerRouters);
app.use('/api/movies', searchRouters);
app.use(errorRoutes);

// Listening
app.listen(port, () => console.log(`Server listening ${port}`));
