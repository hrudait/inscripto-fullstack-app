const mongoose = require('mongoose')
const csv = new mongoose.Schema({
    name:String,
    location:String,
    date:Date,
    status:Number,
    url:String,
},{collection:'csvs'})

module.exports = mongoose.model('CSV',csv)

