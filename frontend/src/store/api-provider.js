import React from "react";
import ApiContext from "./api-context";

const ApiProvider = ({ children }) => {
  const API_KEY = "82fda72a10a05ae9e6a1ca8df530832d";
  const baseUrl = "https://api.themoviedb.org/3";
  const imgUrl = "https://image.tmdb.org/t/p/w500";
  const backdropDefault =
    "https://img.freepik.com/free-vector/film-strip-with-light-effect-cinema-background_1017-38171.jpg?w=360";

  const overviewDefault =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae veniam dolor, ea vel, beatae, at eos et aut inventore ullam dolorum deleniti fugiat temporibus? Quasi incidunt delectus et aliquam veniam.";

  const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
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
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
