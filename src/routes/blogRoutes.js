const express = require('express');
const passport = require('passport');
const Blog = require('../models/BlogModel');
const { requireRole } = require('../middlewares/requireRole'); // Rollenbasierte Middleware
const authMiddleware = require('../middlewares/authMiddleware'); // Authentifizierungs-Middleware
const { getAllBlogPosts, getBlogPostBySlug, createBlogPost, updateBlogPost } = require('../controllers/blogController');
const router = express.Router();

// POST: Einen neuen Blogpost erstellen
router.post('/', authMiddleware, requireRole('admin'), createBlogPost);

// GET: Alle Blogposts abrufen
router.get('/', async (req, res) => {
  const lang = req.query.lang || 'de';  // Standard: Deutsch
  if (!['de', 'en'].includes(lang)) {
    return res.status(400).json({ error: 'Ungültige Sprache. Verwenden Sie "de" oder "en".' });
  }

  try {
    const posts = await Blog.find();
    const localizedPosts = posts.map(post => ({
      _id: post._id,
      title: post.title[lang],
      content: post.content[lang],
      author: post.author,
      createdAt: post.createdAt
    }));
    res.status(200).json(localizedPosts);
  } catch (error) {
    console.error('Fehler beim Abrufen der Blogposts:', error);
    res.status(500).json({ error: 'Serverfehler.' });
  }
});

// GET: Einen Blogpost anhand des Slugs abrufen
router.get('/:slug', getBlogPostBySlug);

// PUT: Einen Blogpost aktualisieren
router.put('/:id', authMiddleware, requireRole('admin'), updateBlogPost);

module.exports = router;
