import { Router } from "express";
import { authRquired } from "../middlewares/auth.middleware.js";
import {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
} from "../controllers/post.controller.js";

const router = Router();

// Crear post (usuario logueado)
router.post("/posts", authRquired, createPost);

// Obtener todos los posts
router.get("/posts", getPosts);

// Obtener un post por ID
router.get("/posts/:id", getPostById);

// Actualizar post (solo autor o admin)
router.put("/posts/:id", authRquired, updatePost);

// Eliminar post (solo autor o admin)
router.delete("/posts/:id", authRquired, deletePost);

export default router;
