import { createPost, getPostById, deletePost } from "../controllers/post.controller.js";
import express from "express";

const router = express.Router();

const postRouter = (app) => {
    router.post('/posts', createPost);
    router.get('/posts/:id', getPostById);
    router.delete('/posts/:id', deletePost);

    app.use('/api/v1', router);
}

export default postRouter;