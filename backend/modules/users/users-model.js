const mongoose = require('mongoose');
const { encodePassword } = require("../../shared/password-utils");

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    address: String,
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now() },
    roles: {type: String, enum: ["customer", "staff", "seller", "admin"], default: "customer", required: true },
    },
    { versionKey: false }
)

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = encodePassword(this.password);
  next();
});

const userModel = new mongoose.model("User", userSchema, "Users");

module.exports = userModel;