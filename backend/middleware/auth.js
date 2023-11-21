const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');
const { error } = require('console');

router.use((req, res, next) => {
	const token = req.headers['Authorization'] || req.query.token;
	const userTokenPath = path.join(rootDir, 'data', 'userToken.json');
	fs.readFile(userTokenPath, (error, fileContent) => {
		if (error) {
			res.status(500).send('Server error');
			return;
		}
		const users = JSON.parse(fileContent);
		const user = users.find((user) => user.token === token);

		if (!user) {
			res.status(401).send('Unauthorized');
			return;
		}

		next();
	});
});

module.exports = router;
