module.exports = pagination = (data, page = 1, pageSize = 10, sortText) => {
	const totalResults = data.length;
	const totalPages = Math.ceil(totalResults / pageSize);
	const startResultFromPage = (page - 1) * pageSize;
	let sortedResults;
	let finalResults;

	if (sortText) {
		sortedResults = data.sort((a, b) => b[sortText] - a[sortText]);
	} else {
		sortedResults = data;
	}

	if (page >= totalPages) {
		finalResults = sortedResults.splice((totalPages - 1) * pageSize, pageSize);
	} else if (page < 1) {
		finalResults = sortedResults.splice(0, pageSize);
	} else {
		finalResults = sortedResults.splice(startResultFromPage, pageSize);
	}

	return {
		moviesData: finalResults,
		totalPages,
	};
};
