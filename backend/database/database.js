const mongoose = require('mongoose');

const mongoString = process.env.MONGO_CONNECTION_STRING
const databaseName = process.env.MONGO_DATABASE_NAME

const connectToDatabase = async () => {
    try {
        await mongoose.connect(`${mongoString}/${databaseName}`);
        console.log('Connected to database');
    } catch (error) {
        console.log('Error connecting to database');
    }
}

module.exports = connectToDatabase;