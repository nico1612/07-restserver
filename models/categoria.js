import {Schema,model} from 'mongoose'

const CategoriaSchema=Schema({
    nombre:{
        type:String,
        require:[true,'El nombre es obligatorio']
    },
    estado:{
        type:Boolean,
        default:true,
        require:true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'usuario',
        require:true
    }
})

export const Categoria= model("Categoria",CategoriaSchema)