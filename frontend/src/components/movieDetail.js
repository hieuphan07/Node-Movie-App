import React, { useState, useEffect, useCallback, useContext } from "react";
import YouTube from "react-youtube";
import ApiContext from "../store/api-context";

import classes from "./movieDetail.module.css";

const MovieDetail = ({ movie }) => {
  const apiCtx = useContext(ApiContext);
  const movieId = movie["id"];

  const [isLoading, setIsLoading] = useState(true);
  const [movieTrailer, setMovieTrailer] = useState({});
  const [hasError, setHasError] = useState(null);

  const opts = {
    width: "720",
    playerVars: {
      autoplay: 0,
    },
  };

  // Function fetch movie trailer
  const fetchMovieTrailer = async (id) => {
    setIsLoading(true);

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=82fda72a10a05ae9e6a1ca8df530832d`
    );
    if (!response.ok) throw new Error("Something went wrong!");
    const data = await response.json();
    return data;
  };

  // Function get movie trailer
  const getMovieTrailer = useCallback(async () => {
    const results = await fetchMovieTrailer(movieId);
    setMovieTrailer(
      results.results.find(
        (item) =>
          item.site === "YouTube" &&
          (item.type === "Trailer" || item.type === "Teaser")
      )
    );
  }, [movieId]);

  useEffect(() => {
    getMovieTrailer()
      .catch((err) => setHasError(err.message))
      .finally(() => {
        setIsLoading(false);
      });
  }, [getMovieTrailer]);

  return (
    <div className={classes.detailContainer}>
      <div className={classes.info}>
        <h3 className={classes.title}>{movie.name || movie.title}</h3>
        <span className={classes.date}>
          Release Date: {movie["first_air_date"] || movie["release_date"]}
        </span>
        <span className={classes.vote}>Vote: {movie["vote_average"]}/10</span>
        <p className={classes.overview}>{movie["overview"]}</p>
      </div>
      {!isLoading && (
        <div className={classes.video}>
          {/* Complete loading but occur error -> Show backdrop instead */}
          {(hasError ||
            (!hasError && movieTrailer === undefined) ||
            Object?.keys(movieTrailer).length === 0) && (
            <img
              src={
                movie["backdrop_path"] !== null
                  ? `${apiCtx.imgUrl}${movie["backdrop_path"]}`
                  : apiCtx.backdropDefault
              }
              alt="backdrop"
              style={{ width: "720px", height: "360px" }}
            />
          )}

          {/* Successfully fetch -> Show trailer video from YouTube */}
          {!hasError && movieTrailer !== undefined && (
            <YouTube videoId={movieTrailer["key"]} opts={opts} />
          )}
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
