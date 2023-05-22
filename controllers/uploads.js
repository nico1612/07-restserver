import { response } from "express";
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
uuidv4()

export const cargarArchivos=(req,res=response)=>{

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      res.status(400).json({msg:'No hay archivos que subir'});
      return;
    }

    const {archivo}=req.files
    const nombreCortado=archivo.name.split('.')
    const extension = nombreCortado[nombreCortado.length-1]

    const extensionesValidas=['png','jpg','jpeg','gif']
    if(!extensionesValidas.includes(extension)){
        return res.status(400).json({
            msg:`la extension ${extension} no es valida, ${extensionesValidas}`
        })
    }

    const nombreTemporal=uuidv4()+'.'+extension
    const uploadPath = path (__dirname + '../uploads/' + nombreTemporal);
  
    archivo.mv(uploadPath, (err)=>{
      if (err) {
        return res.status(500).json(err);
      }
  
      res.json({msg :'File uploaded to ' + uploadPath});
    });

}