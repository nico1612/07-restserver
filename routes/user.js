import {Router} from 'express'
import {check} from 'express-validator'

import { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } from '../controllers/usuarios.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { emailExiste, esRolValido,existeUsuarioPorId } from '../helpers/db-validators.js';

export const router=Router()

router.get('/', usuariosGet)

router.put('/:id',[
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('password', 'el password debe ser más de 6 letras').isLength({min:6}),
    check('correo','el correo no es valido').isEmail(),
    check('rol','El rol no es un rol valido').isIn(['ADMIN_ROL','USER_ROL']),
    check('rol').custom(esRolValido),
    check('correo').custom(emailExiste),
    validarCampos
], usuariosPut)

router.post('/',[
    check('id','El nombre es obligatorio'),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost )

router.delete('/:id',[
    check('id','El nombre es obligatorio'),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete )

router.patch('/', usuariosPatch )

