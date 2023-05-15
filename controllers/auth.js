import { response } from "express";
import bcryptjs from 'bcryptjs'

import { Usuario } from "../models/usuario.js";

export const login = async (req,res=response)=>{

    const {correo,password}=req.body
    try{

        //verificar si el email existe
        const usuario =await Usuario.findOne({correo})
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario/password no son correctos - correo'
            })
        }

        //si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario/password no son correctos - estado:false'
            })
        }

        //verificar la contraseña
        const validPassword=bcryptjs.com
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        //generar el JWT

        res.json=({
            msg:'Login ok'
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
    
}