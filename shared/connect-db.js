const mongoose = require('mongoose');

// Connection String: mongodb+srv://Tyler:Kayano25@cluster0.cej20lq.mongodb.net/

const dbUrl = process.env.DB_URL;

async function connectDB(req, res, next) {
    try {
        await mongoose.connect(dbUrl, { dbName: "PeakClimbingGym"})
        console.log("Database connected.");
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send("Database connection failed.");
    }
}

module.exports = connectDB;