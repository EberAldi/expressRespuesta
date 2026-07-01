import mongoose from 'mongoose'

const clienteSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    apellido: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    telefono: {
      type: String,
    },
    direccion: {
      type: String,
    },
  },
  { timestamps: true }
)

export const Cliente = mongoose.model('Cliente', clienteSchema)