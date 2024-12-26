const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ error: 'Zugriff verweigert.' });
    }
    next();
  };
};

module.exports = { requireRole };
