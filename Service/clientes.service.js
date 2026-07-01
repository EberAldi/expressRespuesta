import { Cliente } from '../models/cliente.model.js'

export const getAll = async () => {
  const clientes = await Cliente.find()
  return clientes
}

export const getById = async (id) => {
  const cliente = await Cliente.findById(id)
  return cliente
}

export const create = async (body) => {
  const { nombre, apellido, email, telefono, direccion } = body
  const nuevoCliente = await Cliente.create({ nombre, apellido, email, telefono, direccion })
  return nuevoCliente
}

export const update = async (id, body) => {
  const actualizado = await Cliente.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  })
  return actualizado
}

export const remove = async (id) => {
  const eliminado = await Cliente.findByIdAndDelete(id)
  return eliminado
}