import React from 'react';
import styles from './MovieList.module.css';

const MovieList = ({ movies, onMovieClick }) => {
  return (
    <div className={styles.movieList}>
      {movies.map((movie) => (
        <div key={movie.imdbID} className={styles.movieItem} onClick={() => onMovieClick(movie.imdbID)}>
          <img src={movie.Poster} alt={movie.Title} className={styles.moviePoster} />
          <h2 className={styles.movieTitle}>{movie.Title}</h2>
          <p className={styles.movieYear}>{movie.Year}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
