const usuarios = [
  { id: 1, usuario: 'aldair', password: '1234', rol: 'admin' },
  { id: 2, usuario: 'juan', password: 'abcd', rol: 'user' },
  { id: 3, usuario: 'maria', password: 'pass1', rol: 'user' },
]

// GET todos los usuarios
const getAll = () => {
  return usuarios
}

// GET usuario por id
const getById = (id) => {
  const usuario = usuarios.find((u) => u.id === parseInt(id))
  if (!usuario) return null
  return usuario
}

// POST crear usuario
const create = (body) => {
  const { usuario, password, rol } = body
  const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map((u) => u.id)) + 1 : 1
  const nuevoUsuario = { id: nuevoId, usuario, password, rol }
  usuarios.push(nuevoUsuario)
  return nuevoUsuario
}

// PUT actualizar usuario por id
const update = (id, body) => {
  const index = usuarios.findIndex((u) => u.id === parseInt(id))
  if (index === -1) return null
  usuarios[index] = { ...usuarios[index], ...body, id: parseInt(id) }
  return usuarios[index]
}

// DELETE eliminar usuario por id
const remove = (id) => {
  const index = usuarios.findIndex((u) => u.id === parseInt(id))
  if (index === -1) return null
  const eliminado = usuarios.splice(index, 1)
  return eliminado[0]
}

module.exports = { getAll, getById, create, update, remove }