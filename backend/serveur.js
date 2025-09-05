// backend/serveur.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Route générique de recherche (artiste, track, album...)
app.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: 'Paramètre q manquant' });
  }

  try {
    const response = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Route pour récupérer les top tracks d’un artiste
app.get('/top-tracks', async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: 'Paramètre id manquant' });
  }

  try {
    const response = await fetch(`https://api.deezer.com/artist/${id}/top?limit=5`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
