const { uniqBy } = require('lodash');
const { duplicatedMovie } = require('../../../error-handler')

class MovieService {
  constructor({ repository }) {
    this.repository = repository
  }

  async get(filters = {}) {
    return this.repository.get();
  }

  async post(movies) {
    try {
      const uniqueMovies = await this.removeDuplicated(movies);
      if(!uniqueMovies.length) {
        throw duplicatedMovie.error
      };

      await this.repository.post(uniqueMovies);
    } catch (err) {
      console.error(`Error to post movies: ${err.message}`);
    }
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
