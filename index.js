require("dotenv").config()
const Server = require('./models/server')
const server = new Server()
server.listen(27017)
console.log ('server on port', 27017)