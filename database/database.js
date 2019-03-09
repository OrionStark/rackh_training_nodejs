const mongoose = require('mongoose')
const server_host = "127.0.0.1:27017"
const database_name = "rackh_training"

class Database {
    constructor() {
        this.openDBConnection()
    }
    /**
     * Open the database connection with Mongoose
     */
    openDBConnection() {
        mongoose.connect(`mongodb://${server_host}/${database_name}`)
        .then(() => {
            console.log("Database opened")
        })
        .catch((err) => {
            console.log(err)
        })
    }
}
module.exports = new Database()