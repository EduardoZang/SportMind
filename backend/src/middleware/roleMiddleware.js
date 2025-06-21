function requireRole(allowedRoles = []) {
  return (req, res, next) => {
    const userRoles = req.roles || [];
    const hasRole = allowedRoles.some(r => userRoles.includes(r));
    if (!hasRole) {
      return res.status(403).json({ error: 'Acesso negado: role insuficiente' });
    }
    next();
  };
}

module.exports = { requireRole };