const mongoose = require('mongoose'),
    config = require('../config/db.config')

//DB URI
const dbUri = `mongodb://${config.host}:${config.port}/${config.db}`

// Function to connect to DB connection
function connectDB() {
    mongoose.connect(dbUri, { useNewUrlParser: true })
}

//Function to disconnect the DB connection
function disconnectDB() {
    mongoose.disconnect(dbUri)
}

//Listener events
mongoose.connection.on("open", function() {
    console.log("Connected to Database (MongoDB) ");
});

mongoose.connection.on("error", function() {
    console.log("error in Database (MongoDB) connections");
});

mongoose.connection.on("disconnected", function() {
    console.log("Mongoose default connection disconnected");
});

process.on("SIGINT", function() {
    mongoose.connection.close(function() {
        console.log("Database (MongoDB) disconnected through app termination");
        process.exit(0);
    });
});

// exports
module.exports = {
    connectDB: connectDB,
    disconnectDB: disconnectDB
}