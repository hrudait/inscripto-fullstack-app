const mongoose = require('mongoose')
const user = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    remainingUses: Number,
    emailVerified: Boolean,
    subscription:String,
},{collection:'userlogins'})

module.exports = mongoose.model('User',user)

