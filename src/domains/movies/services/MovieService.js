const { uniqBy } = require('lodash');

const errors = require('../../../error-handler/errors')

class MovieService {
  constructor({ repository }) {
    this.repository = repository
  }

  async get(filters = {}) {
    const movies = await this.repository.get(filters);

    if (!movies.length) {
      throw errors.movies.notFound()
    }

    return movies
  }

  async post(movies) {
    const uniqueMoviesToSave = await this.removeDuplicated(movies);
    if(!uniqueMoviesToSave.length) {
      throw errors.movies.duplicated()
    };

    await this.repository.post(uniqueMoviesToSave);
  }

  async removeDuplicated(movies) {
    const savedMovies = await this.repository.get();
    const savedMoviesNames = savedMovies.map(movie => movie.name);

    const moviesToSave = uniqBy(movies, 'name');

    const uniqueMoviesToSave = moviesToSave
      .map(movieToSave => !this.checkMovieExistance(movieToSave.name, savedMoviesNames) ? movieToSave : undefined)
      .filter(movie => !!movie);

    return uniqueMoviesToSave;
  }
  
  checkMovieExistance(movieName, savedMoviesNames) {
    const sanitezedMoviesNames = savedMoviesNames
      .map(savedMoviesNames => this.sanitizeMovieName(savedMoviesNames));

    const exists = sanitezedMoviesNames.includes(this.sanitizeMovieName(movieName));

    return exists;
  }

  sanitizeMovieName(movieName) {
    return movieName
      .replace(/\s/g,'')
      .toLowerCase();
  }

}

module.exports = MovieService;
