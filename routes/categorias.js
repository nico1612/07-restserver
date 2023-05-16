import {Router} from 'express'
import {check} from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos.js';

export const routerCategoria=Router()

//obtener todos los productos
routerCategoria.get('/',(res,req)=>{
    req.json('get')
})

//obtener un solo producto
routerCategoria.get('/:id',(res,req)=>{
    req.json('get id')
})

//crear
routerCategoria.post('/',(res,req)=>{
    req.json('post')
})

routerCategoria.put('/:id',(res,req)=>{
    req.json('put id')
})

routerCategoria.delete('/:id',(res,req)=>{
    req.json('delete id')
})