const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: String,
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now() }
})

const CustomerModel = new mongoose.model("Customer", CustomerSchema);

module.exports = CustomerModel;