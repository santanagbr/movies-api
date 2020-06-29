const validateMoviesModel = require('../../../../../src/domains/movies/middlewares/MovieModelValidator');

describe('validateMoviesModel', () => {
  beforeEach(() => {
    this.reqMock = {
      body: jest.fn()
    }
    this.resMock = {
      status: jest.fn(),
      send: jest.fn(),
      end: jest.fn()
    }
    this.nextMock = jest.fn()
  })

  test('Should call next when model is accepted', () => {
    const movie = [{
      name: 'John Wick - Middleware test',
      cast: [
        'Keanu Reeves',
        'Michael Nyqvist',
        'Alfie Allen',
        'Adrianne Palicki',
        'Bridget Moynahan'
      ],
      director: 'Chad Stahelski',
      release_date: '1999-03-14',
      censure_level: 'CENSURADO'
    }];

    this.reqMock.body = movie;

    validateMoviesModel(this.reqMock, this.resMock, this.nextMock)

    expect(this.nextMock).toHaveBeenCalled()
  });

  test('Should return error if exists not allowed properties', () => {
    const movie = [{
      name: 'John Wick - Middleware test',
      cast: [
        'Keanu Reeves',
        'Michael Nyqvist',
        'Alfie Allen',
        'Adrianne Palicki',
        'Bridget Moynahan'
      ],
      director: 'Chad Stahelski',
      release_date: '1999-03-14',
      censure_level: 'CENSURADO',
      first_car: 'Ford Mustang Boss 429'
    }];

    const expectedError = { code: 'MOV03', messages: ['Properties: [first_car] are not allowed.'] };

    this.reqMock.body = movie;

    validateMoviesModel(this.reqMock, this.resMock, this.nextMock);

    expect(this.resMock.status).toHaveBeenCalledWith(400);
    expect(this.resMock.send).toHaveBeenCalledWith(expectedError);
  });

  test('Should return error if properties are missing', () => {
    const movie = [{
      name: 'John Wick - Middleware test',
      cast: [
        'Keanu Reeves',
        'Michael Nyqvist',
        'Alfie Allen',
        'Adrianne Palicki',
        'Bridget Moynahan'
      ],
      director: 'Chad Stahelski',
      release_date: '1999-03-14'
    }];

    const expectedError = { code: 'MOV03', messages: ['Missing properties: [censure_level].'] };

    this.reqMock.body = movie;

    validateMoviesModel(this.reqMock, this.resMock, this.nextMock);

    expect(this.resMock.status).toHaveBeenCalledWith(400);
    expect(this.resMock.send).toHaveBeenCalledWith(expectedError);
  });

  test('Should return error if exists not allowed types on properties', () => {
    const movie = [{
      name: 1,
      cast: [
        'Keanu Reeves',
        'Michael Nyqvist',
        'Alfie Allen',
        'Adrianne Palicki',
        'Bridget Moynahan'
      ],
      director: 'Chad Stahelski',
      release_date: '1999-03-14',
      censure_level: 'CENSURADO',
    }];

    const expectedError = { code: 'MOV03', messages: ['1 not allowed - "name" must be a string.'] };

    this.reqMock.body = movie;

    validateMoviesModel(this.reqMock, this.resMock, this.nextMock);

    expect(this.resMock.status).toHaveBeenCalledWith(400);
    expect(this.resMock.send).toHaveBeenCalledWith(expectedError);
  })
});
