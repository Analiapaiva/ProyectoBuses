const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Obtener token del encabezado de autorización
  const token = req.header('Authorization');

  // Verificar si no hay token
  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó token de autenticación' });
  }

  try {
    // Verificar token
    const decoded = jwt.verify(token, 'jwt_secret_key');

    // Agregar el ID del usuario decodificado al objeto de solicitud
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error('Error en la verificación del token:', error);
    res.status(401).json({ message: 'Token inválido' });
  }
};
