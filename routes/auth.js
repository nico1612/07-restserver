import {Router} from 'express'
import {check} from 'express-validator'
import { login } from '../controllers/auth.js'

export const routerAuth=Router()

routerAuth.post('/login',login );