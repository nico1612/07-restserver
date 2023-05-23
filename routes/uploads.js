import {Router} from 'express'
import {check} from 'express-validator'

import { validarCampos } from '../middlewares/validar-campos.js';
import { actualizarImagen, actualizarImagenCloudinary, cargarArchivos, mostrarImagen } from '../controllers/uploads.js';
import { coleccionesPermitidas } from "../helpers/db-validators.js"
import { validarArchivoSubir } from '../middlewares/validar-archivo.js';

export const routerUploads=Router()

routerUploads.post('/',validarArchivoSubir ,cargarArchivos)

routerUploads.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],actualizarImagenCloudinary)
//actualizarImagen)

routerUploads.get('/:coleccion/:id',[
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],mostrarImagen)