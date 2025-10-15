const mongoose = require('mongoose');

const MembershipSchema = new mongoose.Schema({
    name: { type: String , required: true },
    duration: { type: Number, required: true },
    cost: { type: Number, required: true },
    rentalInclusion: { type: Boolean, required: true }
})

const MembershipModel = new mongoose.model("Membership", MembershipSchema);

module.exports = MembershipModel;