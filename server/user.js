const mongoose = require('mongoose')
const CSV = require('./csv')
const user = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phoneNumber: String,
    remainingUses: Number,
    phoneVerified: Boolean,
    customerId:String,
    currentcsvs:[String],
    pastcsvs:[String],
},{collection:'userlogins'})

module.exports = mongoose.model('User',user)

