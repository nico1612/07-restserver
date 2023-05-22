import {Router} from 'express'
import {check} from 'express-validator'

import { validarJWT } from '../middlewares/validar-jwt.js';
import { actualizarCategoria, borrarCategoria, crearCategoria, obtenerCategoria, obtenerCategorias } from '../controllers/categorias.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { existeCategoriaPorId } from '../helpers/db-validators.js';
import { esAdminRole } from '../middlewares/validar-roles.js';

export const routerCategoria=Router()

//obtener todos los productos
routerCategoria.get('/',obtenerCategorias)

//obtener un solo producto
routerCategoria.get('/:id',[
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],obtenerCategoria)

//crear
routerCategoria.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria)

routerCategoria.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],actualizarCategoria)

routerCategoria.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],borrarCategoria)