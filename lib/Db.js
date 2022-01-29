const { MongoClient } = require("mongodb");

class Db {
  static connect = async () => {
    if (!Db.db) {
      try {
        const client = new MongoClient(process.env.MONGO_URI)
        await client.connect()
        // Set static db var to connection db instance
        Db.db = client.db(process.env.MONGO_DB)
        console.log('Connected to DB')
      } catch (err) {
        console.error(err, 'DB connection failed')
      }
    }
    return Db.db
  }

}

module.exports = Db