const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    de: { type: String, required: true },
    en: { type: String, required: true }
  },
  content: {
    de: { type: String, required: true },
    en: { type: String, required: true }
  },
  author: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
