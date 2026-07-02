export function verificarRol(...rolesPermitidos) {
  return (req, res, next) => {
    const { rol } = req.usuario

    if (!rol) {
      return res.status(403).json({ error: 'No se pudo determinar el rol del usuario' })
    }

    if (!rolesPermitidos.includes(rol)) {
      return res.status(403).json({
        error: `Acceso denegado. Rol '${rol}' no tiene permiso para esta operación`,
      })
    }

    next()
  }
}