import Post from "../models/post.model.js";

// Crear un nuevo post
export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        // Crear post asociado al usuario logueado
        const newPost = new Post({
            title,
            content,
            author: req.user.id
        });

        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los posts
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("author", "username email role") // solo mostrar algunos campos
            .sort({ createdAt: -1 }); // más recientes primero

        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un post por ID
export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("author", "username email role");
        if (!post) return res.status(404).json({ message: "Post not found" });

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un post (solo autor o admin)
export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        // Solo el autor o admin puede actualizar
        if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Forbidden: you cannot edit this post" });
        }

        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;
        await post.save();

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un post (solo autor o admin)
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        // Solo el autor o admin puede eliminar
        if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Forbidden: you cannot delete this post" });
        }

        await post.deleteOne();
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
