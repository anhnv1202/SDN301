const mongoose = require('mongoose')
const Account = require("./AccountModel");

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    phone: { type: String },
    image: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: Boolean },
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' }
}, {
    timestamps: true
})
const Customer = mongoose.model('User', userSchema)
module.exports = Customer