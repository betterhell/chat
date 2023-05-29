const {MongoClient} = require("mongodb");

const DB_URL = 'mongodb://localhost:27017/ChatDB';

let dbConnection

module.exports = {
    connectToDb: (cb) => {
        MongoClient
            .connect(DB_URL)
            .then((client) => {
                console.log('Connected to MongoDB')
                dbConnection = client.db()

                return cb()
            })
            .catch((error) => {
                return cb(error)
            })
    },
    getDb: () => dbConnection
}