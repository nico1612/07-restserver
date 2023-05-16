import {Router} from 'express'
import {check} from 'express-validator'

import { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } from '../controllers/usuarios.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { emailExiste, esRolValido,existeUsuarioPorId } from '../helpers/db-validators.js';
//import { tieneRol,esAdminRole,validarCampos,validarJWT } from '../middlewares';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { esAdminRole,tieneRol } from '../middlewares/validar-roles.js';

export const router=Router()

router.get('/', usuariosGet)

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRolValido ), 
    validarCampos
], usuariosPut)

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRolValido ), 
    validarCampos
], usuariosPost )

router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    tieneRol('ADMIN_ROL', 'VENTAR_ROL','OTRO_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete )

router.patch('/', usuariosPatch )

