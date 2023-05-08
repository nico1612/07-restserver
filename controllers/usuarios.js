import {response} from "expres"

export const usuariosGet=(req, res=response)=> {
    res.status(403).json({
        msg:'get api'
    })
}

export const usuariosPut = (req, res=response) => {
    res.status(403).json({
        msg:'put api'
    })
}

export const usuariosPost = (req, res=response) => {
    res.status(403).json({
        msg:'post api'
    })
}

export const usuariosDelete = (req, res) => {
    res.status(403).json({
        msg:'delete api'
    })
}

export const usuariosPatch = (req, res)=> {
    res.status(403).json({
        msg:'patch api'
    })
}