module.exports = pagination = (data, page = 1, pageSize = 10, sortText) => {
	const parsedPage = parseInt(page);
	const parsedPageSize = parseInt(pageSize);

	const totalPages = Math.ceil(data.length / parsedPageSize);
	const cappedPage = Math.max(1, Math.min(parsedPage, totalPages));
	const offset = (cappedPage - 1) * parsedPageSize;
	const end = offset + parsedPageSize;

	let sortedResults = data;

	if (sortText) {
		data.sort((a, b) => b[sortText] - a[sortText]);
	}

	return {
		moviesData: sortedResults.slice(offset, end),
		totalPages,
	};
};
