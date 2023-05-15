import {Router} from 'express'
import {check} from 'express-validator'
import { login } from '../controllers/auth.js'

export const routerAuth=Router()

routerAuth.post('/login',[
    check('correo','El correo es obligatorio').isEmpty(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login );