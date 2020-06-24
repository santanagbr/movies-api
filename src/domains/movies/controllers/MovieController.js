const httpStatusCode = require('http-status-codes');

const errorLauncher = require('../../../error-handler/ErrorLauncher');

class MovieController {
  constructor({ service }) {
    this.service = service
  }

  async get(req, res) {
    try {
      const movies = await this.service.get(req.query);
  
      res.status(httpStatusCode.OK);
      res.send(movies);
      res.end();
    } catch (err) {
      errorLauncher(res, err);
    }
  }

  async post(req, res) {
    try {
      const movies = req.body;

      await this.service.post(movies);

      res.status(httpStatusCode.OK);
      res.end();
    } catch (err) {
      errorLauncher(res, err);
    }
  }
}

module.exports = MovieController;