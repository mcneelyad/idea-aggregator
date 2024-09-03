const mongoose = require('mongoose');

const mongoString = process.env.MONGO_CONNECTION_STRING
const databaseName = process.env.MONGO_DATABASE_NAME

mongoose.connect(`${mongoString}/${databaseName}`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', (err) => {
    if (err) {
        console.log('Error connecting to database');
    } 
});

module.exports = db;