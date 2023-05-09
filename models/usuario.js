import {Schema,model} from 'mongoose'

const UsuarioSchema= Schema({
    nombre:{
        type:String,
        require:[true,'El nombre debe ser obligatorio']
    },
    correo:{
        type:String,
        require:[true,'El correo debe ser obligatorio'],
        unique:true
    },
    password:{
        type:String,
        require:[true,'La contraseña debe ser obligatorio'],
    },
    img:{
        type:String,
    },
    rol:{
        type:String,
        require:true,
        emun:['ADMIN_ROL','USER_ROL']
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
})

export const Usuario= model("usuario",UsuarioSchema)