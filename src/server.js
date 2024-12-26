const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config(); // Umgebungsvariablen laden

const app = express();
const port = process.env.PORT || 5000;

// CORS Middleware für den Zugriff von localhost (z.B. Frontend auf localhost:3001)
app.use(cors({
  origin: 'http://localhost:3000', // Ersetze dies durch die URL deines Frontends, falls es auf einem anderen Port läuft
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Session Middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Body Parser Middleware
app.use(express.json());

// MongoDB-Verbindung
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB verbunden!');
}).catch(err => {
  console.error('MongoDB-Verbindungsfehler:', err);
});

// Routen einbinden
app.use('/api/blog', blogRoutes);
app.use('/auth', authRoutes);

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
