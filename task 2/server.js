const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Create mongoose model
const BlogPost = mongoose.model('BlogPost', { title: String, content: String });

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/api/blog', async (req, res) => {
    try {
        const blogPosts = await BlogPost.find();
        res.json(blogPosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/blog', async (req, res) => {
    const { title, content } = req.body;
    const blogPost = new BlogPost({ title, content });

    try {
        const newBlogPost = await blogPost.save();
        res.status(201).json(newBlogPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
