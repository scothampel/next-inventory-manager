const { MongoClient } = require("mongodb");

// DbConnection class for managing db connection
export default class DbConnection {
  static db
  // Get established db connection. Create one if it's undefined
  static getConnection = () => {
    if (!db) {
      this.connect()
    }
    return this.db
  }

  static connect = async () => {
    // Mongo options for reconnecting
    // This should prevent the need to reopen the connection manually after server start
    const options = {
      reconnectInterval: 1000,
      reconnectTries: Number.MAX_VALUE
    }

    try {
      const client = new MongoClient(process.env.MONGO_URI, options)
      await client.connect()
      // Set static db var to connection db instance
      this.db = client.db(proccess.env.MONGO_DB)
    } catch (err) {
      console.error(err, 'DB connection failed')
    }
  }
}