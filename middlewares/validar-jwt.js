import {request, response} from 'express'
import jwt from 'jsonwebtoken'

import { Usuario } from "../models/usuario.js";

export const validarJWT = async (req=request,res=response,next)=>{

    const token = req.header('x-token')

    if(!token){
        return res.status(401).json({
            msg:'no hay token en la petición'
        })
    }

    try{

        const {uid} =jwt.verify(token,process.env.SECRETORPRIVATEKEY)

        const usuario=await Usuario.findById(uid)

        if(!usuario){
            return res.status(401).json({
                msg:'token no valido - usuario no existe en la DB'
            })
        }
        if(!usuario.estado){
            return res.status(401).json({
                msg:'Token no valido- usuario con estado:false'
            })
        }
        req.usuario=usuario

        next()
    }
    catch(error){

        console.log(error)
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}
