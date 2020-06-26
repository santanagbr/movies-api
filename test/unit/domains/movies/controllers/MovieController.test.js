
const { createMovieController } = require('../../../../../src/domains/movies/factories');
const errors = require('../../../../../src/error-handler/errors');

describe('MovieController', () => {
  beforeEach(() => {
    this.dependencies = {
      service: {
        get: jest.fn(),
        post: jest.fn(),
      },
      errorLauncher: jest.fn()
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
    test('Should return movies', async () => {
      this.dependencies.service.get.mockResolvedValue(moviesMock);

      const reqMock = { query: {} };
      const resMock = { 
        status: jest.fn(),
        send:jest.fn(),
        end: jest.fn(),
      }


      const movieController = createMovieController(this.dependencies);
      await movieController.get(reqMock, resMock);

      expect(resMock.status).toHaveBeenCalledWith(200)
      expect(resMock.send).toHaveBeenCalledWith(moviesMock)
    });

    test('Should call error .', async () => {
      const serviceError = errors.movies.notFound();
      const reqMock = { query: {} };
      const resMock = { 
        status: jest.fn(),
        send:jest.fn(),
        end: jest.fn(),
      }

      this.dependencies.service.get.mockRejectedValue(serviceError)

      const movieController = createMovieController(this.dependencies);
      
      try {
        await movieController.get(reqMock, resMock);
      } catch(err) {
        expect(errorHandler).toHaveBeenCalledWith(resMock);
        expect(errorHandler).toHaveBeenCalledWith(err);
      }

    });
  });

  describe('post', () => {
    test('Should post movies', async () => {
      const reqMock = { body: moviesMock };
      const resMock = { 
        status: jest.fn(),
        send:jest.fn(),
        end: jest.fn(),
      }

      const movieController = createMovieController(this.dependencies);

      await movieController.post(reqMock, resMock);

      expect(resMock.status).toHaveBeenCalledWith(202)
    });

    test('Should respond 419 CONFLICT when service return duplicated error', async () => {
      const reqMock = { body: moviesMock };
      const resMock = { 
        status: jest.fn(),
        send:jest.fn(),
        end: jest.fn(),
      }
      
      const serviceError = errors.movies.duplicated();
      this.dependencies.service.post.mockRejectedValue(serviceError)

      const movieController = createMovieController(this.dependencies);

      try {
        await movieController.post(reqMock, resMock);
      } catch (err) {
        expect(errorLauncher).toHaveBeenCalledWith(err)
      }
    });
  });
});
