const { MongoClient } = require('mongodb');

const errors = require('../../../error-handler/errors');
const mongoURI = require('../../../../configs/database');

class MovieRepository {
  constructor() {
    this.database = 'movie-store';
    this.collection = 'movies';
  };

  async get(filters = {}) {
    const connection = await this.getDatabaseConnection();
    const db = connection.db(this.database);
    const collection = await db.collection(this.collection);

    const movies = await collection.find(filters).toArray();

    await this.closeDatabaseConnection(connection);

    return movies;
  }

  async post(movies) {
    const connection = await this.getDatabaseConnection();
    const db = connection.db(this.database);

    await db.collection(this.collection).insertMany(movies);
    this.closeDatabaseConnection(connection)
  }

  async getDatabaseConnection() {
    try {
      const databaseConnection = await MongoClient.connect(mongoURI.url);
  
      return databaseConnection;
    } catch (err){
      throw errors.database.connectionFail()
    }
  }
  
  async closeDatabaseConnection(connection) {
    await connection.close();
  }
}

module.exports = MovieRepository;
