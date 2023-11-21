const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');

// Import path data
const videoListPath = path.join(rootDir, 'data', 'videoList.json');

module.exports = class Trailer {
	static findTrailerById(id, cb) {
		fs.readFile(videoListPath, (err, fileContent) => {
			if (!err) {
				const parsedFileContent = JSON.parse(fileContent);
				if (id) {
					const resultById = parsedFileContent.find((curr) => curr.id === id);

					if (resultById) {
						const videos = resultById.videos;
						const officalVideos = videos.filter(
							(video) => video.official === true
						);
						const youtubeVideos = officalVideos.filter(
							(video) => video.site === 'YouTube'
						);
						const trailers = youtubeVideos
							.filter((video) => video.type === 'Trailer')
							.sort((a, b) => b['published_at'] - a['published_at']);
						const teasers = youtubeVideos
							.filter((video) => video.type === 'Teaser')
							.sort((a, b) => b['published_at'] - a['published_at']);

						cb(trailers[0] || teasers[0]);
						// return cb(videos);
					} else {
						cb({ status_code: 404, message: 'Not found video' });
					}
				} else {
					cb({ status_code: 400, message: 'Not found film_id parram' });
				}
			}
		});
	}
};
