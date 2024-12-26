const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const blogRoutes = require('./blogRoutes');  // Importiere die Routen

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB-Verbindung
mongoose.connect('your_mongo_connection_string', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB verbunden!');
}).catch(err => {
  console.error('MongoDB-Verbindungsfehler:', err);
});

// Füge die Blog-Routen hinzu
app.use(blogRoutes);

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
