import { response } from "express";

export const esAdminRole=(req,res=response,next)=>{

    if(!req.usuario){
        return req.status(500).json({
            msg:'Se requiere verificar el role sin validar el token primero'
        })
    }

    const {rol,nombre}=req.response

    if(rol !== "ADMIN_ROLE"){
        return res.status(401).json({
            msg:`${nombre} no es administrador - no puede hacer esto`
        })
    }

    next()
}

export const tieneRol=(...roles)=>{
    
    return(req,res=response,next)=>{

        if(!req.usuario){
            return req.status(500).json({
                msg:'Se requiere verificar el role sin validar el token primero'
            })
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg:`El servicio requiere uno de estos roles ${roles}`
            })
        }
        next()
    }
}