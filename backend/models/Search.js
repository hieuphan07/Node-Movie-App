const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');
const Movies = require('./Movies');

module.exports = class Search {
	static searchMovies(search, cb) {
		Movies.fetchAll((movies) => {
			if (search) {
				const parsedMovies = JSON.parse(movies);

				const searchedMovies = parsedMovies.filter((movie) => {
					const title = movie.title?.toLowerCase() || movie.name?.toLowerCase();
					const overview = movie.overview?.toLowerCase();
					const keywords = search.toLowerCase();

					if (title?.includes(keywords) || overview?.includes(keywords)) {
						return movie;
					}
				});

				cb(searchedMovies);
			} else {
				cb([{ status_code: 400, message: 'Not found keyword parram' }]);
			}
		});
	}
};
