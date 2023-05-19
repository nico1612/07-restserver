import { response } from "express";
import { Categoria } from "../models/categoria";


export const obtenerCategorias=async(req, res=response)=>{
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .skip( Number( desde ))
            .populate('usuario','nombre')
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        categorias
    });
}

export const obtenerCategoria=async(req, res=response)=>{

    const {id}=req.params

    const categoria=  await Categoria.findById(id).populate('usuario','nombre')
}

export const crearCategoria= async (req, res=response)=>{

    const nombre= req.body.nombre.toUpperCase()

    const categoriaDB= await Categoria().findOne({nombre})

    if(categoriaDB){
        return res.json(400).json({
            msg:`la categoria ${categoriaDB.nombre} ya existe `
        })
    }

    const data={
        nombre,
        usuario:req.usuario._id
    }

    const categoria= new Categoria(data)

    await categoria.save()

    res.status(201).json({
        categoria
    })

}

export const actualizarCategoria =async(req, res=response)=>{

    const {id}=req.params
    const {estado,usuario,...data}=req.body

    data.nombre  = data.nombre.toUpperCase()
    data.usuario = req.data._id

    const categoria = await Categoria.findByIdAndUpdate(id,data,{new:true})

    res.json(categoria)
}

export const borrarCategoria =async(req, res=response)=>{

    const {id}=req.params
    const categoriaBorrado= await Categoria.findByIdAndUpdate(id,{estado:false},{new:true})

    res.json({categoriaBorrado})
}