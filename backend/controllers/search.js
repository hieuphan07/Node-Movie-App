const Search = require('../models/Search');
const pagination = require('../utils/paging');

exports.searchMovies = (req, res, next) => {
	let keywords = req.query.keywords;

	let pageSize = req.query.pageSize || 10;
	let page = req.query.page || 1;

	Search.searchMovies(keywords, (movies) => {
		const { moviesData, totalPages } = pagination(
			movies,
			page,
			pageSize,
			'popularity'
		);
		if (!moviesData[0]?.message) {
			res.status(200).json({
				status: 'success',
				results: moviesData,
				page: page,
				total_pages: totalPages,
			});
		} else {
			res.status(400).send(moviesData[0]?.message);
		}
	});
};
