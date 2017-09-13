const mongoose = require('mongoose')
mongoose.Promise = Promise;
module.exports = mongoose.connect('mongodb://localhost/db_finance', {useMongoClient: true})
