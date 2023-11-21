import React from "react";

const ApiContext = React.createContext({
  API_KEY: "",
  baseUrl: "",
  imgUrl: "",
  backdropDefault: "",
  overviewDefault: "",
  requests: {
    fetchTrending: "",
    fetchNetflixOriginals: "",
    fetchTopRated: "",
    fetchActionMovies: "",
    fetchComedyMovies: "",
    fetchHorrorMovies: "",
    fetchRomanceMovies: "",
    fetchDocumentaries: "",
    fetchSearch: "",
  },
});

export default ApiContext;
