import {Role} from '../models/rol.js'
import {Usuario} from '../models/usuario.js'


export const esRolValido =async(rol='')=>{
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

export const emailExiste = async (correo='')=>{
    //verificar si el usuario existe
    const existeMail= await Usuario.findOne({correo})
    if(!existeMail){
        throw new Error(`El correo: ${correo} ya esta registrado`)
    }
}

export const existeUsuarioPorId = async (id='')=>{
    //verificar si el usuario existe
    const existeUsuario= await Usuario.findById({id})
    if(!existeUsuario){
        throw new Error(`El id: ${id} no existe`)
    }
}