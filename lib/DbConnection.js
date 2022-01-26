const { MongoClient } = require("mongodb");

// DbConnection class for managing db connection
export default class DbConnection {
  static connection
  static uri = process.env.MONGO_URI
  
  // Get established db connection. Create one if it's undefined
  static getConnection = () => {
    if (!connection) {
      this.connect()
    }
    return this.connection
  }

  static connect = async () => {
    // Mongo options for reconnecting
    // This should prevent the need to reopen the connection manually after server start
    const options = {
      reconnectInterval: 1000,
      reconnectTries: Number.MAX_VALUE
    }

    try {
      const client = new MongoClient(uri, options)
      await client.connect()
      // Set static connection var to client instance
      this.connection = client
    } catch (err) {
      console.error(err, 'DB connection failed')
    }
  }
}