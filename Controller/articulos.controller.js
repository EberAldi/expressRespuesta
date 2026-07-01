import * as service from '../Service/articulos.service.js'

export const getAll = async (req, res) => {
  try {
    const articulos = await service.getAll()
    res.json(articulos)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener articulos', error: error.message })
  }
}

export const getById = async (req, res) => {
  try {
    const { id } = req.params
    const articulo = await service.getById(id)
    if (!articulo) {
      return res.status(404).json({ mensaje: `Articulo con id ${id} no encontrado` })
    }
    res.json(articulo)
  } catch (error) {
    res.status(400).json({ mensaje: 'Id inválido', error: error.message })
  }
}

export const create = async (req, res) => {
  try {
    const { nombre, precio } = req.body
    if (!nombre || precio === undefined) {
      return res.status(400).json({ mensaje: 'Los campos nombre y precio son requeridos' })
    }
    const nuevo = await service.create(req.body)
    res.status(201).json({ mensaje: 'Articulo creado', data: nuevo })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear articulo', error: error.message })
  }
}

export const update = async (req, res) => {
  try {
    const { id } = req.params
    const actualizado = await service.update(id, req.body)
    if (!actualizado) {
      return res.status(404).json({ mensaje: `Articulo con id ${id} no encontrado` })
    }
    res.json({ mensaje: 'Articulo actualizado', data: actualizado })
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar articulo', error: error.message })
  }
}

export const remove = async (req, res) => {
  try {
    const { id } = req.params
    const eliminado = await service.remove(id)
    if (!eliminado) {
      return res.status(404).json({ mensaje: `Articulo con id ${id} no encontrado` })
    }
    res.json({ mensaje: 'Articulo eliminado', data: eliminado })
  } catch (error) {
    res.status(400).json({ mensaje: 'Id inválido', error: error.message })
  }
}