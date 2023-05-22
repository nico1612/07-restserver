import { response } from "express";
import mongoose from "mongoose";
import { Usuario } from "../models/usuario.js";
import { Categoria } from "../models/categoria.js";
import { Producto } from "../models/producto.js";
const ObjectId = mongoose.Types.ObjectId

const coleccionesPermitidas=[
    'usuarios',
    'categoria',
    'productos',
    'roles'
]

const buscarUsuarios=async(termino='',res=response)=>{

    const esMongoId=ObjectId.isValid(termino)

    if(esMongoId){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: ( usuario ) ? [ usuario ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const usuario = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    })

    return res.json({
        results: usuario
    });
}

const buscarCategorias=async(termino='',res=response)=>{
    const esMongoId=ObjectId.isValid(termino)

    if(esMongoId){
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: ( categoria ) ? [ categoria ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const categoria = await Categoria.find({nombre: regex , estado: true })

    return res.json({
        results: categoria
    });
}

const buscarProductos=async(termino='',res=response)=>{
    const esMongoId=ObjectId.isValid(termino)

    if(esMongoId){
        const producto = await Producto.findById(termino)
                            .populate('categoria','nombre');

        return res.json({
            results: ( producto ) ? [ producto ] : []
        });
    }
// find({categoria:objectId(termino)})
    const regex = new RegExp( termino, 'i' );
    const productos = await Producto.find({ nombre: regex, estado: true })
                            .populate('categoria','nombre')

    return res.json({
        results: productos
    });


}
export const buscar=(req, res=response)=>{

    const {coleccion,termino}=req.params

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg:`Las colecciones permitidas son  ${coleccionesPermitidas}`
        })
    }

    switch(coleccion){
        case 'usuarios':
            buscarUsuarios(termino,res)
            break
        case 'categoria':
            buscarCategorias(termino,res)
            break
        case 'productos':
            buscarProductos(termino,res)
            break
        default:
            res.status(500).json({
                msg:'se me olvido hacer esta busqueda'
            })
    }

}