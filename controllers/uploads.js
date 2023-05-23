import { response } from "express";
import path from 'path';
import fs from 'fs'

import { subirArchivos } from "../helpers/subir-archivo.js";
import { Usuario } from "../models/usuario.js";
import { Producto } from "../models/producto.js";

export const cargarArchivos=async(req,res=response)=>{

  try{
    const nombre = await subirArchivos( req.files, undefined, 'imgs' );

    req.json({
      nombre 
    }) 
  }
  catch(msg){
    res.status(400).json({msg})
  }
}

export const actualizarImagen=async(req,res=response)=>{

  const {id,coleccion}=req.params

  let modelo

  switch(coleccion){
    case 'usuario':
      modelo=await Usuario.findById(id)
      if(!modelo){
        return res.status(400).json({
          msg:`No existe un usuario con el id ${id}`
        })
      }

    break;

    case 'productos':
      modelo=await Producto.findById(id)
      if(!modelo){
        return res.status(400).json({
          msg:`No existe un producto con el id ${id}`
        })
      }

    break;

    default:
      return res.status(500).json({ msg: 'Se me olvidó validar esto'});
  }

  if(!modelo.img){
    const pathImagen=path.join(__dirname,'../uploads',coleccion,modelo.img)
    if(fs.existsSync(pathImagen)){
      fs.unlinkSync(pathImagen)
    }
  }

  const nombre = await subirArchivos( req.files, undefined, coleccion );
  modelo.img = nombre;

  await modelo.save();

  res.json({modelo})
}

export const mostrarImagen=async(req,res=response)=>{
  const {id,coleccion}=req.params

  let modelo

  switch(coleccion){
    case 'usuario':
      modelo=await Usuario.findById(id)
      if(!modelo){
        return res.status(400).json({
          msg:`No existe un usuario con el id ${id}`
        })
      }
    break;

    case 'productos':
      modelo=await Producto.findById(id)
      if(!modelo){
        return res.status(400).json({
          msg:`No existe un producto con el id ${id}`
        })
      }

    break;

    default:
      return res.status(500).json({ msg: 'Se me olvidó validar esto'});
  }

  if(!modelo.img){
    const pathImagen=path.join(__dirname,'../uploads',coleccion,modelo.img)
    if(fs.existsSync(pathImagen)){
      return res.sendFile(pathImagen)
    }
  }

  const pathImagen = path.join( __dirname, '../assets/no-image.jpg');
  res.sendFile( pathImagen );
}