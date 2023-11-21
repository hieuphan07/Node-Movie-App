const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');

// Import path data
const moviesListPath = path.join(rootDir, 'data', 'movieList.json');
const genreListPath = path.join(rootDir, 'data', 'genreList.json');

const getMoviesFromFile = (cb) => {
	fs.readFile(moviesListPath, (error, fileContent) => {
		if (error) {
			cb([]);
		} else {
			cb(fileContent);
		}
	});
};

module.exports = class Movies {
	static fetchAll(cb) {
		getMoviesFromFile(cb);
	}

	static getMoviesByCategory(category, cb) {
		fs.readFile(genreListPath, (error, fileContent) => {
			if (!error) {
				if (category === null) {
					cb([{ status_code: 400, message: 'Not found gerne parram' }]);
				} else {
					const parsedFileContent = JSON.parse(fileContent);
					const genre = parsedFileContent.find(
						(type) => type.name.toLowerCase() === category.toLowerCase()
					);
					if (!genre) {
						cb([{ status_code: 404, message: 'Not found that gerne id' }]);
					} else {
						getMoviesFromFile((movies) => {
							const parsedMovies = JSON.parse(movies);
							const categoryMovies = parsedMovies.filter((movie) => {
								const n = movie['genre_ids'].length;
								for (let i = 0; i < n; i++) {
									if (movie['genre_ids'][i] === genre.id) {
										return movie;
									}
								}
							});
							cb(categoryMovies);
						});
					}
				}
			}
		});
	}
};
