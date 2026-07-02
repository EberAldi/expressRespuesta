import jwt from 'jsonwebtoken'
import { Usuario } from '../models/usuario.model.js'

export const login = async (usuario, password) => {
  const usuarioEncontrado = await Usuario.findOne({ usuario })
  
  if (!usuarioEncontrado) {
    const error = new Error('Usuario no encontrado')
    error.status = 401
    throw error
  }

  // Comparamos directamente el texto plano
  const passwordValido = password === usuarioEncontrado.password

  if (!passwordValido) {
    const error = new Error('Contraseña incorrecta')
    error.status = 401
    throw error
  }

  const token = jwt.sign(
    {
      id: usuarioEncontrado._id,
      usuario: usuarioEncontrado.usuario,
      rol: usuarioEncontrado.rol,
    },
    process.env.JWT_SECRET,
    { expiresIn: '2m' }
  )

  return token
}