const express = require('express');
const passport = require('passport');

const router = express.Router();

// Discord Authentifizierung starten
router.get('/discord', passport.authenticate('discord'));

// Callback-Route für Discord
router.get('/discord/callback', passport.authenticate('discord', {
  failureRedirect: '/login',
}), (req, res) => {
  // Erfolgreiche Authentifizierung, Weiterleitung zu einer geschützten Route
  res.redirect('/');
});

module.exports = router;
