import dom from '../dom.js';
import updateMovie from '../../apis/updateMovie.js';
import createMovie from '../components/createMovie.js';
import postMovies from '../../apis/postMovie.js';

const postMovieHandler = async (e) => {
  e.preventDefault();

  // Get input values
  const newMovie = {
    title: dom.titleInput.value,
    src: dom.sourceInput.value,
    year: dom.year.value || '2023', // Set a default year if empty
  };

  // Validate inputs
  if (!newMovie.title || !newMovie.src) {
    showErrorMessage('Please add movie title and source');
    return;
  }

  // Handle different button states
  if (dom.btn.innerText.toLowerCase() === 'add movie') {
    // Add a new movie
    const addedMovie = await postMovies(newMovie);
    if (addedMovie) {
      const movieElement = createMovie(addedMovie);
      dom.movies.prepend(movieElement);
    }
  } else {
    // Edit an existing movie
    const selectedElement = document.querySelector('.selected');
    if (selectedElement) {
      const movieId = Number(selectedElement.id);
      updateMovieDetails(selectedElement, newMovie);
      await updateMovie(movieId, newMovie);
      dom.btn.innerText = 'Add Movie'; // Reset button text
    }
  }

  // Reset input fields
  resetInputFields();
};

// Helper function to display an error message temporarily
function showErrorMessage(message) {
  dom.error.innerText = message;
  dom.error.classList.add('err');
  setTimeout(() => {
    dom.error.classList.remove('err');
    dom.error.innerText = '';
  }, 2000);
}

// Helper function to update movie details
function updateMovieDetails(element, movieData) {
  element.querySelector('img').src = movieData.src;
  element.querySelector('h5').innerText = movieData.title;
}

// Helper function to reset input fields
function resetInputFields() {
  dom.titleInput.value = '';
  dom.sourceInput.value = '';
  dom.year.value = '';
}

export default postMovieHandler;
