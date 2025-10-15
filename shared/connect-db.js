const mongoose = require('mongoose');

// Connection String: 

const dbUrl = process.env.DB_URL;

async function connectDB(req, res, next) {
    try {
        await mongoose.connect(dbUrl, { dbName: "MyOnlineShoppingDB"})
        console.log("Database connected.");
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send("Database connection failed.");
    }
}

module.exports = connectDB;