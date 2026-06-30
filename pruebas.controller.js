import * as service from './pruebas.service.js'

// GET /usuarios
export const getAll = (req, res) => {
  const usuarios = service.getAll()
  res.json(usuarios)
}

// GET /usuarios/:id
export const getById = (req, res) => {
  const { id } = req.params
  const usuario = service.getById(id)
  if (!usuario) {
    return res.status(404).json({ mensaje: `Usuario con id ${id} no encontrado` })
  }
  res.json(usuario)
}

// POST /usuarios
export const create = (req, res) => {
  const { usuario, password, rol } = req.body
  if (!usuario || !password || !rol) {
    return res.status(400).json({ mensaje: 'Los campos usuario, password y rol son requeridos' })
  }
  const nuevo = service.create(req.body)
  res.status(201).json({ mensaje: 'Usuario creado', data: nuevo })
}

// PUT /usuarios/:id
export const update = (req, res) => {
  const { id } = req.params
  const actualizado = service.update(id, req.body)
  if (!actualizado) {
    return res.status(404).json({ mensaje: `Usuario con id ${id} no encontrado` })
  }
  res.json({ mensaje: 'Usuario actualizado', data: actualizado })
}

// DELETE /usuarios/:id
export const remove = (req, res) => {
  const { id } = req.params
  const eliminado = service.remove(id)
  if (!eliminado) {
    return res.status(404).json({ mensaje: `Usuario con id ${id} no encontrado` })
  }
  res.json({ mensaje: 'Usuario eliminado', data: eliminado })
}