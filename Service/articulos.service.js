import { Articulo } from '../models/articulo.model.js'

export const getAll = async () => {
  const articulos = await Articulo.find()
  return articulos
}

export const getById = async (id) => {
  const articulo = await Articulo.findById(id)
  return articulo
}

export const create = async (body) => {
  const { nombre, descripcion, precio, stock, categoria } = body
  const nuevoArticulo = await Articulo.create({ nombre, descripcion, precio, stock, categoria })
  return nuevoArticulo
}

export const update = async (id, body) => {
  const actualizado = await Articulo.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  })
  return actualizado
}

export const remove = async (id) => {
  const eliminado = await Articulo.findByIdAndDelete(id)
  return eliminado
}