const mongoose = require('mongoose');

let dbConnection = null;

function connectToDatabase(dbUrl) {
    if (!dbConnection) {
        dbConnection = mongoose.connect(dbUrl, {});

        mongoose.connection.on('connected', () => {
            console.log("MongoDB connection successfully...!");
        });

        mongoose.connection.on('error', (err) => {
            console.error(`MongoDB connection error: ${err}`);
        });
    }
    return dbConnection;
}

module.exports = connectToDatabase;