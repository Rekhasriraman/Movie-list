const sortMovies = (movies) => {
    return movies.slice().sort((a, b) => b.id - a.id);
};export default sortMovies;