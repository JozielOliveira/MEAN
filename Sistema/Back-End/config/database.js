const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
module.exports = mongoose.connect('mongodb://localhost/db_finance',{useMongoClient : true})
