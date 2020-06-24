const httpStatusCode = require('http-status-codes');

class MovieController {
  constructor({ service, errorLauncher }) {
    this.service = service,
    this.errorLauncher = errorLauncher
  }

  async get(req, res) {
    try {
      const movies = await this.service.get(req.query);
  
      res.status(httpStatusCode.OK);
      res.send(movies);
      res.end();
    } catch (err) {
      this.errorLauncher(res, err);
    }
  }

  async post(req, res) {
    try {
      const movies = req.body;

      await this.service.post(movies);

      res.status(httpStatusCode.ACCEPTED);
      res.end();
    } catch (err) {
      this.errorLauncher(res, err);
    }
  }
}

module.exports = MovieController;