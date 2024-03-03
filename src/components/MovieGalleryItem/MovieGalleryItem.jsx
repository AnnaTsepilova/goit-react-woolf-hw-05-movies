import { useLocation } from 'react-router-dom';
import {
  MovieGalleryCard,
  LinkWrapper,
  MoviePoster,
  Description,
  MovieTitle,
  MovieDateRelease,
} from 'components/MovieGalleryItem/MovieGalleryItem.styled';

const MovieGalleryItem = ({ movie }) => {
  const location = useLocation();
  let moviePosterSrc = require('services/no-poster.png');
  if (movie.poster_path) {
    moviePosterSrc = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  }

  return (
    <>
      <MovieGalleryCard>
        <LinkWrapper to={`/movies/${movie.id}`} state={{ from: location }}>
          <MoviePoster src={moviePosterSrc} alt={movie.title} width={270} />
          <Description>
            <MovieTitle>{movie.title}</MovieTitle>
            <MovieDateRelease>
              Release date: {new Date(movie.release_date).toLocaleDateString()}
            </MovieDateRelease>
          </Description>
        </LinkWrapper>
      </MovieGalleryCard>
    </>
  );
};

export default MovieGalleryItem;
