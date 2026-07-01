import mongoose from 'mongoose'

const articuloSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
    },
    precio: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    categoria: {
      type: String,
    },
  },
  { timestamps: true }
)

export const Articulo = mongoose.model('Articulo', articuloSchema)