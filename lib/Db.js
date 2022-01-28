const { MongoClient } = require("mongodb");

class Db {
  static connect = async () => {
    if (!Db.client) {
      try {
        const client = new MongoClient(process.env.MONGO_URI)
        await client.connect()
        // Set static db var to connection db instance
        Db.client = client
        console.log('Connected to DB')
      } catch (err) {
        console.error(err, 'DB connection failed')
      }
    }
    console.log("returned db")
    return Db.client
  }

}

module.exports = Db