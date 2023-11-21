const express = require("express")
const cors = require("cors");
const { dbConnection } = require('../database/config')

class Server {
    constructor() {
        this.app = express()
        this.port = 27017 || process.env.PORT;
        this.usuarios_path = "/api/usuarios"
        this.products_path = "/api/products" 
        this.auth_path = "/api/auth"
        this.order_path = "/api/order"
        this.conectDb()
        this.middlewares()
        this.routes()
    }
    async conectDb() {
        try {
           return await dbConnection()
        } catch (error) {
            throw new Error("No se pudo iniciar la base de datos",error)
        }
    }
    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static("public"))
    }
    routes() {
        this.app.use(this.usuarios_path, require('../routes/usuarios'))
        this.app.use(this.products_path, require('../routes/products'))
        this.app.use(this.auth_path, require('../routes/auth'))
        this.app.use(this.order_path, require('../routes/order'))
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Se esta ejecutando en el puerto ${this.port}`);
        })
    }
}

module.exports = Server