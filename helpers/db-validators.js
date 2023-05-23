import { Categoria } from '../models/categoria.js';
import { Producto } from '../models/producto.js';
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
    if(existeMail){
        throw new Error(`El correo: ${correo} ya esta registrado`)
    }
}

export const existeUsuarioPorId = async (id='')=>{
    //verificar si el usuario existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

export const existeCategoriaPorId=async(id='')=>{

    const existeCategoria = await Categoria.findById(id);

    if ( !existeCategoria ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

export const existeProductoPorId=async(id='')=>{

    const existeProducto = await Producto.findById(id);
    if ( !existeProducto ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

export const coleccionesPermitidas=(coleccion='',colecciones=[])=>{

    const incluida=colecciones.includes(coleccion)

    if(!incluida){
        throw new Error(`La colección ${coleccion} no es permitidas, ${colecciones}`)
    }
    return true
}