import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import MovieModal from '../components/MovieModal';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const apiKey = 'a53aa33a'; 

  const fetchMovies = async (page, query) => {
    const response = await fetch(`https://www.omdbapi.com/?s=${query}&page=${page}&apikey=${apiKey}`);
    const data = await response.json();

    if (data.Search) {
      setMovies((prevMovies) => [...prevMovies, ...data.Search]);
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  };

  const fetchMovieDetails = async (imdbID) => {
    const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=${apiKey}`);
    const data = await response.json();
    setSelectedMovie(data);
    setModalOpen(true);
  };

  const handleSearch = (query) => {
    setQuery(query);
    setMovies([]);
    setPage(1);
    setHasMore(true);
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleMovieClick = (imdbID) => {
    fetchMovieDetails(imdbID);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMovie(null);
  };

  useEffect(() => {
    if (query === '') {
      fetchMovies(page, 'movie'); 
    } else {
      fetchMovies(page, query);
    }
  }, [page, query]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>omdbapi Search</h1>
      <SearchBar onSearch={handleSearch} />
      <MovieList movies={movies} onMovieClick={handleMovieClick} />
      {hasMore && <p>Loading more movies...</p>}
      {modalOpen && <MovieModal movie={selectedMovie} onClose={handleCloseModal} />}
    </div>
  );
};

export default Home;
