import React, { useContext } from "react";

import NavBar from "../../components/navBar";
import Banner from "../../components/banner";
import MovieList from "../../components/movieList";
import ApiContext from "../../store/api-context";

function Browse() {
  const apiCtx = useContext(ApiContext);

  return (
    <div className="home">
      {/* Nav Bar */}
      <NavBar />
      {/* Banner */}
      <Banner />
      {/* Movie List */}
      <MovieList
        types="Originals"
        backdrop={false}
        request={apiCtx.requests.fetchNetflixOriginals}
      />
      <MovieList types="Xu hướng" request={apiCtx.requests.fetchTrending} />
      <MovieList types="Đánh giá cao" request={apiCtx.requests.fetchTopRated} />
      <MovieList
        types="Hành động"
        request={apiCtx.requests.fetchActionMovies}
      />
      <MovieList types="Hài hước" request={apiCtx.requests.fetchComedyMovies} />
      <MovieList
        types="Lãng mạn"
        request={apiCtx.requests.fetchRomanceMovies}
      />
      <MovieList types="Kinh dị" request={apiCtx.requests.fetchHorrorMovies} />
      <MovieList
        types="Tài liệu"
        request={apiCtx.requests.fetchDocumentaries}
      />
    </div>
  );
}

export default Browse;
