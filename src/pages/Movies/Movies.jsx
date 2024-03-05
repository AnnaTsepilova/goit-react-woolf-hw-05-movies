import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { MoviesGalleryWrapper } from 'pages/Home/Home.styled';
import { MoviesPageWrapper } from 'pages/Movies/Movies.styled';

import MoviesSearch from 'components/MoviesSearch/MoviesSearch';
import MoviesGalleryList from 'components/MoviesGalleryList/MoviesGalleryList';
import Loader from 'components/Loader/Loader';
import { getQueryMovies } from 'services/moviesApi';
import * as notify from 'services/notifications';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQueryParams = searchParams.get('query') || '';

  const handleFormSubmit = query => {
    setSearchQuery(query);

    const newSearchParams = searchQueryParams !== '' && { query };
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await getQueryMovies(searchQuery);
        setMovies(data.results);

        if (!data.results.length) {
          notify.notificationError(notify.NO_FOUND_MESSAGE);
        }
      } catch (error) {
        notify.notificationError(`${notify.ERROR_MESSAGE} ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [searchQuery]);

  return (
    <MoviesPageWrapper>
      <MoviesSearch onSubmit={handleFormSubmit} />
      <MoviesGalleryWrapper>
        {movies && <MoviesGalleryList movies={movies} />}
        {isLoading && <Loader />}
      </MoviesGalleryWrapper>
    </MoviesPageWrapper>
  );
};

export default Movies;
