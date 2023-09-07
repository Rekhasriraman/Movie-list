import dom from '../dom.js';
import getMovies from '../../apis/getMovies.js';
import createMovie from '../components/createMovie.js';
import sortMovies from '../utils/sortMovies.js';

const loadMovieHandler = async () => {
  try {
    const movies = await getMovies();

    if (movies) {
      const sortedMovies = sortMovies(movies);

      const movieElements = sortedMovies.map((movieData) => createMovie(movieData));

      dom.movies.innerHTML = ''; // Clear the container before appending
      dom.movies.append(...movieElements);
    }
  } catch (error) {
    console.error('Error loading movies:', error);
  }
};

export default loadMovieHandler;