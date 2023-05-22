import express from 'express'
import cors from 'cors'

import {router} from '../routes/user.js';
import { dbConnection } from '../database/config.js';
import { routerAuth} from '../routes/auth.js'
import {routerCategoria} from '../routes/categorias.js'
import { routerProducto } from '../routes/productos.js';
import { routerBuscar } from '../routes/buscar.js';
import { routerUploads } from '../routes/uploads.js';
import fileUpload from 'express-fileupload';

export class Server{

    constructor(){
        this.app = express()
        this.port=process.env.PORT
        this.path={
            auth:      '/api/auth',
            buscar:    '/api/buscar',
            categorias:'/api/categorias',
            productos: '/api/productos',
            usuarios:  '/api/usuarios',
            uploads:   '/api/uploads'
        }

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

        //Lectura y parseo del body
        this.app.use((express.json()))

        //directorio publico
        this.app.use( express.static('public') );

        //fileUpload - carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
        
    }

    routes(){
        this.app.use( this.path.auth,routerAuth);
        this.app.use( this.path.buscar,routerBuscar);
        this.app.use( this.path.categorias,routerCategoria);
        this.app.use( this.path.productos,routerProducto);
        this.app.use(this.path.usuarios, router);
        this.app.use(this.path.uploads, routerUploads)
;
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en el puerto ' , this.port)
        })
    }

}