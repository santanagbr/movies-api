const httpStatusCode = require('http-status-codes');

class MovieController {
  constructor({ service }) {
    this.service = service
  }

  async get(req, res) {
    const movies = await this.service.get();

    res.status(httpStatusCode.OK);
    res.send(movies);
    res.end();
  }

  async post(req, res) {
    const movies = req.body;

    await this.service.post(movies);

    res.status(httpStatusCode.OK);
    res.end();
  }
}

module.exports = MovieController;