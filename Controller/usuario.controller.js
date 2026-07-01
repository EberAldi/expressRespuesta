import * as service from '../Service/usuario.service.js'

// GET /usuarios
export const getAll = async (req, res) => {
  try {
    const usuarios = await service.getAll()
    res.json(usuarios)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error: error.message })
  }
}

// GET /usuarios/:id
export const getById = async (req, res) => {
  try {
    const { id } = req.params
    const usuario = await service.getById(id)
    if (!usuario) {
      return res.status(404).json({ mensaje: `Usuario con id ${id} no encontrado` })
    }
    res.json(usuario)
  } catch (error) {
    res.status(400).json({ mensaje: 'Id inválido', error: error.message })
  }
}

// POST /usuarios
export const create = async (req, res) => {
  try {
    const { usuario, password, rol, email } = req.body
    if (!usuario || !password || !rol || !email) {
      return res.status(400).json({ mensaje: 'Los campos usuario, password, rol y email son requeridos' })
    }
    const nuevo = await service.create(req.body)
    res.status(201).json({ mensaje: 'Usuario creado', data: nuevo })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ mensaje: 'El usuario o email ya existe' })
    }
    res.status(500).json({ mensaje: 'Error al crear usuario', error: error.message })
  }
}

// PUT /usuarios/:id
export const update = async (req, res) => {
  try {
    const { id } = req.params
    const actualizado = await service.update(id, req.body)
    if (!actualizado) {
      return res.status(404).json({ mensaje: `Usuario con id ${id} no encontrado` })
    }
    res.json({ mensaje: 'Usuario actualizado', data: actualizado })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ mensaje: 'El usuario o email ya existe' })
    }
    res.status(400).json({ mensaje: 'Error al actualizar usuario', error: error.message })
  }
}

// DELETE /usuarios/:id
export const remove = async (req, res) => {
  try {
    const { id } = req.params
    const eliminado = await service.remove(id)
    if (!eliminado) {
      return res.status(404).json({ mensaje: `Usuario con id ${id} no encontrado` })
    }
    res.json({ mensaje: 'Usuario eliminado', data: eliminado })
  } catch (error) {
    res.status(400).json({ mensaje: 'Id inválido', error: error.message })
  }
}