const MovieRepository = require('../repositories/MovieRepository');
const MovieService = require('../services/MovieService');
const MovieController = require('../controllers/MovieController');

function createMovieRepository() {
  return new MovieRepository();
}

function createMovieService() {
  return new MovieService({
    repository: createMovieRepository()
  });
}

function createMovieController() {
  return new MovieController ({
    service: createMovieService(),
  })
};

module.exports = {
  createMovieRepository,
  createMovieService,
  createMovieController
};
