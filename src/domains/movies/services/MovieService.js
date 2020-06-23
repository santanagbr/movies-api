const { uniqBy } = require('lodash');
const errors = require('../../../error-handler')

class MovieService {
  constructor({ repository }) {
    this.repository = repository
  }

  async get(filters = {}) {
    const movies = await this.repository.get();

    if(!movies.length) {
      throw errors.movies.notFound()
    }
  }

  async post(movies) {
    const uniqueMovies = await this.removeDuplicated(movies);
    if(!uniqueMovies.length) {
      throw errors.movies.duplicated()
    };

    await this.repository.post(uniqueMovies);
  }

  async removeDuplicated(movies) {
    const savedMovies = await this.repository.get();

    const filteredMovies = uniqBy(movies, 'name'); // try to remove lodash

    const uniqueMovies = filteredMovies.map((movie) => {
      return savedMovies.find((savedMovie) => {
        const sanitezedSavedMovieName = this.sanitizeMovieName(savedMovie.name);
        const sanitezedMovieName = this.sanitizeMovieName(movie.name);

        return sanitezedMovieName !== sanitezedSavedMovieName
      })
    }).filter(filteredMovie => !!filteredMovie);

    return uniqueMovies;
  }

  sanitizeMovieName(movieName) {
    return movieName
      .replace(/\s/g,'')
      .toLowerCase();
  }
}

module.exports = MovieService;
