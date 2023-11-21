import React, { useCallback, useContext, useEffect, useState } from "react";
import ApiContext from "../store/api-context";
import MovieDetail from "./movieDetail";

import classes from "./movieList.module.css";

const MovieList = ({ types, backdrop = true, request }) => {
  const apiCtx = useContext(ApiContext);

  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const [isClicked, setIsClicked] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({});

  // Function fetch movies
  const fetchMovies = async () => {
    setIsLoading(true);
    const reponse = await fetch(`${apiCtx.baseUrl}${request}`);
    const data = await reponse.json();
    return data;
  };

  // Funciton get movies
  const getMovies = useCallback(async () => {
    const results = await fetchMovies();
    setMovies(results.results);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function handle click movie
  const clickHandler = (index) => {
    const clickedItem = movies[index];

    if (isClicked === false) setIsClicked(true);

    if (clickedItem["id"] === selectedMovie["id"]) {
      setIsClicked(!isClicked);
    } else {
      setSelectedMovie(clickedItem);
    }
  };

  useEffect(() => {
    getMovies().finally(() => setIsLoading(false));
  }, [getMovies]);

  if (isLoading) {
    return (
      <div className={classes.loading}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <h4 className={classes.type}>{types}</h4>
      <ul className={classes.items}>
        {movies.map((item, index) => {
          const imageType = backdrop ? "backdrop_path" : "poster_path";

          const imgUrl =
            item[imageType] === null
              ? "https://img.freepik.com/free-vector/film-strip-with-light-effect-cinema-background_1017-38171.jpg?w=360"
              : `${apiCtx.imgUrl}${item[imageType]}`;

          const imgClasses = backdrop
            ? `${classes.backdrop}`
            : `${classes.poster}`;

          const itemClasses = `${classes.item} ${
            backdrop ? classes.two : classes.one
          }`;

          return (
            <li
              className={itemClasses}
              key={item.id}
              onClick={() => clickHandler(index)}
            >
              <img className={imgClasses} src={imgUrl} alt="poster" />
            </li>
          );
        })}
      </ul>
      {isClicked && <MovieDetail movie={selectedMovie} />}
    </div>
  );
};

export default MovieList;
