const mongoose = require('mongoose');

let dbConnection = null;

function connectToDatabase(URL) {

    if (!dbConnection) {

        dbConnection = mongoose.connect(URL, {});

        mongoose.connection.on('connected', () => {
            console.log("MongoDB connected successfully...!");
        });

        mongoose.connection.on('error', (err) => {
            console.error(`MongoDB connection error: ${err}`);
        });
    }
    return dbConnection;
}

module.exports = connectToDatabase;