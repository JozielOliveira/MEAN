const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
module.exports = mongoose.connect('mongodb://localhost/db_finance',{useMongoClient : true})

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatorio."
mongoose.Error.messages.Number.min = "O '{VALUE}' é menor que o mínimo '{MIN}'."
mongoose.Error.messages.Number.max = "O '{VALUE}' é maior que o máximo '{MAX}'."
mongoose.Error.messages.String.enum = "O '{VALUE}' não é válido para o atributo '{PATH}'."
