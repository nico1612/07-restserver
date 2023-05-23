import { response } from "express";
import { subirArchivos } from "../helpers/subir-archivo.js";

export const cargarArchivos=async(req,res=response)=>{

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({msg:'No hay archivos que subir'});
    return;
  }

  const pathCompleto= await subirArchivos(req.files)

  req.json({
    path:pathCompleto
  })
}