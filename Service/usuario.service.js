import { Usuario } from '../models/usuario.model.js'
import bcrypt from 'bcryptjs'

// GET todos los usuarios
export const getAll = async () => {
  const usuarios = await Usuario.find()
  return usuarios
}

// GET usuario por id
export const getById = async (id) => {
  const usuario = await Usuario.findById(id)
  return usuario
}

// POST crear usuario
export const create = async (body) => {
  const { usuario, password, rol, email } = body
  const nuevoUsuario = await Usuario.create({ usuario, password, rol, email })
  return nuevoUsuario
}

// PUT actualizar usuario por id
export const update = async (id, body) => {
  if (body.password) {
    const salt = await bcrypt.genSalt(10)
    body.password = await bcrypt.hash(body.password, salt)
  }
  const actualizado = await Usuario.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  })
  return actualizado
}

// DELETE eliminar usuario por id
export const remove = async (id) => {
  const eliminado = await Usuario.findByIdAndDelete(id)
  return eliminado
}