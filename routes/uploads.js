import {Router} from 'express'
import {check} from 'express-validator'

import { validarCampos } from '../middlewares/validar-campos.js';
import { cargarArchivos } from '../controllers/uploads.js';

export const routerUploads=Router()

routerUploads.post('/',cargarArchivos)