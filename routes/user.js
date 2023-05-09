import {Router} from 'express'
import {check} from 'express-validator'

import { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } from '../controllers/usuarios.js';
import { validarCampos } from '../middlewares/validar-campos.js';

export const router=Router()

router.get('/', usuariosGet)

router.put('/:id',[
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('password', 'el password debe ser más de 6 letras').isLength({min:6}),
    check('correo','el correo no es valido').isEmail(),
    check('rol','El rol no es un rol valido').isIn(['ADMIN_ROL','USER_ROL']),
    validarCampos()
], usuariosPut)

router.post('/', usuariosPost )

router.delete('/', usuariosDelete )

router.patch('/', usuariosPatch )

