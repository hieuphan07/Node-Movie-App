import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  Fragment,
} from "react";
import ApiContext from "../store/api-context";

import classes from "./banner.module.css";

const Banner = () => {
  const apiCtx = useContext(ApiContext);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(null);
  const [movieData, setMovieData] = useState({});

  // Function fetch movie data
  const fetchMoviesData = async () => {
    setIsLoading(true);
    const response = await fetch(
      `${apiCtx.baseUrl}${apiCtx.requests.fetchNetflixOriginals}`
    );
    if (!response.ok) throw new Error("Something went wrong!");
    const data = await response.json();
    return data;
  };

  // Function get movie data and assign random movie data
  const getMovieData = useCallback(async () => {
    const result = await fetchMoviesData();
    setMovieData(
      result.results[Math.floor(Math.random() * result.results?.length - 1)]
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getMovieData()
      .catch((err) => setHasError(err.message))
      .finally(() => setIsLoading(false));
  }, [getMovieData]);

  return (
    <Fragment>
      {/* Start loading */}
      {isLoading && (
        <div className={classes.loading}>
          <p>Loading...</p>
        </div>
      )}
      {/* Finish loading but fail fetching */}
      {!isLoading && hasError && (
        <div className={classes.loading}>
          <p>{hasError}</p>
        </div>
      )}
      {/* Successfully fetch */}
      {!isLoading && !hasError && (
        <div className={classes.banner}>
          <img
            className={classes.img}
            src={
              movieData["backdrop_path"] === null
                ? apiCtx.backdropDefault
                : `${apiCtx.imgUrl}${movieData["backdrop_path"]}`
            }
            alt="movie banner"
          />
          <div className={classes.wrapper}>
            <h1 className={classes.title}>
              {movieData["titile"] || movieData["name"]}
            </h1>
            <div className={classes.buttons}>
              <button>Play</button>
              <button>My list</button>
            </div>
            <p className={classes.overview}>
              {movieData["overview"] === ""
                ? apiCtx.overviewDefault
                : movieData["overview"]}
            </p>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Banner;
