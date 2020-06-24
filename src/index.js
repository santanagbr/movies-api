const express = require('express')
const bodyParser = require('body-parser');

const packageJson = require('../package.json');
const { createMovieController } = require('./domains/movies/factories');
const validateMoviesModel = require('./domains/movies/middlewares/MovieModelValidator');

const app = express()
const port = 3000

const movieController = createMovieController();

function healthCheck(req, res) {
  const { name, version } = packageJson;

  res.send({
    name,
    version
  })
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res, next) => healthCheck(req, res));
app.get('/movies', (req, res) => movieController.get(req, res));
app.post('/movies',
  (req, res, next) => validateMoviesModel(req, res, next),
  (req, res) => movieController.post(req, res)
);

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`))
