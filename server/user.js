const mongoose = require('mongoose')
const CSV = require('./csv')
const user = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    remainingUses: Number,
    emailVerified: Boolean,
    customerId:String,
    csvs:[String],
},{collection:'userlogins'})

module.exports = mongoose.model('User',user)

