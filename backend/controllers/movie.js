const Movies = require('../models/Movies');
const pagination = require('../utils/paging');

// Get trending movies
exports.getTrending = (req, res, next) => {
	let pageSize = req.query.pageSize || 10;
	let page = req.query.page || 1;
	Movies.fetchAll((movies) => {
		const parsedMovies = JSON.parse(movies);
		const { moviesData, totalPages } = pagination(
			parsedMovies,
			page,
			pageSize,
			'popularity'
		);
		res.status(200).json({
			results: moviesData,
			page: page,
			total_pages: totalPages,
		});
	});
};

// Get top rated movies
exports.getTopRated = (req, res, next) => {
	let pageSize = req.query.pageSize || 10;
	let page = req.query.page || 1;
	Movies.fetchAll((movies) => {
		const parsedMovies = JSON.parse(movies);
		const { moviesData, totalPages } = pagination(
			parsedMovies,
			page,
			pageSize,
			'vote_count'
		);
		res.status(200).json({
			results: moviesData,
			page: page,
			total_pages: totalPages,
		});
	});
};

// Get movies by category
exports.getDiscover = (req, res, next) => {
	const category = req.query.category ? req.query.category : null;
	let pageSize = req.query.pageSize || 10;
	let page = req.query.page || 1;

	Movies.getMoviesByCategory(category, (movies) => {
		const { moviesData, totalPages } = pagination(movies, page, pageSize);
		if (!moviesData[0].message) {
			res.status(200).json({
				status: 'success',
				results: moviesData,
				page: page,
				total_pages: totalPages,
				genre_name: category,
			});
		} else {
			if (moviesData[0]['status_code'] === 400) {
				res.status(400).send(moviesData[0]['message']);
			} else if (moviesData[0]['status_code'] === 404) {
				res.status(404).send(moviesData[0]['message']);
			}
		}
	});
};
