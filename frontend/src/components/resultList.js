import React, { useState, Fragment, useContext } from "react";
import ApiContext from "../store/api-context";
import MovieDetail from "./movieDetail";

import classes from "./resultList.module.css";

const ResultList = ({ searchMovies }) => {
  const apiCtx = useContext(ApiContext);

  const [isClicked, setIsClicked] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({});

  // Function handle click movie
  const clickHandler = (index) => {
    const clickedItem = searchMovies[index];

    if (isClicked === false) setIsClicked(true);

    if (clickedItem["id"] === selectedMovie["id"]) {
      setIsClicked(!isClicked);
    } else {
      setSelectedMovie(clickedItem);
    }
  };

  return (
    <Fragment>
      <h3 className={classes.type}>Search Result</h3>
      {isClicked && searchMovies.length !== 0 && (
        <MovieDetail movie={selectedMovie} />
      )}
      {searchMovies.length !== 0 && (
        <div className={classes.searchContainer}>
          <ul className={classes.items}>
            {searchMovies.map((item, index) => {
              return (
                <li
                  className={classes.item}
                  key={item.id.toString()}
                  onClick={() => clickHandler(index)}
                >
                  <img
                    className={classes.image}
                    src={
                      item["poster_path"] !== null
                        ? `${apiCtx.imgUrl}${item["poster_path"]}`
                        : apiCtx.backdropDefault
                    }
                    alt="poster"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </Fragment>
  );
};

export default ResultList;
