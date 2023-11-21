import React from 'react';

const ApiContext = React.createContext({
	API_KEY: '',
	baseUrl: '',
	imgUrl: '',
	backdropDefault: '',
	overviewDefault: '',
	localUrl: '',
	localApiKey: '',
	requests: {
		fetchTrending: '',
		fetchNetflixOriginals: '',
		fetchTopRated: '',
		fetchActionMovies: '',
		fetchComedyMovies: '',
		fetchHorrorMovies: '',
		fetchRomanceMovies: '',
		fetchDocumentaries: '',
		fetchSearch: '',
		fetchTrailer: '',
	},
});

export default ApiContext;
