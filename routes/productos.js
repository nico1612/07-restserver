import { Router } from "express"
import { check } from "express-validator"

import { validarJWT } from "../middlewares/validar-jwt.js"
import { esAdminRole } from "../middlewares/validar-roles.js"
import { validarCampos } from "../middlewares/validar-campos.js"
import { actualizarCategoria, borrarCategoria, crearProducto, obtenerProducto, obtenerProductos } from "../controllers/productos.js"
import { existeCategoriaPorId, existeProductoPorId } from "../helpers/db-validators.js"

export const routerProducto=Router()

//obtener todos los productos
routerProducto.get('/',obtenerProductos)

//obtener un solo producto
routerProducto.get('/:id',[
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
],obtenerProducto)

//crear
routerProducto.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de Mongo').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
],crearProducto)

routerProducto.put('/:id',[
    validarJWT,
    //check('categoria','No es un id de Mongo').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
],actualizarCategoria)

routerProducto.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
],borrarCategoria)