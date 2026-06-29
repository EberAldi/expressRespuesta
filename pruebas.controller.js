import { getAll as _getAll, getById as _getById, create as _create, update as _update, remove as _remove } from './pruebas.service.js'

// GET /usuarios
const getAll = (req, res) => {
  const usuarios = _getAll()
  res.json(usuarios)
}

// GET /usuarios/:id
const getById = (req, res) => {
  const { id } = req.params
  const usuario = _getById(id)
  if (!usuario) {
    return res.status(404).json({ mensaje: `Usuario con id ${id} no encontrado` })
  }
  res.json(usuario)
}

// POST /usuarios
const create = (req, res) => {
  const { usuario, password, rol } = req.body
  if (!usuario || !password || !rol) {
    return res.status(400).json({ mensaje: 'Los campos usuario, password y rol son requeridos' })
  }
  const nuevo = _create(req.body)
  res.status(201).json({ mensaje: 'Usuario creado', data: nuevo })
}

// PUT /usuarios/:id
const update = (req, res) => {
  const { id } = req.params
  const actualizado = _update(id, req.body)
  if (!actualizado) {
    return res.status(404).json({ mensaje: `Usuario con id ${id} no encontrado` })
  }
  res.json({ mensaje: 'Usuario actualizado', data: actualizado })
}

// DELETE /usuarios/:id
const remove = (req, res) => {
  const { id } = req.params
  const eliminado = _remove(id)
  if (!eliminado) {
    return res.status(404).json({ mensaje: `Usuario con id ${id} no encontrado` })
  }
  res.json({ mensaje: 'Usuario eliminado', data: eliminado })
}

export default { getAll, getById, create, update, remove }