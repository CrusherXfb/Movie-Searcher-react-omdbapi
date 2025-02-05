import React from 'react';
import styles from './MovieModal.module.css';

const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.modalBody}>
          <img src={movie.Poster} alt={movie.Title} className={styles.modalImage} />
          <div className={styles.modalDetails}>
            <h2>{movie.Title}</h2>
            <p>{movie.Year}</p>
            <p>{movie.Plot}</p>
            <p>Director: {movie.Director}</p>
            <p>Actors: {movie.Actors}</p>
            <p>Genre: {movie.Genre}</p>
            <p>Rated: {movie.Rated}</p>
            <p>Runtime: {movie.Runtime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
