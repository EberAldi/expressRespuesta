import * as service from '../Service/clientes.service.js'

export const getAll = async (req, res) => {
  try {
    const clientes = await service.getAll()
    res.json(clientes)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener clientes', error: error.message })
  }
}

export const getById = async (req, res) => {
  try {
    const { id } = req.params
    const cliente = await service.getById(id)
    if (!cliente) {
      return res.status(404).json({ mensaje: `Cliente con id ${id} no encontrado` })
    }
    res.json(cliente)
  } catch (error) {
    res.status(400).json({ mensaje: 'Id inválido', error: error.message })
  }
}

export const create = async (req, res) => {
  try {
    const { nombre, apellido, email } = req.body
    if (!nombre || !apellido || !email) {
      return res.status(400).json({ mensaje: 'Los campos nombre, apellido y email son requeridos' })
    }
    const nuevo = await service.create(req.body)
    res.status(201).json({ mensaje: 'Cliente creado', data: nuevo })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ mensaje: 'Ese email ya está registrado' })
    }
    res.status(500).json({ mensaje: 'Error al crear cliente', error: error.message })
  }
}

export const update = async (req, res) => {
  try {
    const { id } = req.params
    const actualizado = await service.update(id, req.body)
    if (!actualizado) {
      return res.status(404).json({ mensaje: `Cliente con id ${id} no encontrado` })
    }
    res.json({ mensaje: 'Cliente actualizado', data: actualizado })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ mensaje: 'Ese email ya está registrado' })
    }
    res.status(400).json({ mensaje: 'Error al actualizar cliente', error: error.message })
  }
}

export const remove = async (req, res) => {
  try {
    const { id } = req.params
    const eliminado = await service.remove(id)
    if (!eliminado) {
      return res.status(404).json({ mensaje: `Cliente con id ${id} no encontrado` })
    }
    res.json({ mensaje: 'Cliente eliminado', data: eliminado })
  } catch (error) {
    res.status(400).json({ mensaje: 'Id inválido', error: error.message })
  }
}