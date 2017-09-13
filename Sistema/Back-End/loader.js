//Create server
const server =  require('./config/server')
//Create conection of DataBase
require('./config/database')

require('./config/routes')(server)