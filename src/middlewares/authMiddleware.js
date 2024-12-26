const passport = require('passport');

const authMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Benutzer ist nicht authentifiziert.' });
  }
  next();
};

module.exports = authMiddleware;
