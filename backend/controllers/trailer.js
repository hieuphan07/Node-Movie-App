const Trailer = require('../models/Trailer');
const pagination = require('../utils/paging');

exports.getTrailer = (req, res, next) => {
	const videoId = req.query.id || 760104;

	Trailer.findTrailerById(videoId, (trailerOrTeaser) => {
		if (trailerOrTeaser?.message) {
			if (trailerOrTeaser['status_code'] === 404) {
				res.status(404).send(trailerOrTeaser.message);
			} else if (trailerOrTeaser['status_code'] === 400) {
				res.status(400).send(trailerOrTeaser.message);
			}
		} else {
			res.status(200).json({
				status: 'success',
				result: trailerOrTeaser || {
					message: 'Not found match trailer of teaser',
				},
			});
		}
	});
};
