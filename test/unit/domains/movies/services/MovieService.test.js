const { createMovieService } = require('../../../../../src/domains/movies/factories');
const errors = require('../../../../../src/error-handler/errors');
const { movies } = require('../../../../../src/error-handler/errors');

describe('MovieService', () => {
  beforeEach(() => {
    this.dependencies = {
      repository: {
        get: jest.fn(),
        post: jest.fn(),
      },
    }
  });

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
      this.dependencies.repository.get.mockResolvedValue(moviesMock);

      const movieService = createMovieService(this.dependencies);
      const movies = await movieService.get();

      expect(movies).toEqual(moviesMock);
    });

    test('Should throw error if repository don\'t return movies', async () => {
      this.dependencies.repository.get.mockResolvedValue([])

      const movieService = createMovieService(this.dependencies);

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
      const movieService = createMovieService(this.dependencies);
      movieService.removeDuplicated = jest.fn().mockResolvedValue(moviesMock);

      await movieService.post(moviesMock)

      expect(this.dependencies.repository.post).toHaveBeenCalledWith(moviesMock)
    });

    test('Should call method to remove duplicated movies', async () => {
      const movieService = createMovieService(this.dependencies);
      movieService.removeDuplicated = jest.fn().mockResolvedValue(moviesMock);

      await movieService.post(moviesMock)

      expect(movieService.removeDuplicated).toHaveBeenCalledWith(moviesMock)
    })
  
    test('Should throw error if movies already exists', async () => {
      const movieService = createMovieService(this.dependencies);
      movieService.removeDuplicated = jest.fn().mockResolvedValue([]);

      try {
        await movieService.post(moviesMock)
      } catch (err) {
        expect(err).toEqual(errors.movies.duplicated());
      }
    })
  })

  describe('removeDuplicated', async () => {
    test('Should remove duplicated movies', async () => {
      const duplicatedMoviesMock = [...moviesMock, ...moviesMock]
      this.dependencies.repository.get.mockResolvedValue([])

      const movieService = createMovieService(this.dependencies);

      const moviesWithoutDuplicatedValues = await movieService.removeDuplicated(duplicatedMoviesMock);

      expect(moviesWithoutDuplicatedValues).toEqual(moviesMock);
    });

    test('Should return an empty array when movie already exists on DB')
  })
});
