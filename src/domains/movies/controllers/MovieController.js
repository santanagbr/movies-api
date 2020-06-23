const httpStatusCode = require('http-status-codes');

class MovieController {
  constructor({ service }) {
    this.service = service
  }

  async get(req, res) {
    try {
      const movies = await this.service.get();
  
      res.status(httpStatusCode.OK);
      res.send(movies);
      res.end();
    } catch (err) {
      res.status(err.statusCode);
      res.send({ message: err.message });
    }
  }

  async post(req, res) {
    try {
      const movies = req.body;

      await this.service.post(movies);

      res.status(httpStatusCode.OK);
      res.end();
    } catch (err) {
      res.status(err.statusCode);
      res.send({ message: err.message });
    }
  }
}

module.exports = MovieController;