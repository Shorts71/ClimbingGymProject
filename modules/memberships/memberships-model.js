const mongoose = require('mongoose');

const MembershipSchema = new mongoose.Schema({
    name: { type: String , required: true },
    duration: { type: Number, required: true },
    cost: { type: Number, required: true, min: 0, default: 0 },
    rentalInclusion: { type: Boolean, required: true, default: false }
})

const MembershipModel = new mongoose.model("Membership", MembershipSchema, "Memberships");

module.exports = MembershipModel;