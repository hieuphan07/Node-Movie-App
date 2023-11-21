import React from 'react';
import ApiContext from './api-context';

const ApiProvider = ({ children }) => {
	// Variable for fetching from Web API
	const API_KEY = '82fda72a10a05ae9e6a1ca8df530832d';
	const baseUrl = 'https://api.themoviedb.org/3';
	const imgUrl = 'https://image.tmdb.org/t/p/w500';

	// Locally variable for fetching from backend Node JS
	const localUrl = 'http://localhost:5050';
	const localApiKey = 'RYoOcWM4JW';

	const backdropDefault =
		'https://img.freepik.com/free-vector/film-strip-with-light-effect-cinema-background_1017-38171.jpg?w=360';

	const overviewDefault =
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae veniam dolor, ea vel, beatae, at eos et aut inventore ullam dolorum deleniti fugiat temporibus? Quasi incidunt delectus et aliquam veniam.';

	const requests = {
		fetchNetflixOriginals: `/api/movies/discover?token=${localApiKey}&category=tv%20movie`,
		fetchTrending: `/api/movies/trending?token=${localApiKey}`,
		fetchTopRated: `/api/movies/top-rate?token=${localApiKey}`,
		fetchActionMovies: `/api/movies/discover?token=${localApiKey}&category=action`,
		fetchComedyMovies: `/api/movies/discover?token=${localApiKey}&category=comedy`,
		fetchHorrorMovies: `/api/movies/discover?token=${localApiKey}&category=horror`,
		fetchRomanceMovies: `/api/movies/discover?token=${localApiKey}&category=romance`,
		fetchDocumentaries: `/api/movies/discover?token=${localApiKey}&category=documentary`,
		fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
	};
	return (
		<ApiContext.Provider
			value={{
				API_KEY,
				baseUrl,
				imgUrl,
				backdropDefault,
				overviewDefault,
				requests,
				localUrl,
				localApiKey,
			}}
		>
			{children}
		</ApiContext.Provider>
	);
};

export default ApiProvider;
