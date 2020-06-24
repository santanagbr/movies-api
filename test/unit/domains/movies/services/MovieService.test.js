const { createMovieService } = require('../../../../../src/domains/movies/factories');
const errors = require('../../../../../src/error-handler/errors');
const { movies } = require('../../../../../src/error-handler/errors');

describe.only('MovieService', () => {
  const moviesMock = [
    { 
      name: 'John Wick',
      cast: [
      'Keanu Reeves',
      'Michael Nyqvist',
      'Alfie Allen',
      'Adrianne Palicki',
      'Bridget Moynahan'
    ],
    director: 'Chad Stahelski',
    release_date: '2014-09-19',
    censure_level: 'CENSURADO'
    }
  ];

  describe('get', () => {
    test('Should get movies', async () => {
      const dependencies = {
        repository: {
          get: jest.fn().mockResolvedValue(moviesMock)
        },
      };

      const movieService = createMovieService(dependencies);
      const movies = await movieService.get();

      expect(movies).toEqual(moviesMock);
    });

    test('Should throw error if repository don\'t return movies', async () => {
      const dependencies = {
        repository: {
          get: jest.fn().mockResolvedValue([])
        },
      };

      const movieService = createMovieService(dependencies);

      let movies = []
      try {
        movies = await movieService.get();
      } catch (err) {
        expect(err).toEqual(errors.movies.notFound());
      }
    })
  });

  describe('post', () => {
    test('Should post movies', async () => {
      const dependencies = {
        repository: {
          post: jest.fn()
        },
      };

      const movieService = createMovieService(dependencies);
      movieService.removeDuplicated = jest.fn().mockResolvedValue(moviesMock);

      await movieService.post(moviesMock)

      expect(dependencies.repository.post).toHaveBeenCalledWith(moviesMock)
    });

    test('Should call method to remove duplicated movies', async () => {
      const dependencies = {
        repository: {
          post: jest.fn()
        },
      };

      const movieService = createMovieService(dependencies);
      movieService.removeDuplicated = jest.fn().mockResolvedValue(moviesMock);

      await movieService.post(moviesMock)

      expect(movieService.removeDuplicated).toHaveBeenCalledWith(moviesMock)
    })
  
    test('Should throw error if movies already exists', async () => {
      const dependencies = {
        repository: {
          post: jest.fn()
        },
      };

      const movieService = createMovieService(dependencies);
      movieService.removeDuplicated = jest.fn().mockResolvedValue([]);

      try {
        await movieService.post(moviesMock)
      } catch (err) {
        expect(err).toEqual(errors.movies.duplicated());
      }
    })
  })

  describe('removeDuplicated', async () => {
    test.only('Should remove duplicated movies', async () => {
      const duplicatedMoviesMock = [...moviesMock, ...moviesMock]
      const dependencies = {
        repository: {
          get: jest.fn().mockResolvedValue(moviesMock)
        },
      };

      const movieService = createMovieService(dependencies);

      const moviesWithoutDuplicatedValues = await movieService.removeDuplicated(moviesMock);

      expect(moviesWithoutDuplicatedValues).toEqual(moviesMock);
    })
    test('Should return [] when movie already exists on DB')
  })
});
