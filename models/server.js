import express from 'express'
import cors from 'cors'
import {router} from '../routes/user.js';
import { dbConnection } from '../database/config.js';
import { routerAuth} from '../routes/auth.js'

export class Server{

    constructor(){
        this.app = express()
        this.port=process.env.PORT
        this.usuariosPath='/api/usuarios'
        this.authPath='/api/auth';

        //middlewares
        this.middlewares()

        //conectar a la base de datos
        this.conectarDB()

        // Lectura y parseo del body
        this.app.use( express.json() );

        //rutas de mi apliacion
        this.routes()
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){

        //CORS
        this.app.use(cors())
        //directorio publico
        this.app.use( express.static('public') );
    }

    routes(){
        this.app.use( this.authPath,routerAuth);
        this.app.use(this.usuariosPath, router)
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en el puerto ' , this.port)
        })
    }
}