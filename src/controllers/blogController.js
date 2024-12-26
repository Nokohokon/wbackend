const Blog = require('../models/BlogModel');

// GET: Alle Blogposts abrufen
const getAllBlogPosts = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blog posts', error });
  }
};

// GET: Einen Blogpost anhand des Slugs abrufen
const getBlogPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await Blog.findOne({ 'slug': slug });
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blog post', error });
  }
};

// POST: Einen neuen Blogpost erstellen
router.post('/', authMiddleware, requireRole('admin'), async (req, res) => {
    const { title, content, author } = req.body;
  
    // Überprüfe, ob die Discord-ID des Benutzers korrekt ist
    if (req.user.id !== 'DEINE_DISCORD_ID') {
      return res.status(403).json({ error: 'Du hast keine Berechtigung, einen Blogpost zu erstellen.' });
    }
  
    if (!title?.de || !title?.en || !content?.de || !content?.en) {
      return res.status(400).json({ error: 'Bitte geben Sie Titel und Inhalt in beiden Sprachen an.' });
    }
  
    try {
      const newPost = await Blog.create({ title, content, author });
      res.status(201).json(newPost);
    } catch (error) {
      console.error('Fehler beim Erstellen eines Blogposts:', error);
      res.status(500).json({ error: 'Serverfehler.' });
    }
  });
  

// PUT: Einen Blogpost aktualisieren
const updateBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBlog) return res.status(404).json({ message: 'Blog post not found' });
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update blog post', error });
  }
};

module.exports = { getAllBlogPosts, getBlogPostBySlug, createBlogPost, updateBlogPost };
