const request = require('supertest');

const app = require('../../../src/index');

describe('Movies - Register and get movies', (done) => {
  this.movie = [{
    name: 'John Wick - Functional test',
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
  }]

  test('Should register movie on DB', (done) => {
    request(app)
      .post('/movies')
      .send(this.movie)
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toEqual(202)
        done();
      })
  });

  test('Should get registered movie', (done) => {
    request(app)
      .get('/movies')
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toEqual(200)
        delete response.body[0]._id
        expect(response.body).toEqual(this.movie)
        done();
      })
  });
});
