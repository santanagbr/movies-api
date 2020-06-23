const { MongoClient } = require('mongodb');
const mongoURI = require('../../../../configs/database');

const database = 'movie-store'
async function getMongoConnection() {
  return MongoClient.connect(mongoURI.url);
}

// function closeMongoConnection() {}

class MovieRepository {
  constructor(){
    this.collection = 'movies'
  }

  async get(filters = {}) {
    const connection = await getMongoConnection();
    const db = connection.db(database);

    const movies = await db.collection(this.collection).find({});

    return movies.toArray()
  }

  async post(movies) {
    const connection = await getMongoConnection();
    const db = connection.db(database);

    console.log(connection)
    await db.collection(this.collection).insertMany(movies);
  }
}

module.exports = MovieRepository;
