import { MoviesGalleryContainer } from 'components/MoviesGalleryList/MoviesGalleryList.styled';
import MovieGalleryItem from 'components/MovieGalleryItem/MovieGalleryItem';

const MoviesGalleryList = ({ movies }) => {
  return (
    <>
      <MoviesGalleryContainer>
        {movies.map(movie => (
          <MovieGalleryItem key={movie.id} movie={movie} />
        ))}
      </MoviesGalleryContainer>
    </>
  );
};

export default MoviesGalleryList;
